/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	create : function ( req,  res) {
		var task = req.allParams();
		//console.log(task);
		Task.create( task, function ( err, result) {
				if( err){
					throw err;
				}
				res.redirect('/task');
		});
	},

	show : function (req, res) {
		Task.find({ "limit" : '10'}).sort('createdAt DESC').exec( function (err, tasks){
			if(err) res.render('404');
			//console.log(tasks);
			//We need to fetch the details for
			//Valid Status and Areas..
			Area.find().exec( function (err, areas){
				if(err) res.render('404');
				Status.find().exec( function (err, status){
					if(err) res.render('404');
					User.find().exec(function (err, users) {
						if(err) res.render('404');
						TaskType.find().exec(function (err, taskTypes) {
							if(err) res.render('404');
							Severity.find().exec( function (err, severity) {
								if(err) res.render('404');
								Application.find().exec( function (err, app) {
									if(err) res.render(404);
										res.render('task',{ tasks : tasks, areas : areas, severity : severity,status:status, users : users, tasktypes: taskTypes, app:app } );
								});
							});
						});
					});
				});
			});
		});
	}



};
