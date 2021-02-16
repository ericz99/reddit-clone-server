import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    me: User! @auth
  }

  extend type Mutation {
    registerAccount(userName: String!, email: String!, password: String!): RegisterResponse!
    loginAccount(email: String!, password: String!): LoginResponse!
  }

  type RegisterResponse {
    ok: Boolean!
    user: User
    errors: [Error]
  }

  type LoginResponse {
    ok: Boolean!
    accessToken: String
    refreshToken: String
    errors: [Error]
  }

  type User {
    id: ID!
    userName: String!
    email: String!
    createdAt: String!
  }
`;
