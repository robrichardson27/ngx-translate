var JSONstringify = require('json-stringify-safe');
var XliffConv = require('xliff-conv');

var file = './src/locale/messages.en.xlf';
var jsonFile = './src/locale/en.json';
console.log(file);
var xliffConv = new XliffConv();

      //var bundle, bundlePath;
    //  var base = path.basename(file.path, '.xlf').match(/^(.*)[.]([^.]*)$/);
var xliff = String(file.contents);
console.log(xliff);
      //if (base) {
      //  try {
        //  bundlePath = path.join(file.base, 'locales', 'bundle.' + base[2] + '.json');
        //  bundle = JSON.parse(stripBom(fs.readFileSync(bundlePath, 'utf8')));
          xliffConv.parseXliff(xliff, /*{ bundle: bundle },*/ function (output) {
            jsonFile.contents = new Buffer(JSONstringify(output, null, 2));
            //jsonFile.path = bundlePath;
            callback(null, file);
          });
        }
        catch (ex) {
          callback(null, file);
        }
      }
      else {
        callback(null, file);
      }
    }))
    .pipe(gulp.dest('app'))
    .pipe($.size({
      title: 'import-xliff'
    }));
});
