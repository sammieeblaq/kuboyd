const Account = require("../models/account.models");
const acc = require("../services/account.services");
const { formatDate } = require("../utils/time.utils");
const DB = require("../utils/db.utils");
// const validator = require("../utils/validator.utils");

module.exports = {
  createAccount: async (req, res) => {
    const accountNumber = acc.generateAccount();
    const account = new Account({
      accountName: req.body.accountName,
      type: req.body.type,
      accountNumber: accountNumber,
    });
    try {
      const result = await account.save();
      res.json(result);
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  getAccounts: async (req, res) => {
    try {
      const accounts = await DB.find(Account);
      res.json(
        accounts.map((acc) => {
          return {
            _id: acc._id,
            uuid: acc.uuid,
            accountName: acc.accountName,
            accountNumber: acc.accountNumber,
            accountType: acc.type,
            status: acc.status,
            accountBalance: acc.balance,
            created: formatDate(acc.created_at),
          };
        })
      );
      // console.log(req.headers);
    } catch (error) {
      console.error("There's an error in your search.. Kindly contact Support");
    }
  },

  getAccountById: async (req, res) => {
    const { id } = req.query;
    try {
      const account = await DB.findById(Account, id);
      res.json({
        _id: account._id,
        uuid: account.uuid,
        accountName: account.accountName,
        accountNumber: account.accountNumber,
        accountType: account.type,
        status: account.status,
        accountBalance: account.balance,
        created: formatDate(account.created_at),
      });
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  getAccountByAccountNumber: async (req, res) => {
    const { accNumber } = req.query;
    try {
      const account = await DB.findByAccountNumber(Account, accNumber);
      res.json({
        _id: account._id,
        uuid: account.uuid,
        accountName: account.accountName,
        accountNumber: account.accountNumber,
        accountType: account.type,
        status: account.status,
        accountBalance: account.balance,
        created: formatDate(account.created_at),
      });
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  getAccountByAccountName: async (req, res) => {
    const { accName } = req.query;
    try {
      const account = await DB.findByAccountName(Account, accName);
      res.json({
        _id: account._id,
        uuid: account.uuid,
        accountName: account.accountName,
        accountNumber: account.accountNumber,
        accountType: account.type,
        status: account.status,
        accountBalance: account.balance,
        created: formatDate(account.created_at),
      });
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  updateAccount: async (req, res) => {
    const { id } = req.query;

    try {
      await DB.updateOne(Account, id, req);
      res.json({
        message: "Account Updated",
      });
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  removeAccount: async (req, res) => {
    const { id } = req.query;

    try {
      await DB.deleteOne(Account, id);
      res.json({ message: "Account Deleted" });
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },
};
