/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username : {
      type : "String",
      required : true
    },
    ntnet : {
      type : "String",
      required : true,
      unique : true
    },
    employeeId : {
      type : "String",
      required : true,
      unique : true
    },
    role :{
      type : "String",
      required : true
    },
    supervisior : {
      type : "String",
      required : true
    },
    password : {
      type : "String",
      required : true
    },

    beforeCreate : function ( userData, next){
      bcrypt.hash(userData.password, 20, function(err, hash) {
        userData.password = hash;
        next();
      });
    }
};
