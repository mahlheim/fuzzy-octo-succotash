// YouTube API key
var YOUTUBE_API_KEY = 'AIzaSyD5N0cU-1PafmBb_Oob3mAOOecX9I-MAHs';

// YouTube API Player
let player;

// Called when the YouTube API script is loaded
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'iv_load_policy': 3,
      'loop': 1,
      'modestbranding': 1,
      'rel': 0,
      'showinfo': 0
    }
  });
}

// Add an event listener to the dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item[data-genre]');
dropdownItems.forEach(item => {
  item.addEventListener('click', () => {
    const genre = item.getAttribute('data-genre');
    
    // Load the playlist based on the selected genre
    loadPlaylist(genre);
  });
});

// Function to load a YouTube playlist based on the genre
function loadPlaylist(genre) {
  const playlistIds = {
    'pop': 'PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj',
    'rock': 'PLZN_exA7d4RVmCQrG5VlWIjMOkMFZVVOc',
    'hip-hop': 'PL3-sRm8xAzY-556lOpSGH6wVzyofoGpzU',
    'country': 'PL3oW2tjiIxvQW6c-4Iry8Bpp3QId40S5S'
  };
  
  const playlistId = playlistIds[genre];
  
  if (playlistId) {
    player.loadPlaylist({
      list: playlistId,
      listType: 'playlist',
      index: 0,
      startSeconds: 0,
      suggestedQuality: 'default'
    });
  } else {
    console.error('Invalid genre or playlist ID not found');
  }
}
