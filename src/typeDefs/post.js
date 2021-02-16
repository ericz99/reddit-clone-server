import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    getPost(id: ID!): Post!
    getPosts(name: String, offset: Int, limit: Int): PaginatePost!
    filterPost(searchVal: String!): FilterPostResponse!
  }

  extend type Mutation {
    createPost(title: String!, body: String, comName: String!): CreatePostResponse! @auth
    removePost(id: ID!): RemovePostResponse! @auth
    updatePost(id: ID!, body: String!): UpdatePostResponse!
  }

  type PaginatePost {
    docs: [Post]!
    totalDocs: Int
    offset: Int
    limit: Int
    totalPages: Int
    page: Int
    pagingCounter: Int
    hasPrevPage: Boolean
    hasNextPage: Boolean
    prevPage: Int
    nextPage: Int
  }

  type FilterPostResponse {
    ok: Boolean!
    posts: [Post]!
    errors: [Error]
  }

  type UpdatePostResponse {
    ok: Boolean!
    errors: [Error]
  }

  type CreatePostResponse {
    ok: Boolean!
    post: Post
    errors: [Error]
  }

  type RemovePostResponse {
    ok: Boolean!
    errors: [Error]
  }

  type Post {
    id: ID!
    title: String!
    body: String
    community: Community!
    comments: [Comment]
    author: User!
    votes: [Vote]
    downvotes: [Vote]
    createdAt: String!
  }
`;
