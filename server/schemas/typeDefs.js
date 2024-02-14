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
    lastWatchedDay: String @cacheControl(maxAge: 60)
    lastWatchedWeek: String @cacheControl(maxAge: 60)
    lastWatchedMonth: String @cacheControl(maxAge: 60)
    lastWatchedYear: String @cacheControl(maxAge: 60)
  }

  type Auth @cacheControl(maxAge: 0, scope: PRIVATE) {
    token: ID!
    user: User
  }

  type Checkout @cacheControl(maxAge: 0) {
    clientSecret: String
  }

  type GetStripeClientKey @cacheControl(maxAge: 0) {
    stripeClientKey: String
  }

  type StripePaymentIntent @cacheControl(maxAge: 60) {
    id: String
    status: String
  }

  type Purchase @cacheControl(maxAge: 60) {
    _id: ID!
    purchaseDate: String
    paymentIntent: String
    paymentStatus: String
    donations: UserDonation
  }

  type UserDonation @cacheControl(maxAge: 60) {
    donationType: String!
    description: String
    image: String
    donationAmount: Int!
    price: Float!
  }

  enum DonationType {
    Garden
    Wood
    Forest
  }

  enum DonationAmount {
    ONE
    TEN
    HUNDRED
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
    getStripeClientKey: GetStripeClientKey
      @cacheControl(scope: PRIVATE)
    getStripePaymentIntent: StripePaymentIntent
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
    addCheckout(donations: [DonationInput]): Checkout
      @cacheControl(scope: PRIVATE)
    addPurchase(
      donations: [ID]!,
      status: String,
      paymentId: String
      ): Purchase
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