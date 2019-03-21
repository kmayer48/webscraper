var express = require("express");
var exphbs = require("express-handlebars");

var router = express.Router();
// Index page html route.
router.get("/", (req, res) => {
  res.render("index");
});

// Saved page html route.
router.get("/saved", (req, res) => {
	res.render("saved");
});

module.exports = router;
