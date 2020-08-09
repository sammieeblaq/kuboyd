const { body, validationResult, check } = require("express-validator");

module.exports = {
  validateRegister = [
    check("name", "Name is required").isEmpty().isLength({ min: 4, max: 32}).withMessage("Name must be between 3 and 32 characters"),
    check("email").isEmpty().withMessage("Must be a valid Email address"),
    check("password", "Password is requied").notEmpty(),
    check("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters").matches(/\d/).withMessage("Password must contain a number"),
    check("phone", "Phone is required").isNumeric().isLength({ min: 11, max: 11 }).withMessage("Phone number must be 11 numbers")
  ],

  validateLogin = [
    check("email").isEmail().withMessage("Must be a valid Email address"),
    check("password", "Password is requied").notEmpty(),
    check("password").isLength({ min: 6 }).withMessage("Password must contain at least 6 characters").matches(/\d/).withMessage("Password must contain a number"),
  ]
};
