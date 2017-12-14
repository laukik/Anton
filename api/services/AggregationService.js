


var AggregationService = {

  defectGroupingBySeverity : function (callback) {
    Task.native( function( err, collection) {
      var condition = [
        { $match :{'taskType' : "Defect"} },
        { $group :{	_id : {severity : "$severity"},count : { "$sum": 1 } } }
      ];
      collection.aggregate(condition).toArray( function( err, results){
        if(err) callback(err,null);
        console.log(results);
        if( results.length > 0 ){
          var chartData = {};
          var chartDataLabel = [];
          var chartDataSeries = [];
          for( var i = 0 ; i < results.length; i++){
            var severity = results[i]["_id"]["severity"];
            var count    = results[i]["count"];;
            chartDataLabel.push(severity);
            chartDataSeries.push(count);
          }
          chartData['label']  = chartDataLabel;
          chartData['series'] = chartDataSeries;
          console.log(chartData);
          callback(null, chartData);
        }else{
          callback(null,{});
        }
      });
    });
  },

  userChart : function (callback) {
    Task.native(function(err, collection) {
      if (err) throw err;
      var condition =  [
        { $group : { _id : {username : "$username"}, count : { "$sum": 1 } }}
      ];
      collection.aggregate(condition).toArray(function (err, results) {
        if(err) callback(err,null);
        console.log(results);
        if( results.length > 0){
          var userData = {};
          var userDataLabel = [];
          var userDataSeries = [];
          for( var i = 0 ; i < results.length; i++){
            var username = results[i]["_id"]["username"];
            var count    = results[i]["count"];;
            userDataLabel.push(username);
            userDataSeries.push(count);
          }
          userData['label']  = userDataLabel;
          userData['series'] = userDataSeries;
          console.log(userData);
          callback(null, userData);
        }else{
          callback(null,{});
        }
      });
    });
  }







};


module.exports = AggregationService;
