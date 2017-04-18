var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
exports.register = function(req, res){
    console.log("Begin exports.register");
    // var user = new User({username:req.body.username});
    // console.log("after new user exports.signup");
    // // if (req.body.password !== )
    // user.set('hashed_password', hashPW(req.body.password));
    // console.log("after hashing user exports.signup");
    // user.save(function(err) {
    // console.log("In exports.signup");
    // console.log(err);
    // if (err){
    //   req.session.msg = err;
    //   res.redirect('/register');
    // } else {
    //   req.session.user = user.id;
    //   req.session.username = user.username;
    //   req.session.msg = 'Authenticated as ' + user.username;
    //   res.redirect('/');
    // }
    // });
    console.log(req.body);
    req.session.msg = "not implemented yet";
    res.redirect('/register');
};
exports.login = function(req, res){
  User.findOne({ username: req.body.username })
  .exec(function(err, user) {
    if (!user){
      err = 'User Not Found.';
    } else if (user.hashed_password ===
               hashPW(req.body.password.toString())) {
      req.session.regenerate(function(){
        console.log("login");
        console.log(user);
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.msg = 'Authenticated as ' + user.username;
        req.session.color = user.color;
        res.redirect('/');
      });
    }else{
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
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
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
