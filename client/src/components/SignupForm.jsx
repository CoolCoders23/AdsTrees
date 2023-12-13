// Desc: This file contains the SignupForm component. It
// receives props from Signup.jsx and renders the signup form.
// =========================================================

// Import dependencies
// =========================================================
import { Link } from 'react-router-dom';
// =========================================================

// Define the SignupForm component by destructuring
// the props that are passed into it from Signup.jsx
// =========================================================
const SignupForm = ({ error, formState, handleFormSubmit, handleChange }) => {

    // Return the SignupForm component
    // =========================================================
    return (
        <div>
            <div>
                <div>
                    <h2>Sign Up</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div>
                            <input
                                placeholder="Username"
                                name="username"
                                type="username"
                                value={formState.username}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Email"
                                name="email"
                                type="email"
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <input
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </div>
                        {error ? (
                            <div>
                                <p className="error">{error}</p>
                            </div>
                        ) : null}
                        <div>
                            <button type="submit" style={{ cursor: 'pointer' }}>
                                Submit
                            </button>
                        </div>
                    </form>
                    <p>
                        Already have an account? <Link to="/login">Login here!</Link>
                    </p>
                </div>
            </div>
        </div>
    );

};
// =========================================================

// Export the SignupForm component
// =========================================================
export default SignupForm;
// =========================================================