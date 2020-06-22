const User = require("../models/user.models");
const DB = require("../utils/db.utils");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await DB.find(User);
      if (users) res.json(users);
    } catch (error) {
      console.error("Users not found in the database");
    }
  },

  getUser: async (req, res) => {
    const { id } = req.query;
    try {
      const user = await DB.findById(User, id);
      if (user) res.json(user);
    } catch (error) {
      console.error("User not found in the database");
    }
  },

  createStaff: async (req, res) => {
    const { id } = req.query;
    try {
      const staff = await DB.updateUser(User, id, req);
      res.json({
        updated: staff,
        message: "Staff Created Successfully",
      });
    } catch (error) {
      throw Error("Uncaught Error");
    }
  },
};
