// Desc: This file contains the main component of the app
// ============================================================

// Importing libraries and packages
// ============================================================
import './App.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    createHttpLink,
    from
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Outlet } from 'react-router-dom';
// ============================================================

// Importing components
// ============================================================
import Header from './components/Header';
import Footer from './components/Footer';
// ============================================================

// Import the custom hook
// ==========================================================
import { useTheme } from './utils/useTheme';
// ==========================================================

// Create an error link
// Used (https://www.apollographql.com/docs/react/get-started/#error-handling) as a reference
// ============================================================
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});
// ============================================================

// Construct main GraphQL API endpoint
// ============================================================
const httpLink = createHttpLink({
    uri: '/graphql',
});
// ============================================================

// Construct AuthLink to attach token to every request
// ============================================================
const authLink = setContext((_, { headers }) => {

    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('id_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});
// ============================================================

// Construct ApolloClient instance including the errorLink and authLink
// Also include the InMemoryCache instance and set credentials to include
// the cookie in every request to the server
// ============================================================
const client = new ApolloClient({
    link: from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache(),
    credentials: 'include',
});
// ============================================================

// Main App component
// ============================================================
function App() {

    // Pluck values from ThemeContext
    const { darkTheme, toggleTheme } = useTheme();

    const themeStyles = {
        background: darkTheme
            ? '-webkit-linear-gradient(top left, #150C17, #535353)'
            : '-webkit-linear-gradient(bottom, #FFFFFF, #EDBAAB)',
        padding: '10rem',
        margin: '10rem',
        borderRadius: '30px',
        color: darkTheme ? '#FAFAFA' : '#363537',
    };

    return (


        <ApolloProvider client={client}>
            <div style={themeStyles}>
                <Header />
                <button id="button" onClick={toggleTheme} className="btn" type="button">
                Toggle dark theme
                </button>
                <section className="text-center">
                The current value of{' '}
                    <code style={{ fontWeight: 'bold' }}>
                    darkTheme: {darkTheme.toString()}
                    </code>
                </section>
                <Outlet />
                <Footer />
            </div>
        </ApolloProvider>

    );
}
// ============================================================

// Exporting component
// ============================================================
export default App;
// ============================================================