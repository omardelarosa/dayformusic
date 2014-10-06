var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  
  model: require('../models/review'),
  
  url: '/reviews/latest',

  getAverage: function(){
    if (this.models.length == 0) { return 0 };
    
    var total = this.reduce(function(memo, review){
      return memo + review.get('score')
    }, 0)
    return total / this.models.length;
  }
})