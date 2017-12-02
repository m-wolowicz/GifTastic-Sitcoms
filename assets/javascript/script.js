//IMPORTANT!
$(document).ready(function(){

	// GLOBAL VARIABLES
	// ================

		//Defining an array variable that contains strings of topics
		var topics = [	"30 Rock",
						"Arrested Development",
						"The Big Bang Theory",
						"Brooklyn 99",
						"Community",
						"Daria",
						"Everybody Loves Raymond",
						"Family Guy",
						"The Fresh Prince of Bel-Air",
						"Friends TV",
						"How I Met Your Mother",
						"Modern Family",
						"Parks And Recreation",
						"Party Down",
						"Scrubs",
						"Seinfeld",
						"That 70s Show",
						"The Office",
						"Veep"];

	// FUNCTIONS
	// =========

		//This function creates the buttons for the array of topics above
		function createButtons() {

			//This for loop creates buttons out of the topics array
			for (var i = 0; i < topics.length; i++) {

				//Creates a new variable to contain the syntax to create each button
				var newButtons = $('<button type="button" value="' + topics[i] + '">' + topics[i] + "</button>").addClass("allButtons");

				//Adds data property to each new Button
				newButtons.attr({"data-show": topics[i] });

				//Adds each new button to the HTML element
				$("#buttonsDiv").append(newButtons);
			}
		}

	// MAIN PROCESS
	// ============

		//This calls the function to create the buttons at the begining of the load page event.
		createButtons();

		//This function grabs the user input and adds it to the array of buttons
			$("#submitButton").on("click", function(event) {

				// event.preventDefault() prevents submit button from trying to send a form.
        		// Using a submit button instead of a regular button allows the user to hit
        		// "Enter" instead of clicking the button if desired
        		event.preventDefault();

        		//Create a new variable that holds the user's input
				var newUserButton = document.forms["inputForm"]["userInput"].value;

				//Add new button to the Array
				topics.push(newUserButton);
				
				//First, we need to empty the div that contains the buttons
				$("#buttonsDiv").empty();
				
				//Create all buttons again
				createButtons();

				//Testing & Debugging
				console.log(newUserButton);
				console.log(topics);
			});

		//This function captures the user's choice & runs the AJAX API
		$(".allButtons").on("click", function(){
			//Save the user's choice variable's new value
			var userChoice = $(this).data("show"); 

			//Convert the user's choice to an encoded String for URL purposes
			var userChoiceEncoded = encodeURI(userChoice);

			//Create a new variable for the GIPHY API query URL search
			var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userChoiceEncoded + "&limit=9&api_key=dc6zaTOxFJmzC";

			//
			$.ajax({
				url: queryURL,
				method: "GET"
			}).done(function(response) {

				//Testing & Debugging
				console.log(response);

				//Creating a new variable to contain the syntax to GET the FIRST row of the table
				var firstRowTds = $("table").children().eq(1).children("tr").eq(0).children("td");
				//Setting the inner content of each td in the first row
				firstRowTds.eq(0).html('<img src="'+ response.data[0].images.fixed_height_still.url + '" alt="' + response.data[0].title + '">');
				firstRowTds.eq(1).html('<img src="'+ response.data[1].images.fixed_height_still.url + '" alt="' + response.data[1].title + '">');
				firstRowTds.eq(2).html('<img src="'+ response.data[2].images.fixed_height_still.url + '" alt="' + response.data[2].title + '">');

				//Creating a new variable to contain the syntax to GET the SECOND row of the table
				var secondRowTds = $("table").children().eq(1).children("tr").eq(1).children("td");
				//Setting the inner content of each td in the first row
				secondRowTds.eq(0).html("This gif is rated: " + response.data[0].rating);
				secondRowTds.eq(1).html("This gif is rated: " + response.data[1].rating);
				secondRowTds.eq(2).html("This gif is rated: " + response.data[2].rating);


				//Creating a new variable to contain the syntax to GET the THRID row of the table
				var thirdRowTds = $("table").children().eq(1).children("tr").eq(2).children("td");
				//Setting the inner content of each td in the first row
				thirdRowTds.eq(0).html('<img src="'+ response.data[3].images.fixed_height_still.url + '" alt="' + response.data[3].title + '">');
				thirdRowTds.eq(1).html('<img src="'+ response.data[4].images.fixed_height_still.url + '" alt="' + response.data[4].title + '">');
				thirdRowTds.eq(2).html('<img src="'+ response.data[5].images.fixed_height_still.url + '" alt="' + response.data[5].title + '">');

				//Creating a new variable to contain the syntax to GET the FOURTH row of the table
				var fourthRowTds = $("table").children().eq(1).children("tr").eq(3).children("td");
				//Setting the inner content of each td in the first row
				fourthRowTds.eq(0).html("This gif is rated: " + response.data[3].rating);
				fourthRowTds.eq(1).html("This gif is rated: " + response.data[4].rating);
				fourthRowTds.eq(2).html("This gif is rated: " + response.data[5].rating);


				//Creating a new variable to contain the syntax to GET the FIFTH row of the table
				var fifthRowTds = $("table").children().eq(1).children("tr").eq(4).children("td");
				//Setting the inner content of each td in the first row
				fifthRowTds.eq(0).html('<img src="'+ response.data[6].images.fixed_height_still.url + '" alt="' + response.data[6].title + '">');
				fifthRowTds.eq(1).html('<img src="'+ response.data[7].images.fixed_height_still.url + '" alt="' + response.data[7].title + '">');
				fifthRowTds.eq(2).html('<img src="'+ response.data[8].images.fixed_height_still.url + '" alt="' + response.data[8].title + '">');

				//Creating a new variable to contain the syntax to GET the SICTH row of the table
				var sixthRowTds = $("table").children().eq(1).children("tr").eq(5).children("td");
				//Setting the inner content of each td in the first row
				sixthRowTds.eq(0).html("This gif is rated: " + response.data[6].rating);
				sixthRowTds.eq(1).html("This gif is rated: " + response.data[7].rating);
				sixthRowTds.eq(2).html("This gif is rated: " + response.data[8].rating);

				//Apply a class to all the img elements
				$("img").addClass("allGiphyImages");

			//Testing & Debugging
			console.log(userChoice);
			console.log(userChoiceEncoded);
			console.log(queryURL);

			});

		});

		//This funciton allows the user to play and stop each gif on user click
		$("body").on("click", ".allGiphyImages", function() {
			var src = $(this).attr("src");

			if($(this).hasClass("play")){
				//Stop the gif animation
				$(this).attr("src", src.replace(/\.gif/i, "_s.gif"));
				$(this).removeClass("play");
			} else {
				//Play the gif animation
				$(this).addClass("play");
				$(this).attr("src", src.replace(/\_s.gif/i, ".gif"));
			}

		});

}); //IMPORTANT!