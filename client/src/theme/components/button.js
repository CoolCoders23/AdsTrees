// Desc: This file contains the Component style
// overrides for the Button component
// ============================================================

// Import Style Overrides
// ============================================================
import { mode } from '@chakra-ui/theme-tools';
// ============================================================

// Define Overrides
// ============================================================
const Button = {

    baseStyle: {

        fontFamily: 'heading',
        fontWeight: 'semibold',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'left',
        gap: '8px',
        cursor: 'pointer',
        _focus: {
            boxShadow: 'none',
            outline: 'none',
        },
        _hover: {
            boxShadow: 'none',
            outline: 'none',
        },

    },

    sizes: {
        sm: {
            fontSize: 'sm',
            px: '16 !important',
            py: '0 !important',
        },
        md: {
            fontSize: 'md',
            px: '20 !important',
            py: '0 !important',
        },
        lg: {
            fontSize: 'lg',
            px: '24px !important',
            py:'0 !important',
        }
    },

    variants: {
        'dashboard': props => ({
            bg: mode('light.buttonBgColor', 'dark.buttonBgColor')(props),
            color: mode('light.buttonText', 'dark.buttonText')(props),
            boxShadow: '0px 2px 5px 3px rgba(45, 106, 79, 0.4)',
            flex: 1,
            minHeight: '59px',
            lineHeight: '1.2',
            _hover: {
                bg: mode('light.buttonBgColorHover', 'dark.buttonBgColorHover')(props),
            },
        }),
        'next': props => ({
            bg: mode('light.buttonBgColor', 'dark.buttonBgColor')(props),
            color: mode('light.buttonText', 'dark.buttonText')(props),
            boxShadow: '0px 2px 5px 3px rgba(45, 106, 79, 0.4)',
            minHeight: '59px',
            flexShrink: 0,
            _hover: {
                bg: mode('light.buttonBgColorHover', 'dark.buttonBgColorHover')(props),
            },
        }),
        solid: props => ({
            bg: mode('light.buttonBgColor', 'dark.buttonBgColor')(props),
            color: mode('light.buttonText', 'dark.buttonText')(props),
            boxShadow: '0px 2px 5px 3px rgba(45, 106, 79, 0.4)',
            minHeight: '48px',
            alignSelf: 'stretch',
            flexShrink: 0,
            _hover: {
                bg: mode('light.buttonBgColorHover', 'dark.buttonBgColorHover')(props),
            },
        }),

    },
    // The default size and variant values
    defaultProps: {
        size: 'lg',
        variant: 'solid',
        colorScheme: 'green',
    },
};
// ============================================================

// Export Overrides
// ============================================================
export default Button;
// ============================================================