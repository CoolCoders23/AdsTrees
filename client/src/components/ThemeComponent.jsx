// Decs: This file contains the Theme component which is
// used to toggle between light and dark mode
// ==========================================================

// Import the custom hook
// ==========================================================
import { useTheme } from '../utils/useTheme';
// ==========================================================
// TODO: Check the button functionality

// Make the ThemeComponent
// ==========================================================
const ThemeComponent = () => {

    // Pluck values from ThemeContext
    const { darkTheme, toggleTheme } = useTheme();

    const themeStyles = {
        background: darkTheme
            ? '-webkit-linear-gradient(top left, #150C17, #535353)'
            : '-webkit-linear-gradient(bottom, #FFFFFF, #EDBAAB)',
        padding: '10rem',
        margin: '10rem',
        borderRadius: '30px',
        color: darkTheme ? '#FAFAFA' : '#363537',
    };

    return (
        <>
            <button id="button" onClick={toggleTheme} className="btn" type="button">
                Toggle dark theme
            </button>
            <section className="text-center">
                The current value of{' '}
                <code style={{ fontWeight: 'bold' }}>
                    darkTheme: {darkTheme.toString()}
                </code>
            </section>
            <button
                type='button'
                onClick={() => {
                    const body = document.querySelector('body');
                    body.classList.toggle('dark-mode');
                }}
            >
                <i className='fas fa-moon'></i>
            </button>
            <div style={themeStyles}>
                <h1>Theme Component</h1>
            </div>
        </>
    );
};
// ==========================================================

// Export our ThemeComponent as the default export
// ==========================================================
export default ThemeComponent;
// ==========================================================