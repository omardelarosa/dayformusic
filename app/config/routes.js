var controllers = require('../controllers');

module.exports = function (app) {

  app.get('/reviews/latest', controllers.reviews.latest )

  app.get('/reviews/averages', controllers.reviews.averages )

  app.post('/subscribers', controllers.subscribers.create )

}