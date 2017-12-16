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
			res.redirect('/user');
		});
	},

	show : function (req, res) {
		User.find().exec(function (err, result) {
			if(err) throw err;
			Application.find().exec( function (err, app) {
				if(err) res.render(404);
				res.render('user',{ users : result, app : app});
			});
		});
	}
};
