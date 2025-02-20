const express = require('express');
const cors= require('cors');
const User = require('./models/userSchema');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const theatreRoutes = require('./routes/theatreRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
require('dotenv').config();
require('./db/config');

const PORT = 8082;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);
app.use("/api/booking", bookingRoutes);
// https://localhost:8082/api/users/register
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})







