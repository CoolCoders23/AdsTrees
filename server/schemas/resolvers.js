// Desc: This file contains the graphql resolvers for the AdsTrees application.
// ==================================================================

// Import necessary modules and utilities
// ==================================================================
const { signToken, AuthenticationError } = require('../utils/auth');
const { User } = require('../models');
// ==================================================================

// Define the GraphQL resolvers
// ==================================================================
const resolvers = {
    // Resolvers for Queries
    // ==================================================================
    Query: {
        // Resolver to fetch all users
        // ==================================================================
        users: async () => {
            try {
                return await User.find();
            } catch (err) {
                throw AuthenticationError;
            }
        },
        // ==================================================================

        // Resolver to fetch a single user by username or email
        // ==================================================================
        user: async (parent, { username, email }) => {
            // Determine search criteria based on provided arguments
            const params = username ? { username } : { email };
            return await User.findOne(params);
        },
        // ==================================================================

        // Resolver to fetch the currently authenticated user
        // ==================================================================
        me: async (parent, args, context) => {
            // Check if user is authenticated
            if (context.user) {
                // Extract username from the user context
                const { username } = context.user;
                // Find the user and return their data, excluding the password
                return await User.findOne({ username }).select('-password');
            }
            throw AuthenticationError;
        },
        // ==================================================================
    },
    // ==================================================================
}

// ==================================================================

// Export the resolvers
// ==================================================================
module.exports = resolvers;
// ==================================================================