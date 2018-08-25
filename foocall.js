const importFresh = require('import-fresh');
var foo = null

foo = require('./foo')
console.log(foo.eyeeye())
//=> 1

foo = require('./foo')
console.log(foo.eyeeye())
//=> 2

foo = importFresh('./foo')
console.log(foo.eyeeye())
//=> 1

foo = importFresh('./foo')
console.log(foo.eyeeye())
//=> 1
