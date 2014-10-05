var controllers = require('../controllers');

module.exports = function (app) {

  app.get('/reviews/latest', controllers.reviews.latest )

}