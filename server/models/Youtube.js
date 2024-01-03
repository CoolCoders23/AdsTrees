// Desc: This file contains the model for Youtube videos.
// ==================================================================

// Import Mongoose
// ==================================================================
const { Schema, model } = require('mongoose');
// ==================================================================

// Define the Youtube Schema
// ==================================================================
const youtubeSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [5, 'Title must be at least 3 characters long.']
    },

    url: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },

    // Duration in seconds
    duration: {
        type: Number,
        required: true,
        default: 0,
    },

});
// ==================================================================

// Create the Youtube model using the Youtube Schema
// ==================================================================
const Youtube = model('Youtube', youtubeSchema);
// ==================================================================

// Export the Youtube model
// ==================================================================
module.exports = Youtube;
// ==================================================================