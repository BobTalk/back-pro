var mongoose = require("mongoose");
var mongdbUrl = require('../config/db')
var db = mongoose.connect(mongdbUrl.mongodb);
var schema = require('../models/index')
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("数据库连接成功");
});

module.exports = {
    save1: function (obj,callback) {
        console.log(obj);
        schema.User.save(obj, callback())
    }
}