const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const exphbs = require("express-handlebars");
const path = require("path");


const PORT = 3000;

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
//app.use(logger("dev"));


// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));



  axios.get("https://www.slashdot.org").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);
    
  // console.log(response.data);

 

    // Now, we grab every h1 within a title tag, and do the following:
    $("story-title a").each(function(i, element) {
      // Save an empty result object
      let result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");

    

     console.log(result);
        

    });


    // Send a message to the client
    res.send("Scrape Complete");


  });



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
