// Desc: This file contains the useTheme hook which is used to access the theme context
// =================================================

// Import dependencies
// =================================================
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
// =================================================

// useTheme hook
// =================================================
export const useTheme = () => useContext(ThemeContext);
// =================================================