/**
 * StatusController
 *
 * @description :: Server-side logic for managing Statuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function ( req, res) {
		Status.create( req.allParams(), function (err, result) {
			if( err){
				console.log(err);
				throw err;
			}
			res.send(result);
		});
	}
};
