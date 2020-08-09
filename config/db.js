const mongoose = require("mongoose");
// console.log(process.env);

const { NODE_ENV, MONGO_URL, MONGO_LIVE } = process.env;

const connectDb = () => {
  try {
    mongoose.connect(NODE_ENV == "production" ? MONGO_LIVE : MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.info("Connected the the database 🔥");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
