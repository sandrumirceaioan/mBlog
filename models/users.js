var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({

    username: {
        index: {
            unique: true
        },
        type: String,
        required: true
    },
    email: {
        index: {
            unique: true
        },
        type: String
    },
    password: {
        type: String
    },
    rank: {
        type: Number,
        default: 4
    },
    approved: {
        type: Boolean,
        default: false
    }
});

var usersModel = mongoose.model('users', usersSchema, 'users');
module.exports = usersModel;
