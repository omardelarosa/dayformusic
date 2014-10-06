var $ = require("jquery");
var jQuery = $;
var bodyTemplate = require('../templates/body');
var Router = require("./router");
var Backbone = require('backbone');
Backbone.$ = $;

$(function(){
  
  new Router();

  Backbone.history.start()

})
