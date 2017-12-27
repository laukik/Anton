/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing Applications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function ( req, res) {
		//console.log(req.allParams());
		Application.create( req.allParams(), function (err, result) {
			if( err){
				console.log(err);
				throw err;
			}
			res.redirect('/application');
		});
	},

	show : function( req, res){
		Application.find().exec( function (err, appsx){
			if( err ){
				throw err;
			}
			//console.log(appsx);
			res.render('application',{ apps : appsx } );
		});
	}
};
