'use strict'

var request = require('request'),
    should = require('should');


describe('Test api working', function () {
    var port = process.env.PORT || 3000;

    require('../server.js');

    it('Test for /api/weather/', function (done) {
        request.get('http://localhost:' + port + '/api/v1/weather/coords/-16.92/145.77', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/forecast/coords/', function (done) {
        request.get('http://localhost:' + port + '/api/v1/forecast/coords/-16.92/145.77', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/weather/city/', function (done) {
        request.get('http://localhost:' + port + '/api/v1/weather/city/2172797', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/forecast/city/', function (done) {
        request.get('http://localhost:' + port + '/api/v1/forecast/city/2172797', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/search/', function (done) {
        request.get('http://localhost:' + port + '/api/v1/search/moscow', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

    it('Test for /api/v1/user/me', function (done) {
        request.get('http://localhost:' + port + '/api/v1/user/me?sid=123', function (err, res) {
            res.statusCode.should.equal(200);
            done();
        });
    });

});