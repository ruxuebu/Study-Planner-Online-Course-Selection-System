
//defines the database connection
var MongoClient = require("mongodb").MongoClient;

var mongoConfig = {
        serverUrl: "mongodb://localhost:27017/",
        database: "studyplanner"
      };

var fullMongoUrl = mongoConfig.serverUrl + mongoConfig.database;

module.exports = {url:fullMongoUrl};