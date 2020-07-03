const mongoose = require("mongoose");

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_LIVE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.info("connected to the database!!!");
  } catch (error) {
    throw error;
  }
};

module.exports = connectDb;
