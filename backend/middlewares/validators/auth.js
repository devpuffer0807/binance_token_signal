var { Joi, validate } = require("express-validation");

var authValidator = {
  register: validate(
    {
      body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        userEmail: Joi.string().email().required(),
        userPassword: Joi.string()
          .regex(/[a-zA-Z0-9]{3,30}/)
          .required(),
      }),
    },
    {},
    { allowUnknown: true, abortEarly: false }
  ),
  login: validate(
    {
      body: Joi.object({
        userEmail: Joi.string().email().required(),
        userPassword: Joi.string()
          .regex(/[a-zA-Z0-9]{3,30}/)
          .required(),
      }),
    },
    {},
    { allowUnknown: true, abortEarly: false }
  ),
  forgot: validate(
    {
      body: Joi.object({
        email: Joi.string().email().required(),
      }),
    },
    {},
    { allowUnknown: true, abortEarly: false }
  ),
  reset: validate(
    {
      body: Joi.object({
        email: Joi.string().email().required(),
        verifyCode: Joi.string().required().length(5),
        password: Joi.string().required(),
      }),
    },
    {},
    { allowUnknown: true, abortEarly: false }
  ),
};

module.exports = authValidator;
