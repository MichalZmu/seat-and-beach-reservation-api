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
    console.log(req.query);
    if(req.query.dateFrom && req.query.dateTo) {
        Reservation.find({
            dateFrom: { $gte: req.query.dateFrom},
            dateTo: { $lte: req.query.dateTo}
        }).then(reservations => {
            res.status(200).json(reservations);
        });
    } else {
        res.status(404).json('not valid date params')
    }
});



router.get('/user', checkAuth, (req, res, next) => {
    const userId = req.query.userId;
    const pageSize = +req.query.pageSize;
    const currentPage = +req.query.currentPage;
    let fetchedReservations;
    const query = Reservation.find({userId: userId});
    if(pageSize && currentPage) {
        query.skip(pageSize * currentPage).limit(pageSize);
    }
    query
        .then(allReservations => {
            fetchedReservations = allReservations;
            return Reservation.countDocuments({userId: userId});
        })
        .then(count => {
        res.status(200).json({
            reservations: fetchedReservations,
            maxReservations: count
        })
    }).catch(() => {
        res.status(404).json('user not found')
    })

});

module.exports = router;
