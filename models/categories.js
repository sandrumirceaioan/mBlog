var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var categoriesSchema = ({

    title: {
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
    },
    description: {
        type: String,
        required: true
    }

});

var categoriesSchema = mongoose.model('categories', categoriesSchema, 'categories');
module.exports = categoriesSchema;
