// Desc: This file acts as the theme configuration file for the app
// ============================================================

// Import the extendTheme function
// ============================================================
import { extendTheme } from '@chakra-ui/react';
// ============================================================

// Define the theme object to be used in the app
// ============================================================
const theme = extendTheme({
    fonts: {
        body: 'Roboto, system-ui, sans-serif',
        heading: 'Poppins, Georgia, serif',
        mono: 'Rubik Doodle Triangles, monospace',
        coolTitle: 'Rubik Lines, monospace',
    },
    colors: {
        light: {
            orange: '#f5a61d',
            greenLight: '#d8f3dc',
            greenMedium: '#1b4332',
            greenDark: '#081c15',
            greenFlashy: '#9dffce',
            greenPop: '#33c481',
            pureWhite: '#ffffff',
            brown: '#6d4c41',
            greyLight: '#f7f9fb',
            greyIntermediate: '#d9d9d9',
            yellow: '#ffdc5f',
            red: '#f15e2b',
            blue: '#4285f4',
            greenMidDark: '#415d43',
            greyDark: '#49454f',
            greenDarkTransparent: 'rgba(27, 67, 50, 0.10)',
            purple: '#9747ff',
        },
        dark: {
            orange: '#ffc662',
            greenLight: '#d0ffd7',
            greenMedium: '#269063',
            greenDark: '#e8f5f1',
            greenFlashy: '#9dffce',
            greenPop: '#33c481',
            whitePure: '#081c15',
            brown: '#e29d86',
            greyLight: 'rgba(180, 180, 180, 0.16)',
            greyIntermediate: '#d9d9d9',
            yellow: '#ffe999',
            red: '#ff6a36',
            blue: '#73a5f8',
            greenMidDark: '#72bc77',
            greyDark: '#f1f0f3',
            greenDarkTransparent: 'rgba(116, 222, 177, 0.10)',
            purple: '#af72ff',
        },
    },
    shadows: {
        dropShadowButtons: '0px 4px 61px 0px rgba(45, 106, 79, 0.40)',
    },
});
// ============================================================

// Export the theme object
// ============================================================
export default theme;
// ============================================================