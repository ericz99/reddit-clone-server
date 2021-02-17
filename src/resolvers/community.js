import { Community } from '../models';
import formatError from '../formatError';

export default {
  Query: {
    getCommunity: async (root, { name }, context, info) => {
      const comm = await Community.findOne({ name });
      return comm;
    },
    getCommunities: async (root, args, context, info) => {
      const comms = await Community.find({}).sort({ createdAt: -1 });
      return comms;
    },
  },
  Mutation: {
    createCommunity: async (root, args, context, info) => {
      try {
        const owner = context.me.id;
        const data = await Community.create({ ...args, admins: [owner], users: [owner] });
        return {
          ok: true,
          community: data,
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
    removeCommunity: async (root, { id }, context, info) => {
      try {
        await Community.deleteOne({ _id: id });
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
    joinCommunity: async (root, { id }, context, info) => {
      try {
        const owner = context.me.id;
        await Community.findOneAndUpdate({ _id: id }, { $addToSet: { users: [owner] } });
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
    leaveCommunity: async (root, { id }, context, info) => {
      try {
        const owner = context.me.id;
        await Community.findOneAndUpdate({ _id: id }, { $pull: { users: owner } });
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
  Community: {
    admins: (root, args, context, info) => {
      return root.admins;
    },
    posts: (root, args, context, info) => {
      return root.posts;
    },
    users: (root, args, context, info) => {
      return root.users;
    },
  },
};
