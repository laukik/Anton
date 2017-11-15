/**
 * Task.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    typeId : {
      type : "integer",
      autoincrement : true
    },
    taskType : {
      type : "String",
      required : true
    }
  },

  beforeCreate : function ( values, callback) {
    Task.count().exec( function(err, num) {
            if (err) return cb(err);
            values.typeId = num;
            cb();
        });
  }
};
