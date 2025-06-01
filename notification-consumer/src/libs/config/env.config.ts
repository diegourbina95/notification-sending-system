import { EnvConfigurationType } from './types.config';

export const EnvConfiguration = (): EnvConfigurationType => ({
  environment: process.env.ENVIRONMENT,
  postgresqlDB: {
    host: process.env.BD_CORE_HOST,
    port: +process.env.BD_CORE_PORT,
    database: process.env.BD_CORE_DATABASE,
    username: process.env.BD_CORE_USERNAME,
    password: process.env.BD_CORE_PASSWORD,
  },
  mongoDB: {
    uri: process.env.MONGO_DB_URI,
    database: process.env.MONGO_DB_NAME,
  },
  rabbitMQ: {
    uri: process.env.RABBIT_MQ_URI,
    queue: process.env.RABBIT_MQ_QUEUE,
  },
});
