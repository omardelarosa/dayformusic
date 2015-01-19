var moment = require('moment')
  , mongo = require('mongoskin')
  , db = mongo.db(process.env.MONGOLAB_URI, {native_parser:true})
  , Q = require('q');

// DB functions as promises

function handleError(err, res) {
  console.log("ERROR", err);
  res.send(500)
}

function closeDb(db) {
  db.close();
}

function getAverages (db)  {
  return Q.Promise(function(resolve, reject, notify) {
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
        ],
        function (err, docs) {
          if (err) { 
            return reject(err);
          }
          resolve(docs)
        }
      )
  });
}

function getToday (db) {
  return Q.Promise(function(resolve, reject, notify){
    db.reviews
      .find({
        _date: new Date(moment().startOf('day').toString())
      })
      .toArray(function (err, docs) {
        if (err) { return reject(err); }
        resolve(docs)
      })
  })
}

function getLatest (db) {
  return Q.Promise(function(resolve, reject, notify){
    db.reviews.find({})
      .sort({ _date: -1})
      .limit(5)
      .toArray(function (err, docs) {
        if (err) { return reject(err); }
        resolve(docs)
      })
  })
}

function getSingleDay (db, date) {
  var d = new Date(moment(date).startOf('day'));
  return Q.Promise(function(resolve, reject, notify){
    db.reviews
      .find({
        "_date": d
      })
      .toArray(function (err, docs) {
        if (err) { return reject(err); }
        resolve(docs)
      })
  })
}

function getTopArtists (db) {
  return Q.Promise(function(resolve, reject, notify){
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
        function (err, docs) {
          if (err) { return reject(err); }
          resolve(docs)
        }
      )
  })
}

function getTopReviewers (db) {
  return Q.Promise(function(resolve, reject, notify){
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
        function (err, docs) {
          if (err) { return reject(err); }
          resolve(docs)
        }
      )
  })
}

module.exports = {

  today: function (req, res, next ) {

    db.bind('reviews')

    getToday(db)
      .then(function(docs){
        res.send(docs)
      })
      .catch(handleError.bind(this) )
      .then(closeDb.bind(this, db) );

  },

  singleDay: function (req, res, next) {

    db.bind('reviews')

    var date = req.query.date || new Date();
    console.log("req", req.query, date );

    getSingleDay(db, date)
      .then(function(docs){
        res.send(docs)
      })
      .catch(handleError.bind(this) )
      .then(closeDb.bind(this, db) );

  },

  latest: function (req, res, next) {

    db.bind('reviews')

    getLatest(db)
      .then(function(docs){
        res.send(docs)
      })
      .catch(handleError.bind(this) )
      .then(closeDb.bind(this, db) );

  },

  topArtists: function(req, res, next) {
    db.bind('reviews')

    getTopArtists(db)
      .then(function(docs){
        res.send(docs)
      })
      .catch(handleError.bind(this) )
      .then(closeDb.bind(this, db) );
  },

  topReviewers: function(req, res, next) {
    db.bind('reviews')

    getTopReviewers(db)
      .then(function(docs){
        res.send(docs)
      })
      .catch(handleError.bind(this) )
      .then(closeDb.bind(this, db) );
  },

  averages: function (req, res, next) {
    db.bind('reviews')

    getAverages(db)
      .then(function(docs){
        res.send(docs)
      })
      .catch(handleError.bind(this) )
      .then(closeDb.bind(this, db) );
  },

  chartDataBundle: function(req, res, next) {
    
    var bundle = {};

    db.bind('reviews');

    getLatest(db)
      .then(function(docs){
        bundle["latest"] = docs;
      })
      .catch(handleError.bind(this) )
      .then(function(docs){
        return getAverages(db)
          .then(function(docs){
            bundle["averages"] = docs;
          })
          .catch(handleError.bind(this) )
      })
      .then(function(docs){
        return getTopArtists(db)
          .then(function(docs){
            bundle["artists"] = docs;
          })
          .catch(handleError.bind(this) )
      })
      .then(function(docs){
        return getTopReviewers(db)
          .then(function(docs){
            bundle["reviewers"] = docs;
          })
          .catch(handleError.bind(this) )
      })
      .catch(handleError.bind(this))
      .then(function(){
        res.send(bundle);
        closeDb.bind(this, db)
      });

  }

}