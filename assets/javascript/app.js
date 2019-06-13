
//array for storing new buttons
const gifName = ["cat", "dog", "fish", "bird", "plane", "halo", "apple", "dragon"];

function displayGifImage() {
    // every time a button is clicked, empty the gif view area
    $("#gif-view-area").empty();

    // variable for storing the user input from button
    const searchResult = $(this).attr("data-name");

    //variable for giphy api that takes in the search data
    const apiKey = "0FbXW4F9HCcDpbAqGA9MlQ0zwpmzri6I";
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=12&q=" + searchResult;
    
    //query the giphy api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {   
        //loop through the JSON ten times and display a new <img> tag each time
        for (let i = 0; i < 12; i++) {

            //create reusable variables for animate and still URL's
            const stillImageUrl = response.data[i].images.fixed_height_small_still.url;
            const animateImageUrl = response.data[i].images.fixed_height_small.url;
            const rating = response.data[i].rating
            console.log(queryURL);
            console.log(stillImageUrl);
            console.log(rating)

            /*  <div class="col-3">gifImage</div> */
             const div = $("<div>")       
            div.addClass("col-lg-4 col-md-4 col-6")
            


            /*  <img src="stillImageUrl" alt="gif image"  data-animate="animatedImageURL"
                    data-still="stillImageURL" data-state="still" class="change-state"> */       
            const gifImage = $('<img>');
            gifImage.attr("src", stillImageUrl);
            gifImage.attr("alt", "gif image");
            gifImage.attr("data-animate", animateImageUrl);
            gifImage.attr("data-still", stillImageUrl);
            gifImage.attr("data-state", "still");
            gifImage.addClass("change-state");
            
            //create paragraph for rating
            const p = $("<p>");
            p.text("Rating: " + rating)

            //append the new div which includes the image(gifImage) and a paragraph(p) to the gif-view-area
            $(div).append(p);
            $(div).append(gifImage);
            $("#gif-view-area").append(div);

        }
    });
}  

function renderButtons() {
    $("#buttons-view-area").empty();
    for (let i = 0; i < gifName.length; i++) {
        //<button class="onGifClick" data-name="gifName[iterated]">text pulled from gifName[iterated]</button>
        const a = $("<button>");
        a.addClass("onGifClick");
        a.addClass("btn-secondary")
        a.addClass("btn")
        a.attr("type", "button");
        // create attribute with user input data
        a.attr("data-name", gifName[i]);
        // text for button
        a.text(gifName[i]);
        // add new button to div where the buttons are kept
        $("#buttons-view-area").append(a);
    }
}


$("#add-gif-button").on("click", function (event) {
    event.preventDefault();
    const gifNameFromText = $("#gif-search-input").val().trim();
    gifName.push(gifNameFromText);
    console.log(gifName);
    renderButtons();
});

$(document).on("click", ".onGifClick", displayGifImage);


$(document).on("click", ".change-state", function() {
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


renderButtons();