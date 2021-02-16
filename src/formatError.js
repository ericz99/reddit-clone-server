import mongoose from 'mongoose';

export default (e) => {
  let errors = [];

  if (e instanceof mongoose.Error.ValidationError) {
    for (const error in e.errors) {
      errors.push({
        path: e.errors[error].properties.path,
        message: e.errors[error].properties.message,
      });
    }

    return errors;
  }

  return [{ path: 'name', message: 'something went wrong!' }];
};
