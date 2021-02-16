import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getCommunity(name: String!): Community!
    getCommunities: [Community]!
  }

  extend type Mutation {
    createCommunity(name: String!, title: String!, description: String): CreateCommunityResponse!
      @auth
    removeCommunity(id: ID!): RemoveCommunityResponse! @auth
    joinCommunity(id: ID!): VoidResponse @auth
    leaveCommunity(id: ID!): VoidResponse @auth
  }

  type CreateCommunityResponse {
    ok: Boolean!
    community: Community
    errors: [Error]
  }

  type RemoveCommunityResponse {
    ok: Boolean!
    errors: [Error]
  }

  type Community {
    id: ID!
    name: String!
    title: String!
    description: String
    admins: [User]!
    posts: [Post]!
    users: [User]!
    createdAt: String!
  }
`;
