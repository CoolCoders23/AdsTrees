// Desc: Connection to MongoDB
// =================================================
// Dependencies
// =================================================
const mongoose = require('mongoose');
require('dotenv').config();
// =================================================

// Connect to MongoDB
// =================================================
// Connect to MongoDB
// =================================================
mongoose.connect(process.env.MONGODB_URI + '/AdsTreesDB');
// =================================================

// Export connection
// =================================================
module.exports = mongoose.connection;
// =================================================
