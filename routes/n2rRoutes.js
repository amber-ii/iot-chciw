
const express = require('express');
const n2rController = require('../controllers/n2rController');
const router = express.Router();

router.get('/', n2rController.getAllN2R);
router.get('/n2rJson', n2rController.getAllN2RJSON);
router.post('/', n2rController.getN2RByDate);



// router.post('/event', eventController.addEvent);
// router.put('/event/:id', eventController.updateEvent);
// router.delete('/event/:id', eventController.deleteEvent);


module.exports = {
    routes: router
}