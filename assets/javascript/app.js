
const gifName = ["cat", "dog", "fish", "bird", "plane"];

function displayGifImage() {
    
    // variable for storing the "data-name" state of fixed_height_small_still.url 
    const searchResult = $(this).attr("data-name");

    //variable for giphy api that takes in the search data
    const queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10&q=" + searchResult;
    
    //query the giphy api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {   
        //loop through the JSON ten times and display a new <img> tag each time
        for (let i = 0; i < 10; i++) {

            //create variable to reuse for animate and still URL's
            const stillImageUrl = response.data[i].images.fixed_height_small_still.url;
            const animateImageUrl = response.data[i].images.fixed_height_small.url;
            console.log(queryURL)
            console.log(stillImageUrl)
            
            /*  <img class="change-state" src="stillImageUrl" alt="gif image"
                 data-still="stillImageURL" data-animate="animatedImageURL" data-state="still"> */
            const gifImage = $("<img>");
            gifImage.attr("src", stillImageUrl);
            gifImage.attr("alt", "gif image");
            gifImage.attr("data-animate", animateImageUrl)
            gifImage.attr("data-still", stillImageUrl)
            gifImage.attr("data-state", "still")
            gifImage.addClass("change-state")
            //load gif ahead of of previous gif
            $("#gif-view").prepend(gifImage);
        }
    });
}  

function renderButtons() {
    $("#buttons-view").empty();
    for (let i = 0; i < gifName.length; i++) {
        //<button class="onGifClick" data-name="gifName[iterated]">text pulled from gifName[iterated]</button>
        const a = $("<button>");
        a.addClass("onGifClick");
        a.attr("data-name", gifName[i]);
        a.text(gifName[i]);
        $("#buttons-view").append(a);
    }
}


$("#add-gif").on("click", function (event) {
    event.preventDefault();
    const gifNameFromText = $("#gif-input").val().trim();
    gifName.push(gifNameFromText);
    console.log(gifName);
    renderButtons();
});

$(document).on("click", ".onGifClick", displayGifImage);


$(".change-state").on("click", function() {
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