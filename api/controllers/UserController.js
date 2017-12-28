/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
	create : function (req, res) {
		var userInfo = req.allParams();
		userInfo['admin'] = false;
		User.create( userInfo, function ( err, user) {
			if( err){
				res.render('404');
			}
		});
		res.redirect('/login');
	},

	show : function (req, res) {
		User.find().exec(function (err, result) {
			if(err) throw err;
			for( var i =0; i < result.length; i++){
				delete result[i]['password'];
			}
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
		//console.log(req.allParams());
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
		//console.log(userData);
		var passwd = req.param('password');



		//userData.password = hash;
		User.find( userData).exec( function (err, user) {
			if(err) throw err;
			//console.log(user);
			if( user.length != 0 &&  Object.keys(user[0]).length != 0 ){
				var isValid = EncryptionService.validate( user[0]['password'], passwd);
				//console.log(isValid);
				if( isValid){
					req.session.me = req.param('ntnet');
					req.session.userName =  user[0]['username'];
					//console.log( " <><><><><><><>>< " + user[0]['admin']);
					req.session.admin = user[0]['admin'];
					//console.log(req.session);
					res.redirect('/');
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
  },

	allowAdmin : function (req, res) {
		User.update( req.allParams(), { 'admin' : true }).exec( function (err, status) {});
		res.redirect('/allowAdmin');
	},

	admin : function (req, res) {
		res.render('admin',{});
	},

	home : function (req, res) {
		var userName = req.session.userName;
		var filter = {};
		filter['username'] = userName;
		// filter['status'] = 'In Progress';
		//console.log(filter);
		Task.find( filter).exec( function (err, tasks) {
			if(err) res.render('404');
			//console.log(task);
			Area.find().exec( function (err, areas){
				if(err) res.render('404');
				Status.find().exec( function (err, status){
					if(err) res.render('404');
					User.find().exec(function (err, users) {
						if(err) res.render('404');
						TaskType.find().exec(function (err, taskTypes) {
							if(err) res.render('404');
							Severity.find().exec( function (err, severity) {
								if(err) res.render('404');
								Application.find().exec( function (err, app) {
									if(err) res.render(404);
										res.render('updateTask',{ user : userName, tasks : tasks, areas : areas, severity : severity,status:status, users : users, tasktypes: taskTypes, app:app } );
								});
							});
						});
					});
				});
			});
		});
	}

};
