const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');

const reservationRoutes = require("./routes/reservation");
const userRoutes = require("./routes/user");


mongoose.connect("mongodb+srv://Michal:XHS1xreDMSyId6oc@cluster0-ab37y.gcp.mongodb.net/test?retryWrites=true&w=majority").then(() => {
    console.log('Connected to database');
})
    .catch(() => {
        console.log('Connected failure');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS, PUT");
    next();
});

app.use('/api/reservations', reservationRoutes);
app.use('/api/user', userRoutes);


module.exports = app;
