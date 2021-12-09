const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// get list of all BOOKS
recordRoutes.route("/record").get(function (req,res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("books")
    .find({})
    .toArray(function (err,result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/record/addbooks").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    book_name: req.body.book_name,
    book_author: req.body.book_author,
    book_description: req.body.book_description,
    book_price: req.body.book_price,
    book_cover: req.body.book_cover,
  }
  db_connect.collection("books").insertOne(myobj, function(err, res){
    if (err) throw err;
    response.json(res);
  });
})


// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("books").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.status(obj);
  });
});

module.exports = recordRoutes;