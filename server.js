var express = require('express');
var app = express();
var jsonData = { count: 12, message: 'hey'};

// redirect to home page
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html', function(err){
        if(err){
            res.status(500).send(err);
        }
    });
});

// Get data
app.get('/data', function(req, res){
    res.json(jsonData);
});

app.listen(3000);
