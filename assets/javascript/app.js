var characters = ["Finn and Jake", "Beauty and the Beast", "Moana", "Avengers"];


function renderButtons() {
    $("#characterButtons").empty();

    for (var i = 0; i < characters.length; i++) {
        var a = $("<button>");
        a.addClass("character");
        a.attr("data-name", characters[i]);
        a.text(characters[i]);
        $("#characterButtons").append(a);
    }
}

$("#addCharacter").on("click", function(event) {
    event.preventDefault();
    var character = $("#character-input").val().trim();
    characters.push(character);
    renderButtons();
});

renderButtons();


$("button").on("click", function() {
    // Grabbing and storing the data-animal property value from the button
    var characterName = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    characterName + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);
        // storing the data from the AJAX request in the results variable
        var results = response.data;
        console.log(results);

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var characterDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var characterImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          characterImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and image tag to the animalDiv
          characterDiv.append(p);
          characterDiv.append(characterImage);

          // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
          $("#characters").prepend(characterDiv);
        }
      });
  });

  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
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