import { User } from '../models';

import { attemptLogin } from '../helpers/auth';
import formatError from '../formatError';

export default {
  Query: {
    me: (root, args, context, info) => {
      return User.findById(context.me.id);
    },
  },
  Mutation: {
    registerAccount: async (root, args, context, info) => {
      try {
        const user = await User.create({ ...args });
        return {
          ok: true,
          user,
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
    loginAccount: async (root, args, context, info) => {
      return {
        ...(await attemptLogin({ ...args })),
      };
    },
  },
};
