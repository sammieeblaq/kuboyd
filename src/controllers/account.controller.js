const Account = require("../models/account.models");
const acc = require("../services/account.services");
const { formatDate } = require("../utils/gen.utils");
const DB = require("../utils/db.utils");
// const validator = require("../utils/validator.utils");

module.exports = {
  createAccount: async (req, res) => {
    const { id, phone, email } = req.decoded;

    // const existingUser = await Account.find({ email: email})
    const { accountName, type, bvn } = req.body;
    const accountNumber = acc.generateAccount();
    try {
      const account = await Account.create({
        accountName: accountName,
        type: type,
        accountNumber: accountNumber,
        bvn: bvn,
        accountOwner: { id, email },
        phone: phone,
      });
      res.json(account);
    } catch (error) {
      if (error) res.status(500).json({ error: error });
    }
  },

  getAccounts: async (req, res) => {
    // console.log(req.decoded);
    try {
      const accounts = await DB.find(Account);
      res.json(
        accounts.map((acc) => {
          return {
            _id: acc._id,
            uuid: acc.uuid,
            accountName: acc.accountName,
            accountOwner: acc.accountOwner,
            accountNumber: acc.accountNumber,
            accountType: acc.type,
            status: acc.status,
            beneficiary: acc.beneficiary,
            accountBalance: acc.balance,
            created: formatDate(acc.created_at),
          };
        })
      );
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
        accountOwner: account.accountOwner,
        accountNumber: account.accountNumber,
        accountType: account.type,
        status: account.status,
        beneficiary: acc.beneficiary,
        accountBalance: account.balance,
        created: formatDate(account.created_at),
      });
    } catch (error) {
      console.error(
        "Cannot get Id of the given account.. Kindly contact support"
      );
    }
  },

  getByAccountNumber: async (req, res) => {
    const { accNumber } = req.query;
    try {
      const account = await DB.findByAccountNumber(Account, accNumber);
      if (account) {
        res.json({
          _id: account._id,
          uuid: account.uuid,
          accountName: account.accountName,
          accountNumber: account.accountNumber,
          accountOnwer: account.accountOwner,
          accountType: account.type,
          status: account.status,
          beneficiary: acc.beneficiary,
          accountBalance: account.balance,
          created: formatDate(account.created_at),
        });
      } else {
        res.status(401).json({
          message:
            "This account does not exist. Check and reconfirm the number",
        });
      }

      // console.log(account.accountOwner);
    } catch (error) {
      console.error("Cannot get Account number.. Try again later");
    }
  },

  updateAccount: async (req, res) => {
    const { accNum } = req.query;
    try {
      const account = await DB.updateAccount(Account, accNum, req);
      res.json({
        updated: account,
        message: "Account Updated Successfully",
      });
    } catch (error) {
      console.error("Cannot update account");
    }
  },

  removeAccount: async (req, res) => {
    const { id } = req.query;
    try {
      await DB.deleteOne(Account, id);
      res.json({ message: "Account Deleted" });
    } catch (error) {
      console.error(
        "Unable to delete account.. Try again later or contact support"
      );
    }
  },
};
