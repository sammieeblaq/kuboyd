const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI ||
    process.env.MONGO_HOST || 
    `mongodb://${process.env.IP || "localhost"}:${process.env.MONGO_PORT || "27017"}/sleemFinance`,
}

module.exports = config;