const mongoose = require("mongoose");

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: "Unable to connect ❌ to the database 😞",
    });
  }
};

module.exports = connectDb;
