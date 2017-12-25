


var AggregationService = {

  groupByCount : function ( match, groupColumn, callback) {
    var group = {	_id : { },count : { "$sum": 1 }};
    group["_id"][groupColumn] = "$" + groupColumn;
    var sortCol = "_id."+groupColumn;
    var sort = {};
    sort[sortCol] = -1;
    console.log(sort);
    console.log("....AGREEGATION CONDITION....");
    console.log(group["_id"][groupColumn]);
    Task.native( function( err, collection) {
      var condition = [
        { $match : match },
        { $group : group },
        { $sort  : sort  }
      ];

      collection.aggregate(condition).toArray( function( err, results){
        if(err) callback(err,null);
        console.log(results);
        if( results.length > 0 ){
          var chartData = {};
          var chartDataLabel = [];
          var chartDataSeries = [];
          for( var i = 0 ; i < results.length; i++){
            var label = results[i]["_id"][groupColumn];
            var count    = results[i]["count"];;
            chartDataLabel.push(label);
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

  convertArrayIntoIn : function ( filter) {
    var convertedFilter = {};
    var keySet = Object.keys(filter);
    for( var i = 0 ; i < keySet.length; i++){
      var key = keySet[i];
      var value = filter[key];
      if( value instanceof Array   ){
        var newValue = {};
        newValue["$in"] = value;
        convertedFilter[key] = newValue;
      }else{
        convertedFilter[key] = value;
      }
    }
    return convertedFilter;
  }

};


module.exports = AggregationService;
