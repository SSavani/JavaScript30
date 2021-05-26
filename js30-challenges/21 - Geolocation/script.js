const arrow = document.querySelector(".arrow");
const speed = document.querySelector(".speed-value");

navigator.geolocation.watchPosition(
   (data) => {
      console.log(data);
      speed.textContent = data.coords.speed * 3.6;
      arrow.style.transform = `rotate(${data.coords.heading}deg)`;
   },
   (err) => {
      console.err(err);
      alert("Hey! You Gotta allow location for this to Work!");
   }
);
