# Sol.js
Node.js framework built around Express.js

[![Build Status](https://travis-ci.org/isuttell/Sol.js.svg)](https://travis-ci.org/isuttell/Sol.js)

- - -

## Description
An experiment in creating a simple and lean node.js framework that forces
strong coding standards and unit testing techniques.


## Dev Installation

1. `git clone https://github.com/isuttell/Sol.js.git; cd Sol.js`
2. `npm install`
3. `npm test` // Make sure everything installed correctly
4. `./bin/create-hooks-symlinks` // Setup sync git hooks
5. `grunt` // Asset pipline and testing
6. `node app.js` // Or alternative process manager, e.g.
7. Open `http://localhost:3001` in a web browser.

## Assets
Assets are located in the `assets` folder. Grunt automatically processes any
changes in this folder into the `.tmp` directory. During this process things
like Compass/SCSS are run. Everything in this folder should not be compressed or
minified. By default, the app uses `.tmp/public` as a static folder.

For production, run `grunt build` this copies and compiles the assets into the
`www` folder. This is the folder that should be used as the static asset folder
on a production server.


## Routes

Routes are defined in `config/routes.js`:

````
// Format
'VERB /uri' : '*Controller.action',

// Examples
'GET /' : 'IndexController.index',
'GET /users' : 'UserController.index',
'POST /user' : 'UserController.post',
````


## Model

Sol.js use [Waterline](https://github.com/balderdashy/waterline) as an ORM.
Model definitions are automaticall loaded from the `api/models/` folder. Only
files ending in `Model.js` are read, e.g. `UserModel.js`.

````
module.exports = {

  identity: 'User', // This name is used in Controllers to access it

  connection: 'localDisk', // Adapter defined in config/connections

  attributes: {
    firstName: 'string',
    lastName: 'string'
  }

};
````


## Controllers

Controllers are automatically loaded from the `api/controllers/` folder. Only
files ending in `Controller.js` are read, e.g. `HomeController.js`.

````
module.exports = function(sol){
  return {
    // This action is passed directly to express. req and res allow access
    // to Express.js request and response objects
    index: function(req, res) {
      sol.user.find().exec(function(err, model){
        if(err) {
          res.status(500).send('Unable to create model');
        }
        return res.json(model);
      });
    },
    projects: function(req, res) {
      return res.render('projects');
    }
  };
}
````

## Views

Views are located in the views folder and use ejs by default; To render a view,
use the `res.render(view, data)` function in a controller action.


## Coding Standards and Unit Testing
All JS follows [Google Coding Standards](https://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml). This can be changed in `.jscsrc`. Every time
grunt detects a change in code, it automatically checks for linting issues,
coding standards, and unit tests. Prior to every commit, all three must pass.

## Grunt Configuration
Grunt configuration files are split into two directorys and automatically loaded.
Each task gets its own file in the `tasks/config` directory. Additional custum
tasks are registered in the `tasks/regsiter` folder.


### Sessions
Be default cookies are used. To enable Redis, uncomment out the adapter line in
`config/sessions.js`

````
  // adapter: 'redis', // Uncomment this to enable

  redis: {
    host: 'localhost',
    port: 6379,
    ttl: 24 * 60 * 60,
    db: 0,
    pass: 'secret',
    prefix: 'sess:'
  }
````

### Bower
Bower components are automatically installed in the `assets/components` folder
and intergrated into the asset pipeline

### Todo

* Split `app` into it's own module
* Create better example
* Setup CORs for APIs
* Create better environment switching
* Implement better logging system
* Implement CSRF
