module.exports = {
  find: (model) => {
    return model.find({}).sort({ created: -1 });
  },

  findById: (model, id) => {
    return model.findOne({ _id: id });
  },

  updateOne: (model, id, req) => {
    return model.updateOne({ _id: id }, { $set: req.body });
  },

  deleteOne: (model, id) => {
    return model.deleteOne({ _id: id });
  },

  findByAccountNumber: (model, accNumber) => {
    return model.findOne({ accountNumber: accNumber });
  },
};
