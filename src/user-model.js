const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
})

module.exports = new mongoose.model('User', userSchema)