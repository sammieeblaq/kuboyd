const { model } = require("../models/account.models");

module.exports = {
  find: (model) => {
    return model.find({}).sort({ created: -1 });
  },

  findById: (model, id) => {
    return model.findOne({ _id: id });
  },

  updateAccount: (model, accNumber, amount) => {
    return model.updateOne(
      { accountNumber: accNumber },
      { $inc: { balance: amount } }
    );
  },

  decrementAccount: (model, accNumber, amount) => {
    return model.updateOne(
      { accountNumber: accNumber },
      { $inc: { balance: -amount } }
    );
  },

  deleteOne: (model, accNumber) => {
    return model.deleteOne({ accountNumber: accNumber });
  },

  findByAccountNumber: (model, accNumber) => {
    return model.findOne({ accountNumber: accNumber });
  },
};
