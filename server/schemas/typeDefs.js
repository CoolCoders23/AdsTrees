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
    purchases: [Purchase] @cacheControl(maxAge: 60)
    ads: [Ad] @cacheControl(maxAge: 60)
    totalDonations: Int @cacheControl(maxAge: 60)
    totalWatched: Int @cacheControl(maxAge: 60)
    totalTreesPlanted: Int @cacheControl(maxAge: 60)
    watchedToday: Int @cacheControl(maxAge: 60)
    watchedInWeek: Int @cacheControl(maxAge: 60)
    watchedInMonth: Int @cacheControl(maxAge: 60)
    treesPlantedInWeek: Int @cacheControl(maxAge: 60)
    treesPlantedInYear: Int @cacheControl(maxAge: 60)
    bestWeek: Int @cacheControl(maxAge: 60)
    lastWatchedWeek: String @cacheControl(maxAge: 60)
    lastWatchedMonth: String @cacheControl(maxAge: 60)
    lastWatchedYear: String @cacheControl(maxAge: 60)
  }

  type Auth @cacheControl(maxAge: 0, scope: PRIVATE) {
    token: ID!
    user: User
  }

  type Checkout {
    clientSecret: String
  }

  type GetStripeClientKey {
    stripeClientKey: String
  }

  type Purchase @cacheControl(maxAge: 60) {
    _id: ID!
    purchaseDate: String
    paymentIntent: String
    donations: [Donation]
  }

  type Ad {
    _id: ID!
    title: String
    watched: Boolean
    duration: Int!
    date: String!
  }

  type Youtube {
    _id: ID!
    title: String
    url: String!
    duration: Int!
  }

  type Donation @cacheControl(maxAge: 60) {
    _id: ID!
    donationType: String
    description: String
    image: String
    donationAmount: Int
    price: Float
  }

  type Image {
    url: String
    altText: String
  }

  input ImageInput {
    url: String!
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

  input DonationInput {
    _id: ID!
    donationType: String!
    description: String
    image: String
    donationAmount: Int!
    price: Float!
  }

  input AdInput {
    _id: ID
    title: String
    watched: Boolean!
    duration: Int!
    date: String!
  }

  type Query {
    
    user(username: String!): User
    userProfile: User
      @cacheControl(scope: PRIVATE)
    donations: [Donation]
      @cacheControl(scope: PUBLIC)
    purchases(userId: ID!): [Purchase]
      @cacheControl(scope: PUBLIC)
    purchase(_id: ID!): Purchase
      @cacheControl(scope: PUBLIC)
    checkout(donations: [DonationInput]): Checkout
      @cacheControl(scope: PRIVATE)
    getStripeClientKey: GetStripeClientKey
      @cacheControl(scope: PRIVATE)
    ads: [Ad]
      @cacheControl(scope: PUBLIC)
    youtube: [Youtube]
      @cacheControl(scope: PUBLIC)

  }

  type Mutation {

    addUser( user: UserInput! ): Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)
    login(email: String!,password: String!): Auth
      @cacheControl(maxAge: 0, scope: PRIVATE)
    removeUser(userId: ID!): User
    updateUser(user: UpdateUserInput): User
      @cacheControl(maxAge: 0, scope: PRIVATE)
    addPurchase(donations: [ID]!): Purchase
      @cacheControl(scope: PRIVATE)
    addWatchedAd(ad: AdInput!): Ad
      @cacheControl(scope: PRIVATE)

  }

`;
// ==================================================================

// Export the typeDefs
// ==================================================================
module.exports = typeDefs;
// ==================================================================