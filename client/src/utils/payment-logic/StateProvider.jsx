/* eslint-disable no-unused-vars */
// Desc: This file contains the global state for the application
// ========================================================

// Import Dependencies
// ========================================================
import React, { useReducer } from 'react';
import StateContext from './StateContext';
import { reducer } from './reducers';
// ========================================================

// Deconstruct Provider from Context
// ========================================================
const { Provider } = StateContext;
// ========================================================

// Create the Provider
// ========================================================
const StateProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer (reducer, {
        donations: [],
        cart: [],
        cartOpen: false,
    });

    return <Provider value={[state, dispatch]} {...props} />;
};
// ========================================================

// Export the Provider
// ========================================================
export default StateProvider;
// ========================================================
