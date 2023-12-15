// Desc: This file contains the logic for the authentication of the user
// =================================================================

// Importing the necessary packages
// ================================================================
import { jwtDecode } from 'jwt-decode';
// ================================================================

const Auth = {
    // Function to set token to localStorage
    // ================================================================
    login: (token) => {
        localStorage.setItem('id_token', token); // Store the JWT token in local storage under the key 'id_token' 
        window.location.assign('/'); // Redirect user to main page
    },
    // ================================================================

    // Function to get the token from localStorage
    // ================================================================
    getToken: () => localStorage.getItem('id_token'),
    // ================================================================

    // Function to remove the token from localStorage
    // ================================================================
    logout: () => {
        localStorage.removeItem('id_token');
        window.location.reload();
    },
    // ================================================================

    // Function to get the user data from the token
    // ================================================================
    getUserData: () => {
        const token = Auth.getToken();

        return token ? jwtDecode(token).data : null; // If a token exists, decode it to extract user data
    },
    // ================================================================

    // Function to check if the user is logged in
    // ================================================================
    loggedIn: () => {
        const token = Auth.getToken();
        return token && !Auth.isTokenExpired(token) ? true : false;
      },
    // ================================================================

    // Function to check if a token is expired
    // ================================================================
    isTokenExpired: (token) => {
        // Decode the JWT token
        const decoded = jwtDecode(token);
        // Check if the expiration time of the token has passed
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }
        return false;
        }
    // ================================================================
};

export default new Auth;