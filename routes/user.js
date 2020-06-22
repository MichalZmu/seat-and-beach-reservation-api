const User = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

router.post('/sign-up', (req, res, next) => {
    console.log('req.body.email: ', req.body.email);
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            password: hash,
            email: req.body.email.toLowerCase(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber
        });

        user.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            res.status(500).json({
                error: err,
                message: "emailAlreadyExist"
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({email: req.body.email.toLowerCase()}).then(user => {
        if (!user) {
            return res.status(401).json({message: 'IncorrectEmailOrPassword'})
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);

    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'auth failed, user not found'
            });
        }
        const token = jwt.sign({
            email: fetchedUser.email,
            userId: fetchedUser._id
        }, 'secret_this_should_be_longer', {expiresIn: '1h'});
        res.status(200).json({
            userId: fetchedUser._id,
            token: token,
            expiresIn: 3600
        });
    }).catch(err => {
        return res.status(401).json({message: 'auth failed, error found'});
    });
});

router.get('/all-users', (req, res, next) => {
    User.find().then(result => {
        res.status(200).json(result);
    })
});

router.get('/current-user', checkAuth, (req, res, next) => {
    const userId = req.query.userId;
    User.findOne({_id: userId}).then(result => {
        if(result){
            res.status(200).json(result);
        } else {
            res.status(404).json('user not found');
        }
    })

});

module.exports = router;
