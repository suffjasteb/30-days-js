// Get our Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = document.querySelector("#fullscreen");

// Build Out Function

function togglePlay() {
  const method = video.paused ? `play` : `pause`;
  video[method]();
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  if (video.paused) {
    console.log("video paused", icon);
    toggle.textContent = icon;
  } else {
    console.log("video played", icon);
    toggle.textContent = icon;
  }
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  console.log(this.dataset);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);
}

function handleProgess() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrup(e) {
  const scrupTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrupTime;
}

// Hook up the event listener
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgess);

toggle.addEventListener("click", togglePlay);

skipButtons.forEach((btn) => {
  btn.addEventListener("click", skip);
});

ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener("click", scrup);
progress.addEventListener("mousemove", (e) => mousedown && scrup(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
// request fullscreen Chalange
fullScreen.addEventListener("click", () => video.requestFullscreen());
