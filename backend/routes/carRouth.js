const carController = require('../controllers/carController')
const express = require('express');
const router = express.Router()

router.post('/cars', carController.getCars)
router.post('/addCar',carController.addCar)
router.get('/getCarsContext', carController.forCarContext)
module.exports = router;
