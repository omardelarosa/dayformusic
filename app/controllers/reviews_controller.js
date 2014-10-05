var moment = require('moment')
  , mongo = require('mongoskin')
  , db = mongo.db(process.env.MONGOLAB_URI, {native_parser:true});

module.exports = {

  today: function (req, res, next ) {

    db.bind('reviews')

    db.reviews
      .find({
        _date: new Date(moment().startOf('day').toString())
      })
      .toArray(function (err, results) {
        res.send(results)
        db.close()
      })

  },

  latest: function (req, res, next) {

    db.bind('reviews')

    db.reviews.find({})
      .sort({ _date: -1})
      .limit(5)
      .toArray(function (err, results) {
        res.send(results)
        db.close()
      })

  }

}