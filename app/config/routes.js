var controllers = require('../controllers');

module.exports = function (app) {

  app.get('/reviews/latest', controllers.reviews.latest )

  app.get('/reviews/single-day', controllers.reviews.singleDay )

  app.get('/reviews/averages', controllers.reviews.averages )

  app.get('/reviews/top-artists', controllers.reviews.topArtists )

  app.get('/reviews/top-reviewers', controllers.reviews.topReviewers )

  app.get('/charts/bundle', controllers.reviews.chartDataBundle )

  app.post('/subscribers', controllers.subscribers.create )

}