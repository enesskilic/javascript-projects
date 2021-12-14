const select = (query) => document.querySelector(query);
const selectAll = (query) => document.querySelectorAll(query);

// Variables
const video = select(".video-element");
const playIcons = selectAll(".play-icons i");
const playButton = select("#btn-play");
const fullScreenButton = select("#btn-full-screen");
const currentTime = select(".video-timer-current");
const duration = select(".video-timer-duration");
const range = select(".video-progress-range");
const progress = select(".video-progress-bar");
const videoContainer = select(".video-container");


// Functions
const formatTime = (second) => {
  const result = new Date(second * 1000).toISOString().substr(11, 8);

  return {
    minutes: result.substr(3, 2),
    seconds: result.substr(6, 2),
  };
};

// Control Functions
const togglePlay = () => {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
};

const updatePlayButton = () => {
  playIcons.forEach((icon) => icon.classList.toggle("d-none"));
};

const updateCurrentTime = () => {
  const time = formatTime(Math.round(video.currentTime));
  currentTime.innerText = `${time.minutes}:${time.seconds}`;
};

const updateProgress = () => {
  range.value = Math.floor(video.currentTime)
  progress.value = Math.floor(video.currentTime)
}

const skipAhead = () => {
  const target = range.value
  video.currentTime = target
  progress.value = target
}

const toggleFullScreen = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else if (document.webkitFullscreenElement) {
    // Safari support
    document.webkitExitFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    // Safari support
    videoContainer.webkitRequestFullscreen();
  } else {
    videoContainer.requestFullscreen();
  }
}

const initVideo = () => {
  const durationFixed = Math.round(video.duration);
  const time = formatTime(durationFixed);
  
  duration.innerText = `${time.minutes}:${time.minutes}`;

  range.setAttribute("max", durationFixed);
  progress.setAttribute("max", durationFixed);
};

// Listeners
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("timeupdate", updateCurrentTime);
video.addEventListener("timeupdate", updateProgress);
video.addEventListener("loadedmetadata", initVideo);
range.addEventListener("change", skipAhead);
video.addEventListener("click", togglePlay);
playButton.addEventListener("click", togglePlay);
fullScreenButton.addEventListener("click", toggleFullScreen);
