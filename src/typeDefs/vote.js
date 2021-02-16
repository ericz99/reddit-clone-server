import { gql } from 'apollo-server-express';

export default gql`
  extend type Mutation {
    upvotePost(postID: ID!): VoidResponse! @auth
    downVotePost(postID: ID!): VoidResponse! @auth
    upvoteComment(commentID: ID!): VoidResponse! @auth
    downVoteComment(commentID: ID!): VoidResponse! @auth
  }

  type VoidResponse {
    ok: Boolean!
    errors: [Error]
  }

  type Vote {
    id: ID!
    user: User
    post: Post
    comment: Comment
  }
`;
