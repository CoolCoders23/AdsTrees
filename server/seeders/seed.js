// Desc: Seed the database with data from the all the seed files.
// ==================================================================

// Import the database connection and models
// =================================================================
const db = require('../config/connection');
const { User, Ad } = require('../models');
const userSeeds = require('./userSeeds');
const adSeeds = require('./adSeeds');
const cleanDB = require('./cleanDB');
// =================================================================

// Error handling
// =================================================================
db.on('error', (err) => console.log(`An error occurred while connecting to the database: ${err}`));
// =================================================================

// Seed the database
// =================================================================
const connectAndSeed = async () => {

    try {
        await cleanDB('Ad', 'ads');

        await cleanDB('User', 'users');

        await User.create(userSeeds);

        await Ad.create(adSeeds);

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
