const endpoint =
   "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

fetch(endpoint)
   .then((blob) => blob.json())
   .then((data) => cities.push(...data));

function findMatches(wordToMatch, cities) {
   return cities.filter((place) => {
      let regex = new RegExp(wordToMatch, "gi");

      return place.city.match(regex) || place.state.match(regex);
   });
}

function displayMatches() {
   let matchArr = findMatches(this.value, cities);
   let html = matchArr
      .map((place) => {
         let regex = new RegExp(this.value, "gi");
         //? for some reason highlighting not working with <span> (#Note: <mark> is the right thing to use here)
         let cityName = place.city.replace(regex, (match) => `<mark class="hl">${match}</mark>`);
         let stateName = place.state.replace(regex, (match) => `<mark class="hl">${match}</mark>`);
         return `
         <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${Number(place.population).toLocaleString()}</span>
         </li>
      `;
      })
      .join("");

   if (this.value === "") {
      suggestions.innerHTML = initSuggestions;
   } else if (html === "") {
      suggestions.innerHTML = `<li>
      <span class="notfound">No Matches Found</span>
      </li>`;
   } else {
      suggestions.innerHTML = html;
   }
}

const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const initSuggestions = suggestions.innerHTML;

search.addEventListener("input", displayMatches);
// search.addEventListener("keyup", displayMatches);
// search.addEventListener("change", displayMatches);
