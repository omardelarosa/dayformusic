var Backbone = require('backbone');
var moment = require('moment');

module.exports = Backbone.Collection.extend({
  
  initialize: function(opts){
    var opts = opts || {};
    
    this.date = opts.date ? moment(opts.date) : moment();
  },

  model: require('../models/review'),
  
  url: '/reviews/latest',

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