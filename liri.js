require("dotenv").config();
var keys = require("./key.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");

// Capture the command
var userCommand = process.argv[2];

var userFullRequest = process.argv;

var newRequest = "";

for (var i = 3; i < userFullRequest.length; i++) {
  if (i > 3 && i < userFullRequest.length) {
    newRequest += "+" + userFullRequest[i];
  } else {
    newRequest += userFullRequest[i];
  }
}

switch (userCommand) {
  case "movie-this":
    movie(newRequest);
    break;

  case "concert-this":
    concert(newRequest);
    break;

  case "spotify-this-song":
    spotifySong(newRequest);
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

// Function to log information to log.txt file
function appendtoLog(message) {
  fs.appendFile("log.txt", "\n" + message, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Command added to log.txt");
    }
  });
};

// Pass through user request to log.txt file
appendtoLog(userFullRequest);

// Movie function
function movie(userInput) {
  var movieName = "";

  movieName = userInput;

  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios
    .get(queryUrl)
    .then(function(response) {
      console.log("-----------------------");

      console.log("Movie title: " + (response.data.Title || "N/A"));
      console.log("Year: " + (response.data.Year || "N/A"));
      console.log("IMDB rating: " + (response.data.imdbRating || "N/A"));
      console.log("Rotten tomatoes: " + (response.data.Ratings[1].Value || "N/A"));
      console.log("Country: " + (response.data.Country || "N/A"));
      console.log("Language: " + (response.data.Language || "N/A"));
      console.log("Plot: " + (response.data.Plot || "N/A"));
      console.log("Actors: " + (response.data.Actors || "N/A"));

      console.log("-----------------------");
    })
    .catch(function(error) {
      // handle error
      console.log("Please enter in a real movie"); 
      console.log(error);
    });
}

// Band function
function concert(userInput) {
  var artistName = "";

  artistName = userInput;

  var queryUrl =
    "https://rest.bandsintown.com/artists/" +
    artistName +
    "/events?app_id=codingbootcamp";

  axios
    .get(queryUrl)
    .then(function(response) {
      for (var i = 0; i < 5; i++) {
        // Name of venue, venue location, date of event
        console.log("-----------------------");
        console.log("Venue name: " + (response.data[i].venue.name || "N/A"));
        console.log("City: " + (response.data[i].venue.city || "N/A"));

        // Change date format
        var originalDate = response.data[i].datetime;
        var shortDate = originalDate.substring(0, 10);
        var displayDate = moment(shortDate, "YYYY-MM-DD").format("MM/DD/YYYY");

        console.log("Concert date: " + (displayDate || "N/A"));
        console.log("-----------------------");
      }
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      console.log("Please enter in a real movie"); 
    });
}

// Spotify function

function spotifySong(userInput) {
  var spotifyQuery = "";

  spotifyQuery = userInput;

  spotify
    .search({ type: "track", query: spotifyQuery })
    .then(function(response) {

      if (response.tracks.items.length === 0) {
        spotify
          .search({ type: "track", query: "The Sign Ace of Base" })
          .then(function(response) {
            console.log(response);
            console.log("Artist: " + (response.tracks.items[0].artists[0].name || "N/A"));
            console.log("Song: " + (response.tracks.items[0].name || "N/A"));
            console.log("Album: " + (response.tracks.items[0].album.name || "N/A"));
            console.log("Preview link: " + (response.tracks.items[0].external_urls.spotify || "N/A"));
          });
      } else {
        for (var i = 0; i < 5; i++) {
          console.log("-----------------------");
          console.log("Result No. " + (i + 1));
          console.log("Artist: " + (response.tracks.items[i].artists[0].name || "N/A"));
          console.log("Song: " + (response.tracks.items[i].name || "N/A"));
          console.log("Album: " + (response.tracks.items[i].album.name || "N/A"));
          console.log("Preview link: " + (response.tracks.items[i].external_urls.spotify || "N/A"));
          console.log("-----------------------");
        }
      }
    })
    .catch(function(err) {
      console.log(err);
      console.log("Please enter in a real song or artist"); 
    });
}

// Do what it says function

function doWhatItSays() {
  fs.readFile("./random.txt", "utf8", (err, data) => {
    if (err) throw err;

    var userCommand = data.split(", ")[0];

    var splitSearch = data.split(", ");

    var userCommand = splitSearch[0];

    var userSong = splitSearch[1];

    switch (userCommand) {
      case "movie-this":
        movie(userSong);
        break;

      case "concert-this":
        concert(userSong);
        console.log("concert registers");
        break;

      case "spotify-this-song":
        console.log("spotify called");
        spotifySong(userSong);
        break;
    }
  });
};