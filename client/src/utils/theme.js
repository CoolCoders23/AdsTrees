// Desc: This file acts as the theme configuration file for the app
// Used the following as a reference:
// https://chakra-ui.com/docs/styled-system/customize-theme
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
        mainlogofont: {
            'font-size': '24px',
            'font-family': 'Montserrat',
            'font-weight': 400,
            'letter-spacing': '0em',
        },
        menuitemfont: {
            'font-size': '14px',
            'font-family': 'Poppins',
            'font-weight': 500,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        donatestepperfont: {
            'font-size': '14px',
            'font-family': 'Poppins',
            'font-weight': 500,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        h1font: {
            'font-size': '32px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0px',
            'line-height': '36px',
        },
        subtitlefont: {
            'font-size': '16px',
            'font-family': 'Roboto',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '20px',
        },
        donateswitchfont: {
            'font-size': '18px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '22px',
        },
        donatecardtypefont: {
            'font-size': '18px',
            'font-family': 'Poppins',
            'font-weight': 500,
            'letter-spacing': '0em',
            'line-height': '22px',
        },
        donatecardtypesubtitlefont: {
            'font-size': '32px',
            'font-family': 'Roboto',
            'font-weight': 700,
            'letter-spacing': '0px',
            'line-height': '36px',
        },
        bodyfont: {
            'font-size': '18px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '22px',
        },
        pricetagfont: {
            'font-size': '48px',
            'font-family': 'Roboto',
            'font-weight': 700,
            'letter-spacing': '0px',
            'line-height': '52px',
        },
        buttonlabelfont: {
            'font-size': '18px',
            'font-family': 'Poppins',
            'font-weight': 600,
            'letter-spacing': '0em',
            'line-height': '22px',
        },
        footerfont: {
            'font-size': '14px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        videotitle: {
            'font-size': '24px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '100%',
        },
        statslabel: {
            'font-size': '14px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        statsfigure: {
            'font-size': '24px',
            'font-family': 'Roboto',
            'font-weight': 600,
            'letter-spacing': '0em',
            'line-height': '32px',
        },
        paymenttitlefont: {
            'font-size': '14px',
            'font-family': 'Poppins',
            'font-weight': 500,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        smallbodyfont: {
            'font-size': '14px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        paymentinputlabel: {
            'font-size': '14px',
            'font-family': 'Roboto',
            'font-weight': 500,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        mottofont: {
            'font-size': '24px',
            'font-family': 'Poppins',
            'font-weight': 500,
            'letter-spacing': '0em',
        },
        linksmallfont: {
            'font-size': '14px',
            'font-family': 'Poppins',
            'font-weight': 500,
            'letter-spacing': '0em',
            'line-height': '18px',
        },
        linkmediumfont: {
            'font-size': '16px',
            'font-family': 'Poppins',
            'font-weight': 600,
            'letter-spacing': '0em',
        },
        filterchipfont: {
            'font-size': '14px',
            'font-family': 'Roboto',
            'font-weight': 500,
            'letter-spacing': '0.10000000149011612px',
            'line-height': '18px',
        },
        modaltitle: {
            'font-size': '20px',
            'font-family': 'Poppins',
            'font-weight': 400,
            'letter-spacing': '0em',
            'line-height': '24px',
        },
        modalsubtitle: {
            'font-size': '16px',
            'font-family': 'Poppins',
            'font-weight': 500,
            'letter-spacing': '0em',
        },
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
            red: '#cf3535',
            blue: '#4285f4',
            greenMidDark: '#415d43',
            greyDark: '#49454f',
            greenDarkTransparent: 'rgba(27, 67, 50, 0.10)',
            purple: '#9747ff',
            stepperGreen: '#081C15',
            tag: '#33C481',
            constantDarkGreen: '#081C15',
            videoCover: '#D6D7D6',
            constantWhitePure: '#FFFFFF',
            cardsMainColor: '081C15',
            cardsWhite: 'FFFFFF',
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
            red: '#f53636',
            blue: '#73a5f8',
            greenMidDark: '#72bc77',
            greyDark: '#f1f0f3',
            greenDarkTransparent: 'rgba(116, 222, 177, 0.10)',
            purple: '#af72ff',
            stepperGreen: '#9DFFCE',
            tag: '#D0FFD7',
            constantDarkGreen: '#081C15',
            videoCover: '#24342F',
            constantWhitePure: '#FFFFFF',
            cardsMainColor: 'F4FBF9',
            cardsWhite: '081C15',
        },
    },
    shadows: {
        dropShadowButtons: '0px 4px 61px 0px rgba(45, 106, 79, 0.40)',
    },
    components: {
        button: {
            // The styles all button have in common
            baseStyle: {
                fontWeight: 'semibold',
            },
            // The variant and colorScheme options
            variants: {
                solid: (props) => ({
                    bg: props.colorMode === 'dark' ? 'dark.purple' : 'light.greenMedium',
                    color: 'white',
                    _hover: {
                        bg: props.colorMode === 'dark' ? 'dark.purple' : 'light.greenDark',
                    },
                }),
                outline: (props) => ({
                    color: props.colorMode === 'dark' ? 'dark.greenMedium' : 'light.greenMedium',
                    border: '1px solid',
                    borderColor: props.colorMode === 'dark' ? 'dark.greenMedium' : 'light.greenMedium',
                    _hover: {
                        bg: props.colorMode === 'dark' ? 'dark.greenDark' : 'light.greenDark',
                        color: 'white',
                    },
                }),
            },
            defaultProps: {
                colorScheme: 'teal',
                variant: 'solid',
                size: 'md',
            },
        },
    },
});
// ============================================================

// Export the theme object
// ============================================================
export default theme;
// ============================================================