import { EnvConfigurationType } from './types.config';

export const EnvConfiguration = (): EnvConfigurationType => ({
  environment: process.env.ENVIRONMENT,
  bdCore: {
    host: process.env.BD_CORE_HOST,
    port: +process.env.BD_CORE_PORT,
    database: process.env.BD_CORE_DATABASE,
    username: process.env.BD_CORE_USERNAME,
    password: process.env.BD_CORE_PASSWORD,
  },
});
