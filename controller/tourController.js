const Tour = require("../model/tourModel")

exports.getAllTours = async (req, res) => {
    const tours = await Tour.find();
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }

    })
}


exports.createTour = async (req, res) => {
    console.log(req.body, "body")
    const newTour = await Tour.create(req.body)

    res.status(200).json({
        status: "success",
        data: {
            tours: newTour
        }
    })
}
