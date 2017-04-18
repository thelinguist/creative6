var crypto = require('crypto');
var express = require('express');
module.exports = function(app) {
  var users = require('./controllers/user_controller');
  app.use('/static', express.static( './static')).
      use('/lib', express.static( '../lib')
  );
  app.get('/', function(req, res){
    if (req.session.user) {
      res.render('index');
    } else {
      res.redirect('/login');
    }
  });
  app.get('/litebrite', function(req, res){
    if (req.session.user) {
      res.render('litebrite');
    } else {
      res.redirect('/login');
    }
  });
  app.get('/register', function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('register');
  });
  app.get('/login',  function(req, res){
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login');
  });

  app.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
  app.post('/register', users.register);
  app.post('/user/update', users.updateUser);
  app.post('/user/delete', users.deleteUser);
  app.post('/login', users.login);
  app.get('/user/profile', users.getUserProfile);
}
