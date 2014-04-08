AngularJS Practices
====================

A collection of examples and best practices for AngularJS projects.

More introductory info can be found here:
https://docs.google.com/a/tivix.com/document/d/1TbSmSOTqYwxzEMFbVp2XGRNPiMCcWOuf_EM8MjRXdQQ/edit?usp=sharing

Installation
============

Note: I am assuming that you already have node.js installed as well as grunt CLI, etc.  Please install the following components before proceeding.
 - Node: http://nodejs.org/
 - Yeoman: http://yeoman.io/gettingstarted.html
 - Grunt: http://gruntjs.com/getting-started
 - Batarang: https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk?hl=en

Go to your work directory by running `cd ~/work`

Run `git clone git@github.com:Tivix/AngularJSPractices.git AngularJSPractices`

Then run `npm install`

And finally, run `bower install`

Run Locally
===========

From your working directory, run `grunt serve`

Reference
=========

To bootstrap a project with Yeoman, run `yo angular`

To create a new route, run `yo angular:route <route name>`

To create a new controller, run `yo angular:controller <controller name>`

To create a new service, run `yo angular:service <service name>`

To create a new directive, run `yo angular:directive <directive name>`

To create a new filter, run `yo angular:filter <filter name>`

Search for Javascript libraries by running `bower search <package name>`

Install a Javascript library and save it to the project by running `bower install <package name> --save`
