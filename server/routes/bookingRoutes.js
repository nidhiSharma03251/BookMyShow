const authMiddleware = require('../middlewares/authMiddleware');
const router = require('express').Router();
const Booking = require("../models/bookingSchema");
const Show = require("../models/showSchema");

router.post("/book-show", authMiddleware, async(req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        const show = await Show.findById(req.body.show);
        await Show.findByIdAndUpdate(req.body.show, {
            bookedSeats: [...show.bookedSeats, ...req.body.seats]
        })
        res.send({
            success: true,
            message: "Show booked sucessfully!",
            data: newBooking
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        }) 
    }
});

router.get("/get-bookinngs/:userId", authMiddleware, async(req, res) =>{
    try {
        const bookings = await Booking.find({user: req.params.userId}).populate("users").populate("shows")
        .populate({
            path: 'shows',
            populate:{
                path:"movie",
                model: 'movies'
            }    
        })
        .populate({
            path: "shows",
            populate: {
                path: "theatre",
                model: "theatres"
            }
        });
        res.send({
            success: true,
            message: "Bookings fetched successfully",
            date: bookings
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;
