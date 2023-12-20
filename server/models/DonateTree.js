// Desc: This file contains the model for the DonateTree
// collection, defining this collection's schema for four
// types of donations that we have: (1) Garden-- -> One Tree,
// (2) Wood-- -> 10 Trees(3) Forest-- -> 50 Trees, and(4)
// Jungle-- -> 100 Trees.The model also contains a method to
// calculate the total number of trees donated by a user.
// ===================================================

// Require mongoose
// ===================================================
const mongoose = require('mongoose');
// ===================================================

// Import dateFormat module
// ===================================================
const dateFormat = require('../utils/dateFormat');
// ===================================================

// Create Schema class
// ===================================================
const { Schema } = mongoose;
// ===================================================

// Create DonateTree schema
// ===================================================
const DonateTreeSchema = new Schema({
    // The user's donation type
    donationType: {
        type: String,
        required: true,
        // The donation type must be one of the following
        enum: ['Garden', 'Wood', 'Forest', 'Jungle'],
        trim : true
    },
    description: {
        type: String,
    },
    // The user's donation amount
    donationAmount: {
        type: Number,
        required: true,
        enum: [1, 10, 50, 100],
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
    // The user's donation date
    donationDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    // The user's donation status
    donationStatus: {
        type: String,
        default: 'Pending'
    },
});
// ===================================================

// Create the DonateTree model with the DonateTreeSchema
// ===================================================
const DonateTree = mongoose.model('DonateTree', DonateTreeSchema);
// ===================================================

// Export the DonateTree model
// ===================================================
module.exports = DonateTree;
// ===================================================