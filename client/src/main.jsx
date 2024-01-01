/* eslint-disable react-hooks/exhaustive-deps */
//Desc: Entry point of the app
// ============================================================

// Importing libraries
// ============================================================
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Import PWA registration
import { registerSW } from 'virtual:pwa-register';
import {
    ChakraProvider,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button
} from '@chakra-ui/react';
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

// Main function
// ============================================================
const Main = () => {

    const [isRefreshModalOpen, setRefreshModalOpen] = useState(false);
    const [isOfflineModalOpen, setOfflineModalOpen] = useState(false);

    // Define updateSW function
    const updateSW = registerSW({
        onNeedRefresh() {
            setRefreshModalOpen(true);
        },
        onOfflineReady() {
            setOfflineModalOpen(true);
        },
    });

    useEffect(() => {
        updateSW();
    }, []);

    const handleRefresh = () => {
        updateSW().then(() => {
            window.location.reload();
        }).catch((error) => {
            console.error('Error updating service worker:', error);
        });
    };

    // Create a browser router
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

    const router = createBrowserRouter(routes);

    return (
        <ChakraProvider>
            <RouterProvider router={router} />

            {/* Refresh Modal */}
            <Modal isOpen={isRefreshModalOpen} onClose={() => setRefreshModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>New Content Available</ModalHeader>
                    <ModalBody>
                        New content is available. Do you want to refresh the page to see the new content?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleRefresh}>
                            Refresh
                        </Button>
                        <Button variant="ghost" onClick={() => setRefreshModalOpen(false)}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Offline Ready Modal */}
            <Modal isOpen={isOfflineModalOpen} onClose={() => setOfflineModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Offline Ready</ModalHeader>
                    <ModalBody>
                        The app is ready to work offline.
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={() => setOfflineModalOpen(false)}>OK</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};
// ============================================================

// Define the root element
// ============================================================
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
// ============================================================

// Render the app
// ============================================================
root.render(<Main />);
// ============================================================

export default Main;
