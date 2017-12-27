/**
* SeverityController
*
* @description :: Server-side logic for managing Severities
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
	create : function ( req, res) {
		//console.log(req.allParams());
		Severity.create( req.allParams(), function (err, result) {
			if( err){
				res.render('404');
			}
			res.redirect('/severity');
		});
	},

	show : function( req, res){
		Severity.find().exec( function (err, result){
			if( err ){
				res.render('404');
			}
			//console.log(result);
			res.render('severity',{ severity : result } );
		});
	}
};
