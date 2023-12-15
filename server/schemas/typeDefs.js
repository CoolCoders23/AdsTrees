// Desc: This file contains the graphql typeDefs for the AdsTrees application.
// ==================================================================

// Define the graphql typeDefs
// ==================================================================
const typeDefs = `

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type User {
    _id: ID!
    username: String!
    email: String! @cacheControl(maxAge: 0, scope: PRIVATE)
    password: String! @cacheControl(maxAge: 0, scope: PRIVATE)
    preferences: [Preference] @cacheControl(maxAge: 60)
  }

  type Auth @cacheControl(maxAge: 0, scope: PRIVATE) {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth @cacheControl(maxAge: 0, scope: PRIVATE)
    login(email: String!, password: String!): Auth @cacheControl(maxAge: 0, scope: PRIVATE)
    removeUser(userId: ID!): User
    updateUser(username: String!, email: String!, password: String!): Auth @cacheControl(maxAge: 0, scope: PRIVATE)
  }

`;
// ==================================================================

// Export the typeDefs
// ==================================================================
module.exports = typeDefs;
// ==================================================================