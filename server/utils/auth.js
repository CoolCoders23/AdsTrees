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