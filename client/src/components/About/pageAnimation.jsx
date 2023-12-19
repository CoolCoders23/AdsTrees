// Desc: This file contains the page animation component
// Used the following documentations as reference:
// https://www.framer.com/motion/component/
// =====================================================

// Import dependencies
// =====================================================
import { motion } from 'framer-motion';
// =====================================================

// PageAnimation Component
// =====================================================
const PageAnimation = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            {children}
        </motion.div>
    );
};
// =====================================================

// Exports
// =====================================================
export default PageAnimation;
// =====================================================