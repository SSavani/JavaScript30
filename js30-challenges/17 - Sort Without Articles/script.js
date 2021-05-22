let bands = [
   "The Plot in You",
   "The Devil Wears Prada",
   "Pierce the Veil",
   "Norma Jean",
   "The Bled",
   "Say Anything",
   "The Midway State",
   "We Came as Romans",
   "Counterparts",
   "Oh, Sleeper",
   "A Skylit Drive",
   "Anywhere But Here",
   "An Old Dog",
];

//* Sort the bands based on name but not considering the first word if it's an Article(a, an ,the).
let sortedBands = bands.sort((a, b) => (strip(a) > strip(b) ? 1 : strip(a) < strip(b) ? -1 : 0));

function strip(bandName) {
   return bandName.replace(/^(a |an |the )/i, "").trim();
}

document.getElementById("bands").innerHTML = sortedBands.map((band) => `<li>${band}</li>`).join("");

//? my initial sort fn
// function mySortFn(a,b){
//    let band1 = a.split(" ");
//    let band2 = b.split(" ");

//    if (band1[0] === "The" || band1[0] === "A" || band1[0] === "An") {
//       band1 = band1.slice(1).join(" ");
//    } else {
//       band1 = band1.join(" ");
//    }

//    if (band2[0] === "The" || band2[0] === "A" || band2[0] === "An") {
//       band2 = band2.slice(1).join(" ");
//    } else {
//       band2 = band2.join(" ");
//    }

//    return band1.toLowerCase() > band2.toLowerCase()
//       ? 1
//       : band1.toLowerCase() < band2.toLowerCase()
//       ? -1
//       : 0;
// }
