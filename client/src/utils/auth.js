// Desc: This file contains the logic for the authentication of the user
// =================================================================

// Importing the necessary packages
// ================================================================
import { jwtDecode } from 'jwt-decode';
// ================================================================

// Creating a class for the authentication
// ================================================================
class Auth {

    // Getting the user's profile data from the token
    // ================================================================
    getProfile() {
        const token = this.getToken();
        if (token === null) {
            return null;
        }
        if (typeof token !== 'string') {
            throw new Error('Token must be a string');
        }
        return jwtDecode(token);
    }
    // ================================================================

    // Checking if the user is logged in
    // ================================================================
    loggedIn() {
        const token = this.getToken();
        return token && !this.isTokenExpired(token) ? true : false;
    }
    // ================================================================

    // Checking if the token is expired
    // ================================================================
    isTokenExpired(token) {

        const decoded = jwtDecode(token);
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('id_token');
            return true;
        }

        return false;
    }
    // ================================================================

    // Getting the token from localStorage
    // ================================================================
    getToken() {
        return localStorage.getItem('id_token');
    }
    // ================================================================

    // Setting the token to localStorage and reloading the page
    // ================================================================
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/user-profile');
    }
    // ================================================================

    // Removing the token from localStorage and forcing logout with reload
    // ================================================================
    logout() {
        localStorage.removeItem('id_token');
        window.location.reload();
    }
    // ================================================================

}
// ================================================================

// Exporting the Auth class
// ================================================================
export default new Auth();
// ================================================================