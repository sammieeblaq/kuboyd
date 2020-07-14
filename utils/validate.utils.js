// check phone
// check email
// check password
// check account number
const Joi = require("@hapi/joi");
const { body, validationResult } = require("express-validator");

module.exports = {
  validatePhone: (email = "") => {
    email = email.trim();

    const isValidEmail = email && validator;
  },
};
