import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (!dotenv.config()) throw new Error('No .env file found!');

const config = {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI,
  cloudMongoUri: process.env.CLOUD_MONGO_URI,
  accessKey: process.env.ACCESS_KEY,
  refreshKey: process.env.REFRESH_KEY,
};

export default config;
