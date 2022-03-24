
const express = require('express');
const tocController = require('../controllers/tocController');
const router = express.Router();

router.get('/', tocController.getAllToc);
router.get('/chart', tocController.getTocChart)
router.post('/', tocController.getTocByDate);

module.exports = {
    routes: router
};