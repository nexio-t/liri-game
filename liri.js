require("dotenv").config();
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

// capture the command 

var userCommand = process.argv[2];
console.log(userCommand); 

var userFullRequest = process.argv; 

for (var i = 0; i < userFullRequest.length; i++) {
    console.log(userFullRequest[i]); 
};  // everything of index three or later 


switch (userCommand) {

    case "movie-this": /*movie();*/ console.log("movie registers"); break;  
    
    case "concert-this": /*concert();*/ console.log("concert registers");  break; 

    case "spotify-this-song": /*spotify();*/ console.log("spotify registers"); break; 
    
    case "do-what-it-says": /*command();*/ console.log("command registers"); break; 

}; 




    // switch statement 

        // check if user command is movie-this 
           

        // check if user command is concert this 
            // run an API call using axios to the bands in town API
            // inject the user's search term in the queryURL 
            // Display name of venue, venue location, and date of event 
            // Format the date using moment MM/DD/YYYY

        // check if user command is spotify-this-song
            // Using the node spotify pacakge info, make a call to the Spotify API 
            // default to a song 

            // Provide a feault to song if it didn't exit 

        // check if user command do-what-it-says 
            // 

    // otherwise, please try again 
