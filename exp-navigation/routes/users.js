var express = require('express');
var router = express.Router();
var UserModel = require("../models/user");
var WebsiteModel = require("../models/website");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//登陆状态检查(异步函数)，返回一个Promise对象
function ifLogin(username, token) {
    var p = new Promise(function(resolve,reject) {
        var a;
        if (!username || !token) {
            a = false;
        }
        UserModel.findByUsername(username, function(error, userData){
            if (userData.length === 0) {
                a = false;
            } else if (token === UserModel.getMD5(String(userData[0]._id))) {
                a = true;
            }
            resolve(a);
        });
    });
    return p;
}

//注册接口
router.post("/api/register", function(request, response, next) {
  if (!request.body.username) {
    response.json({status: 0, message: "请输入用户名"});
  }
  if (!request.body.password) {
    response.json({status: 0, message: "请输入密码"})
  }
  //注册认证
    UserModel.findByUsername(request.body.username, function(error, userData) {
        if (userData.length !== 0) {
            response.json({status: 0, message: "该用户已存在"});
        } else {
            var user = new UserModel({
                username: request.body.username,
                password: request.body.password
            });
            user.save(function(error) {
                //websites数据库
                var website = new WebsiteModel({
                    username: request.body.username,
                    data: []
                });
                website.save(function(error) {
                    response.json({status: 1, message: "注册成功"});
                });
            });
        }
    });
});
//登陆接口
router.get("/api/login", function(request, response, next) {
    if (!request.query.username) {
        response.json({status: 0, message: "请输入用户名"});
    }
    if (!request.query.password) {
        response.json({status: 0, message: "请输入密码"})
    }
    UserModel.findByUsername(request.query.username, function(error, userData) {
        if (userData.length !== 0) {
            if (userData[0].password === request.query.password) {
                var token = UserModel.getMD5(String(userData[0]._id));
                response.json({
                    status: 1,
                    message: "登陆成功",
                    token: token,
                    username: userData[0].username
                });
            } else {
                response.json({status: 0, message: "用户名或密码错误"});
            }
        } else {
            response.json({status: 0, message: "用户名或密码错误"});
        }



    })
});
//请求推荐网站
router.get("/api/recommend", function(request, response, next) {
    WebsiteModel.findByUsername("myrecommend", function(error, userData) {
        if (userData.length !== 0) {
            response.send(userData[0].data);
        } else {
            //如果获取失败
            response.send("数据库出错");
        }
    })
});
//请求网站目录
router.get("/api/getWebsite", function(request, response, next) {
    var username = request.query.username;
    var token = request.query.token;

    ifLogin(username, token)
        .then(function(msg) {
            if (msg) {
                //返回网页导航数据
                WebsiteModel.findByUsername(username, function (error, websiteData) {
                    if (websiteData.length === 0) {
                        response.json({status: 0, message: "未创建目录"})
                    } else {
                        response.json({
                            status: 1,
                            message: "目录获取成功",
                            data: websiteData[0].data
                        });
                    }
                })
            } else {
                response.json({
                    status: 0,
                    message: "登陆失败",
                });
            }
        });
});
//添加网站
router.get("/api/addWebsite", function(request, response, next) {
    var username = request.query.username;
    var token = request.query.token;
    var catalogue = request.query.catalogue;
    var webname = request.query.webname;
    var address = request.query.address;

    ifLogin(username, token)
        .then(function(msg) {
            if (msg) {
                WebsiteModel.addWebsite(username, catalogue, webname, address)
                    .then(function(json) {response.json(json);});
            } else {
                response.json({status: 0, message: "请重新登陆"});
            }
        });
});
//删除网站
router.get("/api/delWebsite", function(request, response, next) {
    var username = request.query.username;
    var token = request.query.token;
    var c_id = request.query.c_id;
    var w_id = request.query.w_id;
    // var address = request.query.address;
    //判断是否为空
    if (!username || !token || !c_id || !w_id) {
        response.json({status: 0, message: "请重新登陆"});
    }
    //如果都非空
    ifLogin(username, token)
        .then(function(msg) {
            if (msg) {
                WebsiteModel.delWebsite(username, c_id, w_id)
                    .then(function(json) {response.json(json);});
            } else {
                response.json({status: 0, message: "请重新登陆"});
            }
        })
});
//添加目录
router.get("/api/addCatalog", function(request, response, next) {
    var username = request.query.username;
    var token = request.query.token;
    var catalogue = request.query.catalogue;

    ifLogin(username, token)
        .then(function(msg) {
            if (msg) {
                WebsiteModel.addCatalog(username, catalogue)
                    .then(function(json) {
                        response.json(json);
                    });
            } else {
                response.json({status: 0, message: "请重新登陆"});
            }
        });
});
//删除目录
router.get("/api/delCatalog", function(request, response, next) {
    var username = request.query.username;
    var token = request.query.token;
    var c_id = request.query.c_id;

    ifLogin(username, token)
        .then(function(msg) {
            if (msg) {
                WebsiteModel.delCatalog(username, c_id)
                    .then(function(json) {response.json(json);});
            } else {
                response.json({status: 0, message: "请重新登陆"});
            }
        });
});

module.exports = router;
