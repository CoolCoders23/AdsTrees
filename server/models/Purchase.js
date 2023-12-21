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
const { Schema } = mongoose;
// ===================================================

// Create Purchase schema
// ===================================================
const PurchaseSchema = new Schema({
    // The user's purchase date
    purchaseDate: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
    // The user's purchase status
    purchaseStatus: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Completed']
    },
    donations: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Donation',
            required: true
        }
    ]
});
// ===================================================

// Create the Purchase model with the PurchaseSchema
// ===================================================
const Purchase = mongoose.model('Purchase', PurchaseSchema);
// ===================================================

// Export the Purchase model
// ===================================================
module.exports = Purchase;
// ===================================================