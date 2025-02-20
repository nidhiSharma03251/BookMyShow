const router = require ('express').Router();
const { Router } = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const Theatre = require('../models/theatreSchema');
const Show = require('../models/showSchema');
const { v4: uuidv4 } = require('uuid')

router.post("/add-theatre" , authMiddleware, async(req,res) =>{
    try {
        const newTheatre = new Theatre(req.body);
        await newTheatre.save();
        res.send({
            success: true,
            message: "theatre added"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


router.get("/get-all-theatres", authMiddleware, async(requestAnimationFrame,res) =>{
    try {
        const theatres = await Theatre.find().populate('owner' , 'userName email');
        res.send({
            success: true,
            message: "theatres fetched",
            data: theatres
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get("/get-theatres-by-owner/:ownerId" , authMiddleware, async(req,res) =>{
    const ownerId = req.params.ownerId;
    try {
        const theatres = await Theatre.find({owner: ownerId});
        res.send({
            success: true,
            message:"Theatres by this owner fetched",
            data: theatres
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.put("/update-theatre", authMiddleware, async(req,res)=>{
    try {
        await Theatre.findByIdAndUpdate(req.body._id, req.body);
        res.send({
            success: true,
            message:"Theatres has been updated"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post("/delete-theatre", authMiddleware, async(req,res)=>{
    try {
        await Theatre.findByIdAndDelete(req.body.theatreId);
        res.send({
            success: true,
            message:"Theatre deleted"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post("/add-show", authMiddleware, async(req,res) =>{
    try {
        const updatedSeatConfig = [...Array(req.body.totalSeats).keys()].map(seat => ({
               seatNumber: seat,
               _id: uuidv4()
        }))
        req.body.totalSeats = updatedSeatConfig;
        const newShow = new Show(req.body);
        await newShow.save();
        res.send({
            success: true,
            message:"Show added"
        })
    } catch (error) {
        res.send({
            success: false,
            message:error.message
        })
    }
})

router.get("/get-all-shows-by-theatre/:theatreId", authMiddleware, async(req,res) =>{
    const theatreId = req.params.theatreId;
    try {
        const shows =await Show.find({theatre: TheatreId}).populate('movies');
        res.send({
            success: true,
            message:"Show fetched",
            data: shows
        })
    } catch (error) {
        res.send({
            success: false,
            message:error.message
        })
    }
})

router.post("/get-all-theatres-by-movie", authMiddleware, async(req,res) => {
    try {
        const{movie, date} = req.body;
        const shows = (await Show.find({movie, date})).populate('theatre');
        let uniqueTheatres = [];
        shows.forEach(show => {
            const theatre = uniqueTheatres.find((theatre) => theatre._id === show.theatre._id);
            if(!theatre){
                const showsForThisTheatre = shows.filter((showObj) => showObj.theatre._id === show.theatre._id);
                uniqueTheatres.push({
                    ...show.theatre.doc,
                    shows: showsForThisTheatre
                })
            }
            res.send({
                success: true,
                message: "Unique shows fetched",
                data: uniqueTheatres
            })

        })
    } catch (error) {
        res.send({
            success: false,
            message:error.message
        })
    }
})


module.exports = router;