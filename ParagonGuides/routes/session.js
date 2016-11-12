﻿var express = require('express');
var router = express.Router();
var userModel = require('../models').user;

var token = function () {
    function rand() {
        return Math.random().toString(36).substr(2);
    };
    return rand() + rand();
};


function authenticateByCookies(req, res, next) {
    
    var cookie = JSON.parse(req.cookies.logintoken);
    userModel.findByUserName(cookie.email, function (err, user) {
        if (!err) {
            console.log(user.token);
            console.log(cookie.token);
            if (user.token == cookie.token) {
                req.session.user_id = user.id;
                req.currentUser = user;
                res.locals.user = user;
                user.token = token();
                userModel.saveCookies(user, function (err) {
                    res.cookie('logintoken', JSON.stringify({
                        token: user.token,
                        email: user.login
                    }), {
                        expires: new Date(Date.now() + 2 * 604800000),
                        httpOnly: true
                    });
                    next();
                });
            } else {
                console.log("DIFFRENT TOKENS");
                next(true);
            }
        } else {
            console.log("SESSION COOKIES USER NOT FOUND");
            next(true);
        }
        
    });
  
}
function loadUser(req, res, next) {
    if (req.session.user_id != undefined) {
        userModel.findByID(req.session.user_id, function (err, user) {
            console.log(user);
            if (user) {
                req.currentUser = user;
                res.locals.user = user;
                console.log("Session user LOAD");
                next();
            } else {
                next(true);
            }
        });
        return;
    } else if (req.cookies.logintoken) {
        authenticateByCookies(req, res, next);
    }   
    else {
        next(true);
    }
}

function initUser(req, res, next) {
    console.log("Session INIT");
    userModel.findByUserName(req.body.username, function (err, user) {
        if (err) {
            console.log("User are not exist !!! Username not correct");
            res.redirect('/');
            return;
        }
        if (user && user.password == req.body.password) {
            req.session.user_id = user.id;
            user.token = token();
            userModel.saveCookies(user, function (err) {
                console.log(user);
                console.log(err);
                res.cookie('logintoken', JSON.stringify({
                    token: user.token,
                    email: user.login
                }), {
                    expires: new Date(Date.now() + 2 * 604800000),
                    httpOnly: true
                });
                
                console.log("Session SAVED");
                next();
            });
        } else {
            console.log("User password not correct");
            next(true);
        }
    });
}
function deleteUser(req, res, callback) {
    if (req.session) {
        userModel.clearCookies(req.session.user_id, function () { });
        res.clearCookie('logintoken');
        req.session.destroy(function () { });
        console.info("Session DELETE");
    }
    callback();
}
router.post('/new', function (req, res, next) {
    initUser(req, res, function () {
        loadUser(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/logout', function (req, res, next) {
    deleteUser(req, res, function () {
        res.redirect('/');
    });
});
router.use('/', function (req, res, next) {
    loadUser(req, res, function (err) {
        if (err) {
            req.session.err = true;
        }
        else
            req.session.err = false;
        next();
    });
});

module.exports = router;