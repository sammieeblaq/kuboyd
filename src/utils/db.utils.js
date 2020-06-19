const { model } = require("../models/account.models");

module.exports = {
  find: (model) => {
    return model.find({}).sort({ created: -1 });
  },

  findById: (model, id) => {
    return model.findOne({ _id: id });
  },

  updateAccount: (model, accNumber, amount) => {
    return model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $inc: { balance: amount } },
      { new: true }
    );
  },

  decrementAccount: (model, accNumber, amount) => {
    return model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $inc: { balance: -amount } },
      { new: true }
    );
  },

  deleteOne: (model, accNumber) => {
    return model.deleteOne({ accountNumber: accNumber });
  },

  findByAccountNumber: (model, accNumber) => {
    return model.findOne({ accountNumber: accNumber });
  },
};
