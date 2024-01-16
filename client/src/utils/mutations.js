// Desc: This file contains the logic for the client mutations
// =================================================================

// Importing the necessary packages
// ================================================================
import { gql } from '@apollo/client';
// ================================================================

// Login the User
// ================================================================
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
    {
      token
      user {
        _id
        username
        profilePicture{
          url
          altText
        }
      }
    }
  }
`;
// ================================================================

// Add a new User
// ================================================================
export const ADD_USER = gql`
  mutation addUser($user: UserInput!) {
    addUser(user: $user) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
// ================================================================

// Remove a User
// ================================================================
export const REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      user{
        _id
        username
      }
    }
  }
`;
// ================================================================

// Update a User
// ================================================================
export const UPDATE_USER = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      token
      user {
        _id
        username
        email
        profilePicture {
          url
          altText
        }
      }
    }
  }
`;
// ================================================================

// Add a new Checkout
// ================================================================
// To query the checkout session
// ================================================================
export const ADD_CHECKOUT = gql`
  mutation addCheckout($donations: [DonationInput]) {
    addCheckout(donations: $donations) {
      clientSecret
    }
  }
`;
// ================================================================

// Add a new Purchase
// ================================================================
export const ADD_PURCHASE = gql`
  mutation addPurchase(
    $donations: [ID]!,
    $status: String,
    $paymentId: String) {
    addPurchase(
      donations: $donations,
      status: $status,
      paymentId: $paymentId) {
      _id
      purchaseDate
      paymentIntent
      paymentStatus
      donations {
        _id
        donationType
        description
        image
        donationAmount
        price
      }
    }
  }
`;
// ================================================================

// Add Watched Ad
// ================================================================
export const ADD_WATCHED_AD = gql`
  mutation addWatchedAd($ad: AdInput!) {
    addWatchedAd(ad: $ad) {
      _id
      title
      watched
      duration
      date
    }
  }
`;
// ================================================================