/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Re2 = require('./re2.model');

exports.register = function(socket) {
  Re2.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Re2.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('re2:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('re2:remove', doc);
}