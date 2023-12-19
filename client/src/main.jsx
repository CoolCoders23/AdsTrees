//Desc: Entry point of the app
// ============================================================

// Importing libraries
// ============================================================
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// ============================================================

// Importing components
// ============================================================
import App from './App.jsx';
// import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
// import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';

// import ContactUs from './pages/ContactUs';
import ThemeProvider from './utils/ThemeContext';

import Contact from './pages/Contact';
// ============================================================

// Importing styles
// ============================================================
import './styles.css';
import './vars.css';

// ============================================================

// Create a browser router
// ============================================================
const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
            // {
            //     path: '/dashboard/:username',
            //     element: <Dashboard />
            // },
            // {
            //     path: '/user-profile',
            //     element: <Profile />
            // },
            {
                path: '/about',
                element: <About />
            },

            {
                path: '/contact',
                element: <Contact />
            }

        ]
    },
];

const router = createBrowserRouter(routes );
// ============================================================

// Create a root
// ============================================================
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
// ============================================================

// Render the app
// ============================================================
root.render(
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
);
// ============================================================
