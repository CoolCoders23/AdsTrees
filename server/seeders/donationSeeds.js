// Desc: This file contains the data for the Donation
// collection to be used in the seed file.
// ===================================================

// Create donation data
// ===================================================

const donationData = [
    {
        donationType: 'Garden',
        description: 'Plant a tree in a garden.',
        image: 'garden.svg',
        donationAmount: 1,
        price: 0.99
    },
    {
        donationType: 'Wood',
        description: 'Plant ten trees in a wood.',
        image: 'wood.svg',
        donationAmount: 10,
        price: 9.99
    },
    {
        donationType: 'Forest',
        description: 'Plant one hundred trees in a forest.',
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