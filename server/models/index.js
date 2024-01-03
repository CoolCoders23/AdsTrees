// Desc: This file acts as a central hub for all models in the application
// ==================================================================

// Import all models
// ==================================================================
const User = require('./User');
const Donation = require('./Donation');
const Purchase = require('./Purchase');
const Ad = require('./Ad');
const Youtube = require('./Youtube');
// ==================================================================

// Export all models
// ==================================================================
module.exports = { User, Donation, Purchase, Ad, Youtube };
// ==================================================================