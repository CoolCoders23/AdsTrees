// Desc: This file contains the data for the Donation
// collection to be used in the seed file.
// ===================================================

// Create donation data
// ===================================================

const donationData = [
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
    },
];

// ===================================================

// Export the donationData array
// ===================================================
module.exports = donationData;
// ===================================================