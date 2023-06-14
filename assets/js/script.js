// YouTube and Spotify API keys
var YOUTUBE_API_KEY = 'AIzaSyD5N0cU-1PafmBb_Oob3mAOOecX9I-MAHs';

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
    }
  }
);
