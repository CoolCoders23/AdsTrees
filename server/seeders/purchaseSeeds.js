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

for (let i = 0; i < 5; i += 1) {
    const purchaseDate = faker.date.past();
    const paymentIntent = faker.random.alphaNumeric(10);
    const paymentStatus = faker.random.arrayElement([
        'incomplete', 'succeeded', 'failed'
    ]);
    const donations = [];

    purchaseData.push({
        purchaseDate,
        paymentIntent,
        paymentStatus,
        donations
    });
}
// ===================================================

// Export the purchaseData array
// ===================================================
module.exports = purchaseData;
// ===================================================