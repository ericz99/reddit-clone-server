import { Vote, Post, Comment } from '../models';
import formatError from '../formatError';

export default {
  Mutation: {
    upvotePost: async (root, { postID }, context, info) => {
      try {
        const owner = context.me.id;
        const vote = await Vote.create({ post: postID, user: owner });
        await Post.findByIdAndUpdate(postID, { $push: { votes: [vote.id] } });
        return {
          ok: true,
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
    downVotePost: async (root, { postID }, context, info) => {
      try {
        const owner = context.me.id;
        const vote = await Vote.findOneAndDelete({ post: postID, user: owner });
        await Post.findByIdAndUpdate(postID, { $pull: { votes: [vote.id] } });
        return {
          ok: true,
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
    upvoteComment: async (root, { commentID }, context, info) => {
      try {
        const owner = context.me.id;
        const vote = await Vote.create({ comment: commentID, user: owner });
        await Comment.findByIdAndUpdate(commentID, { $push: { comments: [vote.id] } });
        return {
          ok: true,
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
    downVoteComment: async (root, args, context, info) => {
      try {
        const owner = context.me.id;
        const vote = await Vote.findOneAndDelete({ comment: commentID, user: owner });
        await Comment.findByIdAndUpdate(commentID, { $pull: { comments: [vote.id] } });
        return {
          ok: true,
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
  Vote: {
    user: (root, args, context, info) => {
      return root.user;
    },
    post: (root, args, context, info) => {
      return root.post;
    },
  },
};
