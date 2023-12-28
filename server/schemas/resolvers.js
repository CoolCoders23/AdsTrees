// Desc: This file contains the graphql resolvers for the AdsTrees application.
// Used following links as reference:
// https://www.apollographql.com/docs/apollo-server/data/resolvers/
// https://stripe.com/docs/payments/checkout/how-checkout-works
// https://stripe.com/docs/api/checkout/sessions/create
// https://stripe.com/docs/payments/checkout/customization
// ==================================================================

// Dependencies
// ==================================================================
const { GraphQLError } = require('graphql');
const { User, Donation, Purchase } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const validator = require('validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// ==================================================================

// Define the resolvers
// ==================================================================
const resolvers = {
    Query: {

        user: async (parent, { username }) => {

            try {

                return await User.findOne({ username });

            } catch (err) {
                throw new GraphQLError(`Failed to fetch user: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

        },

        // Defined to fetch the logged in user's profile
        userProfile: async (parent, args, context) => {

            if (context.user) {
                try {

                    const user = await User.findOne({ _id: context.user._id });
                    return user;

                } catch (err) {

                    console.log(err);
                    throw AuthenticationError;

                }

            }

        },

        // Define to fetch all donations
        donations: async () => {

            try {

                return await Donation.find({});

            } catch (err) {
                throw new GraphQLError(`Failed to fetch donations: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

        },

        // Define to fetch all purchases
        purchases: async (parent, { userId }, context) => {

            if (!context.user) {
                throw AuthenticationError;
            }
            try {

                const user = await User
                        .findById(userId)
                        .populate({
                            path: 'purchases',
                            options: { sort: { purchaseDate: -1 } },
                            populate: {
                                path: 'donations',
                            },
                        });

                return user.purchases;

            } catch (err) {
                throw new GraphQLError(`Failed to fetch purchases: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

        },

        // Define to fetch a single purchase
        purchase: async (parent, { _id }, context) => {

            if (context.user) {
                try {

                    const user = await User.findById(context.user._id).populate({
                        path: 'purchases',
                        populate: {
                            path: 'donations',
                        },
                    });

                    const purchase = user.purchases.id(_id);

                    if (!purchase) {
                        throw new Error('Purchase not found');
                    }

                    return purchase;

                } catch (err) {

                    console.log(err);
                    throw AuthenticationError;

                }

            }

        },

        checkout: async (parent, args, context) => {

            if (context.user) {

                const url = new URL(context.headers.referer).origin;
                await Purchase.create({ donations: args.donations.map(({ _id }) => _id)});

                try {

                    const line_items = [];

                    for (const donation of args.donations) {
                        line_items.push({
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: donation.donationType,
                                    description: donation.description,
                                    images: [`${url}/images/${donation.image}`],
                                },
                                unit_amount: donation.price * 100,
                            },
                            quantity: donation.donationAmount,
                        });
                    }

                    const session = await stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items,
                        mode: 'payment',
                        automatic_tax: { enabled: true },
                        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                        cancel_url: `${url}/`,
                    });

                    // Setting a session expire time of 15 minutes
                    setTimeout(async () => {
                        await stripe.checkout.sessions.expire(session.id);
                    }, 15 * 60 * 1000);

                    return { session: session.id };

                } catch (err) {

                    console.log(err);
                    throw AuthenticationError;

                }

            }

        },

    },

    Mutation: {

        addUser: async (parent, { user }) => {
            try {

                const newUser = await User.create(user);
                const token = signToken(newUser);
                return { token, user: newUser };

            } catch (err) {
                throw new GraphQLError(`Failed to create user: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

        },

        login: async (parent, { email, password }) => {

            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },

        removeUser: async (parent, { userId }) => {

            try {

                const user = await User.findOne({ _id: userId });

                if (!user) {
                    throw new Error('User not found');
                }

                // Remove all purchases associated with the user
                await Purchase.deleteMany({ _id: { $in: user.purchases } });

                await User.deleteOne({ _id: userId });

                return user;

            } catch (err) {
                throw new GraphQLError(`Failed to delete user: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

        },

        updateUser: async (parent, { user }) => {
            try {

                const updatedUser = await User.findById(user._id);

                if (!updatedUser) {
                    throw new Error('User not found');
                }

                if (user.username !== undefined) {
                    updatedUser.username = user.username;
                }

                if (user.email !== undefined) {
                    updatedUser.email = user.email;
                }

                if (user.password !== undefined) {
                    updatedUser.password = user.password;
                }

                if (user.profilePicture !== undefined) {
                    if (!validator.isURL(user.profilePicture.url)) {
                        throw new Error('Profile picture is not a valid URL');
                    }
                    updatedUser.profilePicture = { url: user.profilePicture.url, altText: user.profilePicture.altText };
                }

                await updatedUser.save();
                const token = signToken(updatedUser);
                return { token, user: updatedUser };

            } catch (err) {

                console.log(err);
                throw AuthenticationError;

            }

        },

        addPurchase: async (parent, { donations }, context) => {

            if (!context.user) {
                throw AuthenticationError;
            }

            try {

                const newPurchase = await Purchase.create({ donations });
                const donationAmount = donations.donationAmount;
                const user = await User.findById(context.user._id);

                if (!user) {
                    throw new Error('User not found');
                }

                // Update total donations
                await user.addDonation(donationAmount);

                // Add the new purchase to the user's purchases
                user.purchases.push(newPurchase);

                await user.save();

                return newPurchase;

            } catch (err) {

                throw new GraphQLError(`Failed to create purchase: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });

            }

        },

    },
};
// ==================================================================

// Export the resolvers
// ==================================================================
module.exports = resolvers;
// ==================================================================