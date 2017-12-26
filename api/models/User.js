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
      required : true,
      unique : true
    },
    ntnet : {
      type : "String",
      required : true,
      unique : true
    },
    employeeId : {
      type : "integer",
      required : true,
      unique : true
    },
    application : {
      type : "String",
      required : true
    },
    admin : {
      type : "boolean",
      required : false
    }
    // role :{
    //   type : "String",
    //   required : true
    // },
    // supervisior : {
    //   type : "integer",
    //   required : true
    // },
    password : {
      type : "String",
      required : true
    },
    beforeCreate : function ( userData, next){
      bcrypt.hash(userData.password, 20, function(err, hash) {
        userData.password = hash;
        //Admin role can be given from backend Only...
        userData.admin = false;
        next();
      });
    }
    // beforeValidate : function (userData, next) {
    //   User.find({ "supervisior" : userData.supervisior }).exec( function (err, data) {
    //     if( !data ||Object.keys(data).length == 0){
    //       if( userData.supervisior != userData.employeeId){
    //           userData.supervisior = null;
    //       }
    //     }
    //     Role.find( { "role" : userData.role} ).exec( function (err, roleData) {
    //       if( !roleData ||Object.keys(roleData).length == 0){
    //           userData.role = null;
    //       }
    //       next();
    //     });
    //   });
     }

}
