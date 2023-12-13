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
}

// ==================================================================

// Export the resolvers
// ==================================================================
module.exports = resolvers;
// ==================================================================