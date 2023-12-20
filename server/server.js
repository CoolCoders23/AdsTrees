// Desc: this file is the entry point for the server
// ================================================================
// TODO: Enable CORS for production mode

// import Dependencies
// ================================================================
const express = require('express');
const { ApolloServer } = require('@apollo/server');
// Importing the Apollo Server Plugin for Cache Control
const { ApolloServerPluginCacheControl } = require('@apollo/server/plugin/cacheControl');
const responseCachePlugin = require ('@apollo/server-plugin-response-cache').default;
const { expressMiddleware } = require('@apollo/server/express4');
// const cors = require('cors');
require('dotenv').config();
const path = require('path');
// ================================================================

// import local Dependencies
// ================================================================
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
// ================================================================

// Defining the PORT and server
// ================================================================
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
    // Setting up the Apollo Server Plugin for Cache
    // Control to set the default max age to 20 seconds
    // Used (https://www.apollographql.com/docs/apollo-server/performance/caching) as a reference
    plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 20 }),
        responseCachePlugin({
            sessionId: (requestContext) =>
                requestContext.request.http.headers.get('session-id') || null,
        })
    ],
});
// ================================================================

// Defining the whitelist for CORS
// ================================================================
// Add trusted origins here
// const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
// ================================================================

//Create a new instance of ApolloServer and pass it the imported schema data
// ================================================================
const startApolloServer = async () => {

    try{

        await server.start();

        express.urlencoded({ extended: false }),
        express.json(),

        app.use(
            '/graphql',
            // Used (https://www.apollographql.com/docs/apollo-server/security/cors/) as a reference
            // cors({
            //     origin: function (origin, callback) {
            //         if (!origin || whitelist.includes(origin)) {
            //             callback(null, true);
            //         } else {
            //             callback(new Error('Not allowed by CORS'));
            //         }
            //     },
            //     credentials: true
            // }),
            expressMiddleware(
                server,
                {context: authMiddleware}
            ),
        );

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, '../client/dist')));

            app.get('*', (req, res) => {
                res.sendFile(path.join(__dirname, '../client/dist/index.html'));
            });
        }

        db.once('open', () => {
            app.listen(PORT, () => {
                console.log(`API server running on port ${PORT}!`);
                console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
            });
        });
        db.on('error', (error) => {
            throw new Error(`Database connection error: ${error}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        if (error.stack) {
            console.error(error.stack);
        }
    }
};
// ================================================================

// Start the Apollo server
// ================================================================
startApolloServer();
// ================================================================