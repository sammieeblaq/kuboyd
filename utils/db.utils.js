// Database uitlities
module.exports = {
  find: (model) => model.find({}).sort({ created: -1 }),

  findById: (model, id) => model.findOne({ _id: id }),

  findByEmail: (model, email) => model.findOne({ email: email }),

  findAccountByPhone: (model, phone) => model.findOne({ phone: phone }),

  findByAccountNumber: (model, accNumber) =>
    model.findOne({ accountNumber: accNumber }),

  findStaffs: (model, role) =>
    model.find({ role: role }).sort({ created_at: -1 }),

  updateAccount: (model, accNum, req) =>
    model.findOneAndUpdate(
      { accountNumber: accNum },
      { $set: req.body },
      { new: true }
    ),

  updateTransactionStatus: (model, id, status) =>
    model.findOneAndUpdate(
      { _id: id },
      { $set: { status: status } },
      { new: true }
    ),

  updateUser: (model, id, role) =>
    model.findOneAndUpdate(
      { _id: id },
      { $set: { role: role } },
      { new: true }
    ),

  incrementAccount: (model, accNumber, amount) =>
    model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $inc: { balance: amount } },
      { new: true }
    ),

  decrementAccount: (model, accNumber, amount) =>
    model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $inc: { balance: -amount } },
      { new: true }
    ),

  incrementAccountSaving: (model, accNum, amount) =>
    model.findOneAndUpdate(
      { accountNumber: accNum },
      { $inc: { subAccount: amount } },
      { new: true }
    ),

  deleteOne: (model, id) => model.findOneAndDelete({ _id: id }),

  addBeneficiary: (model, accNumber, recipient) =>
    model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $push: { beneficiary: recipient } }
    ),

  addTransactionHistory: (model, accNumber, transaction) =>
    model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $push: { transactionHistory: transaction } }
    ),

  addSavingHistory: (model, accNumber, savings) =>
    model.findOneAndUpdate(
      { accountNumber: accNumber },
      { $push: { savingsHistory: savings } }
    ),
};
