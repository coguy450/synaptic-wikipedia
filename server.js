'use strict';
var express = require('express'),
     app = express();
// var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

var request = require('superagent');
// var controller = require('./app/controllers/server.controller.js');
// var begin = require('./begin.js');
var dbConn;

function conMongo(callback) {
    mongodb.connect('mongodb://localhost/synaptic', (err, db) => {
        if (err) {
            console.log(err);
        } else {
            dbConn = (!err ? db : null);
            callback(dbConn);
        }
    })
};
// conMongo((db) => {
//   console.log('connected to mongo');
// })
app.set('view engine', 'html');
app.set('view options', {
    layout: false
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/favicon.ico', express.static('public/images/favicon.ico'));

app.get('/', (req, res) => {
    express.static('public/index.html');
});

var server = app.listen('3007', function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening at port:'+ port);
});



// catch 404 and forward to error handler

app.use(function(req, res, next) {
    console.log(req.url);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
       console.log(err);
    });
}


module.exports = app;
