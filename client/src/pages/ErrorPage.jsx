// Desc: Error page for when a route fails to load
// ============================================================

// Importing libraries and packages
// ============================================================
import { useRouteError } from 'react-router-dom';
// ============================================================

// Create ErrorPage component
// ============================================================
const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" style={{ padding: '50px', textAlign: 'center' }}>
            <h1 style={{ color: 'red' }}>Oops! Something went wrong.</h1>
            <p style={{ fontSize: '20px' }}>
                We&apos;re sorry for the inconvenience. An unexpected error has occurred.
            </p>
            <p style={{ color: 'gray' }}>
                <i>{error.statusText || error.message}</i>
            </p>
            <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
    );
};
// ============================================================

// Export ErrorPage component
// ============================================================
export default ErrorPage;
// ============================================================