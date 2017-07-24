//++++++++++++++++++++
//DEPENDENCIES
//++++++++++++++++++++
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const {resolve} = require("path");

mongoose.Promise = Promise;

//++++++++++++++++++++
//MODELS
//++++++++++++++++++++

const Candidate = require("./models/Candidate.js");
const University = require("./models/University.js");

//++++++++++++++++++++
//DECLARE THE APP
//++++++++++++++++++++

const app = express();

//++++++++++++++++++++
//CONFIGURE THE APP
//++++++++++++++++++++

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

//++++++++++++++++++++
//HELPERS
//++++++++++++++++++++

const failRequest = res => err => res.status(500).json(err)

//++++++++++++++++++++
//DATABASE CONFIGURATION
//++++++++++++++++++++

mongoose.connect("mongodb://localhost/trtlJR");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.error(`Mongoose Error: ${error}`);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

//++++++++++++++++++++
//ROUTES
//++++++++++++++++++++

//-----
//Get Requests
//-----

app.get("*", function(req, res) {
  res.sendFile(resolve(__dirname, 'index.html'));
});

// get all candidates in the collection
app.get("/candidates", function(req, res) {
  Candidate
    .find({})
    .then(res.json)
    .catch(failRequest(res))
});

// delete a single candidate from the collection
app.delete("/candidates/:id", function(req, res) {
  Candidate
    .find({ _id: req.params.id })
    .remove((error, removed) => error ? failRequest(error) : res.json(removed));
});

// find a single candidate (by unique id)
app.get("/candidates/:id", function(req, res) {
  Candidate
    .findOne({ _id : req.params.id })
    .then(res.json)
    .catch(failRequest(res))
})

// +++++
// Filter By Custom Parameters
// +++++

app.get("/filter/", function(req, res) {

  var query = {};
  // console.log("req.query", req.query)

  if(req.query.university) { query.university = req.query.university }
  if(req.query.status){ query.status = req.query.status }

  console.log("query = ", query);

  Candidate.find(query, function(error, found) {
    if (error) {
      return failRequest(error);
    }
    else {
      console.log("found = ", found);
      res.json(found);
    }
  });
});

// ++++++++++++
// SCHOOLS COLLECTION 
// ++++++++++++

// get all schools from the universities collection
app.get("/universities", function(req, res) {
  University
    .find({})
    .then(res.json)
    .catch(failRequest(res));
});

// delete a school
app.delete("/universities/:id", function(req, res) {
  University
    .find({ _id: req.params.id })
    .remove((error, removed) => error ? failRequest(error) : res.json(removed))
});

// find one school in the university collection (by unique id)
app.get("/universities/:id", function(req, res) {
  University
    .findOne({ _id : req.params.id })
    .then(res.json)
    .catch(failRequest(res))
  })

//-----
//Post Requests
//-----

// Csubmit a new candidate
app.post("/candidates", function(req, res) {
  // @TODO: Validate
  const newCandidate = new Candidate(req.body);

  newCandidate
    .save(res.json)
    .catch(failRequest)
});

// update a single candidate
app.put("/candidates/:id", function(req, res) {
  Candidate
    .findByIdAndUpdate(req.params.id, 
      {
        $set: {
          "firstName": req.body.firstName,
          "lastName": req.body.lastName,
          "university": req.body.university,
          "status": req.body.status,
          "modified": Date.now()
        }
      })
    .then(res.json)
    .catch(failRequest)
}); 

// ++++++++++++
// SCHOOLS COLLECTION 
// ++++++++++++

// add a new school to the university collection
app.post("/universities", function(req, res) {

  // @TODO: Validate
  const newUniversity = new University(req.body);

  newUniversity
    .save(res.json)
    .catch(failRequest)
});


// update an existing school in the university collection
const createUniversity = ({universityName, campusLocation}) =>
  Object.assign({}, {universityName, campusLocation, modified: Date.now()})

app.put("/univerisities/:id", function(req, res) {
  University.findByIdAndUpdate(req.params.id, {
    $set: createUniversity(req.body)
  }).then(res.json).catch(failRequest)
});

app.listen(process.env.PORT || 3000);

module.exports = app;
