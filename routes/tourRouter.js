const express = require("express");
const tourController = require("./../controller/tourController");

const router = express.Router();

router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.createTour)

router
    .route('/:id')
    .get(tourController.getTour)



module.exports = router;

//.patch(tourController.updateTour)
   // .delete(tourController.deleteTour)