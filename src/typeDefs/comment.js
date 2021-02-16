import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getComment(id: ID!): Comment!
    getComments: [Comment]!
  }

  extend type Mutation {
    createComment(body: String!, replyUser: ID, postID: ID!): CreateCommentResponse! @auth
    removeComment(id: ID!): RemoveCommentResponse! @auth
  }

  type CreateCommentResponse {
    ok: Boolean!
    comment: Comment
    errors: [Error]
  }

  type RemoveCommentResponse {
    ok: Boolean!
    errors: [Error]
  }

  type Comment {
    id: ID!
    body: String!
    author: User!
    replyUser: User
    votes: [Vote]
    post: Post!
    createdAt: String!
  }
`;
