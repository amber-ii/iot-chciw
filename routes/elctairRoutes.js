
const express = require('express');
const elctairController = require('../controllers/elctairController');
const router = express.Router();

router.get('/elctairJson', elctairController.getAllElctAirJSON);





module.exports = {
    routes: router
};