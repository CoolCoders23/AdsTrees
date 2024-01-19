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
    // The styles all button have in common
    baseStyle: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderRadius: 'base',
        _focus: {
            boxShadow: 'none',
        },
    },
    // Two sizes: sm and md
    sizes: {
        sm: {
            fontSize: 'sm',
            px: 4,
            py: 3,
        },
        md: {
            fontSize: 'md',
            px: 6,
            py: 4,
        },
    },
    // Two variants: outline and solid
    variants: {
        'with-shadow': {
            // Make a responsive variant
            base: {
                bg: 'yellow.500',
                fontSize: 'md'
            },
            sm: {
                bg: 'teal.500',
                fontSize: 'lg'
            },
            md: {
                bg: 'orange.500',
                fontSize: 'xl'
            },
        },
        outline: {
            border: '2px solid',
            borderColor: 'primary',
            color: 'primary',
            _hover: {
                bg: 'primary',
                color: 'white',
            },
        },
        solid: props => ({
            bg: mode('primary', 'secondary')(props),
            color: mode('white', 'white')(props),
            _hover: {
                bg: mode('secondary', 'primary')(props),
                color: mode('white', 'white')(props),
            },
        }),
        // or:
        //solid: (props) => ({
        //  bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        //}),

    },
    // The default size and variant values
    defaultProps: {
        size: 'md',
        variant: 'solid',
        colorScheme: 'green', // default is gray
    },
};
// ============================================================

// Export Overrides
// ============================================================
export default Button;
// ============================================================