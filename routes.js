var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
    var users = require('./controllers/user_controller');
    app.use('/static', express.static( './static')).
        use('/lib', express.static( '../lib')
    );
    app.get('/', function(req, res){
        console.log("/ api called");
        if (req.session.user) {
            var message = req.session.msg;
            req.session.msg = undefined;
            res.render('index', {user:req.session.username,msg:message});
        } else {
            console.log("redirecting to /login");
            req.session.msg = undefined;
            res.redirect('/login');
        }
    });
    app.get('/litebrite', function(req, res){
        console.log("/litebrite api called");
        if (req.session.user && req.session.current_game) {
            res.render('litebrite');
        } else {
            console.log("redirecting to /login");
            res.redirect('/login');
        }
    });
    app.get('/register', function(req, res){
        console.log("/register api called");
        if(req.session.user){
            console.log("redirecting to /");
            res.redirect('/');
        }
        var message = req.session.msg;
        req.session.msg = undefined;
        res.render('register', {msg:message});
    });
    app.get('/login',  function(req, res){
        console.log("/login api called");
        if(req.session.user){
            console.log("redirecting to /")
            res.redirect('/');
        }
        var message = req.session.msg;
        req.session.msg = undefined;
        res.render('login', {msg:message});
    });

    app.get('/logout', function(req, res){
        console.log("/logout api called");
        req.session.destroy(function(){
            console.log("redirecting to /login");
            res.redirect('/login');
        });
    });
    app.post('/register', users.register);
    app.post('/user/delete', users.deleteUser);
    app.post('/login', users.login);
    app.post('/join', users.notImplemented);
    app.post('/create' users.notImplemented);
}
