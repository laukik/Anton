/**
* FilterController
*
* @description :: Server-side logic for managing Filters
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
	filter : function (req, res) {
		var filter = req.allParams();
		var fromDate = filter["fromDate"];
		var tillDate = filter["tillDate"];
		var criterion = {};
		Object.keys(filter).forEach((key) => (filter[key] == null || filter[key] == '' || filter[key] == "" || filter[key] == undefined ) && delete filter[key]);
		//format fromDate
		if( fromDate ){
			var dater = fromDate.split("/");
			var from = new Date( dater[2], dater[1] - 1, dater[0]);
			criterion[">="] = from;
		}
		if( tillDate){
			var dater = tillDate.split("/");
			var till = new Date( dater[2], dater[1] - 1, dater[0]);
			criterion["<="] = till;
		}
		var whereClause = {};
		whereClause["workDate"] = criterion;
		Object.keys(filter).forEach((key) => (filter[key] == null || filter[key] == '' || filter[key] == "" || filter[key] == undefined ) && delete filter[key]);
		Object.keys(whereClause).forEach((key) => (whereClause[key] == null || whereClause[key] == '' || whereClause[key] == "" || whereClause[key] == undefined ) && delete whereClause[key]);
		delete filter["fromDate"];
		delete filter["tillDate"]
		console.log(filter);
		Task.find(filter).where(whereClause).exec( function( err, tasks){
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
							Severity.find().exec(function (err, severity) {
								if(err) res.render('404');
								Application.find().exec( function( err, app) {
									if(err) res.render('404');
									res.render('filter',{ tasks : tasks, severity : severity,areas : areas, status:status, users : users, tasktypes: taskTypes,app:app } );
								});
							});
						});
					});
				});
			});
		});
	},

	chartData : function (req, res) {
		AggregationService.groupByCount( {}, "username", function (err, userData) {
			if(err) res.render('404',{data : err});;
			console.log(userData);
			var match = {'taskType' : "Defect"};
			AggregationService.groupByCount( match, "severity",function (err, sevData) {
				if(err) res.render('404',{data : err});;
				console.log(sevData);
				res.render('chart',{userData : userData, sevData : sevData, sevProdData : {}});
			});
		});
	},

	chartFilter : function (req, res) {
		var filter = req.allParams();
		console.log("START");
		console.log(filter);
		var fromDate = filter["fromDate"];
		var tillDate = filter["tillDate"];
		var criterion = {};
		Object.keys(filter).forEach((key) => (filter[key] == null || filter[key] == '' || filter[key] == "" || filter[key] == undefined ) && delete filter[key]);
		//format fromDate
		if( fromDate ){
			var dater = fromDate.split("/");
			var from = new Date( dater[2], dater[1] - 1, dater[0]);
			criterion["$gte"] = from;
		}
		if( tillDate){
			var dater = tillDate.split("/");
			var till = new Date( dater[2], dater[1] - 1, dater[0]);
			criterion["$lte"] = till;
		}
		//var whereClause = {};
		if( Object.keys( criterion ).length != 0){
					filter["workDate"] = criterion;
		}
		Object.keys(filter).forEach((key) => (filter[key] == null || filter[key] == '' || filter[key] == "" || filter[key] == undefined ) && delete filter[key]);
		var group = filter['groupBy'];
		if( group  ==undefined) group = 'severity';
		//Object.keys(whereClause).forEach((key) => (whereClause[key] == null || whereClause[key] == '' || whereClause[key] == "" || whereClause[key] == undefined ) && delete whereClause[key]);
		delete filter["groupBy"];
		delete filter["fromDate"];
		delete filter["tillDate"];
		console.log("FILTER.. ");
		console.log(filter);
		filter = AggregationService.convertArrayIntoIn(filter);
		console.log(" NEW FILTER.. ");
		console.log(filter);
		AggregationService.groupByCount( filter, group , function( err, tasks){
			console.log(tasks);
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
							Severity.find().exec(function (err, severity) {
								if(err) res.render('404');
								Application.find().exec( function (err, app) {
									if(err) res.render('404');
									res.render('extChart',{ chartData : tasks, severity : severity,areas : areas, status:status, users : users, tasktypes: taskTypes,app:app } );
								});
							});
						});
					});
				});
			});
		});
	},

	chartFilterAjax : function (req, res) {
		var filter = req.allParams();
		console.log("START");
		console.log(filter);
		var fromDate = filter["fromDate"];
		var tillDate = filter["tillDate"];
		var criterion = {};
		Object.keys(filter).forEach((key) => (filter[key] == null || filter[key] == '' || filter[key] == "" || filter[key] == undefined ) && delete filter[key]);
		//format fromDate
		if( fromDate ){
			var dater = fromDate.split("/");
			var from = new Date( dater[2], dater[1] - 1, dater[0]);
			criterion["$gte"] = from;
		}
		if( tillDate){
			var dater = tillDate.split("/");
			var till = new Date( dater[2], dater[1] - 1, dater[0]);
			criterion["$lte"] = till;
		}
		//var whereClause = {};
		if( Object.keys( criterion ).length != 0){
					filter["workDate"] = criterion;
		}
		Object.keys(filter).forEach((key) => (filter[key] == null || filter[key] == '' || filter[key] == "" || filter[key] == undefined ) && delete filter[key]);
		var group = filter['groupBy'];
		if( group  ==undefined) group = 'severity';
		//Object.keys(whereClause).forEach((key) => (whereClause[key] == null || whereClause[key] == '' || whereClause[key] == "" || whereClause[key] == undefined ) && delete whereClause[key]);
		delete filter["groupBy"];
		delete filter["fromDate"];
		delete filter["tillDate"];
		console.log("FILTER.. ");
		console.log(filter);
		filter = AggregationService.convertArrayIntoIn(filter);
		console.log(" NEW FILTER.. ");
		console.log(filter);
		AggregationService.groupByCount( filter, group , function( err, tasks){
			console.log(tasks);
			if(err) throw err;
			res.send({ chartData : tasks } );
		});
	}


};
