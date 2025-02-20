const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Movie = require('../models/movieSchema');

router.get('/get-all-movies',authMiddleware, async(req, res) => {
    try {
        const movies = await Movie.find();
        res.send({
            success:true,
            message: "Movies fetched",
            data: movies
        })
    } catch(error){
        res.send({
            success: false,
            message: error.message
        })   
    }
})


router.get("/get-movie-by-id/:id", authMiddleware, async (req, res)=>{
    try {
        const movie = await Movie.findById(req.params.id);
        res.send({
            success: true,
            message: "Movie fetched",
            data: movie
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.post("/add-movie", authMiddleware, async(req,res)=>{
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie added to DB"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.put("/update-movie", authMiddleware, async(req, res)=>{
    try {
        await Movie.findByIdAndUpdate(req.body.movieId, req.body);
        res.send({
            success: true,
            message: "Movie data updated successfully",
            data: req.body
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.delete("/delete-movie", authMiddleware, async(req, res)=>{
    try {
        await Movie.findByIdAndUpdate(req.body.movieId);
        res.send({
            success: true,
            message: "Movie deleted successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


module.exports = router;