var express = require('express');
var http = require('http');
var router = express.Router();
var users = require('../models/users.js');
var async = require('async');
var _ = require('underscore');

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
// Get new users - admin
//-----------------------------------------------------------------------------------------------

router.post('/newUsers', function (req, res) {
  users.find().sort({"_id":-1}).then(function(newUsers){
      res.status(200).json(newUsers);
  }).catch(function(err){
      res.status(500).json(parseError(err));
  });
});

//-----------------------------------------------------------------------------------------------
// Update post
//-----------------------------------------------------------------------------------------------

// router.post('/updPost', function(req, res){
//
//     var query = {"_id": req.body._id};
//     req.body.updateDate = new Date().toISOString();
//     set = _.compactObject(req.body);
//
//     console.log(set);
//
//     posts.findOneAndUpdate(query, {$set: set}, {new:true, runValidators:true, upsert:true}).then(function(updated){
//         res.status(200).json(updated);
//     }).catch(function(err){
//         res.status(200).json(updated);
//         res.send('{"success": false, "error": ' + parseError(err) + '}');
//     });
//
// });

//-----------------------------------------------------------------------------------------------
// Delete post
//-----------------------------------------------------------------------------------------------

// router.post('/delPost', function (req, res) {
//
//     var query = {
//         "_id":req.body._id
//     };
//
//   posts.findOneAndRemove(query).then(function(del){
//       res.status(200).json('{"success": true}');
//   }).catch(function(err){
//       res.status(500).json(parseError(err));
//   });
//
// });

//-----------------------------------------------------------------------------------------------
// Get one post
//-----------------------------------------------------------------------------------------------

// router.post('/getOnePost', function(req, res){
//
//     posts.findOne({"url":req.body.url}, function(err,thepost){
//
//         if (!thepost) {
//             res.status(500).json({error: "Post not found!"});
//         } else {
//             res.status(200).json(thepost);
//         }
//
//     });
//
// });

module.exports = router;
