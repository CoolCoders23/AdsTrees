// Desc: This file contains the model for Purchasing Trees
// ===================================================

// Require mongoose
// ===================================================
const mongoose = require('mongoose');
// ===================================================

// Create Schema class
// ===================================================
const { Schema, model } = mongoose;
// ===================================================

// Import dateFormat module
// ===================================================
const dateFormat = require('../utils/dateFormat');
// ===================================================

// Create Purchase schema
// ===================================================
const purchaseSchema = new Schema({
    // The user's purchase date
    purchaseDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },

    paymentIntent: {
        type: String,
    },

    paymentStatus: {
        type: String,
    },

    donations: {

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
        image: {
            type: String,
        },
        donationAmount: {
            type: Number,
            required: true,
            enum: [1, 10, 100],
        },
        price: {
            type: Number,
            required: true,
        },

    }
});
// ===================================================

// Create the Purchase model with the purchaseSchema
// ===================================================
const Purchase = model('Purchase', purchaseSchema);
// ===================================================

// Export the Purchase model
// ===================================================
module.exports = Purchase;
// ===================================================