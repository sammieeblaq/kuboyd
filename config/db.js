const mongoose = require("mongoose");
// console.log(process.env);

const { NODE_ENV, MONGO_URL, MONGO_LIVE, MONGO_TEST } = process.env;
// console.log(NODE_ENV, MONGO_LIVE, MONGO_URL);

module.exports = {
  connect: () => {
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
  },

  connect_test: () => {
    try {
      mongoose.connect(MONGO_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.info("Connected the the database 🔥");
    } catch (error) {
      console.log(error);
    }
  },

  disconnect: (done) => mongoose.disconnect(done),
};
