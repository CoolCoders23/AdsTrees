// Importing useState hook from React and emailjs library
// ============================================================
import { useState } from 'react';
import emailjs from 'emailjs-com';
import Auth from '../utils/auth';
import { validateEmail } from '../utils/validateEmail';
// ============================================================

const Contact = () => {
    // State for managing form data with initial values
    // ============================================================
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: ''
    });
    // State for managing messages to the user (like success or error messages)
    const [message, setMessage] = useState('');
    // ============================================================

    // Function to handle changes in the form input fields
    // ============================================================
    const handleChange = (event) => {
        // Updating formData state with new values when input changes
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    // ============================================================
};

export default Contact; // Exporting the Contact component
