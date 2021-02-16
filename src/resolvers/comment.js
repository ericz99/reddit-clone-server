import { Post, Comment } from '../models';
import formatError from '../formatError';

export default {
  Query: {
    getComment: (root, { id }, context, info) => {
      return Comment.findById(id).sort({ createdAt: -1 });
    },
    getComments: (root, { id }, context, info) => {
      return Comment.find({}).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    createComment: async (root, { postID, ...args }, context, info) => {
      try {
        const author = context.me.id;
        const data = await Comment.create({ ...args, author: author, post: postID });
        await Post.findByIdAndUpdate({ _id: postID }, { $push: { comments: [data.id] } });
        return {
          ok: true,
          comment: data,
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
    removeComment: async (root, { id }, context, info) => {
      try {
        await Comment.deleteOne({ _id: id });
        await Post.updateOne({}, { $pull: { comments: [id] } });
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
  Comment: {
    author: (root, args, context, info) => {
      return root.author;
    },
    replyUser: (root, args, context, info) => {
      return root.replyUser;
    },
    votes: (root, args, context, info) => {
      return root.votes;
    },
    post: (root, args, context, info) => {
      return root.post;
    },
  },
};
