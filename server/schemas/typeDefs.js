const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    password: String!
    savedResults: [resultData]
}

type resultData {
    _id: ID!
    mash: String!
    partner: String!
    kids: Int!
    career: String!
    salary: Int!
    transportation: String!
    death: String!
    deathAge: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

input InputData {
    mash: String!
    partner: String!
    kids: Int!
    career: String!
    salary: Int!
    transportation: String!
    death: String!
    deathAge: Int!
}

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGameResults(newSavedResults: InputData): User
    removeGameResults(_id: ID!): User
    updateUsername(username: String!): User
}
`;

module.exports = typeDefs;
