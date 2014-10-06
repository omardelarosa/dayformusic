var $ = require("jquery");
var Backbone = require('backbone');
var HomeView = require('./views/home');
var bodyTemplate = require('../templates/body');
Backbone.$ = $;

module.exports = Backbone.Router.extend({

  routes: {
    "(/)":            "today",
  },


  today: function() {
    new HomeView.Body().render();
  }

})