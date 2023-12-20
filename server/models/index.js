// Desc: This file acts as a central hub for all models in the application
// ==================================================================

// Import all models
// ==================================================================
const User = require('./User');
const DonateTree = require('./DonateTree');
const Purchase = require('./Purchase');
// ==================================================================

// Export all models
// ==================================================================
module.exports = { User, DonateTree, Purchase };
// ==================================================================