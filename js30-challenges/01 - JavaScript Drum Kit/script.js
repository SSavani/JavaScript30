function playSound(e) {
   if (e.defaultPrevented) {
      return; // Do nothing if event already handled
   }
   const audio = document.querySelector(`audio[data-key="${e.key.toLowerCase()}"]`);
   const key = document.querySelector(`.key[data-key="${e.key.toLowerCase()}"]`);

   if (!audio) return; //stop fn for key presses that are not relevant
   audio.currentTime = 0; //play from start(for repeated key press)
   audio.play();
   key.classList.add("playing");
   e.preventDefault(); // Consume the event so it doesn't get handled twice
}

function removeTransition(e) {
   if (e.defaultPrevented) {
      return; // Do nothing if event already handled
   }
   if (e.propertyName != "transform") return; //skip if not a transform event
   this.classList.remove("playing");
   e.preventDefault(); // Consume the event so it doesn't get handled twice
}

function playSoundByClick(e){

   let key = e.target.dataset.key
   if (e.defaultPrevented) {
      return; // Do nothing if event already handled
   }
   let audio = document.querySelector(`audio[data-key="${key}"]`);
   if (!audio) return; //stop fn for key presses that are not relevant
   audio.currentTime = 0; //play from start(for repeated key press)
   audio.play();
   e.target.classList.add("playing");
   e.preventDefault();
}

window.addEventListener("keydown", playSound);

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

//TODO: Add click trigger for drum keys
keys.forEach((key) => key.addEventListener("click", playSoundByClick));
