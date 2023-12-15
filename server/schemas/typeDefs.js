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
    profilePicture: Image @cacheControl(maxAge: 40)
    preferences: [String] @cacheControl(maxAge: 60)
  }

  type Auth @cacheControl(maxAge: 0, scope: PRIVATE) {
    token: ID!
    user: User
  }

  type Image {
    _id: ID!
    url: String
    altText: String
  }

  type Query {
    users: [User]
    user(username: String!): User
    userProfile: User @cacheControl(scope: PRIVATE)
  }

  type Mutation {
    addUser(
      username: String!,
      email: String!,
      password: String!):
      Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)
    login(
      email: String!,
      password: String!):
      Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)
    removeUser(userId: ID!): User
    updateUser(
      _id: ID!,
      username: String,
      email: String,
      password: String,
      profilePicture: String
      ):
      Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)
  }

`;
// ==================================================================

// Export the typeDefs
// ==================================================================
module.exports = typeDefs;
// ==================================================================