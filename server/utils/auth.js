// Desc: This file contains the logic for the user Authentication.
// ==================================================================

// Dependencies
// ==================================================================
const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
require('dotenv').config();
// ==================================================================

// define secret based on environment SECRET_KEY
// ==================================================================
const secret = process.env.SECRET_KEY;
const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 2);// 2 hours
// ==================================================================

// Exporting the Auth module
// ==================================================================
module.exports = {

    AuthenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        },
    }),

    authMiddleware: function ({ req }) {
        let token = req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }

        return req;
    },

    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },

};
// ==================================================================