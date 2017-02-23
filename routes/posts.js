var express = require('express');
var http = require('http');
var router = express.Router();
var users = require('../models/users.js');
var menu = require('../models/menu.js');
var posts = require('../models/posts.js');
var multiparty = require('multiparty');
var async = require('async');
var underscore = require('underscore');
var _ = require('lodash');

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
// Get all posts - blog
//-----------------------------------------------------------------------------------------------

router.post('/getPosts', function (req, res) {

    var page = req.body.page;
    var perPage = req.body.perPage;
    var toSkip = page * perPage - perPage;

  posts.find().skip(toSkip).limit(perPage).sort({"_id":-1}).then(function(allPosts){
      res.send('{"success":true,"data":' + JSON.stringify(allPosts) + '}');
  }).catch(function(err){
      res.send('{"success": false, "error": ' + parseError(err) + '}');
  });

});


//-----------------------------------------------------------------------------------------------
// Get all posts - admin
//-----------------------------------------------------------------------------------------------

router.post('/getPostsList', function(req, res){

    var queryData = {
        page: req.body.page,
        perPage: req.body.perPage,
        toSkip: req.body.page * req.body.perPage - req.body.perPage,
        query: req.body.search ? {'title': {$regex: ".*" + req.body.search + ".*", $options: '-i'}} : {}
    };

    //if (_.isEmpty(queryData.query) === false) queryData.toSkip = 0;

    var count;

    posts.count(queryData.query).then(function(result){

        count = result;

        return posts.find(queryData.query).skip(queryData.toSkip).limit(queryData.perPage).sort({"_id":-1});

    }).then(function(posts){

        var pages = Math.ceil(count / queryData.perPage);

        res.status(200).json({posts:posts, pages: pages});

    }).catch(function(err){
        res.status(500).json(parseError(err));
    });

});

//-----------------------------------------------------------------------------------------------
// Count posts
//-----------------------------------------------------------------------------------------------

router.post('/getPostsCount', function (req, res) {
  posts.count({}).then(function (count) {
      res.status(200).json(count);
  }).catch(function(err){
      res.status(500).json(parseError(err));
  });
});

//-----------------------------------------------------------------------------------------------
// Save posts
//-----------------------------------------------------------------------------------------------

router.post('/savePost', function(req, res){

    posts.findOne(_.pick(req, 'url')).then(function(){
        savedata = _.compactObject(req.body);
        var post = new posts(savedata);
        return post.save();
    }).then(function(post){
        res.status(200).json(post);
    }).catch(function(err){
        res.status(500).json(parseError(err));
    });

});

//-----------------------------------------------------------------------------------------------
// Update post
//-----------------------------------------------------------------------------------------------

router.post('/updPost', function(req, res){

    var query = {"_id": req.body._id};
    req.body.updateDate = new Date().toISOString();
    set = _.compactObject(req.body);

    console.log(set);

    posts.findOneAndUpdate(query, {$set: set}, {new:true, runValidators:true, upsert:true}).then(function(updated){
        res.status(200).json(updated);
    }).catch(function(err){
        res.status(200).json(updated);
        res.send('{"success": false, "error": ' + parseError(err) + '}');
    });

});

//-----------------------------------------------------------------------------------------------
// Delete post
//-----------------------------------------------------------------------------------------------

router.post('/delPost', function (req, res) {

    var query = {
        "_id":req.body._id
    };

  posts.findOneAndRemove(query).then(function(del){
      res.status(200).json('{"success": true}');
  }).catch(function(err){
      res.status(500).json(parseError(err));
  });

});

//-----------------------------------------------------------------------------------------------
// Get one post
//-----------------------------------------------------------------------------------------------

router.post('/getOnePost', function(req, res){

    posts.findOne({"url":req.body.url}, function(err,thepost){

        if (!thepost) {
            res.status(500).json({error: "Post not found!"});
        } else {
            res.status(200).json(thepost);
        }

    });



});




module.exports = router;
