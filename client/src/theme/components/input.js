// Desc: This file contains the input component main style
// ============================================================

// Import mode from Chakra UI
// ============================================================
import { mode } from '@chakra-ui/theme-tools';
// ============================================================

// Define Overrides
// ============================================================
const Input = {

    variants: {
        outline: (props) => ({
            field: {
                color: mode('light.inputText', 'dark.inputText')(props),
                backgroundColor: mode('light.inputBackground', 'dark.inputBackground')(props),
                borderColor: mode('light.inputBorder', 'dark.inputBorder')(props),
                _placeholder: {
                    color: mode('light.inputText', 'dark.inputText')(props),
                },
                borderStyle: 'solid',
                borderWidth: '3px',
                borderRadius: '8px',
                _focus: {
                    borderColor: mode('light.inputFocusBorder', 'dark.inputFocusBorder')(props),
                    outline: 'none',
                    boxShadow: 'none',
                },
                _hover: {
                    borderColor: 'none',
                },
            },
        }),
        filled: (props) => ({
            field: {
                color: mode('light.inputText', 'dark.inputText')(props),
                backgroundColor: mode('light.inputBackground', 'dark.inputBackground')(props),
                borderColor: mode('light.inputBorder', 'dark.inputBorder')(props),
                _placeholder: {
                    color: mode('light.inputText', 'dark.inputText')(props),
                },
            },
        }),
    }

};
// ============================================================

// Export Overrides
// ============================================================
export default Input;
// ============================================================