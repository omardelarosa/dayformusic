var controllers = require('../controllers');

module.exports = function (app) {

  app.get('/reviews/latest', controllers.reviews.latest )

  app.post('/subscribers', controllers.subscribers.create )

}