// Desc: This file contains the graphql resolvers for the AdsTrees application.
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

        User: {
            totalDonations: async (parent) => {
                try {
                    return await parent.getTotalDonations();
                } catch (err) {
                    throw new Error(`Failed to get total donations: ${err.message}`);
                }
            },
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
        donations: async (parent, { donationType }) => {

            const params = donationType ? { donationType } : {};

            try {

                return await Donation
                    .find(params)
                    .sort({ donationAmount: 1 });

            } catch (err) {
                throw new GraphQLError(`Failed to fetch donations: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }

        },

        // Define to fetch all purchases
        purchases: async (parent, { donationType }, context) => {

            if (context.user) {
                try {

                    // Find all donations with the specified donationType
                    const donations = await Donation.find({ donationType });

                    // Extract the IDs of these donations
                    const donationIds = donations.map(donation => donation._id);

                    const user = await User.findById(context.user._id).populate({
                        path: 'purchases',
                        match: { donations: { $in: donationIds } },
                        populate: {
                            path: 'donations',
                        },
                    });

                    return user.purchases.filter((purchase) => {
                        if (purchase.purchaseStatus === 'Completed') {
                            return purchase;
                        }
                    }).sort({ purchaseDate: -1 });

                } catch (err) {
                    throw new GraphQLError(`Failed to fetch purchases: ${err.message}`, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });
                }

            } else {

                throw AuthenticationError;
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
                const purchase = new Purchase({ donations: args.donations });

                try {

                    const { donations } = await purchase.populate('donations').execPopulate();

                    const line_items = [];

                    for (let i = 0; i < donations.length; i++) {

                        const donation = await stripe.prices.create({

                            product_data: {
                                name: donations[i].donationType,
                                description: donations[i].description,
                                images: [`${url}/images/${donations[i].donationType.toLowerCase()}.jpg`],
                            },
                            unit_amount: donations[i].price * 100,
                            currency: 'usd',

                        });

                        line_items.push({
                            price: donation.id,
                            quantity: donations[i].donationAmount,
                        });
                    }

                    const session = await stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items,
                        mode: 'payment',
                        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                        cancel_url: `${url}/`,
                    });

                    // Save the purchase to the database
                    await purchase.save();

                    // Add the purchase to the user's purchases
                    const user = await User.findById(context.user._id);
                    user.purchases.push(purchase);
                    await user.save();

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

                const user = await User.findByIdAndUpdate(context.user._id, { $push: { purchases: newPurchase } }, { new: true });

                if (!user) {
                    throw new Error('User not found');
                }

                return newPurchase;

            } catch (err) {

                throw new GraphQLError(`Failed to create purchase: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });

            }

        },

        updatePurchase: async (parent, { purchaseId, purchaseStatus }, context) => {

            if (!context.user) {
                throw AuthenticationError;
            }

            try {

                if (purchaseStatus === 'Pending') {
                    throw new Error('Purchase status cannot be set to Pending');
                }

                const purchase = await Purchase.findByIdAndUpdate(purchaseId, { purchaseStatus }, { new: true });

                if (!purchase) {
                    throw new Error('Purchase not found');
                }

                return purchase;

            } catch (err) {

                throw new GraphQLError(`Failed to update purchase: ${err.message}`, {
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