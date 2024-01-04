// Desc: this file is the entry point for the server
// ================================================================

// Import Dependencies
// ================================================================
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginCacheControl } = require('@apollo/server/plugin/cacheControl');
const responseCachePlugin = require('@apollo/server-plugin-response-cache').default;
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors'); // CORS middleware
require('dotenv').config();
const path = require('path');
// ================================================================


// Import local Dependencies
// ================================================================
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// ================================================================


// Define the PORT and server
// ================================================================
const PORT = process.env.PORT || 3001;
const app = express();
// ================================================================

// Configuring CORS options
// ================================================================
const corsOptions = {
    origin: function (origin, callback) {
        // Define allowed origins for production
        const whitelist = [
            'http://localhost:3000',
            'http://localhost:3001',
            'https://checkout.stripe.com/c/pay',
            'https://github.com/CoolCoders23/AdsTrees',
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://adstrees.onrender.com'
        ];
        if (!origin || whitelist.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};
// ================================================================

// Apply CORS middleware
// ================================================================
app.use(cors(corsOptions));
// ================================================================

// Create an instance of ApolloServer
// ================================================================
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 30 }),
        responseCachePlugin({
            sessionId: (requestContext) => requestContext.request.http.headers.get('session-id') || null,
        })
    ],
    context: authMiddleware, // Add authentication middleware to Apollo Server context
});
// ================================================================

// Define a function to start the Apollo Server
// ================================================================
const startApolloServer = async () => {
    try {
        await server.start();

        app.use(express.urlencoded({ extended: false }));
        app.use(express.json());

        app.use('/images', express.static(path.join(__dirname, '../client/public/images')));

        // Apply Apollo Middleware using expressMiddleware
        app.use('/graphql', expressMiddleware(server, {
            context: authMiddleware, // Add context
            cors: corsOptions, // Apply CORS options
        }));

        // Serve static files in production mode
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../client/dist')));
            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '../client/dist/index.html'));
            });
        }

        // Start listening on the defined PORT
        db.once('open', () => {
            app.listen(PORT, () => {
                console.log(`API server running on port ${PORT}!`);
                console.log(`GraphQL at http://localhost:${PORT}/graphql`);
            });
        });
        db.on('error', (error) => {
            throw new Error(`Database connection error: ${error}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
    }
};
// ================================================================

// Initializing the Apollo Server
// ================================================================
startApolloServer();
// ================================================================

// Exporting the Express app for use elsewhere in the project
// ================================================================
module.exports = app;
// ================================================================
