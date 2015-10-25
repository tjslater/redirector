'use strict';

var express = require('express');
var controller = require('./re2.controller');

var router = express.Router();

router.post('/', controller.test);
router.post('/save', controller.create);
router.get('/:id', controller.show);
router.patch('/:id', controller.update);
router.get('/getByUserId/:id', controller.getByUserId);
router.delete('/:id', controller.destroy);


module.exports = router;