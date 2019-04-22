var mongoose = require("./dbConnect");
var crypto = require("crypto");

var userSchema = new mongoose.Schema({
    username: String,
    password: String
});
//model方法
userSchema.statics.findByUsername = function(username, callback) {
    this.find({username: username}, callback)
};
userSchema.statics.getMD5 = function(id) {
    var hash = crypto.createHash("md5");
    return hash.update(id).digest("hex");
};

var UserModel = mongoose.model("user", userSchema);



module.exports = UserModel;
