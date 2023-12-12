// Desc: This file contains the logic for the user Authentication.
// ==================================================================

// Dependencies
// ==================================================================
const jwt = require('jsonwebtoken');
require('dotenv').config();
// ==================================================================

// define secret based on environment SECRET_KEY
// ==================================================================
const secret = process.env.SECRET_KEY;
const expiration = Math.floor(Date.now() / 1000) + (60 * 60 * 2);// 2 hours
// ==================================================================