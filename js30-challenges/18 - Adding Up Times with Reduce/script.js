const timeNodes = [...document.querySelectorAll("[data-time]")];
const listItems = document.querySelectorAll("li");
const totalTime = document.querySelector(".totalTime");

//* WesBos version
// const seconds = timeNodes
//    .map((node) => node.dataset.time)
//    .map((timeCode) => {
//       let [min, secs] = timeCode.split(":").map(parseFloat);
//       return min * 60 + secs;
//    })
//    .reduce((total, vidSecs) => total + vidSecs);

//* short version with only reduce
const seconds = timeNodes.reduce((total, currValue) => {
   const [mins, secs] = currValue.dataset.time.split(":");
   return total + (mins * 60 + secs * 1);
}, 0);

let secondsLeft = seconds;
let hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
let mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;

if (hours >= 0 && hours < 10) {
   hours = "0" + hours;
}
if (mins >= 0 && mins < 10) {
   mins = "0" + mins;
}
if (secondsLeft >= 0 && secondsLeft < 10) {
   secondsLeft = "0" + secondsLeft;
}

console.log(hours, mins, secondsLeft);

totalTime.innerHTML = `Total Time ${hours}:${mins}:${secondsLeft}`;
listItems.forEach((item) => {
   item.innerHTML += `<p>Time: ${item.dataset.time}</p>`;
});
