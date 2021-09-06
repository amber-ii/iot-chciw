
const express = require('express');
const tocController = require('../controllers/tocController');
const router = express.Router();

router.get('/', tocController.getAllToc);
router.get('/tocJson', tocController.getAllTocJSON);
router.post('/', tocController.getTocByDate);



// router.post('/event', eventController.addEvent);
// router.put('/event/:id', eventController.updateEvent);
// router.delete('/event/:id', eventController.deleteEvent);


module.exports = {
    routes: router
}