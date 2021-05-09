const secHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
   const now = new Date();
   let millisecs = now.getMilliseconds();
   let seconds = now.getSeconds();
   let mins = now.getMinutes();
   let hours = now.getHours();

   seconds += millisecs / 1000;
   //uncomment to enable smooth transition of below hands
   // mins += seconds/60; 
   // hours += mins/60;

   if (hours > 12) {
      hours -= 12;
   }
   console.log(seconds)
   const secdeg = seconds * 6 + 90;
   secHand.style.transform = `rotate(${secdeg}deg)`;

   const mindeg = mins * 6 + 90;
   minHand.style.transform = `rotate(${mindeg}deg)`;

   const hourdeg = hours * 30 + 90;
   hourHand.style.transform = `rotate(${hourdeg}deg)`;
}

setInterval(setDate, 5);
