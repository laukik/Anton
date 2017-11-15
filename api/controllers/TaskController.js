/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function ( req,  res) {
		var task = req.allParams();
		Task.create( task, function ( err, result) {
				if( err){
					throw err;
				}
				res.send(result);
		});
	}
};
