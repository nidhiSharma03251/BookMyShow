const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true
    },
    theatre:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "theatres",
        required: true
    },
    ticketPrice:{
        type: Number,
        required: true
    },
    totalSeats:{
        type: Array,
        required:true
    },
    bookedSeats:{
        type: Array,
        required: []
    }
},{timestamps: true})

module.exports = mongoose.model("shows", showSchema);