var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var constSchema = new Schema({

    postsPerPage: {
        type: Number,
        required: true
    },
    layout: {
        type: Number,
        required: true
    }
});

var constSchema = mongoose.model('const', constSchema, 'const');
module.exports = constSchema;
