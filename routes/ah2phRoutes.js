
const express = require('express');
const sacidController = require('../controllers/sacidController');
const router = express.Router();

router.get('/', sacidController.getAllSacid);
router.get('/sacidJson', sacidController.getAllSacidJSON);
router.post('/', sacidController.getSacidByDate);


module.exports = {
    routes: router
};