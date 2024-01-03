// Desc: This file contains the model for Users.
// ==================================================================

// Import Mongoose and bcrypt
// ==================================================================
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const moment = require('moment');
// ==================================================================

// Create the User Schema with preferences
// ==================================================================

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long.']
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid e-mail address.']
    },

    password: {
        type: String,
        required: true,
        minlength: [5, 'Password must be at least 5 characters long.']
    },

    profilePicture: {
        url: {
            type: String,
            required: false,
        },
        altText: {
            type: String,
            required: false,
        },
    },

    preferences: [
        {
            type: String,
            required: false,
            trim: true,
        }
    ],

    purchases: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Purchase'
        }
    ],

    ads: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ad'
        }
    ],

    totalDonations: {
        type: Number,
        default: 0,
    },

    totalWatched: {
        type: Number,
        default: 0,
    },

    totalTreesPlanted: {
        type: Number,
        default: 0,
    },

    watchedToday: {
        type: Number,
        default: 0,
    },

    watchedInWeek: {
        type: Number,
        default: 0,
    },

    watchedInMonth: {
        type: Number,
        default: 0,
    },

    treesPlantedInWeek: {
        type: Number,
        default: 0,
    },

    treesPlantedInYear: {
        type: Number,
        default: 0,
    },

    bestWeek: {
        type: Number,
        default: 0,
    },

    lastWatchedWeek: {
        type: Date,
        default: Date.now,
    },

    lastWatchedMonth: {
        type: Date,
        default: Date.now,
    },

    lastWatchedYear: {
        type: Date,
        default: Date.now,
    },

},

{
    toJSON: {
        virtuals: true
    },

    id: false
},

);
// ==================================================================

// Update totalDonations when a donation is made
// ==================================================================
userSchema.methods.addDonation = async function(donationAmount) {
    this.totalDonations += donationAmount;
    return this.save();
};
// ==================================================================

// Update watched and treesPlanted when an ad is watched
// ==================================================================
userSchema.methods.updateWatched = function(ad) {
    const treesPlanted = Math.floor(ad.duration / 30);

    this.totalWatched += ad.duration;
    this.totalTreesPlanted += treesPlanted;

    const now = moment();
    const adDate = moment(ad.date);

    if (now.isSame(adDate, 'day')) {
        this.watchedToday += ad.duration;
    }

    if (!now.isSame(this.lastWatchedWeek, 'week')) {
        this.watchedInWeek = 0;
        this.treesPlantedInWeek = 0;
        this.lastWatchedWeek = now;
    }

    if (now.isSame(adDate, 'week')) {
        this.watchedInWeek += ad.duration;
        this.treesPlantedInWeek += treesPlanted;
    }

    if (!now.isSame(this.lastWatchedMonth, 'month')) {
        this.watchedInMonth = 0;
        this.lastWatchedMonth = now;
    }

    if (now.isSame(adDate, 'month')) {
        this.watchedInMonth += ad.duration;
    }

    if (!now.isSame(this.lastWatchedYear, 'year')) {
        this.treesPlantedInYear = 0;
        this.lastWatchedYear = now;
    }

    if (now.isSame(adDate, 'year')) {
        this.treesPlantedInYear += treesPlanted;
    }

    if (this.treesPlantedInWeek > this.bestWeek) {
        this.bestWeek = this.treesPlantedInWeek;
    }

    return this.save();
};
// ==================================================================

// Set up pre-save middleware to create password
// ==================================================================
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// ==================================================================

// Compare the incoming password with the hashed password
// ==================================================================
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
// ==================================================================

// Create the User model using the UserSchema
// ==================================================================
const User = model('User', userSchema);
// ==================================================================

// Export the User model
// ==================================================================
module.exports = User;
// ==================================================================