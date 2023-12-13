// Desc: This file contains the logic for the authentication of the user
// =================================================================

// Importing the necessary packages
// ================================================================
import { jwtDecode } from 'jwt-decode';
// ================================================================

const auth = {
    // Function to set token to localStorage
    // ================================================================
    setToken: (token) => {
        localStorage.setItem('id_token', token); // Store the JWT token in local storage under the key 'id_token' 
        window.location.assign('/'); // Redirect user to main page
    },
    // ================================================================

    // Function to get the token from localStorage
    // ================================================================
    getToken: () => {
        return localStorage.getItem('id_token');
    },
    // ================================================================

    // Function to remove the token from localStorage
    // ================================================================
    removeToken: () => {
        localStorage.removeItem('id_token'); // Remove the JWT token from local storage
        window.location.reload(); // Reload the page and reset the state of the application
    },
    // ================================================================
};

export default auth;