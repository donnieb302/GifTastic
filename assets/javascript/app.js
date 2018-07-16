
//Page is ready to be manipulated
$(document).ready(function() {
//array of wrestlers
var animals = ["dog", "cat", "horse", "bird", "fish", "elephant", "tiger", "lion", "dolphin", "shark"];

function populateButtons(arrayToUse, classToAdd, areaToAdd){
  $(areaToAdd).empty();

  for (var i = 0; i < arrayToUse.length; i++) {
    var a = $("<button>");
    a.addClass(classToAdd);
    a.attr("data-type", arrayToUse[i]);
    a.text(arrayToUse[i]);
    $(areaToAdd).append(a);
  }
}  

// Click event for the button(s)
$(document).on("click", ".animal-button", function(){
  $("#animals").empty();
  $(".animal-button").removeClass("active");
  $(this).addClass("active");
  console.log("button works");
  var type = $(this).attr("data-type");

  // Storing our giphy API URL for a random wrestler images
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=CkG4ZDQrG592OZW0gFCMS5VER4gbYqO5&limit=10&offset=0&rating=G&lang=en";

  // Perfoming an AJAX GET request to our queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  // After the data from the AJAX request comes back
    .then(function(response) {

    // Saving the image_original_url property
      var results = response.data;

      // Looping over every result item
      for (var i = 0; i < results.length; i++){
        var animalDiv = $("<div class=\"animal-item\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
      // Only taking action if the photo has an appropriate rating
      // if (results[i].rating !== "r" && results[i].rating !== "pg13"){
      // //Creating a div with the class "item"
      //   var gifDiv = $("<div class= 'item'>");
      // //Stores thte results item's ratings
      //   var rating = results[i].rating;
        //Creating an image tag
        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        //Gving the image tag an src attribute of a property pulled off the result item
        //wrestlersImage.attr("src", results[i].images.fixed_height.url);
        //Appending paragraph and wrestlersImage we created to the "gifDiv" we created
        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
      }
    });
  });
        $(document).on("click", ".animal-image", function() {
      
        var state = $(this).attr("data-state");

        if(state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }

        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
        
      });
    
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var newAnimal = $("input").eq(0).val();
        console.log("this works too");
        if (newAnimal.length > 2) {
          animals.push(newAnimal);
        }

        populateButtons(animals, "animal-button", "#animal-buttons");
      });
        populateButtons(animals, "animal-button", "#animal-buttons");

});