var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({
  initialize: function(opts){
    // var opts = opts || {};
    
    // this.date = opts.date ? moment(opts.date) : moment();
  },

  url: '/reviews/averages',

})