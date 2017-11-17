var express = require('express');
var User = require('../models').User;
var crypto = require('crypto');
var router = express.Router();
encrypt = (str) => {
    return crypto.createHash('md5').update(str).digest('hex')
}
router.post('/reg', (req, res)=> {
    var user = req.body;
    user.password = encrypt(user.password)
    new User(user).save((err, user)=> {
        if (err) {
            res.status(500).json({msg: err});
        } else {
            res.json(user)
        }
    })
})
router.post('/login', function (req, res) {
    var user = req.body;
    if (req.session.user == null) {
        User.findOne({username: user.username, password: encrypt(user.password)}, function (err, user) {
            if (err || user == null) {
                //res.status(500).json({msg: err})\
                res.redirect('/')
            } else {
                req.session.user = user;
                /* res.json(user)*/
                res.render('index.ejs', {data: user})
            }
        })
    } else {
        res.render('index.ejs', {data: req.session.user})
    }
});
router.get('/login', function (req, res) {
    if (req.session.user == null) {
        res.redirect('/')
    } else {
        res.render('index.ejs', {data: req.session.user})
    }
})
router.get('/logout', (req, res)=> {
    req.session.user = null;
    //res.status(200).json({msg: 'success'})
    res.redirect('/')
});
module.exports = router;
