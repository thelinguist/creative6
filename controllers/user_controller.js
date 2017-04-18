var crypto = require('crypto');
var mongoose = require('mongoose');
User = mongoose.model('User');
function hashPW(pwd){
    return crypto.createHash('sha256').update(pwd).
        digest('base64').toString();
}
exports.register = function(req, res){
    console.log("Begin exports.register");
    var user = new User({username:req.body.username});
    console.log("after new user exports.signup");
    if (req.body.password !== req.body.confirm) {
        req.session.msg = "passwords are not the same";
        res.redirect('/register');
        return;
    }
    user.set('hashed_password', hashPW(req.body.password));
    console.log("after hashing user exports.signup");
    user.save(function(err) {
        console.log("In exports.signup");
        console.log(err);
        if (err){
            req.session.msg = err;
            res.redirect('/register');
        } else {
            req.session.user = user.id;
            req.session.username = user.username;
            req.session.msg = 'Authenticated as ' + user.username;
            res.redirect('/');
        }
    });
};

exports.login = function(req, res){
    User.findOne({ username: req.body.username }).exec(function(err, user) {
        if (!user){
            err = 'User Not Found.';
        } else if (user.hashed_password ===
            hashPW(req.body.password.toString())) {
                req.session.regenerate(function(){
                console.log("login");
                console.log(user);
                req.session.user = user.id;
                req.session.username = user.username;
                res.redirect('/');
                });
        }else {
            err = 'Authentication failed.';
        }
        if(err){
            req.session.regenerate(function(){
                req.session.msg = err;
                res.redirect('/login');
            });
        }
    });
};

exports.deleteUser = function(req, res){
    User.findOne({ _id: req.session.user }).exec(function(err, user) {
        if(user){
        user.remove(function(err){
            if (err){
                req.session.msg = err;
            }
            req.session.destroy(function(){
                res.redirect('/login');
            });
        });
        } else{
            req.session.msg = "User Not Found!";
            req.session.destroy(function(){
                res.redirect('/login');
            });
        }
    });
};


//just mimicked lab 6
exports.joinGame = function(req, res) {
    User.findOne({_id: req.session.user}).exec(function(err, user) {
		user.set('current_game', req.body.current_game);
		user.save(function(err) {
			if (err){
			res.sessor.error = err;
			//send a message saying it can't be found
			} else {
				req.session.current_game = user.current_game;
				req.session.msg= "current game is: " + req.session.current_game;
				res.redirect('/litebrite');
			}
		});
    });
};

exports.joinNewGame = function(req, res) {
  console.log("Begin exports.signup");
  //grab the gameCode theyput in.
  var gameCode = new Game({gameCode:req.body.gameCode});
  console.log("making a new game");

  //save to mongoose
  game.save(function(err) {
    console.log("In exports.signup");
    console.log(err);
    if (err){
      res.session.error = err;
    } else {
      req.session.gameCode = gameCode
      res.redirect('/litebrite.html');
    }
  });
};

exports.leaveGame = function(req, res) {
    req.session.current_game = undefined;
    res.redirect('/');
}

exports.notImplemented = function(req, res) {
    req.session.msg = "not implemented";
    res.redirect('/');
}
