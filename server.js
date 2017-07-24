//++++++++++++++++++++
//DEPENDENCIES
//++++++++++++++++++++
const bodyParser = require("body-parser");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const {resolve} = require("path");
const router = express.Router();

const connection = require("./db/connection");
const candidateRouter = require("./controllers/candidateController");
const universityRouter = require("./controllers/universityController");

mongoose.Promise = Promise;

//++++++++++++++++++++
//DECLARE THE APP
//++++++++++++++++++++

const app = express();

// Middleware Configuration
app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

// Route Configuration
app.use('/universities', universityRouter)
app.use('/candidates', candidateRouter)

// Database Configuration
connection(mongoose);

// Serve home  
app.get("/", function(req, res) {
  res.sendFile(resolve(__dirname, 'index.html'));
}).listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`App listening on ${process.env.PORT || 3000}.`)
})

module.exports = app;
