// Decs: This file contains the seeder for Ads.
// ==================================================================

// require faker.js
// ==================================================================
const faker = require('faker');
// ==================================================================

// Create an empty array to push the data into
// ==================================================================
const adData = [];
// ==================================================================

// Create a for loop to create 8 instances of data
// ==================================================================
for (let i = 0; i < 8; i += 1) {
    const title = faker.commerce.productName();
    const watched = faker.datatype.boolean();
    const duration = faker.datatype.number();
    const date = faker.date.past();

    adData.push({
        title,
        watched,
        duration,
        date
    });
}
// ==================================================================

// Export the adData array
// ==================================================================
module.exports = adData;
// ==================================================================