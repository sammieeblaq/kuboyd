const DB = require("../utils/db.utils");
const Account = require("../models/account.models");
const Transacton = require("../models/transaction.models");

module.exports = {
  transfer: async (sender, receiver, amount) => {
    const [from, to] = await Promise.all([
      DB.decrementAccount(Account, sender.accountNumber, amount),
      DB.incrementAccount(Account, receiver.accountNumber, amount),
    ]);
    return { from, to };
  },

  savings: async (accountNumer, amount) => {
    const result = await Promise.all([
      DB.decrementAccount(Account, accountNumer, amount),
      DB.incrementAccountSaving(Account, accountNumer, amount),
    ]);
    return result;
  },
};
