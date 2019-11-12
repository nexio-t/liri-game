require("dotenv").config();
var keys = require("./key.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");


// capture the command 
var userCommand = process.argv[2];


var userFullRequest = process.argv; 


switch (userCommand) {

    case "movie-this": 
    movie(); 

    break;  
    
    case "concert-this": 
    concert();
    console.log("concert registers");  
    break; 

    case "spotify-this-song": 
    spotifySong();
    break; 
    
    case "do-what-it-says": 
    doWhatItSays(); 
    console.log("command registers"); 
    break; 

}; 

// Function to log information to log.txt file 
function appendtoLog(message) {

    fs.appendFile("log.txt","\n" + message, (err) => {
        if (err) {
            console.log(err); 
        }

        else {
            console.log("Command added to log.txt"); 
        }
    });

}
// Pass through user request to log.txt file 
appendtoLog(userFullRequest); 

// Movie function
function movie() {

    var movieName = ""; 

    for(var i = 3; i < userFullRequest.length; i++) {
        
        if (i > 3 && i < userFullRequest.length) {
            movieName += "+" + userFullRequest[i]; 
        } else {
            movieName += userFullRequest[i]; 
        }
    } 

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"; 

    axios.get(queryUrl)
    .then(
        function(response) {
        console.log("-----------------------"); 
        console.log("Movie title: " + response.data.Title); 
        console.log("Year: " + response.data.Year); 
        console.log("IMDB rating: " + response.data.imdbRating);
        console.log("Rotten tomatoes: " + response.data.Ratings[1].Value); 
        console.log("Country: " + response.data.Country); 
        console.log("Language: " + response.data.Language); 
        console.log("Plot: " + response.data.Plot); 
        console.log("Actors: " + response.data.Actors); 
        console.log("-----------------------"); 
  }).catch(function (error) {
    // handle error
    console.log(error);
  }); 

}

// Band function 
function concert() {

    var artistName = ""; 

    for(var i = 3; i < userFullRequest.length; i++) {
        
        if (i > 3 && i < userFullRequest.length) {
            artistName += "+" + userFullRequest[i]; 
        } else {
            artistName += userFullRequest[i]; 
        }
    } 

    var queryUrl = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp"; 

    console.log(artistName); 

    axios.get(queryUrl)
    .then(
        function(response) {

        for (var i = 0; i < 5; i++) {
        // Name of venue, venue location, date of event 
        console.log("-----------------------"); 
        console.log("Venue name: " + response.data[i].venue.name); 
        console.log("City: " + response.data[i].venue.city); 
        
        // Change date format
        var originalDate = response.data[i].datetime
        var shortDate = originalDate.substring(0, 10); 
        var displayDate = moment(shortDate, "YYYY-MM-DD").format("MM/DD/YYYY");

        console.log("Concert date: " + displayDate); 
        console.log("-----------------------"); 
        }

  }).catch(function (error) {
    // handle error
    console.log(error);
  }); 

}

// Spotify function 

function spotifySong() {

    var spotifyQuery = ""; 

    for(var i = 3; i < userFullRequest.length; i++) {
        
        if (i > 3 && i < userFullRequest.length) {
            spotifyQuery += "+" + userFullRequest[i]; 
        } else {
            spotifyQuery += userFullRequest[i]; 
        }
    } 

      spotify
        .search({ type: 'track', query: spotifyQuery})
        .then(function(response) {

          console.log("Length is: " + response.tracks.items.length);

        if (response.tracks.items.length === 0) {
            spotify
            .search({ type: 'track', query: "The Sign Ace of Base"})
            .then(function(response) {
                console.log(response); 
                console.log("Artist: " + response.tracks.items[0].artists[0].name);
                console.log("Song: " + response.tracks.items[0].name);
                console.log("Album: " + response.tracks.items[0].album.name); // works
                console.log("Preview link: " + response.tracks.items[0].external_urls.spotify); 
            });
        } else {
            for (var i = 0; i < 5; i++) {
                console.log("-----------------------");
                //   console.log(response.tracks.items[0]);
                  console.log("Result No. " + (i + 1)); 
                  console.log("Artist: " + response.tracks.items[i].artists[0].name);
                  console.log("Song: " + response.tracks.items[i].name);
                  console.log("Album: " + response.tracks.items[i].album.name); // works
                  console.log("Preview link: " + response.tracks.items[i].external_urls.spotify); 
                  console.log("-----------------------");
            };

        };

      
        })
        .catch(function(err) {
          console.log(err);
        });

}

// Do what it says function 

function doWhatItSays() {

fs.readFile("./random.txt", (err, data) => {

    if (err) throw err; 

    console.log(typeof(data)); 

    console.log("data is " + data); 

    console.log("index 0 " + data[0]);

    console.log("index 0 " + data[1]);

    var newData = JSON.stringify(data); 

    console.log(typeof(newData)); 

    var command = newData.split(",").toString(); 

    console.log(command); 

    switch (data) {

        case "movie-this": 
        movie(); 
    
        break;  
        
        case "concert-this": 
        concert();
        console.log("concert registers");  
        break; 
    
        case "spotify-this-song": 
        console.log("spotify called"); 
        spotifySong();
        break; 
        
        case "do-what-it-says": 
        doWhatItSays(); 
        console.log("command registers"); 
        break; 
    
    }; 

}); 

}

// https://rest.bandsintown.com/artists/Beyonce/events?app_id=codingbootcamp

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
