const University = require("../models/University.js");
const {failRequest} = require("../lib/helpers.js")

module.exports = function (router) {
  router.get("/", function(req, res) {
    University
      .find({})
      .then(res.json)
      .catch(failRequest(res));
  });
  
  router.get("/:id", function(req, res) {
    University
      .findOne({ _id : req.params.id })
      .then(res.json)
      .catch(failRequest(res))
    })
  
  router.post("/", function(req, res) {
  
    // @TODO: Validate
    const newUniversity = new University(req.body);
  
    newUniversity
      .save(res.json)
      .catch(failRequest)
  });
  
router.delete("/:id", function(req, res) {
  University
    .find({ _id: req.params.id })
    .remove((error, removed) => error ? failRequest(error) : res.json(removed))
});
  
  router.put("/:id", function(req, res) {
    const createUniversity = ({universityName, campusLocation}) =>
      Object.assign({universityName, campusLocation, modified: Date.now()})
    
      University.findByIdAndUpdate(req.params.id, {
        $set: createUniversity(req.body)
      }).then(res.json).catch(failRequest)
    });

  return router;
}