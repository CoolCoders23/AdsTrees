// Desc: Seed the database with data from the all the seed files.
// ==================================================================

// Import the database connection and models
// =================================================================
const db = require('../config/connection');
const { User, Preference } = require('../models');
const {userData, preferenceData} = require('./userSeeds');
const cleanDB = require('./cleanDB');
// =================================================================

// Define the number of Preferences to seed per User
// ==================================================================
const preferencesPerUser = 5;
// ==================================================================

// Error handling
// =================================================================
db.on('error', (err) => console.log(`An error occurred while connecting to the database: ${err}`));
// =================================================================

// Seed the database
// =================================================================
const connectAndSeed = async () => {

    try {

        await cleanDB('User', 'users');

        await User.create(userData);

        for (let i = 0; i < preferenceData.length; i += 1) {
            const { _id } = await Preference.create(preferenceData[i]);
            const preferenceIndex = i;
            for (let j = 0; j < userData.length; j += 1) {
                const { _id: userId } = await User.findOneAndUpdate(
                    { username: userData[j].username },
                    { $addToSet: { preferences: _id } },
                    { new: true, runValidators: true }
                );
                if (preferenceIndex < preferencesPerUser) {
                    await User.findOneAndUpdate(
                        { _id: userId },
                        { $addToSet: { preferences: _id } },
                        { new: true, runValidators: true }
                    );
                }

            }
        }

    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
};
// =================================================================

// Connect to the database and call the function
// =================================================================
db.once('open', connectAndSeed);
// =================================================================
