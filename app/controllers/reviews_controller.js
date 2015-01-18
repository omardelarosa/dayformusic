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

  },

  topArtists: function(req, res, next) {
    db.bind('reviews')

    db.reviews
      .aggregate(
        [
          { 
            $match : {
              artist : { $not: { $eq: "Various Artists" } }
            }
          },
          {
            $group: { 
                _id: "$artist", 
                scoreAvg: { 
                  $avg: "$score" 
                },
                totalReviews: {
                  $sum: 1
                }
              }
          },
          { $sort: { totalReviews: -1, scoreAvg: 1 } },
          { $limit : 50 }
        ],
        function (err, results) {
          if (err) { res.send(500); return; }
          res.send(results)
          db.close()
        }
      )
  },

  topReviewers: function(req, res, next) {
    db.bind('reviews')

    db.reviews
      .aggregate(
        [
          {
            $group: { 
                _id: "$author", 
                scoreAvg: { 
                  $avg: "$score" 
                },
                totalReviews: {
                  $sum: 1
                }
              }
          },
          { $sort: { totalReviews: -1, scoreAvg: 1 } },
          { $limit : 50 }
        ],
        function (err, results) {
          if (err) { res.send(500); return; }
          res.send(results)
          db.close()
        }
      )
  },

  averages: function (req, res, next) {
    db.bind('reviews')

    db.reviews.aggregate(
        [ 
          { 
            $group: { _id: "$_date", 
                avgScore: { 
                  $avg: "$score" 
                }, 
              }
          },
          { $sort: { _id: 1 } },
          // { $skip: 2 }
        ],
        function (err, results) {
          if (err) { res.send(500); 
          console.log("ERROR", err);
            return; 
          }
          res.send(results)
          db.close()
        }
      )
  }

}