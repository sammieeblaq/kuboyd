module.exports = {
  find: (model) => {
    return model.find({}).sort({ created: -1 });
  },

  findById: (model, id) => {
    return model.findOne({ _id: id });
  },

  // updateOne: (model, id, req) => {
  //   return model.updateOne({ _id: id }, { $set: req.body });
  // },

  updateAccount: (model, accNumber, req) => {
    return model.updateOne({ accountNumber: accNumber }, { $set: req.body });
  },

  deleteOne: (model, accNumber) => {
    return model.deleteOne({ accountNumber: accNumber });
  },

  findByAccountNumber: (model, accNumber) => {
    return model.findOne({ accountNumber: accNumber });
  },
};
