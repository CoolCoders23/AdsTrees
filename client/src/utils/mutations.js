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

// Add a new Purchase
// ================================================================
export const ADD_PURCHASE = gql`
  mutation addPurchase($donations: [ID]!) {
    addPurchase(donations: $donations) {
      _id
      purchaseDate
      purchaseStatus
      donations {
        _id
        donationType
        description
        donationAmount
        price
      }
    }
  }
`;
// ================================================================

// Update a Purchase
// ================================================================
export const UPDATE_PURCHASE = gql`
  mutation updatePurchase($purchaseId: ID!, $purchaseStatus: String!) {
    updatePurchase(purchaseId: $purchaseId, purchaseStatus: $purchaseStatus) {
      _id
      purchaseStatus
    }
  }
`;
// ================================================================