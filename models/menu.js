var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({

    title: {
        index: {
            unique: true
        },
        type: String,
        required: true
    },
    url: {
        index: {
            unique: true
        },
        type: String
    },
    order: {
        type: Number,
        required: true
    }
});

var menuSchema = mongoose.model('menu', menuSchema, 'menu');
module.exports = menuSchema;
