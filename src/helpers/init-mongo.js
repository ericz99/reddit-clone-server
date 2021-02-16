import mongoose from 'mongoose';
import config from '../config';

(async () => {
  let conUri = process.env.NODE_ENV === 'production' ? config.cloudMongoUri : config.mongoUri;

  try {
    await mongoose.connect(conUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('Successfully connected to database!');
  } catch (e) {
    if (e) throw new Error(e);
  }
})();
