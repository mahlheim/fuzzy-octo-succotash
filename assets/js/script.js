// YouTube API key
var YOUTUBE_API_KEY = 'AIzaSyD5N0cU-1PafmBb_Oob3mAOOecX9I-MAHs';
// Add your YouTube Data API key here
const apiKey = 'AIzaSyD5N0cU-1PafmBb_Oob3mAOOecX9I-MAHs';

// Function to generate a random song based on genre
async function generateRandomSong(genre) {
  try {
    // Search for videos based on genre using YouTube API
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${genre}%20music&type=video&key=${apiKey}`, {
      credentials: 'same-origin' // Include SameSite attribute for the cookie
    });
    const data = await response.json();

    // Get a random video from the search results
    const randomIndex = Math.floor(Math.random() * data.items.length);
    const randomVideo = data.items[randomIndex];

    // Return the video ID and title
    return {
      videoId: randomVideo.id.videoId,
      title: randomVideo.snippet.title
    };
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Function to load the YouTube player
function loadPlayer(videoId) {
  // Create the YouTube player
  new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: videoId,
    events: {
      'onReady': onPlayerReady
    }
  });
}

// Function to handle when the YouTube player is ready
function onPlayerReady(event) {
  event.target.playVideo();
}

// Event listener for the dropdown items
const dropdownItems = document.querySelectorAll('.dropdown-item');
dropdownItems.forEach(item => {
  item.addEventListener('click', async () => {
    // Remove the 'active' class from all items
    dropdownItems.forEach(item => item.classList.remove('active'));

    // Add the 'active' class to the clicked item
    item.classList.add('active');
  });
});

// Event listener for the "Go" button
const goButton = document.querySelector('.btn-primary');
goButton.addEventListener('click', async () => {
  const selectedGenre = document.querySelector('.dropdown-item.active');
  const genre = selectedGenre.dataset.genre;
  const song = await generateRandomSong(genre);
  loadPlayer(song.videoId);
});
