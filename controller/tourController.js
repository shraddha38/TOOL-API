const Tour = require("../model/tourModel")

exports.getAllTours = async (req, res) => {

    const queryObj = { ...req.query };

    const excludeFields = [];
    excludeFields.forEach(el => delete queryObj[el])

    //make a query
    // object to string
    let queryString = JSON.stringify(queryObj)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    console.log(queryObj, JSON.parse(queryString))
    let query = Tour.find(JSON.parse(queryString));

    // sorting 
    if (req.query.sort) {
        let sortBy = req.query.sort.split(",").join("");
        query = query.sort(sortBy)
    }

    //limiting

    if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
    }
    else {
        query = query.select("-__v")
    }

    // Pagination
    //page=2&limit=10
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 1;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);



    const tours = await query;
    try {
        if (req.query.page) {
            const numTours = await Tour.countDocuments();
            if (skip >= numTours) throw new Error("Page not found error");
        }
        
        res.status(200).json({
            status: "success",
            requestedAt: req.requestTime,
            results: tours.length,
            data: {
                tours
            }

        })
    }
    catch (err) {
        res.status(404).json({
            status: "Page Not Found",
            message: err,
            requestedAt: req.requestTime,
        })
    }
}

exports.getTour = async (req, res) => {
    const tours = await Tour.find({ _id: req.params.id });
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
