// Desc: This file contains the graphql resolvers for the AdsTrees application.
// ==================================================================

// Dependencies
// ==================================================================
const { GraphQLError } = require('graphql');
const { User } = require('../models');
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
    },

    Mutation: {},
};
// ==================================================================

// Export the resolvers
// ==================================================================
module.exports = resolvers;
// ==================================================================