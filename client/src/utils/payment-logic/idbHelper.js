/* eslint-disable no-unused-vars */
// Desc: this file contains the helper functions for the payment logic
// ========================================================

// Create a function to handle the indexedDB
// ========================================================
const idbPromise = (storeName, method, object) => {

    return new Promise((resolve, reject) => {

        const request = window.indexedDB.open('donate-trees', 1);

        request.onupgradeneeded = function(e) {
            const db = request.result;
            db.createObjectStore('donations', { keyPath: '_id' });
            db.createObjectStore('cart', { keyPath: '_id' });
        };

        request.onerror = function(e) {
            console.log(`There was an error: ${e.target.errorCode}`);
        };

        request.onsuccess = function (e) {

            console.log('success');
            const db = request.result;
            const tx = db.transaction(storeName, 'readwrite');
            const store = tx.objectStore(storeName);

            db.onerror = function(e) {
                console.log('error', e);
            };

            let access;

            switch (method) {

            case 'put':
                access = store.put(object);
                access.onsuccess = function() {
                    resolve(object);
                };
                break;

            case 'get':
                if (object && object._id) {
                    access = store.get(object._id);
                } else {
                    access = store.getAll();
                }
                access.onsuccess = function() {
                    resolve(access.result);
                };
                break;

            case 'delete':
                access = store.delete(object._id);
                access.onsuccess = function() {
                    resolve(true);
                };
                break;

            default:
                console.log('No valid method');
                break;
            }

            tx.oncomplete = function() {
                db.close();
            };

        };
    });
};
// ========================================================

// Export the helper functions
// ========================================================
export { idbPromise };
// ========================================================
