var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');

// var db = mongoose();
// var routes = require('./app/routes/routes.news.js');

var app = express();
app.use(express.static(path.join(__dirname)));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

//routes(app);
app.get('/test', function(req, res, next) {
    res.send({
        name: 'jack',
        age: 20
    })
})

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log("start in " + app.get('port'));
});

module.exports = app;
