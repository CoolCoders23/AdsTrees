// Desc: This file contains the logic for the client queries
// =================================================================

// Importing the necessary packages
// ================================================================
import { gql } from '@apollo/client';
// ================================================================

// To query the user's preferences
// ================================================================
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      profilePicture {
        url
        altText
      }
      totalDonations
      preferences
      purchases {
        _id
        purchaseDate
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
  }
`;
// ================================================================

// To query userProfile
// ================================================================
export const QUERY_USER_PROFILE = gql`
  query userProfile {
    userProfile {
      _id
      username
      email
      profilePicture {
        url
        altText
      }
      totalDonations
      preferences
      purchases {
        _id
        purchaseDate
        donations {
          _id
          donationType
          description
          image
          donationAmount
          price
        }
      }
      totalDonations
    }
  }
`;
// ================================================================

// To query the user's donations
// ================================================================
export const QUERY_DONATIONS = gql`
  query getDonations {
    donations {
      _id
      donationType
      description
      image
      donationAmount
      price
    }
  }
`;
// ================================================================

// To query the user's purchases
// ================================================================
export const QUERY_PURCHASES = gql`
  query getPurchases ($userId: ID!) {
    purchases (userId: $userId) {
      _id
      purchaseDate
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

// To query a single purchase
// ================================================================
export const QUERY_PURCHASE = gql`
  query getSinglePurchase($_id: ID!) {
    purchase(_id: $_id) {
      _id
      purchaseDate
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

// To query the checkout session
// ================================================================
export const QUERY_CHECKOUT = gql`
  query getCheckout($donations: [DonationInput]) {
    checkout(donations: $donations) {
      session
    }
  }
`;
// ================================================================