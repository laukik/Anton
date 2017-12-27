/**
 * AreaController
 *
 * @description :: Server-side logic for managing Areas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function ( req, res) {
		//console.log(req.allParams());
		Area.create( req.allParams(), function (err, result) {
			if( err){
				console.log(err);
				throw err;
			}
			res.redirect('/area');
		});
	},

	show : function( req, res){
		Area.find().exec( function (err, areas){
			if( err ){
				throw err;
			}
			//console.log(areas);
			res.render('addArea',{ areas : areas } );
		});
	}
};
