// Desc: This file contains the logic for the Login the user
// ============================================================

// Import dependencies
// ============================================================
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
// ============================================================

// Import components
// ============================================================
import SigninForm from '../components/SigninForm';
// ============================================================

// Define the Login function
// ============================================================
const Login = () => {

    // Define the state for the Login component
    // ==========================================================
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
    // ==========================================================

    // Define the function to handle the form submit
    // ==========================================================
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const mutationResponse = await login({ variables: { email: formState.email, password: formState.password } });
            const token = mutationResponse.data.login.token;
            Auth.login(token);
        } catch (e) {
            console.log(e);
        }

        // clear form values
        setFormState({
            email: '',
            password: '',
        });
    };
    // ==========================================================

    // Define the function to handle the form change
    // ==========================================================
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };
    // ==========================================================

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
            <SigninForm
                error={error}
                formState={formState}
                handleFormSubmit={handleFormSubmit}
                handleChange={handleChange}
            />
        </main>
    );
    // ==========================================================

};
// ============================================================

// Export the Login function
// ============================================================
export default Login;
// ============================================================