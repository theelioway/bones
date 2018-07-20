var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/things',
    port: 3000
  },
  test: {
    db: 'mongodb://localhost/test_things',
    port: 8888
  },
  production: {
    // ...
  }
}
