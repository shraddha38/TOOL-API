const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, "A tour must have a price"],
    }
});

const Tour = mongoose.model("Tour", tourSchema);

// const testTour = new Tour({
//     name: "The Camper bIke",
//     rating: 4.7,
//     price: 500
// });

// testTour.save();

module.exports = Tour;