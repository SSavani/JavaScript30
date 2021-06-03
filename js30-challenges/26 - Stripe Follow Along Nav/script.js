const triggers = document.querySelectorAll(".cool > li");
const background = document.querySelector(".dropdownBackground");
const nav = document.querySelector(".top");

function handleEnter() {
   // console.log("Entered!")
   this.classList.add("trigger-enter");
   setTimeout(
      () => this.classList.contains("trigger-enter") && this.classList.add("trigger-enter-active"),
      150
   );
   background.classList.add("open");

   let dropdown = this.querySelector(".dropdown");
   let dropdownCoords = dropdown.getBoundingClientRect();
   let navCoords = nav.getBoundingClientRect();
   // console.log(navCoords);

   let coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left,
   };

   background.style.setProperty("width", `${coords.width}px`);
   background.style.setProperty("height", `${coords.height}px`);
   background.style.setProperty("transform", `translate(${coords.left}px, ${coords.top}px)`);
   // background.style.setProperty("height", `${coords.height}px`);
}

function handleLeave() {
   this.classList.remove("trigger-enter", "trigger-enter-active");
   background.classList.remove("open");
   // console.log("Leave!")
}

triggers.forEach((trigger) => trigger.addEventListener("mouseenter", handleEnter));
triggers.forEach((trigger) => trigger.addEventListener("mouseleave", handleLeave));
