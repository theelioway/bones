![](elio-bones-logo.png)

# bones

> Dropping the pretence one thing is so different from another.
**Tim Bushell**

REST API for Schema.org mongoose schema spidered the elioWay.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Requirements

* [mongo server](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

### Mongo issues

Post Install: Doesn't start or can't find it
```bash
sudo mongo
```
Enter your sudo password then:

```shell
show dbs
```
If this works, you're good to go.

If you get an error like "I can't see a server":
```
sudo systemctl unmask mongodb
Unit mongodb.service does not exist, proceeding anyway.
sudo service mongod start
```
## Seeing is believing

```bash
git clone https://gitlab.com/elioschemers/bones/
cd bones
npm install
npm run devstart
```
## Curling is seeing

Get all Things
```bash
curl -X GET http://localhost:3030/engage/Thing
```

Add a Thing
```bash
curl -X POST http://localhost:3030/engage/Thing \
    -d name='Thing Red' \
    -d disambiguatingDescription='Thing is red'
```

Get a Thing
```bash
curl -X GET http://localhost:3030/engage/Thing/5b55beed33fa1d4ed364c85f
```

Update a Thing
```bash
curl -X PUT http://localhost:3030/engage/Thing/5b55beed33fa1d4ed364c85f \
    -d alternateName='Thing 1 is the King of Things' \
    -d description='There is a thing, then there is Thing 1. No two things are the same. Thing 1 is best.'
```

Remove Thing by ID
```bash
curl -X DELETE http://localhost:3030/engage/Thing/5b617b518598fe12ae92d634
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

## License

MIT © [Tim Bushell]()

[elioway](https://gitlab.com/elioway/way/blob/master/README.md)

![](apple-touch-icon.png)
