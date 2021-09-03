
const express = require('express');
const sacidController = require('../controllers/sacidController');
const router = express.Router();

router.get('/', sacidController.getAllSacid);
router.get('/sacidJson', sacidController.getAllSacidJSON);
router.post('/', sacidController.getSacidByDate);



// router.post('/event', eventController.addEvent);
// router.put('/event/:id', eventController.updateEvent);
// router.delete('/event/:id', eventController.deleteEvent);


module.exports = {
    routes: router
}