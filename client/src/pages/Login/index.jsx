// Importing necessary React hooks and other dependencies.
// ============================================================
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './AdsTreesSignIn.css'; // Importing custom CSS for styling.
import { Link } from 'react-router-dom'; // Importing Link for routing.
import {
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button
} from '@chakra-ui/react'; // Chakra UI component for styled input fields.
// ============================================================

// Login component definition.
// ============================================================
const Login = ({ className = '' }) => {

    // State variables for managing PWA installation.
    // ============================================================
    const [isInstallPromptOpen, setInstallPromptOpen] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    // ============================================================

    // Function to handle PWA installation.
    // ============================================================
    useEffect(() => {

        window.addEventListener('beforeinstallprompt', (e) => {

            // Check if the prompt has been shown before
            if (localStorage.getItem('installPromptShown')) {
                return;
            }

            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Update UI notify the user they can install the PWA
            setInstallPromptOpen(true);
        });

    }, []);
    // ============================================================

    // Function to handle PWA installation.
    // ============================================================
    const handleInstallClick = () => {
        // Hide the app provided install promotion
        setInstallPromptOpen(false);
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            // Set the flag in localStorage
            localStorage.setItem('installPromptShown', 'true');
            setDeferredPrompt(null);
        });
    };
    // ============================================================

    // State variables for managing form inputs and errors.
    // ============================================================
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
    // ============================================================

    // Function to handle the login form submission.
    // ============================================================
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // Attempting to login the user using Apollo GraphQL mutation.
            const mutationResponse = await login({
                variables: { email: formState.email, password: formState.password }
            });
            const token = mutationResponse.data.login.token;
            Auth.login(token); // Logging in the user on successful authentication.
        } catch (e) {
            console.log(e);
        }
    };
    // ============================================================

    // Function to handle changes in input fields.
    // ============================================================
    const handleChange = (event, fieldName) => {
        const { value } = event.target;
        setFormState({ ...formState, [fieldName]: value });
    };
    // ============================================================

    // Rendering the login form.
    return (

        <div className={'ads-trees-sign-in ' + className}>

            {/* Install Modal */}
            <Modal isOpen={isInstallPromptOpen} onClose={() => setInstallPromptOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Install AdsTrees</ModalHeader>
                    <ModalBody>
                            Do you want to install AdsTrees on your device?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleInstallClick}>
                                Install
                        </Button>
                        <Button variant="ghost" onClick={() => setInstallPromptOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div className="sign-in-body" >
                <div className="home-text">
                    <div className="hook-text-frame">
                        <div className="hook-text">
                            <div className="plant-trees-for-free">
                                Plant trees for free
                            </div>
                            <div className="make-the-planet-better">
                                Make the planet better{' '}
                            </div>
                            <div className="make-the-planet-better">
                                While learning about topics you love!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sign-in-form">
                    <div className="sign-in-form-holder">
                        <div className="sign-in-title">Sign in</div>
                        <form onSubmit={handleFormSubmit} className="sign-in-input-holder">
                            <div className="input-group">
                                <div className="input">
                                    <Input
                                        className="email"
                                        value= {formState.email}
                                        onChange={(event) => handleChange(event, 'email')}
                                        placeholder='Email'
                                        size='lg'
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div className="input-group">
                                <div className="input">
                                    <Input
                                        placeholder="Password"
                                        className="password"
                                        value={formState.password}
                                        onChange={(event) => handleChange(event, 'password')}
                                        size='lg'
                                        type="password"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="button">
                                <div className="children">Login </div>
                            </button>
                            {error && <div className="error">The provided credentials are incorrect</div>}
                        </form>
                        <div className="call-to-register">
                            <div className="instruction-text">Otherwise, please </div>
                            <Link to="/signup" className="register-here-link">Register here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// ============================================================

// Exporting the Login component.
// ============================================================
export default Login;
// ============================================================
