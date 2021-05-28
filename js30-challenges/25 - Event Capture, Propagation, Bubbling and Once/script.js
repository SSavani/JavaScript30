const divs = document.querySelectorAll("div");
const button = document.querySelector("button");

function logText(e) {
   console.log(this.classList.value);
   // e.stopPropagation(); //stop bubbling!
}

// document.body.addEventListener("click", logText)

divs.forEach((div) =>
   div.addEventListener("click", logText, {
      capture: false, //to trigger event capture, when default(false) it is bubbling
      once: true, // it listens for event once and then unbinds itself.
   })
);

button.addEventListener(
   "click",
   () => {
      console.log("Click!!!");
   },
   {
      once: true,
   }
);
