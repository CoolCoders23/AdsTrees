// Desc: This file contains the custom hook for the global state
// ========================================================

// Import Dependencies
// ========================================================
import { useContext } from 'react';
import StateContext from './StateContext';
// ========================================================

// Create the custom hook
// ========================================================
const useStateContext = () => {
    return useContext(StateContext);
};
// ========================================================

// Export the Provider and custom hook
// ========================================================
export default useStateContext;
// ========================================================
