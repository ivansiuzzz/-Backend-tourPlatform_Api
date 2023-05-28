const express = require('express')
const router = express.Router()
const tourController = require('./../controller/tourController')
const authController = require('../controller/authController')

router.route('/').get(authController.protect, tourController.getAllTours).post(authController.protect, tourController.checkBody, tourController.createTour)
router.route('/:id').get(authController.protect, tourController.getTour).patch(authController.protect, tourController.updateTour).delete(authController.protect, tourController.deleteTour)

module.exports = router;


// hero movie 
// mavarl
// disney CSSFontPaletteValuesRule
// maraval fans
//