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
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('white', 'gray.800')(props),
        },
        a: {
            color: 'teal.500',
            _hover: {
                textDecoration: 'underline',
            },
        },
    }),
};
// ============================================================

// Export Overrides
// ============================================================
export default styles;
// ============================================================