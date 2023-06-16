// YouTube API keys
var youtubeApiKeys = ['AIzaSyCBUuou068cFf3N1oXIIoaOh3ELzfKBkHw', 'AIzaSyD5N0cU-1PafmBb_Oob3mAOOecX9I-MAHs','AIzaSyDo3wiEmDWCkWxi2UIs8FqXCt4IxcghxD4'];
var currentApiKeyIndex = 0;

// Function to get the current API key
function getCurrentApiKey() {
  return youtubeApiKeys[currentApiKeyIndex];
}

// Function to switch to the next API key
function switchToNextApiKey() {
  currentApiKeyIndex = (currentApiKeyIndex + 1) % youtubeApiKeys.length;
}

// Function to check if a video is embeddable
async function isVideoEmbeddable(videoId) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=status&id=${videoId}&key=${getCurrentApiKey()}`, {
      credentials: 'same-origin' // Include SameSite attribute for the cookie
    });
    const data = await response.json();

    // Function to check if the video is embeddable
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      return video.status.embeddable;
    }

    return false;
  } catch (error) {
    console.error('Error:', error);
    switchToNextApiKey(); // Switch to the next API key in case of an error
    throw error;
  }
}

// Function to generate a random song based on genre
async function generateRandomSong(genre) {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${genre}%20music&type=video&key=${getCurrentApiKey()}`, {
      credentials: 'same-origin' // Include SameSite attribute for the cookie
    });
    const data = await response.json();

    // Filter out videos that are not embeddable
    const embeddableVideos = [];
    for (const item of data.items) {
      const videoId = item.id.videoId;
      if (videoId && item.snippet.title && item.snippet.thumbnails) {
        const isEmbeddable = await isVideoEmbeddable(videoId);
        if (isEmbeddable) {
          embeddableVideos.push(item);
        }
      }
    }

    // Get a random video from the embeddable videos
    const randomIndex = Math.floor(Math.random() * embeddableVideos.length);
    const randomVideo = embeddableVideos[randomIndex];

    // Return the video ID and title
    return {
      videoId: randomVideo.id.videoId,
      title: randomVideo.snippet.title
    };
  } catch (error) {
    console.error('Error:', error);
    switchToNextApiKey(); // Switch to the next API key in case of an error
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
  // const selectedGenre = document.querySelector('.dropdown-item.active');
  // const genre = selectedGenre.dataset.genre;
  // const song = await generateRandomSong(genre);
  // loadPlayer(song.videoId);
  renderPreviousFind();
  getFact();
});

// Generates random fact
function getFact() {
  var facts = document.querySelector('#facts');
  var url = 'https://uselessfacts.jsph.pl/api/v2/facts/random';
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var funFact = data.text;
    facts.textContent = "Did you know? " + data.text;  
    localStorage.setItem('fact', JSON.stringify(funFact));
  })
}

function renderPreviousFind() {
  var previousFact = document.querySelector('#factsHistory');
  var lastFact = JSON.parse(localStorage.getItem('fact'));
  if (lastFact !== null) {
    previousFact.textContent = lastFact;
  }
}
