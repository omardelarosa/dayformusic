var moment = require('moment')
  , mongo = require('mongoskin')
  , db = mongo.db(process.env.MONGOLAB_URI, {native_parser:true});

module.exports = {

  create: function (req, res, next) {
  
    db.bind('subscribers')

    var email = req.body.email || null;
    var score_threshold = req.body.score_threshold || 0;
    var first_name = req.body.first_name || null;
    var last_name = req.body.last_name || null;
    // res.send(req.body)

    var subscriber = {
      email: email,
      score_threshold: parseFloat(score_threshold),
      first_name: first_name,
      last_name: last_name
    }

    db.subscribers.insert(subscriber, function (err, doc) {
      if (err) { res.send(500); return; }
      res.send(doc)
    })
  }

}