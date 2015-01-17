var $ = require("jquery");
var jQuery = $;
var bodyTemplate = require('../templates/body');
var Router = require("./router");
var Backbone = require('backbone');
var d3 = require('d3');
var c3 = require('c3');

Backbone.$ = $;

$(function(){

  new Router();

  Backbone.history.start()

})
