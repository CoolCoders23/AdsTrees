// Importing useState hook from React and emailjs library
// ============================================================
import { useState } from 'react';
import emailjs from 'emailjs/browser';
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

    // Function to handle email sending on form submission
    // ============================================================
    const sendEmail = (e) => {
        e.preventDefault();

        // Check if the user is logged in, if not, set a message
        if (!Auth.loggedIn()) {
            setMessage('You must be logged in to send a message.');
            return;
        }

         // Validate the email address
         if (!validateEmail(formData.user_email)) {
            setMessage('Please enter a valid email address.');
            return;
        }

        // Set up the email template
        const templateParams = {
            from_name: formData.user_name,
            from_email: formData.user_email,
            message: formData.message
        };

        // Sending email using emailjs with the service ID, template ID, email template, and user ID
        emailjs.send('service_sjt7w8f', 'template_q8n7a4d', templateParams, 'oKEdEQ6TyUxYqsIip')
            .then((result) => {
                setMessage('Message sent successfully!');
                setFormData({ user_name: '', user_email: '', message: '' });
            }, (error) => {
                setMessage('Failed to send the message, please try again.');
            });
    };
    // ============================================================

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={sendEmail}>
                {/* Form fields for name, email, and message with handleChange event */}
                <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    value={formData.user_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    value={formData.user_email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Send Message</button> {/* Submit button */}
            </form>
            {message && <p>{message}</p>} {/* Display message below the form */}
        </div>
    );
};

export default Contact; // Exporting the Contact component
