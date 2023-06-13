// YouTube and Spotify API keys
var YOUTUBE_API_KEY = 'AIzaSyD5N0cU-1PafmBb_Oob3mAOOecX9I-MAHs';
var SPOTIFY_API_KEY = 'b73dead14b8c4d77a34b8fe38c1f9213';

var genreSelect = document.getElementById('genre-select');
var playerContainer = document.getElementById('player-container');

genreSelect.addEventListener('change', function() {
  var selectedGenre = genreSelect.value;

  // Clear previous players
  playerContainer.innerHTML = '';

  if (selectedGenre === 'rock') {
    // Use YouTube API
    var youtubePlaylistId = 'YOUR_YOUTUBE_PLAYLIST_ID';
    var youtubeApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${youtubePlaylistId}&key=${YOUTUBE_API_KEY}`;

    // Create YouTube playlist container
    var youtubeContainer = document.createElement('div');
    youtubeContainer.className = 'playlist-container';

    // Create YouTube Embed
    var youtubePlayer = document.createElement('iframe');
    youtubePlayer.width = '560';
    youtubePlayer.height = '315';
    youtubePlayer.allow = 'autoplay; encrypted-media';
    youtubePlayer.allowFullscreen = true;

    fetch(youtubeApiUrl)
      .then(response => response.json())
      .then(data => {
        var videos = data.items;
        var firstVideoId = videos[0].snippet.resourceId.videoId;
        var youtubeEmbedUrl = `https://www.youtube.com/embed/${firstVideoId}`;

        youtubePlayer.src = youtubeEmbedUrl;
        youtubeContainer.appendChild(youtubePlayer);
      })
      .catch(error => {
        console.error('Error loading YouTube playlist:', error);
      });

    playerContainer.appendChild(youtubeContainer);

    // Use Spotify API
    var spotifyPlaylistId = 'PLAYLIST_ID';
    var spotifyApiUrl = `https://api.spotify.com/v1/playlists/${spotifyPlaylistId}/tracks`;

    // Create Spotify playlist container
    var spotifyContainer = document.createElement('div');
    spotifyContainer.className = 'playlist-container';

    // Create Spotify Embed
    var spotifyPlayer = document.createElement('iframe');
    spotifyPlayer.src = `https://open.spotify.com/embed/playlist/${spotifyPlaylistId}`;
    spotifyPlayer.width = '300';
    spotifyPlayer.height = '380';
    spotifyPlayer.allowtransparency = true;
    spotifyPlayer.allow = 'encrypted-media';

    fetch(spotifyApiUrl, {
      headers: {
        Authorization: `Bearer ${SPOTIFY_API_KEY}`
      }
    })
      .then(response => response.json())
      .then(data => {
        var tracks = data.items;
        var firstTrackUri = tracks[0].track.uri;
        spotifyPlayer.src = `https://open.spotify.com/embed/track/${firstTrackUri.split(':')[2]}`;
        spotifyContainer.appendChild(spotifyPlayer);
      })
      .catch(error => {
        console.error('Error loading Spotify playlist:', error);
      });

    playerContainer.appendChild(spotifyContainer);
  } else if (selectedGenre === 'pop') {
    // Add information for 'pop' genre
  } else if (selectedGenre === 'jazz') {
    // Add information for 'jazz' genre
  } else if (selectedGenre === 'country') {
    // Add information for 'country' genre
  } else if (selectedGenre === 'hiphop') {
    // Add information for 'hiphop' genre
  }
});
