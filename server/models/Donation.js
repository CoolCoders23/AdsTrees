// Desc: This file contains the model for the Donation
// collection, defining this collection's schema for three
// types of donations that we have: (1) Garden-- -> One Tree,
// (2) Wood-- -> 10 Trees(3) Forest-- -> 100 Trees.
// ===================================================

// Require mongoose
// ===================================================
const mongoose = require('mongoose');
// ===================================================

// Create Schema class
// ===================================================
const { Schema } = mongoose;
// ===================================================

// Create DonateTree schema
// ===================================================
const DonationSchema = new Schema({
    // The user's donation type
    donationType: {
        type: String,
        required: true,
        // The donation type must be one of the following
        enum: ['Garden', 'Wood', 'Forest'],
        trim : true
    },
    description: {
        type: String,
    },
    // The user's donation amount
    donationAmount: {
        type: Number,
        required: true,
        enum: [1, 10, 100],
        min: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0.99
    },
});
// ===================================================

// Create the Donation model with the DonationSchema
// ===================================================
const Donation = mongoose.model('Donation', DonationSchema);
// ===================================================

// Export the DonateTree model
// ===================================================
module.exports = Donation;
// ===================================================