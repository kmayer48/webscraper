var express = require("express");
var cheerio = require("cheerio");
var Article = require("../models/Article");
var Comment = require("../models/Comment");
var axios = require("axios");
var app = express();


// ============= ROUTES FOR HOME PAGE =============//

// Scrape data from NPR website and save to mongodb.
app.get("/scrape", function(req, res) {
  // Grab the body of the html with axios.
  axios.get("http://www.npr.org/sections/news/archive").then(function(response) {
    // Load that into cheerio and save.
    var $ = cheerio.load(response.data);
    // Grab every part of the html that contains a separate article.
    $(".item-info").each(function(i, element) {
      // Save an empty result object.
      var result = {};
      // Get the title and description of every article, and save them as properties of the result object.
      // result.title saves entire <a> tag as it appears on NPR website.
      result.title = $(this).children("h2").text();
      // result.description saves text description.
      result.description = $(this).children(".teaser").text();
      console.log(result)
      // Create a new Article using the `result` object built from scraping.
        Article.create(result)
        .then(function(articles) {
          // View the added result in the console.
          console.log(articles);
        })
        .catch(function(err) {
          // If an error occurred, log it.
          console.log(err);
        });
    });

    // Reload the page so that newly scraped articles will be shown on the page.
    res.redirect("/");
  });  
});


// This will get the articles we scraped from the mongoDB.
app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array.
  Article.find({})
  // Execute the above query.
  .then(function(articles) {
    // If we were able to successfully find Articles, send them back to the browser.
    res.json(articles);
  })
  .catch(function(err) {
    // If an error occurred, send it to the browser.
    res.json(err);
  });
});

// Save an article route.
app.post("/save/:id", function(req, res) {
  // Use the article id to find and update it's saved property to true.
  Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true })
  // Execute the above query
  .then(function(articles) {
    // If we were able to successfully find an Article with the given id, send it back to the browser.
    res.json(articles);
  })
  .catch(function(err) {
    // If an error occurred, send it to the browser.
    res.json(err);
  });
});


// ============= ROUTES FOR SAVED ARTICLES PAGE =============//

// Grab an article by it's ObjectId.
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db and populate all of the comments associated with it.
  Article.findOne({ "_id": req.params.id }) 
  .populate("comments")
  // now, execute the query.
  .then(function(dbArticle) {
    // If we were able to successfully update an Article, send it back to the browser.
    res.json(dbArticle);
  })
  .catch(function(err) {
    // If an error occurred, send it to the browser.
    res.json(err);
  });
});

// Create a new comment.
app.post("/comment/:id", function(req, res) {
  // Create a new comment and pass the req.body to the entry.
  var newComment = new Comment(req.body);
  // And save the new comment the db.
  newComment.save(function(error, newComment) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's comment.
      Article.findOneAndUpdate({ "_id": req.params.id }, { $push: { "comments": newComment._id }}, { new: true })
      // Execute the above query.
      .exec(function(err, article) {
        // Log any errors.
        if (err) {
          console.log(err);
        }
        else {
          console.log("article: ", article);
          // Or send the document to the browser.
          res.send(article);
        }
      });
    }
  });
});

// Remove a saved article.
app.post("/unsave/:id", function(req, res) {
  // Use the article id to find and update it's saved property to false.
  Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": false })
  // Execute the above query.
  .then(function(err, doc) {
    // Log any errors.
    if (err) {
      console.log(err);
    }
    // Log result.
    else {
      console.log("Article Removed");
    }
  });
  res.redirect("/saved");
});

module.exports = app;
