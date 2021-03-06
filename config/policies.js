/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  '*': true,

  UserController: {
    '*': 'sessionAuth',
    login: true,
    signup: true,
    validateUserExists: true,
    authUser : true,
    create : true,
    logout : true,
    show :  ['sessionAuth', 'adminPolicy'],
    admin : ['sessionAuth', 'adminPolicy'],
    allowAdmin : ['sessionAuth', 'adminPolicy'],
    home : 'sessionAuth'
  },

  ApplicationController : {
      '*': ['sessionAuth', 'adminPolicy']
  },
  AreaController : {
      '*': ['sessionAuth', 'adminPolicy']
  },
  RoleController : {
      '*': ['sessionAuth', 'adminPolicy']
  },
  SeverityController : {
      '*': ['sessionAuth', 'adminPolicy']
  },
  StatusController : {
      '*': ['sessionAuth', 'adminPolicy']
  },
  TaskTypeController : {
      '*': ['sessionAuth', 'adminPolicy']
  },
  FilterController : {
      '*': 'sessionAuth'
  },
  TaskController : {
      '*': 'sessionAuth',
      updateTask : true
  }

};
