var $ = require("jquery");
var bodyTemplate = require('../templates/body');

window.onload = function(){
  console.log("feed me js!!");
  document.body.innerHTML += bodyTemplate();

  $.getJSON('/reviews/latest', function(data) {
    console.log("data", data)
    data.forEach(function(item, idx) {
      console.log(item)
      $('.splash-subhead').append("<img width='50px' src='"+item.cover+"'/>");
    })
  })

};
