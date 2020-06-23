// Database uitlities
module.exports = {
  find: (model) => {
    return model.find({}).sort({ created: -1 });
  },

  findById: (model, id) => {
    return model.findOne({ _id: id });
  },

  findByEmail: (model, email) => {
    return model.findOne({ email: email });
  },

  findStaffs: (model, role) => {
    return model.find({ role: role }).sort({ created_at: -1 });
  },

  updateAccount: (model, accNum, req) => {
    return model.findOneAndUpdate(
      { accountNumber: accNum },
      { $set: req.body },
      { new: true }
    );
  },

  updateUser: (model, id, req) => {
    return model.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
  },

  incrementAccount: (model, accNumber, amount) => {
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

  deleteOne: (model, id) => {
    return model.findOneAndDelete({ _id: id });
  },

  findByAccountNumber: (model, accNumber) => {
    return model.findOne({ accountNumber: accNumber });
  },

  addBeneficiary: (model, accNumber, recipient) => {
    return model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $push: { beneficiary: recipient } }
    );
  },
};
