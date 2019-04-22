var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/newdb");
mongoose.connection.once("open", function() {
    console.log("连接newdb成功");
});

module.exports = mongoose;