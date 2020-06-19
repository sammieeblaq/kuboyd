const DB = require("../utils/db.utils");
const Account = require("../models/account.models");

module.exports = {
  transfer: async (sender, receiver, amount) => {
    const [from, to] = await Promise.all([
      await DB.decrementAccount(Account, sender.accountNumber, amount),
      await DB.updateAccount(Account, receiver.accountNumber, amount),
    ]);
    return { from, to };
  },
};
