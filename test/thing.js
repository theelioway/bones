process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Thing = require('../bones/models/thing');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../bones/app');
let should = chai.should();

chai.use(chaiHttp);

describe('Things', () => {
  beforeEach((done) => {
    Thing.remove({}, (err) => {
      done();
    });
  });
  /*
   * Test the /GET route
   */
  describe('/GET thing', () => {
    it('it should GET no things', (done) => {
      chai.request(app)
        .get('/api/thing')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  /*
   * Test the /POST route
   */
  // describe('/POST thing', () => {
  //   it('it should not POST a thing without pages field', (done) => {
  //     let thing = {
  //       name: "This is Thing 1",
  //       alternateName: "This is really Thing 1",
  //       engaged: false
  //     }
  //     chai.request(server)
  //       .post('/api/thing')
  //       .send(thing)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('errors');
  //         res.body.errors.should.have.property('pages');
  //         res.body.errors.pages.should.have.property('kind').eql('required');
  //         done();
  //       });
  //   });
  // });
});
