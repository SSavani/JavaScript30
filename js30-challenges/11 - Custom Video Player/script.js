const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const fullscreen = player.querySelector(".fullscreen");
const current = player.querySelector(".current")
const total = player.querySelector(".total")


function togglePlay() {
   // play/pause video
   const method = video.paused ? "play" : "pause";
   video[method]();
   if (isNaN(video.duration)) {
      total.innerText = "0:00";
   } else {
      total.innerText = formatTime(Math.floor(video.duration));
   }
}

function toggleKeyPlay(e) {
   if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
   }
}

function updateButton() {
   let icon = this.paused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
   toggle.innerHTML = icon;
}

function skip() {
   video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
   video[this.name] = this.value;
}

function handleProgress(e) {
   const percent = (video.currentTime / video.duration) * 100;
   progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
   let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
   video.currentTime = scrubTime;
}

function formatTime(seconds) {
   let min = Math.floor(seconds / 60);
   let sec = Math.floor(seconds - 60 * min);
   if (sec < 10) {
      sec = `0${sec}`;
   }
   return `${min}:${sec}`;
}

function handleFullscreen() {
   if (!document.fullscreenElement) {
      fullscreen.innerHTML = `<i class="fas fa-compress"></i>`;
      if (player.requestFullscreen) {
         player.requestFullscreen();
      } else if (player.webkitRequestFullscreen) {
         /* Safari */
         player.webkitRequestFullscreen();
      } else if (player.msRequestFullscreen) {
         /* IE11 */
         player.msRequestFullscreen();
      }
   } else {
      fullscreen.innerHTML = `<i class="fas fa-expand"></i>`;
      if (document.exitFullscreen) {
         document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
         /* Safari */
         document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
         /* IE11 */
         document.msExitFullscreen();
      }
   }
}

function toggleKeyFullscreen(e) {
   if (e.code === "Enter") {
      handleFullscreen();
   }
}


video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);
video.addEventListener("timeupdate", ()=>{
   current.innerText = formatTime(Math.floor(video.currentTime));
});

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("input", handleRangeUpdate));

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));

fullscreen.addEventListener("click", handleFullscreen);

document.addEventListener("keydown", toggleKeyPlay);
document.addEventListener("keydown", toggleKeyFullscreen);
