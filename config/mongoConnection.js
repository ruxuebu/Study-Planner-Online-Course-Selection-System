
//defines the database connection
const MongoClient = require("mongodb").MongoClient;

const mongoConfig = {
        serverUrl: "mongodb://localhost:27017/",
        database: "studyplanner"
      };

let fullMongoUrl = mongoConfig.serverUrl + mongoConfig.database;

module.exports = {url:fullMongoUrl};