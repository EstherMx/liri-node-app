var keysInput = require ("./keys.js");

var Twitter = require('twitter');

//grab the var twitterKeys from the file keys. 
var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'liri.app'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


// my-tweets: show last 20 tweets and when created

// spotify-this-song: Artist(s)
					// The song's name
					// A preview link of the song from Spotify
					// The album that the song is from
		// if not found: display "The Sign" by Ace of Base

// movie-this: 

// do-what-it-says