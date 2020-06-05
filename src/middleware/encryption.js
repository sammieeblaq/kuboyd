const bcrypt = require("bcrypt");

module.exports = {
  encryptPassword: (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (hash) return resolve(hash);
        else {
          return reject({
            success: false,
            status: 500,
            message: "Error in processing Query",
          });
        }
      });
    });
  },

  validatePassword: (password, user) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          return reject({
            status: 401,
            success: false,
            message: "Password does not match",
          });
        }
        return resolve(result);
      });
    });
  },
};
