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
        localStorage.removeItem('id_token');
        window.location.reload();
    },
    // ================================================================

    // Function to get the user data from the token
    // ================================================================
    getUserData: () => {
        const token = auth.getToken();

        if (token) {
            return jwtDecode(token).data; // If a token exists, decode it to extract user data
        }
        return null;
    },
    // ================================================================

    // Function to check if the user is logged in
    // ================================================================
    isLoggedIn: () => {
        const token = auth.getToken();

        // Check if token is not null and is not expired
        return !!token && !auth.isTokenExpired(token);
    },
    // ================================================================
};

export default auth;