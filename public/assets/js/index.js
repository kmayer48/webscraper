$(document).ready(function() {
	
	// Grab the articles as a json when page loads, append to the page.
	$.getJSON("/articles", function(data) {
	  // For each one
	  for (var i = 0; i < data.length; i++) {
	    // Display the information on the page.
			$("#scrape-results").prepend("<div class='card'><h5 class='card-header'>" + data[i].title + "</h5>" + "<div class='card-body'>" + "<h5 class='card-title'>" + data[i].description + "</h5>" + 
			"<a href='#' class='btn btn-primary save-article' data-id=" + data[i]._id + ">" + "<i class='fas fa-bookmark'></i> Save Article</a>" + "</div>");
	  }
	});

	// Save article button changes the saved property of the article model from false to true.
	$(document).on("click", ".save-article", function() {
		event.preventDefault();
		// change icon to check mark.
		$(this).removeClass("btn-primary").addClass("btn-success");
		$(this).html("Article Saved " + "<i class='fas fa-exclamation'></i>")
		// Get article id.
		var articleID = $(this).attr("data-id");
		console.log(articleID);
		// Run a POST request to update the article to be saved.
	  $.ajax({
	    method: "POST",
	    url: "/save/" + articleID,
	    data: {
	      saved: true
	    }
	  }).done(function(data) {
      // Log the response.
      console.log("data: ", data);
		});
	});


});
