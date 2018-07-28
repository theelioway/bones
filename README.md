![](elio-bones-logo.png)

# bones

> Dropping the pretence one thing is so different from another.
**Tim Bushell**

Simple, cruddy Rest API for Schema.org models done the elioWay.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Seeing is believing

```bash
git clone https://gitlab.com/elioschemers/bones/
cd bones
npm install
npm run devstart
```

## Usage

Welcome to this special README on this branch only. So the problem is this.

bones is an agnostic rest api which will be functioned (the elioWay) based on Schema.org `Things`

sinner is a webscraper which builds mongoose schemas based on Schema.org `Things`

Clearly... bones is dependant on sinner. I even have **sinner** as a dependencies in package.

So why do I have sinner modules requiring a bones module? Because I'm dumb.

Okay, but this is what tests are for. The solution to the test solves a design flaw.

This branch holds the error and my fixes.

// We want to be able to do this:
```ejs
<%= _NAME %>.plugin(require('adon'))
```

So we moved adon as a main module into spider. Significantly it sits above schema. This is how we shall proceed.

Here we go.

Moving adon from bones/models to sinners/root fixes everything. very few changes. big change.

So then I moved adon into sinners and got the tests working with adon as a module in the root if spiders.

## Seeing is believing

```bash
git clone https://gitlab.com/elioschemers/bones/
git checkout schoolboyerror
npm install
npm test
npm run devstart
```

## Curling is believing

Get all Things
```bash
curl -X GET http://localhost:3000/engage/Thing
```

Add a Thing
```bash
curl -X POST http://localhost:3000/engage/Thing \
    -d name='Thing 1' \
    -d disambiguatingDescription='Disambiguating the first thing we ever added'
```

Get a Thing
```bash
curl -X GET http://localhost:3000/engage/Thing/5b55beed33fa1d4ed364c85f
```

Update a Thing
```bash
curl -X PUT http://localhost:3000/engage/Thing/5b55beed33fa1d4ed364c85f \
    -d alternateName='Thing 1 is the King of Things' \
    -d description='There is a thing, then there is Thing 1. No two things are the same. Thing 1 is best.'
```

Remove Thing by ID
```bash
curl -X DELETE http://localhost:3000/engage/Thing/5b55beed33fa1d4ed364c85f
```

## Mongo issues

Post Install: Doesn't start or can't find it
```
sudo systemctl unmask mongodb
Unit mongodb.service does not exist, proceeding anyway.
sudo service mongod start
```

## Credits

### These might be helpful

* [http://www.passportjs.org/](http://www.passportjs.org/)
* [https://github.com/hdngr/sriracha](https://github.com/hdngr/sriracha)
* [https://www.npmjs.com/package/mangostana](https://www.npmjs.com/package/mangostana)

### These were helpful

* [Basics of route controllers and Rest APIs](https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd)
* [Basics of building node driven Rest APIs](https://www.djamseed.com/2016/03/30/building-restful-apis-with-express-and-mongodb/)
* [Basics of testing node driven Rest APIs](https://medium.com/nongaap/beginners-guide-to-writing-mongodb-mongoose-unit-tests-using-mocha-chai-ab5bdf3d3b1d)
* [Basics of testing node driven Rest APIs](https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai)
* [Reusable mocha test suites](https://stackoverflow.com/questions/26107027/running-mocha-setup-before-each-suite-rather-than-before-each-test)

### Core! Ta Very Much

* [https://expressjs.com/](https://expressjs.com/)
* [http://mongoosejs.com/](http://mongoosejs.com/)
* [https://mochajs.org/](https://mochajs.org/)
* [http://www.chaijs.com/](http://www.chaijs.com/)
* [http://sinonjs.org/](http://sinonjs.org/)
* [https://github.com/underscopeio/sinon-mongoose](https://github.com/underscopeio/sinon-mongoose)
* [https://www.npmjs.com/package/mollusc](https://www.npmjs.com/package/mollusc)

![](apple-touch-icon.png)
