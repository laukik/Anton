/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	create : function (req, res) {
		console.log();
		var userInfo = req.allParams();
		userInfo['admin'] = false;
		User.create( userInfo, function ( err, user) {
			if( err){
				console.log(err);
				throw err;
			}
		});
		res.redirect('/login');
	},

	show : function (req, res) {
		User.find().exec(function (err, result) {
			if(err) throw err;
			Application.find().exec( function (err, app) {
				if(err) res.render(404);
				res.render('user',{ users : result, app : app});
			});
		});
	},

	signup : function (req, res) {
		Application.find().exec( function ( err, app) {
			if( err) res.render('404',{ data: err});
			res.render('signup',{app: app});
		});
	},

	validateUserExists : function (req, res) {
		console.log(req.allParams());
		User.find(req.allParams()).exec( function (err, data) {
			if(err) throw err;
			var userdata  = {};
			if( Object.keys(data).length != 0){
				userdata['isUserExists'] = true;
			}else{
				userdata['isUserExists'] = false;
			}
			res.send( userdata);
		});
	},

	login : function (req,res) {
		res.render('login',{error : {}});
	},

	authUser : function (req, res) {
		var userData = {};
		userData['ntnet'] = req.param('ntnet');
		console.log(userData);
		var passwd = req.param('password');



		//userData.password = hash;
		User.find( userData).exec( function (err, user) {
			if(err) throw err;
			console.log(user);
			if( user.length != 0 &&  Object.keys(user[0]).length != 0 ){
				var isValid = EncryptionService.validate( user[0]['password'], passwd);
				console.log(isValid);
				if( isValid){
					req.session.me = req.param('ntnet');
					console.log( " <><><><><><><>>< " + user[0]['admin']);
					req.session.admin = user[0]['admin'];
					//console.log(req.session);
					res.redirect('/task');
				}else{
					//incorrect password..
					res.render('login',{error : { "error" : "Invalid Password"}});
				}

			}else{
				//incorrect ntnet...
				res.render('login',{error : { "error" : "Invalid NTNET"}});
			}
		});


	},

	logout: function (req, res) {
		
    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;
		req.session.admin = null;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/login');
  }

};
