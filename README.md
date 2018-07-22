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
curl http://localhost:3000/engage/thing post {name: 'Thing 1'}
```

## Mongo issues

Doesn't start or can't find it
```
sudo systemctl unmask mongodb
Unit mongodb.service does not exist, proceeding anyway.
sudo service mongod start
```

## Posible additions:

* [http://www.passportjs.org/](http://www.passportjs.org/)
* [https://github.com/hdngr/sriracha](https://github.com/hdngr/sriracha)
* [https://www.npmjs.com/package/mollusc](https://github.com/hdngr/sriracha)

## Credits

* [https://expressjs.com/](https://expressjs.com/)
* [http://mongoosejs.com/](http://mongoosejs.com/)
* [https://mochajs.org/](https://mochajs.org/)
* [http://www.chaijs.com/](http://www.chaijs.com/)
* [http://sinonjs.org/](http://sinonjs.org/)
* [https://github.com/underscopeio/sinon-mongoose](https://github.com/underscopeio/sinon-mongoose)


## These were helpful

 * [https://www.djamseed.com/2016/03/30/building-restful-apis-with-express-and-mongodb/](https://www.djamseed.com/2016/03/30/building-restful-apis-with-express-and-mongodb/)
 * [https://medium.com/nongaap/beginners-guide-to-writing-mongodb-mongoose-unit-tests-using-mocha-chai-ab5bdf3d3b1d](https://medium.com/nongaap/beginners-guide-to-writing-mongodb-mongoose-unit-tests-using-mocha-chai-ab5bdf3d3b1d)
 * [https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai](https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai)
