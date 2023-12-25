// This file contains the data for the purchase
// collection to be used in the seed file.
// Used(https://fakerjs.dev/api/) as a reference for faker.js
// ===================================================

// Require faker.js
// ===================================================
const faker = require('faker');
// ===================================================

// Create an empty array to push the data into
// ===================================================
const purchaseData = [];
// ===================================================

// Create a for loop to create 20 instances of data
// ===================================================

for (let i = 0; i < 20; i += 1) {
    const purchaseDate = faker.date.past();
    const donations = [];

    purchaseData.push({
        purchaseDate,
        donations
    });
}
// ===================================================

// Export the purchaseData array
// ===================================================
module.exports = purchaseData;
// ===================================================