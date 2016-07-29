'use strict';

var supertest = require('supertest');
var app = require('../server/server');

describe('POST /create/model with empty bory', function() {
  it('Fail on empty body', function(done) {
    supertest(app)
      .post('/create/model')
      .set('Accept', 'application/json')
      .expect(500, done);
  });
});

describe('POST /create/model with empty fields', function() {
  it('Success on empty fields', function(done) {
    supertest(app)
      .post('/create/model')
      .type('json')
      .send('{"name": "Product", "fields": {}}')
      .expect(200, done);
  });
});

describe('POST /create/model with one field', function() {
  it('Success with one field', function(done) {
    supertest(app)
      .post('/create/model')
      .type('json')
      .send('{"name": "Product", "fields": {"name": "string"}}')
      .expect(200, done);
  });
});

describe('GET /create/model', function() {
  it('Does not accept GET', function(done) {
    supertest(app)
      .get('/create/model')
      .expect(404, done);
  });
});

describe('POST /create/model and check creation', function() {
  it('Create a new model and GET', function(done) {
    var agent = supertest(app);
    agent
      .post('/create/model')
      .type('json')
      .send('{"name": "Product", "fields": {"name": "string"}}')
      .end(function(err, res) {
        if (err) return done(err);
        agent
          .put('/api/Products')
          .type('json')
          .send('{"name": "banana"}')
          .end(function(err, res) {
            if (err) return done(err);
            agent
		      .get('/api/Products')
		      .set('Accept', 'application/json')
		      .expect(200, [{name: 'banana', id: 1}], done);
          });
      });
  });
});
