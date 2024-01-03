// Desc: This file contains data for seeding the
// database with Users along with their Preferences.
// ==================================================================

// Dependencies
// ==================================================================
const faker = require('faker');
// ==================================================================

// Define the number of Users to seed
// ==================================================================
const userCount = 5;
// ==================================================================

// Define the number of Preferences to seed
// ==================================================================
const preferenceCountPerUser = 3;
// ==================================================================

// Define the Users to seed
// ==================================================================
const userData = [];

for (let i = 0; i < userCount; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password(8);
    const profilePicture = {
        url: faker.image.avatar(),
        altText: faker.random.words(5),
    };
    const preferences = [];

    for (let j = 0; j < preferenceCountPerUser; j += 1) {
        preferences.push(faker.commerce.department());
    }
    const purchases = [];
    const ads = [];
    const totalDonations = faker.datatype.number(1000);
    const totalWatched = faker.datatype.number(1000);


    userData.push({ username, email, password, profilePicture, preferences, purchases, ads, totalDonations });
}
// ==================================================================

// Export the Users and Preferences to seed
// ==================================================================
module.exports = userData;
// ==================================================================