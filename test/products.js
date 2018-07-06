describe('Testing the products route', function () {

  var chai = require('chai')
    , chaiHttp = require('chai-http');
  var expect = require('chai').expect

  chai.use(chaiHttp);

  it('should list all products on /product GET', function (done) {
    var url = 'http://localhost:3000';
    chai.request(url)
      .get("/")
      .end(function (error, res) {
        expect(res).to.have.status(200);
        expect(res.body.products).to.be.an('array');
        expect(res.body.length).to.greaterThan(1);
        done();
      })
  });
});

