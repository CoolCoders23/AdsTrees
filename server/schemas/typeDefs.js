// Desc: This file contains the graphql typeDefs for the AdsTrees application.
// ==================================================================
​
// Define the graphql typeDefs
// ==================================================================
const typeDefs = `
​
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
​
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
​
  type User {
    _id: ID!
    username: String!
    email: String! @cacheControl(maxAge: 0, scope: PRIVATE)
    password: String! @cacheControl(maxAge: 0, scope: PRIVATE)
    preferences: [Preference] @cacheControl(maxAge: 60, scope: PRIVATE)
  }
​
  type Auth @cacheControl(maxAge: 0, scope: PRIVATE) {
    token: ID!
    user: User
  }
​
  type Query {
    users: [User]
    user(username: String!): User @cacheControl(maxAge: 40, scope: PRIVATE)
  }
​
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth @cacheControl(maxAge: 0, scope: PRIVATE)
    login(email: String!, password: String!): Auth @cacheControl(maxAge: 0, scope: PRIVATE)
  }
​
`;
// ==================================================================
​
// Export the typeDefs
// ==================================================================
module.exports = typeDefs;
// ==================================================================