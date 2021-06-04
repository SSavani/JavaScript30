const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start-button");
let lastHole;
let timeUp = false;
let score = 0;

function randTime(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function randHole(holes) {
   let idx = Math.floor(Math.random() * holes.length);
   let hole = holes[idx];
   if (hole === lastHole) {
      console.log("Ah nah! Thats the same one bud");
      return randHole(holes);
   }

   lastHole = hole;
   return hole;
}

function peep() {
   let time = randTime(200, 1000);
   let hole = randHole(holes);

   hole.classList.add("up");

   setTimeout(() => {
      hole.classList.remove("up");
      if (!timeUp) {
         peep();
      }
   }, time);
}

function startGame(e) {
   console.log("Each Game Lasts for 10 seconds");
   startBtn.textContent = "Start!!";
   scoreBoard.textContent = 0;
   timeUp = false;
   score = 0;
   peep();

   setTimeout(() => {
      timeUp = true;
      startBtn.textContent = "Game Over!  Start Again?";
   }, 10000);
}

function whack(e) {
   //handle cheaters!
   if (!e.isTrusted) {
      return;
   }
   this.classList.remove("up");
   score++;
   scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", whack));
startBtn.addEventListener("click", startGame);
