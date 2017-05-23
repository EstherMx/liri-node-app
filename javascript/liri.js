var keysInput = require ("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');



var myTweets = function(){

  var client = new Twitter(keysInput.twitterKeys); 
  
  var params = {screen_name: 'esreine'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (var i=0; i<tweets.length; i++){
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
    }
  }
});
}

var spotifyThis = function(songName){

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }

    var artist = function(artist){
      return artist.name;
    }

    var songInfo = data.tracks.items;
    for (var i=0; i<songInfo.length; i++){
    
      console.log('artist(s):' + songInfo[i].album.artists.map(artist));
      console.log("song:" + songInfo[i].name);
      console.log("preview link:" + songInfo[i].preview_url);
      console.log("album:" + songInfo[i].album.name);
      console.log("--------------------------------")
    }
});

}

var movie = function(movieName){
// http://www.omdbapi.com/?apikey=[58f7a807]&
request('http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json' , function (error, response, body) {
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 

if (!error && response.statusCode == 200) {

var jsonParse = JSON.parse(body);

console.log('Title:' + jsonParse.Title);
console.log('Year:' + jsonParse.Year);
console.log('Rated:' + jsonParse.Rated);
console.log('IMDB Rating:' + jsonParse.imdbRating);
console.log('Country:' + jsonParse.Country);
console.log('Language:' + jsonParse.Language);
console.log('Plot:' + jsonParse.Plot);
console.log('Actors:' + jsonParse.Actors);
console.log('Rotten tomatoes rating:' + jsonParse.tomatoRating);
console.log('Rotten tomatoes URL:' + jsonParse.tomatoURL);
  
  }
});
}

function doWhatItSays() {
  fs.readFile('./random.txt', 'utf8', function(err, data) {

        var dataArr = data.split(",");

       // console log the song from random.txt file
        spotifyThis(dataArr[1]);

  });
}



//when the user will write 'my-tweets' in the console, the function myTweets will run
var choose = function(caseData, functionData){
    switch(caseData){
      case 'my-tweets':
        myTweets();
      break;
      case 'spotify-this-song':
        spotifyThis();
      break;
      case 'movie-this':
        movie();
      break;   
      case 'do-what-it-says':
        doWhatItSays();
      break;
    default:
      console.log("Sorry, can't help you with that");

    }
}
 
 //the function runThis is composed of two arguments: argOne and argTwo which will equal to the two arguments of the original choose function
var runThis = function(argOne, argTwo){
  choose(argOne,argTwo);
};
//now, we pass to the function runThis the arguments that the user will type on the console
runThis(process.argv[2], process.argv[3]);





// var spotify = require('spotify');





// my-tweets: show last 20 tweets and when created

// spotify-this-song: Artist(s)
					// The song's name
					// A preview link of the song from Spotify
					// The album that the song is from
		// if not found: display "The Sign" by Ace of Base

// movie-this: 

// do-what-it-says