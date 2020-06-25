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

  getStaffs: async (req, res) => {
    const { role } = req.query;
    try {
      const staffs = await DB.findStaffs(User, role);
      if (staffs) res.json({ staffs });
    } catch (error) {
      throw new Error("Unable to get the staffs with tht role");
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.query;
    try {
      const deletedUser = await DB.deleteOne(User, id);
      res.json({
        message: "User Deleted Successfully",
        user: deletedUser,
      });
    } catch (error) {}
    throw new Error("Unable to delete user with that Id");
  },
};
