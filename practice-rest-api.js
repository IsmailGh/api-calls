//packages
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

var app = express();
var idTracker = 1;

// log requests
app.use(logger('dev'));
// create req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// call this function to create new ids
function genId() {
    return idTracker++;
}

// create a REST API for your users , defined below:
var users = [
    {
        id: 0,
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'asdf'
    }
];

// clients can create new users, get all users, get a single user,
// update a user (based on their id), and delete a user


app.get('/users', function(req,res){
    res.send(users)
});
app.get('/users/:id', function(req,res){
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('This user was not found'); 
    res.send(users);

});
app.post('/users', function(req, res){
    if (typeof req.body.name !== 'string'){
        return res.status(404).send('Missing name');
    }
    if (typeof req.body.email !== 'string'){
        return res.status(404).send('Missing email');
    }
    if (typeof req.body.password !== 'string'){
        return res.status(404).send('Missing password');
    }

    const newUser = [
        {
        id: genId(), 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        }
    ];
    newUser.push(users);
    return res.sendStatus(200);
}); 

app.put('/users:id', function(req, res){
    for (var i = 0; i < users.length; i++) {
        if (users[i].id === +req.params.id) {
            users[i].name = req.body.name || users[i].name;
            users[i].email= req.body.email || users[i].email;
            users[i].password = req.body.password || users[i].password;
            return res.sendStatus(200);
        }
    }
    return res.status(404).send('No user with that ID');
});

app.delete('/users:id', function(req, res){
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) res.status(404).send('This user was not found'); 

    const index = courses.indexOf(course); 
    course.splice(index,1); 

    res.send(course);
});

var server = app.listen(3000);
console.log('Listening at http://localhost:%s in %s mode',
    server.address().port, app.get('env'));

module.exports = app;
