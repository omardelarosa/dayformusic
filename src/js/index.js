var bodyTemplate = require('../templates/body')

window.onload = function(){
  console.log("feed me js")
  document.body.innerHTML += bodyTemplate();
}
