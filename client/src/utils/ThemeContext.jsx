/* eslint-disable react/prop-types */
// Desc: This file contains the Theme Provider component which
// is used to provide the theme to the child components
// Used the following as a reference:
// https://chakra-ui.com/getting-started/cra-guide#chakraprovider-props
// https://chakra-ui.com/docs/styled-system/color-mode
// ============================================================

// Importing libraries and packages
// ============================================================
import { createContext, useState } from 'react';
import {
    ChakraProvider,
    ColorModeScript,
    extendTheme
} from '@chakra-ui/react';
// ============================================================

// Import the custom theme
// ============================================================
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

    const config = {
        initialColorMode: darkTheme ? 'dark' : 'light',
        useSystemColorMode: false,
    };

    const customTheme = extendTheme({ ...theme, config });

    return (
    // Providing Dark theme and toggle theme to the child components
        <ThemeContext.Provider value={{ darkTheme, toggleTheme, theme: customTheme }}>
            <ChakraProvider theme={customTheme}>
                <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
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
