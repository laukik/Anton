/**
 * TaskTypeController
 *
 * @description :: Server-side logic for managing Tasktypes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create : function ( req, res) {
		TaskType.create( req.allParams(), function (err, result) {
			if( err){
				console.log(err);
				throw err;
			}
			res.redirect('/taskType');
		});
	},

	show : function (req, res) {
		TaskType.find().exec(function (err, result) {
			if(err) throw err;
			res.render('taskType', { tasktypes : result});
		});
	}
};
