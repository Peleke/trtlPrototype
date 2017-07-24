module.exports = function (mongoose) {
  mongoose.connect("mongodb://localhost/trtlJR");
  const db = mongoose.connection;
  
  // Show any mongoose errors
  db.on("error", function(error) {
    console.error(`Mongoose Error: ${error}`);
  });
  
  // Once logged in to the db through mongoose, log a success message
  db.once("open", function() {
    console.log("Mongoose connection successful.");
  });
}