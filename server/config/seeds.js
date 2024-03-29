// Desc: Seed the database with data from the all the seed files.
// ==================================================================

// Import the database connection and models
// =================================================================
const db = require('./connection');
const { User, Donation, Purchase, Ad, Youtube } = require('../models');
const donationData = require('../seeders/donationSeeds');
const youtubeData = require('../seeders/youtubeSeeds');
const cleanDB = require('../seeders/cleanDB');
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
        await cleanDB('Ad', 'ads');
        await cleanDB('Youtube', 'youtubes');
    } catch (err) {
        console.error(`Error occurred while cleaning the database: ${err}`);
        process.exit(1);
    }

    try {

        await User.create();
        await Donation.create(donationData );
        await Purchase.create();
        await Ad.create();
        await Youtube.create(youtubeData);

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
