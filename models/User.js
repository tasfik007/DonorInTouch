// importing packages
const mongoose = require('mongoose');

// defining data rules & structure for mongodb
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    data: {
        type: Date,
        default: Date.now
    }

});

// exporting the data model
module.exports = User = mongoose.model('user', UserSchema);