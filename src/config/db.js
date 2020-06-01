const mongoose =  require("mongoose");
const { mongoUri } = require("../config/config");

const connectDb = () =>  {
    try {
        mongoose.connect(mongoUri, { 
            useNewUrlParser: true,
            useUnifiedTopology:  true,
            useCreateIndex: true
        });
        console.log("connected to the database!!!");
    } catch (error) {
        throw error   
    }
}

module.exports = connectDb;