const express = require('express')
const router = express.Router()
const tourController = require('./../controller/tourController')

router.param('id',tourController.checkId
)

router.route('/').get(tourController.getAllTours).post(tourController.checkBody, tourController.createTour)
router.route('/:id').get(tourController.getTour)

module.exports = router;


// hero movie 
// mavarl
// disney CSSFontPaletteValuesRule
// maraval fans
//