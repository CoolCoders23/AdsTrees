/* eslint-disable react/prop-types */
// Desc: This file contains the Theme Provider component which
// is used to provide the theme to the child components
// Used the following as a reference:
// https://chakra-ui.com/getting-started/cra-guide#chakraprovider-props
// ============================================================

// Importing libraries and packages
// ============================================================
import { createContext, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
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
        return setDarkTheme((prev) => !prev);
    };

    return (
    // Providing Dark theme and toggle theme to the child components
        <ThemeContext.Provider value={{ darkTheme, toggleTheme, theme }}>
            <ChakraProvider theme={theme}>
                {children}
            </ChakraProvider>
        </ThemeContext.Provider>
    );
};
// ============================================================

// Exporting the ThemeProvider component as the default export
// ============================================================
export default ThemeProvider;
// ============================================================
