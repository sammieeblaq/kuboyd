const User = require("../models/user.models");
const encryption = require("../middleware/encryption");
const DB = require("../utils/db.utils");
const jwt = require("jsonwebtoken");

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
        status: 401,
        message: "Fill in the right details please",
      });
    } else {
      const user = await DB.findByEmail(User, email);
      if (!user) {
        return res.status(401).json({
          message: "User does not exist!!! Please sign up",
        });
      }
      try {
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
          res.cookie("t", token, { expiresIn: new Date() + 9999 });
          res.json({
            message: "Auth Successful",
            token: token,
          });
        }
      } catch (error) {
        res.status(500).json({ message: "Auth failed" });
      }
    }
  },

  signOut: async (req, res) => {
    res.clearCookie("t");
    res.json({
      message: "Signed out",
    });
  },
};
