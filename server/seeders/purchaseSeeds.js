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

const userDonations = [
    {
        donationType: 'Garden',
        description: 'Plant 1 tree',
        image: 'garden.svg',
        donationAmount: 1,
        price: 0.99
    },
    {
        donationType: 'Wood',
        description: 'Plant 10 trees',
        image: 'wood.svg',
        donationAmount: 10,
        price: 9.99
    },
    {
        donationType: 'Forest',
        description: 'Plant 100 trees',
        image: 'forest.svg',
        donationAmount: 100,
        price: 99.99
    }
];

// Create a for loop to create 20 instances of data
// ===================================================

for (let i = 0; i < 5; i += 1) {
    const purchaseDate = faker.date.past();
    const paymentIntent = faker.random.alphaNumeric(10);
    const paymentStatus = faker.random.arrayElement([
        'incomplete', 'complete', 'failed'
    ]);
    const donations = userDonations[faker.datatype.number({ min: 0, max: 2 })];

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