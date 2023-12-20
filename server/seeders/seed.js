// Desc: Seed the database with data from the all the seed files.
// ==================================================================

// Import the database connection and models
// =================================================================
const db = require('../config/connection');
const { User, Donation, Purchase } = require('../models');
const { userData } = require('./userSeeds');
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

    const users = [];
    try {
        for (const user of userData) {
            const newUser = await User.create(user);
            users.push(newUser);
        }
    } catch (err) {
        console.error(`Error occurred while creating User documents: ${err}`);
        process.exit(1);
    }

    const donations = [];
    try {
        for (const donation of donationData) {
            const newDonation = await Donation.create(donation);
            donations.push(newDonation);
        }
    } catch (err) {
        console.error(`Error occurred while creating Donation documents: ${err}`);
        process.exit(1);
    }

    try {
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            const userPurchases = purchaseData.slice(i * 2, (i + 1) * 2);
            for (const purchase of userPurchases) {
                const randomDonations = [];
                for (let j = 0; j < 3; j += 1) {
                    const randomIndex = Math.floor(Math.random() * donations.length);
                    const donation = donations[randomIndex];
                    randomDonations.push(donation._id);
                }

                purchase.donations = randomDonations;
                const newPurchase = await Purchase.create(purchase);

                user.purchases.push(newPurchase._id);
                await user.save();
            }
        }

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
