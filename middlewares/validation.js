const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
  }),
});

const validateUserUpdateBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),
  }),
});

const validateSignupBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
    }),
    email: Joi.string().custom(validateEmail).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    password: Joi.string().custom(validateURL).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    avatar: Joi.string().custom(validateURL).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().custom(validateEmail).messages({
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    password: Joi.string().required(),
  }),
});

const validateClothingItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  validateLogin,
  validateClothingItemId,
  validateURL,
  validateCardBody,
  validateSignupBody,
  validateUserUpdateBody,
};
