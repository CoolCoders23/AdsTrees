import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './AdsTreesSignUp/AdsTreesSignUp.css';
import { Input } from '@chakra-ui/react';

const Signup = ({ className = '' }) => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [addUser, { error }] = useMutation(ADD_USER);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Check if passwords match
        if (formState.password !== formState.confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return;
        }

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
    };

    const handleChange = (name, value) => {
        setFormState({ ...formState, [name]: value });
    };

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
                        </div>
                    </div>
                </div>
                <div className="sign-up-form">
                    <div className="sign-up-form-holder">
                        <div className="sign-up-title">Sign up</div>


                        <form onSubmit={handleFormSubmit} class="sign-up-form2">
                            <div className="sign-up-input-holder">
                                <div className="input-group">
                                    <div className="input">
                                        <Input
                                            className="username"
                                            type="text"
                                            value={formState.username}
                                            onChange={(event) => handleChange('username', event.target.value)}
                                            placeholder="Username"
                                            _placeholder={{ color: 'green.900' }}
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
                                            _placeholder={{ color: 'green.900' }}
                                            size='lg'
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="input">
                                        <Input
                                            className="password"
                                            type="password"
                                            value={formState.password}
                                            onChange={(event) => handleChange('password', event.target.value)}
                                            placeholder="Password"
                                            _placeholder={{ color: 'green.900' }}
                                            size='lg'
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <div className="input">
                                        <Input
                                            className="password-confirmation"
                                            type="password"
                                            value={formState.confirmPassword}
                                            onChange={(event) => handleChange('confirmPassword', event.target.value)}
                                            placeholder="Confirm password"
                                            _placeholder={{ color: 'green.900' }}
                                            size='lg'
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="button">
                                    <div className="children">Register </div>
                                </button>
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

export default Signup;
