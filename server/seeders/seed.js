// Desc: Seed the database with data from the all the seed files.
// ==================================================================

// Import the database connection and models
// =================================================================
const db = require('../config/connection');
const { User, Donation, Purchase } = require('../models');
const userData = require('./userSeeds');
const donationData = require('./donationSeeds');
const purchaseData = require('./purchaseSeeds');
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
        await cleanDB('User', 'users');
        await cleanDB('Donation', 'donations');
        await cleanDB('Purchase', 'purchases');
    } catch (err) {
        console.error(`Error occurred while cleaning the database: ${err}`);
        process.exit(1);
    }

    try {

        await User.create(userData);
        await Donation.create(donationData);
        await Purchase.create(purchaseData);

    } catch (err) {
        console.error(`Error occurred while creating Purchase documents and updating User documents: ${err}`);
        process.exit(1);
    }

    console.log('all done!');
    db.close();
};
// =================================================================

// Connect to the database and call the function
// =================================================================
db.once('open', connectAndSeed);
// =================================================================
