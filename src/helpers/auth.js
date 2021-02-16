import jwt from 'jsonwebtoken';

import { User } from '../models';
import config from '../config';
import formatError from '../formatError';

export const createToken = async (user) => {
  const accessToken = await jwt.sign(
    {
      id: user.id,
    },
    config.accessKey,
    { expiresIn: '10s' }
  );

  const refreshToken = await jwt.sign({ id: user.id }, config.refreshKey, {
    expiresIn: '7d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const genNewToken = async (token) => {
  let userId = 0;

  try {
    const { id } = jwt.decode(token);
    userId = id;
  } catch (e) {
    return {};
  }

  if (!userId) {
    return {};
  }

  const user = await User.findById(userId);

  if (!user) {
    return {};
  }

  try {
    jwt.verify(token, config.refreshKey);
  } catch (e) {
    return {};
  }

  const { accessToken, refreshToken } = await createToken(user);
  return {
    accessToken,
    refreshToken,
    user,
  };
};

export const attemptLogin = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return {
        ok: false,
        errors: [
          {
            path: 'email',
            message: 'Invalid email',
          },
        ],
      };
    }

    if (!(await user.comparePassword(password))) {
      return {
        ok: false,
        errors: [
          {
            path: 'password',
            message: 'Invalid password',
          },
        ],
      };
    }

    // # create our token
    const { accessToken, refreshToken } = await createToken(user);

    return {
      ok: true,
      accessToken,
      refreshToken,
    };
  } catch (e) {
    if (e) {
      return {
        ok: false,
        errors: formatError(e),
      };
    }
  }
};
