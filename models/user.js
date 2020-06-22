const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const checkAuth = require('../middleware/check-auth');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phoneNumber: {type: String},
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
