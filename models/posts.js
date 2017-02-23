var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postsSchema = ({

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
    firstImage: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    categoryId: {
        type: String,
        required: true
    },
    postDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    updateDate: {
        type: Date,
        default: Date.now,
    },
    shortDescription: {
        type: String,
        required: true
    },
    fullDescription: {
        type: String,
        required: true
    },
    metaTitle: {
        type: String,
        required: true
    },
    metaDescription: {
        type: String,
        required: true
    },
    keywords: {
        type: [],
        required: true
    },
    postTags: {
        type: [],
        required: true
    },
    indexStatus: {
        type: Boolean,
        default: false
    },
    draftStatus: {
        type: Boolean,
        default: false
    }

});

var postsModel = mongoose.model('posts', postsSchema, 'posts');
module.exports = postsModel;
