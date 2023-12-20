// Desc: This file contains the model for Users.
// ==================================================================

// Import Mongoose and bcrypt
// ==================================================================
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
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
},

{
    toJSON: {
        virtuals: true
    },

    id: false
},

);
// ==================================================================

// Get total number of trees donated by user
// ==================================================================
userSchema.methods.getTotalDonations = async function () {
    try {
        const user = await this.model('User').findById(this._id).populate({
            path: 'purchases',
            populate: {
                path: 'donations',
            },
        });

        let totalDonations = 0;
        for (const purchase of user.purchases) {
            for (const donation of purchase.donations) {
                totalDonations += donation.donationAmount;
            }
        }

        return totalDonations;
    } catch (err) {
        console.log(err);
    }
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