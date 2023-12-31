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
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import Contact from './pages/Contact';
import Donations from './pages/Donations';
import Success from './pages/Success';
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

            {
                path: '/user-profile',
                element: <Profile />
            },

            {
                path: '/contact',
                element: <Contact />
            },

            {
                path: '/donations',
                element: <Donations />
            },

            {
                path: '/success',
                element: <Success />
            },

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
    <RouterProvider router={router} />
);
// ============================================================
