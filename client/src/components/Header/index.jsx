// Desc: This file contains the Header component of the app
// ============================================================

// Importing Dependencies
// ============================================================
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Auth from '../../utils/auth';
import logo from '../../assets/image/LogoMain/AdsTrees_Logo_64.svg';
// ============================================================

// Define the Header component
// ============================================================
const Header = () => {
    // Define the state for the navigation bar
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    // Define the function to handle the toggling of the navigation bar
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    // Define the path
    const location = useLocation();
    const path = location.pathname;

    // Define the function to handle the logout
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    // Define the username
    let username = '';
    try {
        const profile = Auth.getProfile();
        if (profile !== null) {
            username = profile.data.username;
        }
    } catch (error) {
        console.error('Failed to get username', error);
    }

    // Return the JSX for the Header component
    return (
        <div>
            <nav>
                <div>
                    <div>
                        <img
                            src={logo}
                            alt="logo" width="100" height="100"
                        />
                        <Link to='/'>
                            AdsTrees
                        </Link>
                        {/* TODO: add style to collapse */}
                        <button
                            type='button'
                            aria-expanded={!isNavCollapsed ? true : false}
                            aria-label='Toggle navigation'
                            onClick={handleNavCollapse}
                        >
                            {/* TODO: toggler icon goes here */}
                            <span></span>
                        </button>
                    </div>
                    {/* TODO: fix this className */}
                    <div
                        className={`${isNavCollapsed ? '' : 'show'} navbar-collapse`}
                        id='navbarNav'
                    >
                        <ul>
                            <li>
                                <Link
                                    className={`nav-link ${
                                        path === '/about' ? 'active' : 'text-dark'
                                    }`}
                                    to='/about'
                                >
                                    About us
                                </Link>
                            </li>
                        </ul>
                        <ul>
                            {Auth.loggedIn() && username !== '' ? (
                                <>
                                    <li>
                                        <Link
                                            className={`nav-link ${path.startsWith('/dashboard')
                                                ? 'active'
                                                : 'text-dark'
                                            }`}
                                            to={`/dashboard/${username}`}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className={`nav-link ${path === '/user-profile'
                                                ? 'active'
                                                : 'text-dark'
                                            }`}
                                            to='/user-profile'
                                        >
                                            {username}&apos;s profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/" onClick={logout}>
                                            Logout
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                path !== '/' && (
                                    <li>
                                        <Link
                                            className={`nav-link ${path === '/' ? 'active' : 'text-dark'}`}
                                            to='/'
                                        >
                                            Login
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
// ============================================================

// Export the Header component
// ============================================================
export default Header;
// ============================================================