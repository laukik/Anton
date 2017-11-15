/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function (req, res) {
		User.create( req.allParams, function ( err, user) {
			if( err){
				console.log(err);
				throw err;
			}
			res.send(user);
		});
	}
};
