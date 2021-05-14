const canvas = document.getElementById("draw");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

ctx.strokeStyle = "#BADA55";
// ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;
ctx.globalCompositeOperation = 'hue'; //color-blending mode

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let widthPeak = true;
function draw(e) {
   e.preventDefault();
   if (!isDrawing) {
      return; //stop the fn from running when they are not mouseddown
   }
   // console.log(e);
   ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
   ctx.beginPath();
   ctx.moveTo(lastX, lastY);
   ctx.lineTo(e.offsetX, e.offsetY);
   ctx.stroke();
   [lastX, lastY] = [e.offsetX, e.offsetY];
   hue++;

   if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
      widthPeak = !widthPeak;
   }
   if (ctx.lineWidth < 100 && !widthPeak) {
      ctx.lineWidth++;
   }

   if (ctx.lineWidth > 1 && widthPeak) {
      ctx.lineWidth--;
   }
}

canvas.addEventListener("mousedown", (e) => {
   e.preventDefault();
   isDrawing = true;
   [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => {
   isDrawing = false;
});
canvas.addEventListener("mouseout", () => {
   isDrawing = false;
});
