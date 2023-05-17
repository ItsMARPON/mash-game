const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String 
    categories: [Category]!
}
type Category {
    _id: ID
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
    users: [User]
    user(username: String!): User
    me: User
    categories(username: String!): [Category]
    category(categoryId: ID!): Category
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addResult(mash: String!, partner: String!, kids: Int!, career: String!, salary: Int!, transportation: String!, death: String!, deathAge: Int!)
    removeResult(categoryId: ID!): Category
}

`;

module.exports = typeDefs;