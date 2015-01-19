var $ = require("jquery");
var Backbone = require('backbone');
var HomeView = require('./views/home');
var bodyTemplate = require('../templates/body');
var Day = require('./collections/day');
var App = require('./app');
var moment = require('moment');

Backbone.$ = $;

module.exports = Backbone.Router.extend({

  routes: {
    "(/)":            "today",
    "(/)d/:date":     "otherDay", 
    "(/):anything":   "today"
  },


  today: function() {
    // null args means today

    if (this.app) {
      this.app.day.changeDayTo();
      return;
    }

    this.app = new App({
      day: new Day()
    });

    window._d4m = this.app;

  },

  otherDay: function(date) {

    var d = moment(date).format('YYYY-MM-DD');

    if (this.app) {
      this.app.day.changeDayTo(d);
      return;
    } else {
      this.app = new App({
        day: new Day({
          date: d
        })
      });
      window._d4m = this.app;
    }
  }

});