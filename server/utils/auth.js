// Desc: This file contains the logic for the user Authentication.
// ==================================================================

// Import necessary dependencies
// ==================================================================
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Import and configure environment variables
// ==================================================================

// Define a secret key and set the expiration time for JWT
// ==================================================================
const secret = process.env.SECRET_KEY || 'mysecret';
const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 2);
// ==================================================================

module.exports = {
    // Define a custom GraphQLError for authentication errors
    // ==================================================================
    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
          code: 'UNAUTHENTICATED', // Custom error code indicating unauthenticated access
        },
    }),
    // ==================================================================

    // Function to sign a JWT token
    // ==================================================================
    signToken: function ({ username, email, _id }) {
        // Prepare the payload with user data
        const payload = { username, email, _id };
        // Sign and return the JWT token with the user payload, secret, and expiration
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
    // ==================================================================

    // Middleware function to authenticate requests using JWT
    // ==================================================================
    authMiddleware: function ({ req }) {
        // Extract the token from the request body, query, or headers
        let token = req.body.token || req.query.token || req.headers.authorization;

        // If the token is present and formatted as 'Bearer <token>', extract the actual token
        if (token && token.startsWith('Bearer ')) {
            token = token.split(' ')[1];
        }

        // If no token is present, return the request as is
        if (!token) {
            return req;
        }

        try {
            // Verify the token with the secret and maxAge
            const decoded = jwt.verify(token, secret, { maxAge: expiration });
            // Attach the decoded user data to the request object
            req.user = decoded.data;
        } catch (e) {
            console.error('Invalid token');
        }
        // Return the modified request object so it can be passed to the resolver
        return req;
    },
    // ==================================================================
};