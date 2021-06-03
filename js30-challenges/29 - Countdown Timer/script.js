const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const pauseBtn = document.querySelector(".pause");

let countdown;
let globalSecondsLeft;
let isPaused = false;

function timer(seconds) {
   //clear existing timers
   clearInterval(countdown);

   let now = Date.now();
   let then = now + seconds * 1000;

   displayTimeLeft(seconds);
   displayEndTime(then);

   countdown = setInterval(() => {
      let secondsLeft = Math.round((then - Date.now()) / 1000);
      globalSecondsLeft = secondsLeft;
      //check if it interval need to stop
      if (secondsLeft < 0) {
         clearInterval(countdown);
         return;
      }
      displayTimeLeft(secondsLeft);
   }, 1000);
}

function displayTimeLeft(seconds) {
   let hours = Math.floor(seconds / 3600);
   seconds = seconds % 3600;
   let minutes = Math.floor(seconds / 60);
   let remainderSeconds = seconds % 60;

   let display =
      hours > 0
         ? `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
              remainderSeconds < 10 ? "0" : ""
           }${remainderSeconds}`
         : `${minutes < 10 ? "0" : ""}${minutes}:${
              remainderSeconds < 10 ? "0" : ""
           }${remainderSeconds}`;

   document.title = display;
   timerDisplay.textContent = display;

   // console.log({ hours, minutes, remainderSeconds });
}

function displayEndTime(timestamp) {
   let end = new Date(timestamp);
   let hour = end.getHours();
   let minutes = end.getMinutes();
   let adjustedHour = hour > 12 ? hour - 12 : hour;
   endTime.textContent = `Be Back At ${adjustedHour < 10 ? "0" : ""}${adjustedHour}:${
      minutes < 10 ? "0" : ""
   }${minutes}`;
}

function startTimer() {
   let seconds = parseInt(this.dataset.time);
   timer(seconds);
   pauseBtn.textContent = "Pause";
}

function pauseTimer() {
   clearInterval(countdown);
   pauseBtn.textContent = "Resume";
   isPaused = !isPaused;
}

function resumeTimer() {
   timer(globalSecondsLeft);
   isPaused = !isPaused;
   pauseBtn.textContent = "Pause";
}

buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
   e.preventDefault();
   let mins = this.minutes.value;
   timer(mins * 60);
   this.reset();
});

pauseBtn.addEventListener("click", () => (isPaused ? resumeTimer() : pauseTimer()));
