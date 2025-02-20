const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/idigital-bookmyshow?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.8').then(() => console.log('DB connected'));