const validator = require("express-validator");

module.exports = {
  isString: (name) => {
    validator.check(name).isString();
  },
};
