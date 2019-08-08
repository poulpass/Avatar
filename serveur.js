var express = require('express');

var fs = require('fs')

var app = express();

var browserify = require('browserify-middleware');



app.use('/js', browserify(__dirname + '/src/js'));

app.set('view engine', 'pug');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
});



app.listen(8080);

