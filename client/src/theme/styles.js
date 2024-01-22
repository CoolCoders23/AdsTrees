// Desc: This file contains the global style overrides
// ============================================================

// Import Style Overrides
// ============================================================
import { mode } from '@chakra-ui/theme-tools';
// ============================================================

// Define Overrides
// ============================================================
const styles = {
    global: (props) => ({
        body: {
            color: mode('light.text', 'dark.text')(props),
            bg: mode('light.primary', 'dark.primary')(props),
        },
        a: {
            textDecoration: 'none',
        },
        'input': {
            color: mode('light.inputText', 'dark.inputText')(props),
        },
        'input::placeholder': {
            color: mode('light.inputText', 'dark.inputText')(props),
        },
        'input:-ms-input-placeholder': {
            color: mode('light.inputText', 'dark.inputText')(props),
        },
        'button div, button span, button p, button': {
            color: mode('light.buttonText', 'dark.buttonText')(props),
        },
        '.error': {
            color: mode('light.errorText', 'dark.errorText')(props),
        },
        'textarea': {
            color: mode('light.inputText', 'dark.inputText')(props),
        },
    }),
};
// ============================================================

// Export Overrides
// ============================================================
export default styles;
// ============================================================