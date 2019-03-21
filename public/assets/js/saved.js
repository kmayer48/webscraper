$(document).ready(function() {
	
	// Display saved articles on page load.
	$.getJSON("/articles", function(data) {
	  // For each one
	  for (var i = 0; i < data.length; i++) {
	  	// if article has been marked as saved.
	  	if (data[i].saved === true) {
				// Display the information on the page.
	   		$("#saved-results").append("<div class='card'><h5 class='card-header'>" + data[i].title + "</h5>" + "<div class='card-body'>" + "<h5 class='card-title'>" + data[i].description + "</h5>" + 
				 "<button type='button' <a href='#' class='btn btn-info comments-button' data-toggle='modal' data-target='#comment-modal' data-id=" + data[i]._id + ">" + "<i class='fas fa-comments'></i> Comment</a></button>" +  
				 "<button type='button'<a href='#' class='btn btn-danger delete-button' data-id=" + data[i]._id + ">" + "<i class='fas fa-trash-alt'></i> Delete</a></button>" + "</div>");
	  	}
	  }
	});

	// Comment button opens the comments modal & displays any comments.
	$(document).on("click", ".comments-button", function() {
		$("#comment-modal").show();
		var articleID = $(this).attr("data-id");
		$("#save-comment").attr("data-id", articleID);
		// Get article by article ID.
		console.log(articleID)
		// Now make an ajax call for the Article.
	  $.ajax({
	    method: "GET",
	    url: "/articles/" + articleID
	  }).done(function(data) {
	  	// Update modal header.
	  	$("#comments-header").html("Article Comments (ID: " + data._id + ")");
	  	// If the article has comments
	  	if (data.comments.length !== 0) {
	  		// Clear out the comment div.
	  		$("#comments-list").empty();
	  		for (i = 0; i < data.comments.length; i++) {
	  			// Append all article comments.
					$("#comments-list").append("<div class='comment-div'><p class='comment'>" + data.comments[i].body + "</p></div>");
	  		}
	  	}
	  });
	});

	// Saving Comments.
	$(document).on("click", "#save-comment", function() {
	  // Grab the id associated with the article from the submit button.
		var articleID = $(this).attr("data-id");
		console.log(articleID);
		var comment = $("#new-comment-field").val();
	  // Run a POST request to add a comment, using what's entered in the inputs.
	  $.ajax({
	    method: "POST",
	    url: "/comment/" + articleID,
	    data: {
	      // Value taken from body input.
	      body: comment
	    }
	  }).done(function(data) {
      // Log the response.
			console.log("data: ", data);
		});

	  // Also, remove the values entered in the inputs for comment entry.
		$("#new-comment-field").val("");
	});

	// Deleting Comments.
	$(document).on("click", ".delete-comment", function() {
		// delete comment.
	});

	// Removing Saved Articles.
	$(document).on("click", ".delete-button", function() {
		// Get article id.
		var articleID = $(this).attr("data-id");
		console.log(articleID);
		// Run a POST request to update the article to be saved.
	  $.ajax({
	    method: "POST",
	    url: "/unsave/" + articleID,
	    data: {
	      saved: false
	    }
		});
		location.reload();
	});

});
