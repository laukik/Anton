/**
* Route Mappings
* (sails.config.routes)
*
* Your routes map URLs to views and controllers.
*
* If Sails receives a URL that doesn't match any of the routes below,
* it will check for matching files (images, scripts, stylesheets, etc.)
* in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
* might match an image file: `/assets/images/foo.jpg`
*
* Finally, if those don't match either, the default 404 handler is triggered.
* See `api/responses/notFound.js` to adjust your app's 404 logic.
*
* Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
* flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
* CoffeeScript for the front-end.
*
* For more information on configuring custom routes, check out:
* http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
*/

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/signup': {
    controller : 'UserController',
    action : 'signup'
  },

  'get /' : {
    controller : 'UserController',
    action : 'home'
  },
  'get /home' : {
    controller : 'UserController',
    action : 'home'
  },
  'get /logout' : {
    controller : 'UserController',
    action : 'logout'
  },


  /*************************** TAKS*******************************************/

  'post /task' : {
    controller : 'TaskController',
    action : 'create'
  },

  'post /task/update' : {
    controller : 'TaskController',
    action : 'updateTask'
  },

  'get /task' : {
    controller : 'TaskController',
    action : 'show'
  },

  'post /task/show' : {
    controller : 'TaskController',
    action : 'updateTask'
  },

  /*************************** ROLE*******************************************/
  'post /role' : {
    controller : 'RoleController',
    action : 'create'
  },

  /*************************** AREA*******************************************/
  'post /area' : {
    controller : 'AreaController',
    action : 'create'
  },
  'get /area/show' : {
    controller : 'AreaController',
    action : 'show'
  },
  'get /area' : {
    controller : 'AreaController',
    action : 'show'
  },
  /*************************** AREA*******************************************/
  'post /status' : {
    controller : 'StatusController',
    action : 'create'
  },
  'get /status/show' : {
    controller : 'StatusController',
    action : 'show'
  },
  'get /status' : {
    controller : 'StatusController',
    action : 'show'
  },
  /*************************** USER*******************************************/
  'post /user' : {
    controller : 'UserController',
    action : 'create'
  },
  'get /user/show' : {
    controller : 'UserController',
    action : 'show'
  },
  'get /user' : {
    controller : 'UserController',
    action : 'show'
  },
  'get /validateUserExists' : {
    controller : 'UserController',
    action : 'validateUserExists'
  },
  /*************************** TAKS*******************************************/

  'post /taskType' : {
    controller : 'TaskTypeController',
    action : 'create'
  },

  'get /taskType' : {
    controller : 'TaskTypeController',
    action : 'show'
  },

  'get /taskType/show' : {
    controller : 'TaskTypeController',
    action : 'show'
  },

  /********************************************************/
  'post /filter' : {
    controller : 'FilterController',
    action : 'filter'
  },

  'get /filter' : {
    controller : 'FilterController',
    action : 'filter'
  },

  'get /chartFilter' : {
    controller : 'FilterController',
    action : 'chartFilter'
  },

  'post /chartFilter' : {
    controller : 'FilterController',
    action : 'chartFilter'
  },

  'post /chartFilterAjax' : {
    controller : "FilterController",
    action : "chartFilterAjax"
  },
  /********************************************************/

  'post /severity' : {
    controller : 'SeverityController',
    action : 'create'
  },

  'get /severity' : {
    controller : 'SeverityController',
    action : 'show'
  },

  /********************************************************/
  'get /charts' : {
    controller : 'FilterController',
    action : 'chartData'
  },

  'get /defectChart' : {
    controller : 'FilterController',
    action : 'defectDistro'
  },

  'get /chartFilterLine' : {
    controller : 'FilterController',
    action : 'showLine'
  },
  /********************************************************/
  'post /application' : {
    controller : 'ApplicationController',
    action : 'create'
  },

  /********************************************************/
  'get /application' : {
    controller : 'ApplicationController',
    action : 'show'
  },

  /***********         PASSPORT *************************/
  'get /login' : {
    controller : 'UserController',
    action : 'login'
  },

  'post /login' : {
    controller : 'UserController',
    action : 'authUser'
  },

  'get /allowAdmin' : {
    controller : 'UserController',
    action : 'admin'
  },

  'post /allowAdmin' : {
    controller : 'UserController',
    action : 'allowAdmin'
  }

};
