// Desc: This file contains the graphql resolvers for the AdsTrees application.
// ==================================================================

// Dependencies
// ==================================================================
const { GraphQLError } = require('graphql');
const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');
const validator = require('validator');
// ==================================================================

// Define the resolvers
// ==================================================================
const resolvers = {
    Query: {
        users: async () => {

            try {
                return await User.find();
            } catch (err) {
                throw new GraphQLError(`Failed to fetch users: ${err.message}`, {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    },
                });
            }
        },

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
                    throw new AuthenticationError(`Failed to fetch user profile: ${err.message}, make sure you are logged in.`);
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
                const user = await User.findOneAndDelete({ _id: userId });
                if (!user) {
                    throw new Error('User not found');
                }
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
                    updatedUser.profilePicture = user.profilePicture.url;
                }
                await updatedUser.save();
                const token = signToken(updatedUser);
                return { token, user: updatedUser };
            } catch (err) {
                throw new AuthenticationError(`Failed to update user: ${err.message}, make sure you are logged in.`);
            }
        },

    },
};
// ==================================================================

// Export the resolvers
// ==================================================================
module.exports = resolvers;
// ==================================================================