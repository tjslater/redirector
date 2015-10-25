'use strict';

var _ = require('lodash');
var Re2 = require('./re2.model');
var User = require('../user/user.model');
var RE2 = require('re2');


exports.test = function (req, res) {
  var testCases = req.body;
  if (!testCases) { res.send({}); }
  testCases.forEach(function (testCase) {
    var re2 = new RE2(testCase.re);
    testCase.tests.map(function (test) {
      test.pass = re2.test(test.string);
      if (test.pass) {
        var newLocation = testCase.newLocation;
        test.groupings = re2.exec(test.string);
        test.groupings.shift();

        for (var i = 0; i < test.groupings.length; i++){
          var re = new RegExp('\\$' + i);
          newLocation = newLocation.replace(re, test.groupings[i]);
        }
        test.output = newLocation;
      }
    });
  });
  res.send(testCases);
};

exports.create = function(req, res) {
  Re2.create(req.body, function(err, re2) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(re2);
  });
};

exports.show = function(req, res) {
  Re2.findById(req.params.id, function (err, re2) {
    if(err) { return handleError(res, err); }
    if(!re2) { return res.status(404).send('Not Found'); }
    return res.json(re2);
  });
};

exports.getByUserId = function(req, res) {
  console.log(req.params);
  Re2.find({userId: req.params.id}, function(err, re2) {
    if(err) { return handleError(res, err); }
    if(!re2) { return res.status(404).send('Not Found'); }
    return res.status(200).json(re2);
  })
}

exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Re2.findById(req.params.id, function (err, re2) {
    if (err) { return handleError(res, err); }
    if(!re2) { return res.status(404).send('Not Found'); }
    re2.data = req.body.data;
    re2.description = req.body.description;
    re2.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(re2);
    });
  });
};

exports.destroy = function(req, res) {
  Re2.findById(req.params.id, function (err, re2) {
    if(err) { return handleError(res, err); }
    if(!re2) { return res.status(404).send('Not Found'); }
    re2.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}