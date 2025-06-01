import * as Joi from 'joi';

export const configSchema = Joi.object({
  ENVIRONMENT: Joi.required(),
  BD_CORE_HOST: Joi.required(),
  BD_CORE_PORT: Joi.required(),
  BD_CORE_DATABASE: Joi.required(),
  BD_CORE_USERNAME: Joi.required(),
  BD_CORE_PASSWORD: Joi.required(),
  MONGO_DB_URI: Joi.required(),
  MONGO_DB_NAME: Joi.required(),
  RABBIT_MQ_URI: Joi.required(),
  RABBIT_MQ_QUEUE: Joi.required(),
});
