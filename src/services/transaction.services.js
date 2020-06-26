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

  rollBack: async (sender, receiver, amount, id) => {},
  // cancel: async (id) => {
  //   const canceled = await DB.cancelTransaction(Transacton, id);
  //   return canceled;
  // },
};
