var UserInfoDao = require('../dao/UserDao');
module.exports = {
    UserInfo: function (req, res) {
        var param = req.query || req.params;
        var obj = {
            username: 'hyq', password: '111111', email: ''
        }
            UserInfoDao.save1(obj, function (err, result) {
                console.log(result+'ser');
                res.send('signIn', {data: result});
        });
    }
}