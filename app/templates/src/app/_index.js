'use strict';

/**
 *
 * @ngdoc module
 * @module <%= appName %>
 * @name <%= appName %>
 * @description
 * This is a main module.
 *
 **/
angular.module('<%= appName %>', [<%= modulesDependencies %>])<%= routerJs %>;
