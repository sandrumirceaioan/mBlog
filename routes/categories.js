var debug = require('debug')('Javandi:API');
var express = require('express');
var http = require('http');
var router = express.Router();
var categories = require('../models/categories.js');
var multiparty = require('multiparty');
var async = require('async');
var _ = require('underscore');
var md5 = require('js-md5');
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
// Save category
//-----------------------------------------------------------------------------------------------

router.post('/saveCategory', function(req, res){
    categories.findOne(_.pick(req, 'title', 'url')).then(function(){
      	var savedata = _.compactObject(req.body);
        var category = new categories(savedata);
    return category.save();
    }).then(function(category){
        socket.emit('category:new',category);
      	res.status(200).json(category);
    }).catch(function(err){
      	res.status(500).json(parseError(err));
    });
});

//-----------------------------------------------------------------------------------------------
// Get categories
//-----------------------------------------------------------------------------------------------

router.post('/getCategories', function(req,res){
    categories.find({}).then(function(categs){
        res.status(200).json(categs);
    }).catch(function(err){
        res.status(500).json(parseError(err));
    });
});

//-----------------------------------------------------------------------------------------------
// Update categories
//-----------------------------------------------------------------------------------------------

router.post('/updCategory', function(req, res){

    var query = {"_id": req.body._id};
    var set = _.pick(req.body,'title','url','order','description');
        set = _.compactObject(set);

    categories.findOneAndUpdate(query, {$set: set}, {new:true, runValidators:true, upsert:true}).then(function(updated){
        socket.emit('category:upd', updated);
        res.status(200).json(updated);
    }).catch(function(err){
        res.status(200).json(updated);
        res.send('{"success": false, "error": ' + parseError(err) + '}');
    });

});

//-----------------------------------------------------------------------------------------------
// Delete categories
//-----------------------------------------------------------------------------------------------

router.post('/delCategory', function (req, res) {

    var query = {
        "_id":req.body._id
    };

  categories.findOneAndRemove(query).then(function(del){
      socket.emit('category:del', query._id);
      res.status(200).json('{"success": true}');
  }).catch(function(err){
      socket.emit('error:del', query._id);
      res.status(500).json(parseError(err));
  });

});











module.exports = router;
