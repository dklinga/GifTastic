$(document).ready(function () {
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

  $("#addCharacter").on("click", function (event) {
    event.preventDefault();
    var character = $("#character-input").val().trim();
    characters.push(character);
    renderButtons();
  });

  renderButtons();

  function displayCharacterInfo() {
    var characterName = $(this).attr("data-name");

    // Constructing a queryURL using the animal name
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      characterName + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function (response) {
        console.log(queryURL);

        console.log(response);
        var results = response.data;
        console.log(results);

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var characterDiv = $("<div>");
          characterDiv.addClass("ri");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var characterImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          characterImage.attr("src", results[i].images.fixed_height_still.url);
          characterImage.attr("data-still", results[i].images.fixed_height_still.url);
          characterImage.attr("data-animate", results[i].images.fixed_height.url);
          characterImage.attr("data-state", "still");
          characterImage.addClass("gif");

          characterDiv.append(p);
          characterDiv.append(characterImage);


          // Prependng the div to html
          $("#characters").prepend(characterDiv);
        }
      })
  }

  $(document).on("click", ".character", displayCharacterInfo);


  $(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


});