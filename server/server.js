// TODO: make this work.
// if yuo go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions

// GET ALL
app.get('/lions', function(req, res){
    res.json(lions);
});

// GET BY ID
app.get('/lions/:id', function(req, res){
    var lion = _.find(lions, {id: req.params.id});
    res.json(lion || {});
});

// POST
app.post('/lions', function(req, res){
    var lion = req.body;
    id++;
    lion.id = id + '';
    lions.push(lion);
    res.json(lions);
});

// PUT
app.put('/lions/:id', function(req, res){
    var update = req.body;
    
    if(update.id){
        delete update.id;
    }

    var lionIndex = _.findIndex(lions, {id: req.params.id});
    if(!lions[lionIndex]){
        res.send();
    } else {
        var updatedLion = _.assign(lions[lionIndex], update); // Merge two objects
        res.json(updatedLion);
    }
});

// DELETE
app.delete('/lions/:id', function(req, res){
    var lionIndex = _.findIndex(lions, {id: req.params.id});
    if(!lions[lionIndex]){
        res.send();
    } else {
        var deletedLion = lions[lionIndex];
        lions.splice(lions, 1);
        res.json(deletedLion);
    }
});

app.listen(3000);
console.log('on port 3000');
