var mongoose = require("mongoose");

var websiteSchema = new mongoose.Schema({
    username: String,
    data: [
        {
            catalogue: String,
            websites: [{
                webname: String,
                address: String
            }]
        }]
});

websiteSchema.statics.findByUsername = function(username, callback) {
    this.find({username: username}, callback);
};
//Promise
websiteSchema.statics.addWebsite = function (username, catalogue, webname, address){
    var that = this;
    var p = new Promise(function(resolve, reject) {
        that.find({username: username}, function(error, userData) {
            var add = {
                webname: webname,
                address: address
            };
            if (userData.length !== 0) {
                var data = userData[0].data;
                for (var k = 0;k < data.length; k++) {
                    if (data[k].catalogue === catalogue) {
                        data[k].websites.push(add);
                        that.update(
                            {username: username},
                            {data: data},
                            function(error, data) {
                                if (error) {
                                    resolve({status: 0, message: "添加失败"});
                                } else {
                                    resolve({status: 1, message: "添加成功"});
                                }
                            }
                        );
                        break;
                    }
                }
            }
        })
    });
    return p;
};
websiteSchema.statics.addCatalog = function (username, catalogue){
    var that = this;
    var p = new Promise(function(resolve, reject) {
        that.find({username: username}, function(error, userData) {
            if (userData.length !== 0) {
                userData[0].data.push({catalogue: catalogue,
                    websites: []});
                that.update(
                    {username: username},
                    {data: userData[0].data},
                    function(error) {
                        if (error) {
                            resolve({status: 0, message: "添加失败"});
                        } else {
                            resolve({status: 1, message: "添加成功"});
                        }
                    }
                );
            }
        })
    });
    return p;
};
websiteSchema.statics.delWebsite = function(username, c_id, w_id) {
    var that = this;
    var p = new Promise(function(resolve, reject) {
        that.find({username: username}, function(error, userData) {
            if (userData.length !== 0) {
                var tmpData = userData[0].data;
                for (var i = 0;i < tmpData.length; i++) {
                    if (tmpData[i]._id == c_id) {
                        for (var k = 0; k < tmpData[i].websites.length; k++) {
                            if (tmpData[i].websites[k]._id == w_id) {
                                tmpData[i].websites.splice(k,1);
                                that.update({username: username},{data: tmpData}, function(error) {
                                    if (error) {
                                        resolve({status: 0, message: "删除失败"});
                                    } else {
                                        resolve({status: 1, message: "删除成功"});
                                    }
                                });
                            }
                            break;
                        }
                        break;
                    }
                }
            } else {
                resolve({status: 0, message: "删除失败"});
            }
        })
    });
    return p;
};
websiteSchema.statics.delCatalog = function(username, c_id) {
    var that = this;
    var p = new Promise(function(resolve, reject) {
        that.find({username: username}, function(error, userData) {
            if (userData.length !== 0) {
                var tmpData = userData[0].data;
                for (var i = 0;i < tmpData.length; i++) {
                    if (tmpData[i]._id == c_id) {
                        tmpData.splice(i, 1);
                        that.update({username: username},{data: tmpData}, function(error) {
                            if (error) {
                                resolve({status: 0, message: "删除失败"});
                            } else {
                                resolve({status: 1, message: "删除成功"});
                            }
                        });
                        break;
                    }
                }
            } else {
                resolve({status: 0, message: "删除hh失败"});
            }
        })
    });
    return p;
};


var websiteModel = mongoose.model("website", websiteSchema);

module.exports = websiteModel;
