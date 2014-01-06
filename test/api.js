'use strict'

var request = require('request'),
    should = require('should');


describe('Test api working\n', function () {
    var port = process.env.PORT || 3000;

    require('../server.js');

    it('Test for /api/weather/', function (done) {
        request.get('http://localhost:' + port + '/api/weather/-16.92/145.77', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/forecast/coords/', function (done) {
        request.get('http://localhost:' + port + '/api/forecast/coords/-16.92/145.77', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/weather/city/', function (done) {
        request.get('http://localhost:' + port + '/api/weather/city/2172797', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/forecast/city/', function (done) {
        request.get('http://localhost:' + port + '/api/forecast/city/2172797', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/search/', function (done) {
        request.get('http://localhost:' + port + '/api/search/moscow', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

});