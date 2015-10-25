'use strict';

var _ = require('lodash');
var Temp = require('./temp.model');

// Get list of temps
exports.index = function(req, res) {
  Temp.find(function (err, temps) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(temps);
  });
};

// Get a single temp
exports.show = function(req, res) {
  Temp.findById(req.params.id, function (err, temp) {
    if(err) { return handleError(res, err); }
    if(!temp) { return res.status(404).send('Not Found'); }
    return res.json(temp);
  });
};

// Creates a new temp in the DB.
exports.create = function(req, res) {
  Temp.create(req.body, function(err, temp) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(temp);
  });
};

// Updates an existing temp in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Temp.findById(req.params.id, function (err, temp) {
    if (err) { return handleError(res, err); }
    if(!temp) { return res.status(404).send('Not Found'); }
    var updated = _.merge(temp, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(temp);
    });
  });
};

// Deletes a temp from the DB.
exports.destroy = function(req, res) {
  Temp.findById(req.params.id, function (err, temp) {
    if(err) { return handleError(res, err); }
    if(!temp) { return res.status(404).send('Not Found'); }
    temp.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}