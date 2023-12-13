// Desc: This file contains the SigninForm component.
// This component is used to render the signin form.
// =========================================================

// Import dependencies
// =========================================================
import { Link } from 'react-router-dom';
// =========================================================

// Define the SigninForm component by destructuring
// the props that are passed into it from Login.jsx
// =========================================================
const SigninForm = ({ error, formState, handleFormSubmit, handleChange }) => {
    // =========================================================

    // Return the SigninForm component
    // =========================================================
    return (
        <div>
            <div>
                <div>
                    <h2>Sign In</h2>
                    <form onSubmit={handleFormSubmit}>
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
                                <p>The provided credentials are incorrect</p>
                            </div>
                        ) : null}
                        <div>
                            <button type="submit" style={{ cursor: 'pointer' }}>
                                Login
                            </button>
                        </div>
                    </form>
                    <p>
                        Don&apos;t have an account? <Link to="/signup">Register here!</Link>
                    </p>
                </div>
            </div>
        </div>
    );

};
// =========================================================

// Export the SigninForm component
// =========================================================
export default SigninForm;
// =========================================================