var debug = require('debug')('Javandi:API');
var express = require('express');
var http = require('http');
var router = express.Router();
var users = require('../models/users.js');
var menu = require('../models/menu.js');
var multiparty = require('multiparty');
var async = require('async');
var underscore = require('underscore');
var _ = require('lodash');

_.mixin({
    compactObject: function(o) {
        _.each(o, function(v, k) {
            if (v === null || v === undefined) {
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
// Get all menu items
//-----------------------------------------------------------------------------------------------
router.get('/getMenuItems', function(req, res) {
    menu.find({}).sort({order: 1}).exec(function(err, allItems) {
        if (err) {
            res.send('{"success": false, "error": ' + parseError(err) + '}');
        } else {

            if (!allItems.length) {
                res.send('{"success": false, "error": "Empty Collection!"}');
            } else {
                res.send('{"success":true,"data":' + JSON.stringify(allItems) + '}');
            }
        }
    });
});









module.exports = router;
