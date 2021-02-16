import {
  ApolloServer,
  gql,
  SchemaDirectiveVisitor,
  AuthenticationError,
} from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const [, , context] = args;

      if (!context.req.headers['x-auth-token'] || !context.req.headers['x-refresh-token']) {
        throw new AuthenticationError('Not authenticated!!!!');
      }

      if (!context.me) {
        throw new AuthenticationError('Not authenticated!');
      }

      return resolve.apply(this, args);
    };
  }
}

export default AuthDirective;
