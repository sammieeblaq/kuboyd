const DB = require("../utils/db.utils");
const Account = require("../models/account.models");

module.exports = {
  transfer: async (sender, receiver, amount) => {
    const A = await DB.decrementAccount(Account, sender.accountNumber, amount);
    const B = await DB.updateAccount(Account, receiver.accountNumber, amount);
    return { A, B };
  },
};
