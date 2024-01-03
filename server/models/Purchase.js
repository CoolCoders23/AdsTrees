// Desc: This file contains the model for Purchasing Trees
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
const { Schema, model } = mongoose;
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

    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation',
        }
    ]
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