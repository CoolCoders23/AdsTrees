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
  mutation addUser(
    $username: String!,
    $email: String!,
    $password: String!)
    {
    addUser(
      username: $username,
      email: $email,
      password: $password
      )
    {
      token
      user {
        _id
        username
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
  mutation updateUser(
    $userId: ID!,
    $username: String,
    $email: String,
    $password: String,
    $profilePicture: ImageInput,) {
    updateUser(
      userId: $userId,
      username: $username,
      email: $email,
      password: $password,
      profilePicture: $profilePicture,)
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