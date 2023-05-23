import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GAME_RESULT = gql`
  mutation addGameResult($newSavedResults: InputData!) {
    addGameResult(newSavedResults: $newSavedResults) {
      _id
      username
      email
      savedResults {
        _id
        mash
        partner
        kids
        career
        salary
        transportation
        death
        deathAge
      }
    }
  }
`;

export const REMOVE_GAME_RESULT = gql`
  mutation removeGameResult($idToRemove: ID!) {
    removeGameResult(id: $idToRemove) {
      _id
      username
      email
      savedResults {
        _id
        mash
        partner
        kids
        career
        salary
        transportation
        death
        deathAge
      }
    }
  }
`;

export const UPDATE_USERNAME = gql`
  mutation updateUsername($username: String!) {
    updateUsername(username: $username) {
      _id
      username
      email
      password
      savedResults{
        _id
        mash
        partner
        kids
        career
        salary
        transportation
        death
        deathAge
      }
    }
  }
`;
