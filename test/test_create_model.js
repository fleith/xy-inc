'use strict';

var supertest = require('supertest');
var app = require('../server/server');

describe('POST /create/model', function() {
  it('Fail on empty body', function(done) {
    supertest(app)
      .post('/create/model')
      .set('Accept', 'application/json')
      .expect(500, done);
  });
});
