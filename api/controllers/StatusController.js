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
			res.redirect('/status');
		});
	},

	show: function (req,res) {
		Status.find().exec( function (err, status){
			if( err ){
				throw err;
			}
			console.log(status);
			res.render('status',{ status : status } );
		});
	}
};
