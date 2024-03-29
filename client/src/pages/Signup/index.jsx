/* eslint-disable no-unused-vars */
// Description: This file contains the logic for the user signup process.

// Importing React hooks and other dependencies.
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import './AdsTreesSignUp.css'; // Importing custom CSS for styling.
import {
    InputGroup,
    InputRightElement,
    Input,
    Button
} from '@chakra-ui/react'; // Chakra UI component for styled input fields.

// Signup component definition.
const Signup = ({ className = '' }) => {

    // State variables to hold form input data and error messages.
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [addUser, { error }] = useMutation(ADD_USER);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Function to handle form submission.
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (formState.password !== formState.confirmPassword) {
            setConfirmPasswordError('Passwords do not match.');
            return;
        }

        // Attempting to add user using Apollo GraphQL mutation.
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
            Auth.login(token); // Logging in the user on successful signup.
        } catch (e) {
            console.error(e);
            setErrorMessage('Something went wrong. Please make sure you entered all the required information properly.');
        }
    };

    // Function to handle changes in form inputs.
    const handleChange = (name, value) => {
        setFormState({ ...formState, [name]: value });
    };

    // Rendering the signup form.
    return (
        <div className={'ads-trees-sign-up ' + className}>
            <div className="sign-up-body">
                <div className="home-text">
                    <div className="hook-text-frame">
                        <div className="hook-text">
                            <div className="plant-trees-for-free">Plant trees for free </div>
                            <div className="make-the-planet-better">
                                Make the planet better{' '}
                            </div>
                            <div className="make-the-planet-better">
                                While learning about topics you love!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sign-up-form">
                    <div className="sign-up-form-holder">
                        <div className="sign-up-title">Sign up</div>
                        <form onSubmit={handleFormSubmit} className="sign-up-form2">
                            <div className="sign-up-input-holder">
                                <div className="input-group">
                                    <div className="input">
                                        <Input
                                            className="username"
                                            type="username"
                                            value={formState.username}
                                            onChange={(event) => handleChange('username', event.target.value)}
                                            placeholder="Username"
                                            size='lg'
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="input">
                                        <Input
                                            className="email"
                                            type="email"
                                            value={formState.email}
                                            onChange={(event) => handleChange('email', event.target.value)}
                                            placeholder="Email"
                                            size='lg'
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="input">
                                        <InputGroup size='lg'>
                                            <Input
                                                pr='4.5rem'
                                                className="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={formState.password}
                                                onChange={(event) => handleChange('password', event.target.value)}
                                                placeholder="Password"
                                                size='lg'
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button
                                                    variant={'none'}
                                                    h='1.75rem'
                                                    size='md'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    color={'gray.600'}
                                                    border="none"
                                                >
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="input">
                                        <InputGroup size='lg'>
                                            <Input
                                                pr='4.5rem'
                                                className="password-confirmation"
                                                value={formState.confirmPassword}
                                                onChange={(event) => handleChange('confirmPassword', event.target.value)}
                                                placeholder="Confirm password"
                                                size='lg'
                                                type={showPassword ? 'text' : 'password'}
                                            />
                                            <InputRightElement width='4.5rem'>
                                                <Button
                                                    variant={'none'}
                                                    h='1.75rem'
                                                    size='md'
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    color={'gray.600'}
                                                    border="none"
                                                >
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </div>
                                </div>

                                <Button type="submit" className="button">
                                    <div className="children">Register </div>
                                </Button>
                                {errorMessage && <div className="error">{errorMessage}</div>}
                                {confirmPasswordError && <div className="error">{confirmPasswordError}</div>}
                            </div>
                        </form>

                        <div className="call-to-login">
                            <div className="instruction-text">Otherwise, please </div>
                            <Link to="/" className="login-here-link">Login here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exporting the Signup component.
export default Signup;
