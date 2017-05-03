var toDoCount = 0;

$(document).ready(function(){



  console.log("running render buttons");
    // Delete the the input for button once it is added to nav bar
    // $("#movies-view").empty();
    // (this is necessary otherwise you will have repeat buttons)

    // Loop through the array of movies, then generate buttons for each movie in the array
    // for (i = 0; i < movies.length; i++) {
    //   movies[i]
    // }
    // var searchForm= $("add-hashtag")
    // This function handles events where the add movie button is clicked

    $("#add-to-do").on("click", function(event) {
        // event.preventDefault() prevents submit button from trying to send a form.
        // Using a submit button instead of a regular button allows the user to hit
        // "Enter" instead of clicking the button if desired
        event.preventDefault();
        // var gifButton=$("add-hashtag");
        // gifButton.attr("data-term",term);
        // gifButton.text(term);
        // Get the to-do "value" from the textbox and store it a variable
        // var toDoTask = $("#to-do").val().trim();

        // Write code to grab the text the user types into the input field
        var term = $("#hashtag-input").val().trim();
        // Write code to add the new movie into the movies array
        // create a new variable to hold the button
        console.log(term);
        // var buttonText = $("<p>");

        var termButton = $("<button class='gif-button'>");
        termButton.attr("id", "item-" + toDoCount);
        termButton.attr("data-term",  term);
        termButton.text(term);







        // Add the button with term to the buttons div
        $("#gif-buttons").append(termButton);

        // Clear the textbox when done
        $("#hashtag-input").val("");


        // hashtags.push(term);
        // The renderButtons function is called, rendering the list of movie buttons
        // renderButtons();
    });
    // for (var i=0; i < hashtags.length; i++) {
    //   console.log(hashtags[i]);
    // var button= $("<button>");
    // button.text(term);
    // $("#movies-view").append(button);

    // }
    // var searchForm= $("add-hashtag")
    // This function handles events where the add movie button is clicked
// getting giphs from clicking button

    $("#gif-buttons").on("click", ".gif-button", function(e) {
      console.log(e)

        var person = $(this).attr("data-term"); // Storing our giphy API URL for a random cat image
        console.log(person);
        
        var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ person + "&api_key=dc6zaTOxFJmzC&limit=10";

        console.log(queryURL)
        // Perfoming an AJAX GET request to our queryURL
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            // After the data from the AJAX request comes back


                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"

                        var gifDiv = $("<div class='item'>");
                        // Storing the result item's rating

                        var rating = results[i].rating;
                        // Creating a paragraph tag with the result item's rating

                        var p = $("<p>").text("Rating: " + rating);
                        // Creating an image tag

                        var personImage = $("<img>");
                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        personImage.attr("src", results[i].images.fixed_height.url);
                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        gifDiv.append(p);
                        gifDiv.append(personImage);
                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#images").prepend(gifDiv);
                    }
                }
        });
    });
// animating gif on click
    $(".gif").on("click", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element

        var state = $(this).attr("data-state"); // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    // Calling the renderButtons function to display the initial list of movies
    // renderButtons();
});