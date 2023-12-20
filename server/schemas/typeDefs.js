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
    url: String
    altText: String
  }

  input ImageInput {
    url: String
    altText: String
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    _id: ID!
    username: String
    email: String
    password: String
    profilePicture: ImageInput
  }

  type Query {
    users: [User]
    user(username: String!): User
    userProfile: User @cacheControl(scope: PRIVATE)
  }

  type Mutation {

    addUser( user: UserInput! ): Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)

    login(email: String!,password: String!): Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)

    removeUser(userId: ID!): User

    updateUser(user: UpdateUserInput): Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)
  }

`;
// ==================================================================

// Export the typeDefs
// ==================================================================
module.exports = typeDefs;
// ==================================================================