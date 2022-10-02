const { default: mongoose } = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://doadmin:Wlve97qZ5D1068b4@db-mongodb-nyc1-24591-37cbcb59.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=db-mongodb-nyc1-24591"
  )
  .then(function (result, second) {
    console.log("mongodb connect success");
  })
  .catch(function (err) {
    console.log("Error", err);
  });
