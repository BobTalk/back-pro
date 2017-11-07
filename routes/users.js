var express = require('express');
var User = require('../models').User;
var crypto = require('crypto');
var router = express.Router();
function encrypt(str) {
    return crypto.createHash('md5').update(str).digest('hex')
}
router.post('/reg', function (req, res) {
    var user = req.body;
    user.password = encrypt(user.password)
    new User(user).save(function (err, user) {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(user)
        }
    })
})
router.post('/login', function (req, res) {
    var user = req.body;
    User.findOne({username: user.username, password: encrypt(user.password)}, function (err, user) {
        if (err) {
            res.status(500).json({msg: err})
        } else {
            req.session.user = user;
            res.json(user)
        }
    })
});
router.post('/logout', function (req, res) {
    req.session.user = null;
    res.status(200).json({msg: 'success'})
});
module.exports = router;
