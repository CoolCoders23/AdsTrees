// Desc: This file contains the model for Users.
// ==================================================================

// Import Mongoose and bcrypt
// ==================================================================
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
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
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address.']
    },
    password: {
        type: String,
        required: true,
        minlength: [5, 'Password must be at least 5 characters long.']
    },
    preferences: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Preference'
        }
    ]
});
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

// set up the pre-update middleware to update a User
// ==================================================================
userSchema.pre('findOneAndUpdate', async function (next) {
    if (this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});
// ==================================================================

// set up the pre-remove middleware to remove a User's associated preferences
// ==================================================================
userSchema.pre('remove', async function (next) {
    await this.model('Preference').deleteMany({ user: this._id });
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