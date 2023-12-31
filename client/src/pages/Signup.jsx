/* eslint-disable no-unused-vars */
// Desc: This page contains the logic for Signup the user
// ============================================================

// Import dependencies
// ============================================================
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
// ============================================================

// Import components
// ============================================================
import SignupForm from '../components/SignupForm';
// ============================================================

// Define the Signup function
// ============================================================
const Signup = () => {

    // Define the state for the Signup component
    // ==========================================================
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [addUser, { error }] = useMutation(ADD_USER);
    const [errorMessage, setErrorMessage] = useState('');
    // ==========================================================

    // Define the function to handle the form submit
    // ==========================================================
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await addUser({
                variables: {
                    user: {
                        username: formState.username,
                        email: formState.email,
                        password: formState.password
                    }
                }
            });
            const token = mutationResponse.data.addUser.token;
            Auth.login(token);
        } catch (e) {
            setErrorMessage(e.message);
        }

        setFormState({
            username: '',
            email: '',
            password: '',
        });
    };
    // ============================================================

    // Define the function to handle the form change
    // ============================================================
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };
    // ============================================================

    // Return the Login component
    // ==========================================================
    return (
        <main>
            <div>
                <pre>
                    Engage with Your Interests,
                    Embrace a Greener World,
                    Your Views Turn Ads into Forests.
                </pre>
            </div>
            <SignupForm
                error={errorMessage}
                formState={formState}
                handleFormSubmit={handleFormSubmit}
                handleChange={handleChange}
            />
        </main>
    );
    // ==========================================================

};
// ============================================================

// Export the Signup function
// ============================================================
export default Signup;
// ============================================================