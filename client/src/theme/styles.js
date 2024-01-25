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
        header: {
            boxShadow: props.colorMode === 'light' ? '0px 1px 5px rgba(0, 0, 0, 0.1)' : '0px 1px 5px rgba(255, 255, 255, 0.1)',
        },
        '.footer': {
            boxShadow: props.colorMode === 'light' ? '0px 1px 5px rgba(0, 0, 0, 0.1)' : '0px 1px 5px rgba(255, 255, 255, 0.1)',
        },
        a: {
            textDecoration: 'none',
        },
        'textarea, .input-group2': {
            color: mode('light.inputText', 'dark.inputText')(props),
            backgroundColor: mode('light.inputBackground', 'dark.inputBackground')(props),
            borderColor: mode('light.inputBorder', 'dark.inputBorder')(props),
            borderStyle: 'solid',
            borderWidth: '2px',
            borderRadius: '10px',
            _focus: {
                outline: 'none',
                boxShadow: 'none',
                borderColor: mode('light.inputFocusBorder', 'dark.inputFocusBorder')(props),
            }
        },
        'button div, button span, button p, button': {
            color: mode('light.buttonText', 'dark.buttonText')(props),
        },
        '.error': {
            color: mode('light.errorText', 'dark.errorText')(props),
        },
    }),
};
// ============================================================

// Export Overrides
// ============================================================
export default styles;
// ============================================================