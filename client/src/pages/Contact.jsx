// Importing useState hook from React and emailjs library
// ============================================================
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Auth from '../utils/auth';
import { validateEmail } from '../utils/validation';
import './AdsTreesContactUs/AdsTreesContactUs.css'; // Importing the CSS
import { Input } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
// ============================================================

// Contact component
// ============================================================
const Contact = ({ className = '' }) => {

    // State for managing form data with initial values
    // ============================================================
    const [formData, setFormData] = useState({
        user_name: '',
        user_last_name: '',
        user_email: '',
        message: ''
    });
    // ============================================================

    // State for managing messages to the user (like success or error messages)
    const [message, setMessage] = useState('');

    // Function to handle changes in the form input fields
    // ============================================================
    const handleChange = (event) => {
        // Updating formData state with new values when input changes
        setFormData({ ...formData, [event.target.name]: event.target.value || '' });
    };
    // ============================================================

    // Function to handle email sending on form submission
    // ============================================================
    const sendEmail = async (e) => {
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

        // Check if the message is empty, if so, set a message
        if (!formData.message) {
            setMessage('Please enter a message.');
            return;
        }

        // check if the username is empty, if so, set a message
        if (!formData.user_name) {
            setMessage('Please enter a name.');
            return;
        }

        // Set up the email template
        const templateParams = {
            from_name: formData.user_name,
            from_email: formData.user_email,
            message: formData.message
        };

        // Sending email using emailjs with the service ID,
        // template ID, email template, and user ID
        emailjs.send(
            'service_d60z75l',
            'template_r1x5e6m',
            templateParams,
            'g89omQwAW_K878FaC'
        )
            .then((result) => {
                console.log( result.status, result.text);
                setMessage('Message sent successfully!');
                setFormData({ user_name: '', user_email: '', message: '' });
            }, (error) => {
                console.log(error.text);
                setMessage('Failed to send the message, please try again.');
            });
    };
    // ============================================================

    // Rendering the contact form
    return (
        <div className={'ads-trees-contact-us ' + className}>
            <div className="contact-us-body">
                <div className="contact-us-sub-body">
                    <div className="contact-us-title-frame">
                        <div className="contact-us-title">Contact us</div>
                    </div>
                    <div className="message-frame">
                        <form onSubmit={sendEmail} className="client-contact-input-frame">
                            <div className="contact-us-name-input">
                                <div className="contact-us-first-name-input">
                                    <div className="field-title-label">First name</div>
                                    <div className="input-group">
                                        <Input
                                            className="first-name"
                                            name="user_name"
                                            value={formData.user_name || ''}
                                            onChange={handleChange}
                                            placeholder=""
                                            _placeholder={{ color: 'green.900' }}
                                        />
                                    </div>
                                </div>
                                {/* Last Name Input */}
                                <div className="contact-us-last-name-input">
                                    <div className="field-title-label">Last name</div>
                                    <div className="input-group">
                                        <div className="input">
                                            <Input
                                                className="last-name"
                                                name="user_last_name"
                                                value={formData.user_last_name || ''}
                                                onChange={handleChange}
                                                placeholder=""
                                                _placeholder={{ color: 'green.900' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="contact-us-email-input">
                                <div className="field-title-label">Email</div>
                                <div className="input-group">
                                    <Input
                                        className="email"
                                        name="user_email"
                                        type="email"
                                        value={formData.user_email || ''}
                                        onChange={handleChange}
                                        placeholder=""
                                        _placeholder={{ color: 'green.900' }}
                                    />
                                </div>
                            </div>
                            <div className="contact-us-message-input">
                                <div className="field-title-label">Message</div>
                                <div className="input-group2">
                                    <Textarea
                                        className="message"
                                        name="message"
                                        value={formData.message || ''}
                                        onChange={handleChange}
                                        placeholder=""
                                        _placeholder={{ color: 'green.900' }}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="button">=
                                <div className="children">Send Message</div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
};

// Exporting the Contact component
export default Contact;
