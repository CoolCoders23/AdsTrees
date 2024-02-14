// Desc: Connection to MongoDB
//(|| 'mongodb://127.0.0.1:27017/AdsTrees')
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
mongoose.connect(process.env.MONGODB_URI);
// =================================================

// Export connection
// =================================================
module.exports = mongoose.connection;
// =================================================
