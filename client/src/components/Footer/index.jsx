// Desc: This file contains the Footer component of the application
// ============================================================

// Importing Dependencies
// ============================================================
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeComponent from './components/ThemeComponent';
// ============================================================
// TODO: check if the modes are working

// Define the Footer component
// ============================================================
const Footer = () => {

    // Define the path
    const location = useLocation();
    const path = location.pathname;

    // Define the navigate hook
    const navigate = useNavigate();

    // Define the function to handle the go back button
    const goBack = () => {
        navigate(-1);
    };

    // Return the JSX for the Footer component
    return (
        <div>
            <footer>
                <div>
                    <div>

                        <div>
                            <p>
                                &copy; {new Date().getFullYear()} AdsTrees, Inc . Privacy . Terms . Donate
                            </p>
                        </div>

                        <button
                            type='button'
                            onClick={() => window.open('https://github.com/CoolCoders23')}
                        >
                            <i className='fab fa-github'></i>
                        </button>

                        <div>
                            <Link
                                className={`nav-link ${
                                    path === '/contact' ? 'active' : 'text-dark'
                                }`}
                                to='/contact'
                            >
                                    Contact us
                            </Link>
                        </div>

                        {path !== '/' && (
                            <button type='button'onClick={goBack}>
                                &larr; Go Back
                            </button>
                        )}

                        <ThemeComponent />

                    </div>
                </div>
            </footer>
        </div>
    );
};
// ============================================================

// Export the Footer component
// ============================================================
export default Footer;
// ============================================================
