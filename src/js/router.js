var $ = require("jquery");
var Backbone = require('backbone');
var HomeView = require('./views/home');
var bodyTemplate = require('../templates/body');
var Day = require('./collections/day');
var App = require('./app');

Backbone.$ = $;

module.exports = Backbone.Router.extend({

  routes: {
    "(/)":            "today",
  },


  today: function() {
    // null args means today

    var app = new App({
      day: new Day()
    });

    window._d4m = app;

  }

});