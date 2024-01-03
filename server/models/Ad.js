// Desc: This file contains the model for Ads.
// ==================================================================

// Import Mongoose
// ==================================================================
const { Schema, model } = require('mongoose');
// ==================================================================

// Create the Ad Schema
// ==================================================================
const adSchema = new Schema({

    title: {
        type: String,
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long.']
    },

    watched: {
        type: Boolean,
        required: true,
        default: false,
    },

    // Duration in seconds
    duration: {
        type: Number,
        required: true,
        default: 0,
    },

    date: {
        type: Date,
        default: Date.now,
    },

});
// ==================================================================

// Create the Ad model using the Ad Schema
// ==================================================================
const Ad = model('Ad', adSchema);
// ==================================================================

// Export the Ad model
// ==================================================================
module.exports = Ad;
// ==================================================================