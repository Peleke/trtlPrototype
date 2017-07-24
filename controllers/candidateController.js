const Candidate = require("../models/Candidate");
const {failRequest} = require("../lib/helpers")

module.exports = function candidateController (router) {
  router.get("/", function(req, res) {
    Candidate
      .find({})
      .then(res.json)
      .catch(failRequest(res))
  });
  
  router.delete("/:id", function(req, res) {
    Candidate
      .find({ _id: req.params.id })
      .remove((error, removed) => error ? failRequest(error) : res.json(removed));
  });
  
  router.get("/:id", function(req, res) {
    Candidate
      .findOne({ _id : req.params.id })
      .then(res.json)
      .catch(failRequest(res))
  })
  
  router.post("/", function(req, res) {
    // @TODO: Validate
    const newCandidate = new Candidate(req.body);
  
    newCandidate
      .save(res.json)
      .catch(failRequest)
  });
  
  router.put("/:id", function(req, res) {
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
  
  return router;
}