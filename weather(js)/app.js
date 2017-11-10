// INCOMPLETE //

const express = require('express');
const app = express();
const axios = require('axios');

app.use(express.static(__dirname + '/views'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

const api_url = 'api.openweathermap.org/data/2.5/weather?q=';

axios.get(api_url)
    .then(function (result) {
        console.log('1st API');
        return axios.get(api_url);
    })
    .then(function (result) {
        console.log('2nd API');
    })
    .catch(function (err) {
        console.error(err);
    })


app.get('/', function (request, response) {
    response.render('index.html');
});

app.post('/submit')