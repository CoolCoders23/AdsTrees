/* eslint-disable react/prop-types */
// Desc: This file contains the Theme Provider component which
// is used to provide the theme to the child components
// ============================================================

// Importing libraries and packages
// ============================================================
import { createContext, useState } from 'react';
// ============================================================

// Create theme context
// ============================================================
export const ThemeContext = createContext();
// ============================================================

// Creating theme provider
// ============================================================
const ThemeProvider = ({ children }) => {

    const [darkTheme, setDarkTheme] = useState(true);

    // Method to update the state
    const toggleTheme = () => {
        console.log('inside toggle theme');
        return setDarkTheme((prev) => !prev);
    };

    return (
    // Providing Dark theme and toggle theme to the child components
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
// ============================================================

// Exporting the ThemeProvider component as the default export
// ============================================================
export default ThemeProvider;
// ============================================================
