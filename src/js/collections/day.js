var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Collection.extend({
  
  initialize: function(opts){
    var opts = opts || {};
    this.latest = true;
    this.hasLoaded = false;
    this.date = opts.date ? moment(opts.date) : moment();
  },

  model: require('../models/review'),
  
  url: function(){
    if (this.latest) {
      return '/reviews/latest';
    } else {
      return '/reviews/single-day?date='+moment(this.date).format('YYYY-MM-DD');
    }
  },

  changeDayTo: function(newDate) {
    var self = this;
    if (newDate === "" || !newDate) {
      this.date = moment();
      this.latest = true
      this.fetch()
        .done(function(data){
          self.trigger('daySet');
        });
    } else {
      this.date = moment(newDate);
      this.latest = false;
      this.fetch()
        .done(function(data){
          self.trigger('daySet');
        });
    }
  },

  fmtDate: function() {
    return this.date.format('MMMM Do YYYY');
  },

  getAverage: function(){
    if (this.models.length == 0) { return 0 };

    var total = this.reduce(function(memo, review){
      return memo + review.get('score')
    }, 0)
    return total / this.models.length;
  }
})