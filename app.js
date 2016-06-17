var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');

var config = require('./config/config');
var db = require('./config/db.js')();

var routes = require('./app/routes/routes.news.js');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname)));
app.use(favicon(path.join(__dirname, 'favicon.ico')));

routes(app);

//处理404
app.use(function(req, res, next) {
    res.status(404);
    try {
        return res.json('Not Found');
    }
    catch (e) {
        console.error('404 set header after sent');
    }
})

//处理错误
app.use(function(err, req, res, next) {
    if (!err) {
        return next();
    };
    try {
        return res.json(err.message || 'server error');
    }
    catch (e) {
        console.error('500 set header after sent');
    }
    res.status(500);

})

app.set('port', process.env.PORT || config.port);
var server = app.listen(app.get('port'), function() {
    console.log("mean start in " + app.get('port'));
});

module.exports = app;
