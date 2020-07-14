const faker = require("faker");

module.exports = {
  generateAccount: () => {
    const accountNumber = faker.finance.account(10);
    return accountNumber;
  },
};
