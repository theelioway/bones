// All mocha tests sit inside an super 'describe', which is why `before`
// and `after` run ONLY ONCE before and after the entire test runs and
// `beforeEach` and `afterEach` will run before and after every individual
// test.

before(function (done) {
  require('dotenv').config()
  done()
})

beforeEach(function () {
  // runs after each test in this block
})

afterEach(function () {
  // runs after each test in this block
})

after(function () {
  // console.log('Tests have completed');
})
