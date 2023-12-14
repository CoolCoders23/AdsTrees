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
    getToken: () => {
        return localStorage.getItem('id_token');
    },
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

        if (token) {
            return jwtDecode(token).data; // If a token exists, decode it to extract user data
        }
        return null;
    },
    // ================================================================

    // Function to check if the user is logged in
    // ================================================================
    isLoggedIn: () => {
        const token = Auth.getToken();

        // Check if token is not null and is not expired
        return !!token && !Auth.isTokenExpired(token);
    },
    // ================================================================

    // Function to check if a token is expired
    // ================================================================
    isTokenExpired: (token) => {
        try {
            // Decode the JWT token
            const decoded = jwtDecode(token);
            // Check if the expiration time of the token has passed
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            console.error('Error decoding token:', err);
            return false;
        }
    }
    // ================================================================
};

export default Auth;