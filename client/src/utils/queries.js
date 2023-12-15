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
      preferences
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
      preferences
  }
`;
// ================================================================