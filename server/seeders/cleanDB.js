// Desc: This file contains the logic for cleaning the database.
// ==================================================================

// Import models and DB connection
// ==================================================================
const models = require('../models');
const db = require('../config/connection');
// ==================================================================

// Export function to clean the database
// ==================================================================
module.exports = async (modelName, collectionName) => {
    try {
        let modelExists = await models[modelName].db.db.listCollections({
            name: collectionName
        }).toArray();

        if (modelExists.length) {
            await db.dropCollection(collectionName);
        }
    } catch (err) {
        console.error(`Error while cleaning DB: ${err.message}`);
        throw new Error(`Failed to clean DB: ${err.message}`);
    }
};
// ==================================================================