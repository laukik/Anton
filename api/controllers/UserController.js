/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function (req, res) {
		console.log(req.allParams());
		User.create( req.allParams(), function ( err, user) {
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
		res.render('login',{});
	},

	authUser : function (req, res) {
		var userData = {};
		userData['ntnet'] = req.param('ntnet');

		bcrypt.hash(userData.password, 20, function(err, hash) {
			userData.password = hash;
			User.find( userData).exec( function (err, user) {
				if(err) throw err;
				if( Object.keys(user).length != 0 ){
					bcrypt.compare(userData['ntnet'], hash).then(function(isValid) {
						if( isValid){
							res.session.user = req.param('ntnet');
							res.redirect('/task');
						}else{
							//incorrect password..
							res.redirect('/login',{error : { "error" : "Invalid Password"}});
						}
				  });
				}else{
					//incorrect ntnet...
					res.redirect('/login',{error : { "error" : "Invalid NTNET"}});
				}
			});
		});

	}

};
