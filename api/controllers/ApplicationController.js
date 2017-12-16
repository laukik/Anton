/**
 * ApplicationController
 *
 * @description :: Server-side logic for managing Applications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function ( req, res) {
		console.log(req.allParams());
		Application.create( req.allParams(), function (err, result) {
			if( err){
				console.log(err);
				throw err;
			}
			res.redirect('/application');
		});
	},

	show : function( req, res){
		Application.find().exec( function (err, apps){
			if( err ){
				throw err;
			}
			console.log(apps);
			res.render('application',{ apps : apps } );
		});
	}
};
