/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create : function ( req,  res) {
		var task = req.allParams();
		console.log(task);
		Task.create( task, function ( err, result) {
				if( err){
					throw err;
				}
				res.redirect('/task');
		});
	},

	show : function (req, res) {
		Task.find().exec( function (err, tasks){
			if( err ){
				throw err;
			}
			console.log(tasks);
			//We need to fetch the details for
			//Valid Status and Areas..
			Area.find().exec( function (err, areas){
				if( err ){
					throw err;
				}
				Status.find().exec( function (err, status){
					if( err ){
						throw err;
					}
					res.render('task',{ tasks : tasks, areas : areas, status:status } );
				});
			});
		});
	}
};
