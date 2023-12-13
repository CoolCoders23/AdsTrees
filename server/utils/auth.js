// Desc: This file contains the logic for the user Authentication.
// ==================================================================

// Import necessary dependencies
// ==================================================================
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Import and configure environment variables
// ==================================================================