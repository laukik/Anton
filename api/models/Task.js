/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    employeeId : {
      type : 'integer',
      required : true
    },
    taskType : {
      type : "String",
      required : true
    },
    workDate : {
      type : "Date",
      required : true
    },
    description:{
      type : "String",
      required : false
    },
    status:{
      type : "String",
      required : false
    },
    area:{
      type : "String",
      required : false
    },
    taskId : {
      type : "String",
      required : false
    }
  }

  // beforeCreate : function ( values, callback) {
  //
  //   // Task.count().exec( function(err, num) {
  //   //         if (err) return cb(err);
  //   //         values.typeId = num;
  //   //         callback();
  //   // });
  // }
};
