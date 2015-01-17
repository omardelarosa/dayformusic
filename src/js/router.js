var $ = require("jquery");
var Backbone = require('backbone');
var HomeView = require('./views/home');
var bodyTemplate = require('../templates/body');
var Day = require('./collections/day');

Backbone.$ = $;

module.exports = Backbone.Router.extend({

  routes: {
    "(/)":            "today",
  },


  today: function() {
    window._d4m = {};
    var view = new HomeView.Body();
    var day = new Day();
    window._d4m.main_view = view;
    window._d4m.current_day = day;
    
    day.fetch()
    view.render();
  }

})