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
};

export default auth;