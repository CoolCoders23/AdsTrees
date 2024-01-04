// Desc: Connection to MongoDB
// =================================================
// Dependencies
// =================================================
const mongoose = require("mongoose");
// require("dotenv").config();
// =================================================

// Connect to MongoDB
// =================================================
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/AdsTrees",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
// =================================================

// Export connection
// =================================================
module.exports = mongoose.connection;
// =================================================
