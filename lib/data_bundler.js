var Q                 = require('q');
var path              = require('path');
var fs                = require('fs');
var reviewsController = require('../app/controllers/reviews_controller');

var outputFilename    = path.join(process.cwd(), 'public', 'dataBundle.js');
reviewsController.__getDataBundlePromise()
  .catch(function(err) {
    console.error(err);
    process.exit(1);
  })
  .then(function(bundle) {
    try {
      fs.writeFileSync(
        outputFilename, 
        'var __dataBundle = '+JSON.stringify(bundle)+';'
      );
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  });
