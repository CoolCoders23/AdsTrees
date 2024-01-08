// Desc: Connection to MongoDB
// =================================================
// Dependencies
// =================================================
const mongoose = require('mongoose');
require('dotenv').config();
// =================================================

// Connect to MongoDB
// =================================================
mongoose.connect(process.env.MONGODB_URI);
// =================================================

// Export connection
// =================================================
module.exports = mongoose.connection;
// =================================================
