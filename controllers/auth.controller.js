const User = require("../models/user.models");
const encryption = require("../middleware/encryption");
const DB = require("../utils/db.utils");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

module.exports = {
  signUp: async (req, res) => {
    const { password, email, phone } = req.body;
    if (!password && !email && !phone) {
      res.json({
        status: 401,
        message: "Kindly fill in the details to create an account",
      });
    } else {
      try {
        const hashedPassword = await encryption.encryptPassword(password);
        const userObj = {
          phone: phone,
          email: email,
          password: hashedPassword,
        };
        const user = await User.create(userObj);
        return res.json({
          status: 201,
          user: user,
          message: "User Created Successfully",
        });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  },

  signIn: async (req, res) => {
    const { email, password } = req.body;
    if (!email && !password) {
      res.json({
        status: 400,
        message: "Fill in the right details please",
      });
    } else {
      try {
        const user = await DB.findByEmail(User, email);
        if (!user) {
          return res.status(401).json({
            message: "User does not exist!!! Please sign up",
          });
        }
        const result = await encryption.validatePassword(password, user);
        if (result) {
          const newObj = {
            id: user._id,
            email: user.email,
            phone: user.phone,
            role: user.role,
          };
          const token = jwt.sign(newObj, process.env.JWT_SECRET, {
            expiresIn: "3 days",
            algorithm: "HS256",
          });
          res.cookie("t", token, {
            expiresIn: new Date() + 9999,
            httpOnly: true,
          });
          res.json({
            status: 201,
            message: "Auth Successful",
            token: token,
          });
        }
      } catch (error) {
        res.json({ message: error });
        // console.log(error);
      }
    }
  },

  resetPassword: async (req, res) => {
    const { newPassword, confirmPassword } = req.body;
    try {
      if (newPassword === confirmPassword) {
        const hashedPassword = await encryption.encryptPassword(newPassword);
        await DB.updateUserPassword(User, hashedPassword);
        return res.json({
          status: 201,
          message: "Password updated successfully",
        });
      }
      return res.json({
        status: 401,
        message: "Password does not match.. Kindly confirm the new password",
      });
    } catch (error) {
      console.error(error);
    }
  },

  // changePassword: async (req, res) => {
  //   const { oldPassword, newPassword, confirmPassword } = req.body;
  // },

  signOut: async (req, res) => {
    res.clearCookie("t");
    res.json({
      message: "Signed out",
    });
  },

  requireSignIn: expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }),
};
