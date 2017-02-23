var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = ({

    postTitle: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    alias: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    replies: {
        type: []
    },
    approved: {
        type: Boolean,
        default: false
    },
    unapproved: {
        type: Boolean,
        default: true
    }
});

var commentSchema = mongoose.model('comments', commentSchema, 'comments');
module.exports = commentSchema;
