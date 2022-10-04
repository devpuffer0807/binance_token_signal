var { Joi, validate } = require("express-validation");

var profileValidator = {
  update: validate(
    {
      body: Joi.object({
        userEmail: Joi.string().email().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
      }),
    },
    {},
    { allowUnknown: true, abortEarly: false }
  ),
};

module.exports = profileValidator;
