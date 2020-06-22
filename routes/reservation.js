const Reservation = require('../models/reservation');
const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


router.post('/', (req, res, next) => {
    const reservation = new Reservation({
        dateFrom: req.body.dateFrom,
        dateTo: req.body.dateTo,
        seatNumber: req.body.seatNumber,
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber
    });
    console.log(reservation);
    reservation.save().then(result => {
        res.status(201).json({
            message: 'reservation added successfully',
            reservationId: result._id
        });
    }).catch(err => {
        console.log(err);
    });
});

router.get('/', (req, res, next) => {
    if(req.query.dateFrom && req.query.dateTo) {
        Reservation.find({
            dateFrom: { $gte: req.query.dateFrom},
            dateTo: { $lte: req.query.dateTo}
        }).then(reservations => {
            res.status(200).json(reservations);
        });
    } else {
        Reservation.find().then(resevations => {
            res.status(200).json(resevations);
        });
    }
});

router.get('/user', checkAuth, (req, res, next) => {
    Reservation.find({userId: req.query.userId}).then(reservations => {
        res.status(200).json(reservations)
    }).catch(() => {
        res.status(404).json('user not found')
    })

});


module.exports = router;
