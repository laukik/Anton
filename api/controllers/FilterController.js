/**
 * FilterController
 *
 * @description :: Server-side logic for managing Filters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	filter : function (req, res) {
		var filter = req.allParams();
		Object.keys(filter).forEach((key) => (filter[key] == null || filter[key] == '' || filter[key] == "" || filter[key] == undefined ) && delete filter[key]);
		console.log(filter);
		Task.find(filter).exec( function( err, tasks){
			if(err) throw err;
			Area.find().exec( function (err, areas){
				if( err ){
					throw err;
				}
				Status.find().exec( function (err, status){
					if( err ){
						throw err;
					}
					User.find().exec(function (err, users) {
						if(err) throw err;
						TaskType.find().exec(function (err, taskTypes) {
							if(err) throw err;
							res.render('filter',{ tasks : tasks, areas : areas, status:status, users : users, tasktypes: taskTypes } );
						});
					});
				});
			});
		});
	}
};
