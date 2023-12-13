// Desc: This file contains data for seeding the
// database with Users along with their Preferences.
// ==================================================================

// Dependencies
// ==================================================================
const faker = require('@faker-js/faker');
// ==================================================================

// Define the number of Users to seed
// ==================================================================
const userCount = 10;
// ==================================================================

// Define the number of Preferences to seed
// ==================================================================
const preferenceCount = 10;
// ==================================================================

// Define the Users to seed
// ==================================================================
const userData = [];

for (let i = 0; i < userCount; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    userData.push({ username, email, password });
}
// ==================================================================

// Define the Preferences to seed
// ==================================================================
const preferenceData = [];

for (let i = 0; i < preferenceCount; i += 1) {
    const name = faker.commerce.department();

    preferenceData.push({ name });
}
// ==================================================================

// Export the Users and Preferences to seed
// ==================================================================
module.exports = { userData, preferenceData };
// ==================================================================