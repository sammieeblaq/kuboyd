const mongoose = require("mongoose");

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.info("connected to the database!!!");
  } catch (error) {
    throw Error("An error occured here");
  }
};

module.exports = connectDb;
