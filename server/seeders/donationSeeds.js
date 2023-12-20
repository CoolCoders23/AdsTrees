// Desc: This file contains the data for the Donation
// collection to be used in the seed file.
// ===================================================

// Require faker.js
// ===================================================
const faker = require('faker');
// ===================================================

// Create an empty array to push the data into
// ===================================================
const donationData = [];
// ===================================================

// Create a for loop to create 20 instances of data
// ===================================================

for (let i = 0; i < 35; i += 1) {
    const donationType = faker.random.arrayElement(['Garden', 'Wood', 'Forest', 'Jungle']);
    const description = faker.lorem.paragraph();
    const donationAmount = faker.random.arrayElement([1, 10, 50, 100]);
    const price = donationAmount * 0.99;

    donationData.push({
        donationType,
        description,
        donationAmount,
        price
    });
}
// ===================================================

// Export the donationData array
// ===================================================
module.exports = donationData;
// ===================================================