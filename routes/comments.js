    var debug = require('debug')('Javandi:API');
var express = require('express');
var http = require('http');
var router = express.Router();
var users = require('../models/users.js');
var menu = require('../models/menu.js');
var posts = require('../models/posts.js');
var comments = require('../models/comments.js');
var multiparty = require('multiparty');
var async = require('async');
var underscore = require('underscore');
var _ = require('lodash');
var socket = require('socket.io-client')('http://localhost:7777');

_.mixin({
  compactObject: function(o) {
    _.each(o, function(v, k) {
      if(v === null || v === undefined) {
        delete o[k];
      }
    });
    return o;
  }
});

//----------------------------------------------------------------------------------------------------
// Model Schema Errors
//----------------------------------------------------------------------------------------------------
function parseError(err) {
  var errorString = '';
  if (err.errors) {
    for (var key in err.errors) {
      if (err.errors[key].message) {
        if (err.errors[key].path) {
          errorString += err.errors[key].message.replace('`{PATH}`', err.errors[key].path) + ' ';
        } else {
          errorString += err.errors[key].message + ' ';
        }
      }
    }
    errorString = JSON.stringify(errorString);
  } else {
    errorString = JSON.stringify(err.message);
  }
  return errorString;
}
//-----------------------------------------------------------------------------------------------
// Save comments
//-----------------------------------------------------------------------------------------------

router.post('/saveComment', function(req, res){

    savedata = _.compactObject(req.body);
    var comment = new comments(savedata);

    comment.save().then(function(comm){
        res.status(200).json(comm);
    }).catch(function(err){
        res.status(500).json(parseError(err));
    });

});

//-----------------------------------------------------------------------------------------------
// Get comments
//-----------------------------------------------------------------------------------------------

router.post('/getComments', function(req,res){

    var query = {
        "postId": req.body.theId,
        "approved": true
    };

    comments.find(query).sort({"_id":1}).then(function(comms){
        res.status(200).json(comms);
    }).catch(function(err){
        res.status(500).json(parseError(err));
    });
});

//-----------------------------------------------------------------------------------------------
// Get All Comments
//-----------------------------------------------------------------------------------------------

router.post('/getAllComments', function(req, res){

    var queryData = {
        page: req.body.page,
        perPage: req.body.perPage,
        toSkip: req.body.page * req.body.perPage - req.body.perPage,
        query: req.body.search ? { $or: [{'postTitle': {$regex: ".*" + req.body.search + ".*", $options: '-i'}},
                                         {'alias': {$regex: ".*" + req.body.search + ".*", $options: '-i'}},
                                         {'comment': {$regex: ".*" + req.body.search + ".*", $options: '-i'}}] } : {},
    };

    if (req.body.filter) {
        queryData.query = {'postTitle': req.body.filter};
    }

    var count;

    comments.count(queryData.query).then(function(result){

        count = result;

        return comments.find(queryData.query).skip(queryData.toSkip).limit(queryData.perPage).sort({"_id":-1});

    }).then(function(comments){

        var pages = Math.ceil(count / queryData.perPage);

        res.status(200).json({comments:comments, pages: pages, count: count});

    }).catch(function(err){
        res.status(500).json(parseError(err));
    });

});

//-----------------------------------------------------------------------------------------------
// Update comment
//-----------------------------------------------------------------------------------------------

router.post('/updComment', function(req, res){

    var query = {"_id": req.body._id};
    var set = _.compactObject(req.body);

    comments.findOneAndUpdate(query, {$set: set}, {new:true, runValidators:true, upsert:true}).then(function(updated){
        res.status(200).json(updated);
    }).catch(function(err){
        res.status(200).json(updated);
        res.send('{"success": false, "error": ' + parseError(err) + '}');
    });

});

//-----------------------------------------------------------------------------------------------
// Change status
//-----------------------------------------------------------------------------------------------

router.post('/changeStatus', function(req, res){

    var query = {"_id": req.body._id};

    comments.findOneAndUpdate(query, {$set: {approved: req.body.approved, unapproved: req.body.unapproved}}, {new:true, runValidators:true, upsert:true}).then(function(updated){

        res.status(200).json(updated);
    }).catch(function(err){
        res.status(200).json(updated);
        res.send('{"success": false, "error": ' + parseError(err) + '}');
    });

});

router.post('/getTopComments', function(req, res){

    var all = {};


    comments.aggregate([
            {$match: {approved: true }},
            {$group: {_id: '$postTitle', count: {$sum: 1}}},
            {$limit : 10}

        ]).then(function(ceascos){

            res.status(200).json(ceascos);

        }).catch(function(err){

            res.status(500).json(parseError(err));

        });



    // async.parallel([
    //     function(callback){
    //
    //             comments.find().select('alias').then(function(comms){
    //                 all.comms = comms;
    //                 callback();
    //             }).catch(function(err){
    //                 callback(err);
    //             });
    //
    //     },
    //
    //     function(callback){
    //
    //             posts.find().select('title').then(function(posts){
    //                 all.posts = posts;
    //                 callback();
    //             }).catch(function(err){
    //                 callback(err);
    //             });
    //
    //     },
    //
    // ], function(err){
    //
    //     console.log(all);
    //
    // });

});




module.exports = router;
