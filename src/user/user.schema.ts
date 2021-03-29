import * as Joi from '@hapi/joi';
import { config } from '../config';

const mongoIdRegex = '^[0-9a-fA-F]{24}$';
const validIdRegex = new RegExp('^[0-9a-fA-F]{24}$');

export const registerUserSchema = Joi.object({
  employId: Joi.number().required(),
  phone: Joi.number().min(500000000).max(559999999).required(),
  class: Joi.string().required(),
  job: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  pass: Joi.string().required(),
  rule: Joi.array(),
  date: Joi.date(),
});

export const loginUserSchema = Joi.object({
  employId: Joi.number().min(1).required(),
  pass: Joi.string().required(),
})

export const getByIdSchema = Joi.object({
  id: Joi.string().regex(validIdRegex).required(),
});

// export const getManySchema = Joi.object({
//   query: {
//     startIndex: Joi.number().integer().default(0),
//     endIndex: Joi.number()
//       .integer()
//       .default(config.configuration.maxUserAmountToGet)
//       .greater(Joi.ref('startIndex') || 0),
//     name: Joi.string(),
//     minCreationDate: Joi.date(),
//     maxCreationDate: Joi.date(),
//     minUpdateDate: Joi.date(),
//     maxUpdateDate: Joi.date(),
//     search: Joi.string(),
//     firstName: Joi.string(),
//     lastName: Joi.string(),
//     email: Joi.string(),
//     pass: Joi.string(),
//     rule: Joi.array(),
//     date: Joi.date(),
//   },
// });

// export const updateUserSchema = Joi.object({
//   id: Joi.string().regex(validIdRegex).required(),
//   firstName: Joi.string(),
//   lastName: Joi.string(),
//   email: Joi.string(),
//   password: Joi.string(),
//   rule: Joi.array(),
//   date: Joi.date(),
// });
