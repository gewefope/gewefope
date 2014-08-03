'use strict'

var request = require('request'),
    should = require('should');


describe('Test for HTTP status code handling', function () {
    var port = process.env.PORT || 3000;

    require('../server.js');

    it('Test for 200 handling', function (done) {
        request.get('http://localhost:' + port + '/', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for 404 error handling', function (done) {
        request.get('http://localhost:' + port + '/unreal-page', function (err, res) {
            res.statusCode.should.equal(404);
            done();
        })
    });

});