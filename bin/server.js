// Imports.

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Routing.

const app = express();
app.use(express.static(__dirname));

// Enables JSON support.

app.use(bodyParser.json());

// Enables the server to listen on port 3000.

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Holds the data that's displayed by the client.

let votes = [
  ['Element', 'Votes'],
  ['Cake', 10],
  ['Pie', 8]
];

// Voting functions.

function voteCake() {
  votes[1][1]++;
}

function votePie() {
  votes[2][1]++;
}

// GET "votes" API endpoint.

app.get('/api/votes', function (req, res) {
  res.send(votes);
});

// POST "votes" API endpoint.

app.post('/api/votes', function (req, res) {

  // Handles messages from both Angular 1 and Angular 6.

  let message = req.body.message ? JSON.parse(req.body.message)[0] : req.body[0];
  message === 'cake' ? voteCake() : votePie();
  console.log(votes);
  res.send(votes);
});

// HTTP listener.

app.listen(3000, function () {
  console.log('Listening on port 3000.');
});
