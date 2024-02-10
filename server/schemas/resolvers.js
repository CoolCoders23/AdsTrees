// Desc: This file contains the graphql resolvers for the AdsTrees application.
// Used following links as reference:
// https://www.apollographql.com/docs/apollo-server/data/resolvers/
// https://stripe.com/docs/videos/global-payments?video=create-a-payment-intent
// https://stripe.com/docs/payments/accept-a-payment?platform=web&ui=elements#fetch-updates
// https://stripe.com/docs/payments/quickstart
// ==================================================================

// Dependencies
// ==================================================================
const { GraphQLError } = require('graphql');
const { User, Donation, Purchase, Ad, Youtube } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
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

                return await Donation
                    .find({})
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

        ads: async () => {
            try{
                return Ad.find({});
            } catch (err) {
                throw new GraphQLError(`Failed to fetch ads: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }
        },

        youtube: async () => {
            try{
                return Youtube.find({});
            } catch (err) {
                throw new GraphQLError(`Failed to fetch youtube: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }
        },

        getStripeClientKey: async () => {

            try {

                return { stripeClientKey: process.env.STRIPE_PUBLIC_KEY };

            } catch (err) {

                throw new GraphQLError(`Failed to fetch stripe client key: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });

            }

        },

        getStripePaymentIntent: async () => {

            try {

                // List all PaymentIntents
                const paymentIntentsList = await stripe.paymentIntents.list();

                // Filter PaymentIntents with 'requires_payment_method' status
                const paymentIntentsToCancel = paymentIntentsList.data.filter(pi => pi.status === 'requires_payment_method');

                // Cancel each PaymentIntent individually
                for (let pi of paymentIntentsToCancel) {
                    await stripe.paymentIntents.cancel(pi.id, { cancellation_reason: 'abandoned' });
                }

                // Filter PaymentIntents with 'succeeded' status
                const succeededPaymentIntents = paymentIntentsList.data.filter(pi => pi.status === 'succeeded');

                if (succeededPaymentIntents.length === 0) {
                    throw new Error('No payment intents found');
                }

                const lastPaymentIntent = succeededPaymentIntents[0];

                return { id: lastPaymentIntent.id, status: lastPaymentIntent.status };

            } catch (err) {
                throw new GraphQLError(`Failed to fetch stripe payment intent: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
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

        removeUser: async (parent, { userId }, context) => {

            if (!context.user) {
                throw AuthenticationError;
            }

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

        updateUser: async (parent, { user }, context) => {

            if (!context.user) {
                throw AuthenticationError;
            }

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

                await updatedUser.save();
                return updatedUser;

            } catch (err) {

                console.log(err);
                throw AuthenticationError;

            }

        },

        addCheckout: async (parent, args, context) => {

            if (context.user) {

                const donations = await args.donations;

                // Define variables to store the donation data
                let donationId = '';
                let type = '';
                let description = '';
                let image = '';
                let quantity = 0;
                let price = 0;

                for (const donation of donations) {

                    if (typeof donation.price !== 'number' || isNaN(donation.price)) {
                        throw new GraphQLError('Invalid donation price', {
                            extensions: {
                                code: 'BAD_USER_INPUT',
                            },
                        });
                    }

                    donationId += `${donation._id}, `;
                    type += `${donation.donationType}, `;
                    description += `${donation.description}, `;
                    image += `${donation.image}, `;
                    quantity += donation.donationAmount;
                    price += parseFloat((donation.price + (donation.price * 0.13)).toFixed(2));

                }
                const totalPrice = parseFloat((price * 100).toFixed(2));
                // remove last comma and space
                donationId = donationId.slice(0, -2);
                type = type.slice(0, -2);
                description = description.slice(0, -2);
                image = image.slice(0, -2);

                try {

                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: totalPrice,
                        currency: 'usd',
                        description: description,
                        receipt_email: context.user.email,
                        // payment_method_types: ['card'],
                        metadata: {
                            donation_id: donationId,
                            user_id: context.user._id,
                            donation_type: type,
                            donation_image: image,
                            donation_amount: quantity,
                        },
                        automatic_payment_methods: {
                            enabled: true,
                        },
                    });

                    return { clientSecret: paymentIntent.client_secret };

                } catch (err) {

                    throw new GraphQLError
                    (`Failed to create payment intent: ${err.message}`, {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                        },
                    });

                }

            } else {
                throw AuthenticationError;
            }

        },

        addPurchase: async (parent, { donations, status, paymentId }, context) => {

            if (!context.user) {
                throw AuthenticationError;
            }

            try {

                // Fetch the actual donation objects from the database
                const donationObjects = await Donation.find({
                    _id: { $in: donations },
                });

                // Create a new purchase object to be used as the
                // nested document of the Purchase model and save the purchase
                // ==================================================================
                const updatedDonations = donationObjects.map((donation) => {
                    const donationType = donation.donationType;
                    const description = donation.description;
                    const image = donation.image;
                    const donationAmount = donation.donationAmount;
                    const price = parseFloat((donation.price + (donation.price * 0.13)).toFixed(2));
                    return { donationType, description, image, donationAmount, price };
                });

                const newPurchase = new Purchase({
                    paymentIntent: paymentId,
                    paymentStatus: status,
                    donations: updatedDonations[0],
                });

                await newPurchase.save();
                // ==================================================================

                const user = await User.findById(context.user._id);

                if (!user) {
                    throw new Error('User not found');
                }

                const totalDonationAmount = donationObjects.reduce((total, donation) => total + donation.donationAmount, 0);

                // Update total donations
                await user.addDonation(totalDonationAmount);

                // Add the updatedPurchase to the user's purchases
                user.purchases.push(newPurchase._id);

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

        addWatchedAd: async (parent, { ad }, context) => {

            if (context.user) {

                const newAd = new Ad({
                    title: ad.title,
                    watched: ad.watched,
                    duration: ad.duration,
                    date: ad.date
                });

                await newAd.save();

                const user = await User.findById(context.user._id);
                await user.updateWatched(newAd);

                user.ads.push(newAd._id);
                await user.save();

                return newAd;
            }

            throw new AuthenticationError('You need to be logged in!');

        },

    },
};
// ==================================================================

// Export the resolvers
// ==================================================================
module.exports = resolvers;
// ==================================================================