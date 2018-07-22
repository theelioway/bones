![](elio-bones-logo.png)

# bones

Simple, universal api for Schema.org models done the elioWay.

> Dropping the pretence one thing is so different from another.
**Tim Bushell**

## Seeing is believing

```bash
git clone https://gitlab.com/elioschemers/bones/
cd bones
npm install
npm run devstart
```

## Usage

```bash
curl -i -X PUT -H 'Content-Type: application/json' -d '{"numberofsaves": "272"}' http://localhost:3001/api/v1/projects/5593c8792fee421039c0afe6
```

## Mongo issues

Doesn't start or can't find it
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

### Core Ta Very Much

* [https://expressjs.com/](https://expressjs.com/)
* [http://mongoosejs.com/](http://mongoosejs.com/)
* [https://mochajs.org/](https://mochajs.org/)
* [http://www.chaijs.com/](http://www.chaijs.com/)
* [http://sinonjs.org/](http://sinonjs.org/)
* [https://github.com/underscopeio/sinon-mongoose](https://github.com/underscopeio/sinon-mongoose)
* [https://www.npmjs.com/package/mollusc](https://www.npmjs.com/package/mollusc)
