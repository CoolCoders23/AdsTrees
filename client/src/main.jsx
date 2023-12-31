//Desc: Entry point of the app
// ============================================================

// Importing libraries
// ============================================================
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register'; // Import PWA registration
// ============================================================

// Importing components
// ============================================================
import App from './App.jsx';
// import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage';
import ThemeProvider from './utils/theme/ThemeContext.jsx';
import Contact from './pages/Contact';
import Donations from './pages/Donations';
import Success from './pages/Success';
// ============================================================

// Register Service Worker for PWA
// ============================================================
const updateSW = registerSW({
    onNeedRefresh() {
        updateSW();
    },
    onOfflineReady() {},
});
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
                path: '/about',
                element: <About />
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
    <ThemeProvider>
        <RouterProvider router={router} />
    </ThemeProvider>
);
// ============================================================
