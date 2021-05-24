const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

const takePhotoBtn = document.querySelector(".takePhoto");
const redEffectBtn = document.querySelector(".redEffect");
const rgbSplitBtn = document.querySelector(".rgbSplit");
const grayScaleBtn = document.querySelector(".grayScale");
const chromaKeyBtn = document.querySelector(".chromaKey");

function getVideo() {
   // navigator.getUserMedia =
   //    navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
   navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((mediaStream) => {
         video.srcObject = mediaStream;
         video.play();
      })
      .catch((err) => {
         console.error(`OH NOOO!!!`, err);
      });
}

function paintToCansvas() {
   const width = video.videoWidth;
   const height = video.videoHeight;

   canvas.width = width;
   canvas.height = height;

   let redEffect = false;
   let rgbSplitEffect = false;
   let grayScaleEffect = false;
   let chromaKeyEffect = false;

   setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
      //take pixels from canvas
      let pixels = ctx.getImageData(0, 0, width, height);

      //change them
      // pixels = redEffect(pixels);
      // pixels = rgbSplit(pixels);
      if (redEffect) {
         pixels = redEffectFn(pixels);
      }
      if (rgbSplitEffect) {
         pixels = rgbSplit(pixels);
      }
      if (grayScaleEffect) {
         pixels = grayScale(pixels);
      }
      if (chromaKeyEffect) {
         pixels = chromaKey(pixels);
      }

      // ctx.globalAlpha = 0.1;

      //put them back into canvas
      ctx.putImageData(pixels, 0, 0);
   }, 16);

   chromaKeyBtn.addEventListener("click", () => (chromaKeyEffect = !chromaKeyEffect));
   chromaKeyBtn.addEventListener("click", () => {
      if (chromaKeyBtn.classList.contains("enabled")) {
         chromaKeyBtn.classList.remove("enabled");
      } else {
         chromaKeyBtn.classList.add("enabled");
      }
   });

   rgbSplitBtn.addEventListener("click", () => (rgbSplitEffect = !rgbSplitEffect));
   rgbSplitBtn.addEventListener("click", () => {
      if (rgbSplitBtn.classList.contains("enabled")) {
         rgbSplitBtn.classList.remove("enabled");
      } else {
         rgbSplitBtn.classList.add("enabled");
      }
   });

   grayScaleBtn.addEventListener("click", () => (grayScaleEffect = !grayScaleEffect));
   grayScaleBtn.addEventListener("click", () => {
      if (grayScaleBtn.classList.contains("enabled")) {
         grayScaleBtn.classList.remove("enabled");
      } else {
         grayScaleBtn.classList.add("enabled");
      }
   });

   redEffectBtn.addEventListener("click", () => (redEffect = !redEffect));
   redEffectBtn.addEventListener("click", () => {
      if (redEffectBtn.classList.contains("enabled")) {
         redEffectBtn.classList.remove("enabled");
      } else {
         redEffectBtn.classList.add("enabled");
      }
   });
}

function redEffectFn(pixels) {
   for (let i = 0; i < pixels.data.length; i += 4) {
      //r
      pixels.data[i + 0] = pixels.data[i + 0] + 50;
      //g
      pixels.data[i + 1] = pixels.data[i + 1] - 50;
      //b
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5;
   }
   return pixels;
}

function rgbSplit(pixels) {
   for (let i = 0; i < pixels.data.length; i += 4) {
      //r
      pixels.data[i - 100] = pixels.data[i + 0];
      //g
      pixels.data[i + 500] = pixels.data[i + 1];
      //b
      pixels.data[i - 550] = pixels.data[i + 2];
   }
   return pixels;
}

function grayScale(pixels) {
   for (let i = 0; i < pixels.data.length; i += 4) {
      let grayscale = pixels.data[i] * 0.3 + pixels.data[i + 1] * 0.59 + pixels.data[i + 2] * 0.11;
      pixels.data[i] = grayscale;
      pixels.data[i + 1] = grayscale;
      pixels.data[i + 2] = grayscale;
   }
   return pixels;
}

function chromaKey(pixels) {
   const levels = {};

   document.querySelectorAll(".rgb input").forEach((input) => {
      levels[input.name] = input.value;
   });

   for (i = 0; i < pixels.data.length; i += 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];

      if (
         red >= levels.rmin &&
         green >= levels.gmin &&
         blue >= levels.bmin &&
         red <= levels.rmax &&
         green <= levels.gmax &&
         blue <= levels.bmax
      ) {
         // take it out!
         pixels.data[i + 3] = 0;
      }
   }

   return pixels;
}

function playSound() {
   snap.currentTime = 0;
   snap.play();
}

function takePhoto() {
   playSound();
   const data = canvas.toDataURL("image/jpeg"); //gives a base64 text based data of the canvas feed.
   const link = document.createElement("a");
   link.href = data;
   link.setAttribute("download", "img");
   link.innerHTML = `<img src="${data}" alt="Handsome">`;
   strip.insertBefore(link, strip.firstChild);
}

getVideo();

video.addEventListener("canplay", paintToCansvas);
takePhotoBtn.addEventListener("click", takePhoto);
