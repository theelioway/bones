// All mocha tests sit inside an super 'describe', which is why `before`
// and `after` run ONLY ONCE before and after the entire test runs and
// `beforeEach` and `afterEach` will run before and after every individual
// test.

before(function (done) {
  process.env.ENDOSKELETON = 'TestVersion'
  process.env.EXOSKELETON = 'boney'
  process.env.TESTDATABASENAME = 'testElioDb'
  process.env.MONGODB = 'mongodb://localhost:27017/'
  done()
})

beforeEach(function () {
  // runs after each test in this block
})

afterEach(function () {
  // runs after each test in this block
})

after(function (done) {
  // console.log('Tests have completed');
})
