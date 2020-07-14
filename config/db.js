const mongoose = require("mongoose");

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_LIVE || process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (error) {
    throw Error("An error occured here");
  }
};

module.exports = connectDb;
