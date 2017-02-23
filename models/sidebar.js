var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sidebarSchema = new Schema({

    itemTitle: {
        type: String,
        required: true
    },
    itemUrl: {
        index: {
            unique: true
        },
        type: String
    },
    itemIcon: {
            type: String,
            required: true
    },
    itemOrder: {
        type: Number,
        required: true
    },
    itemRank: {
        type: Number,
        required: true
    }
});

var sidebarSchema = mongoose.model('sidebar', sidebarSchema, 'sidebar');
module.exports = sidebarSchema;
