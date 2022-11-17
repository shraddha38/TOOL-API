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
exports.getTour = async (req, res) => {
    const tours = await Tour.find({_id: req.params.id});
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.updateTour = async (req, res) => {
    const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: "Updated Tour"
        }
    })
}

exports.deleteTour = async (req, res) => {
    const tours = await Tour.findByIdAndDelete(req.params.id)

    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours: "Deleted Tour"
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
