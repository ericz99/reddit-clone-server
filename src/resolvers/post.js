import { Post, Community, Comment } from '../models';
import formatError from '../formatError';

export default {
  Query: {
    getPost: (root, { id }, context, info) => {
      return Post.findOne({ _id: id }).sort({ createdAt: -1 });
    },
    getPosts: async (root, { name, ...args }, context, info) => {
      if (name) {
        const com = await Community.findOne({ name });
        return {
          ...(await Post.paginate({ community: com.id }, { ...args, sort: { createdAt: -1 } })),
        };
      }

      return {
        ...(await Post.paginate({}, { ...args, sort: { createdAt: -1 } })),
      };
    },
    filterPost: async (root, { searchVal }, context, info) => {
      try {
        const posts = await Post.find({ title: { $regex: searchVal, $options: 'i' } });

        if (searchVal.length === 0) {
          return {
            ok: true,
            posts: [],
          };
        }

        return {
          ok: true,
          posts,
        };
      } catch (e) {
        if (e) {
          return {
            ok: false,
            errors: formatError(e),
          };
        }
      }
    },
  },
  Mutation: {
    createPost: async (root, { comName, ...args }, context, info) => {
      try {
        const owner = context.me.id;
        const community = await Community.findOne({ name: comName });
        const data = await Post.create({ ...args, author: owner, community: community.id });
        return {
          ok: true,
          post: data,
        };
      } catch (e) {
        console.log(e);
        if (e) {
          return {
            ok: false,
            errors: formatError(e),
          };
        }
      }
    },
    removePost: async (root, { id }, context, info) => {
      try {
        await Post.deleteOne({ _id: id });
        await Comment.deleteMany({ post: id });
        return {
          ok: true,
          errors: [],
        };
      } catch (e) {
        if (e) {
          return {
            ok: false,
            errors: formatError(e),
          };
        }
      }
    },
    updatePost: async (root, { id, ...rest }, context, info) => {
      try {
        await Post.updateOne(
          { _id: id },
          { $set: { ...rest } },
          {
            returnOriginal: false,
            new: true,
          }
        );

        return {
          ok: true,
          errors: [],
        };
      } catch (e) {
        if (e) {
          return {
            ok: false,
            errors: formatError(e),
          };
        }
      }
    },
  },
  Post: {
    community: (root, args, context, info) => {
      return root.community;
    },
    comments: (root, args, context, info) => {
      return root.comments;
    },
    author: (root, args, context, info) => {
      return root.author;
    },
    votes: (root, args, context, info) => {
      return root.votes;
    },
  },
};
