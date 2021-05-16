const dogs = [
   { name: "Snickers", age: 2 },
   { name: "hugo", age: 8 },
];

function makeGreen() {
   const p = document.querySelector("p");
   p.style.color = "white";
   p.style.fontSize = "45px";
   p.innerHTML = "WATCH×THE×BREAK×DOWN×IN×BROWSER×CONSOLE×👇";
}

//* Regular
console.log("hello");

//* Interpolated
console.log("Hello I am a %s ", "👑");
// console.log(`Hello I am a ${var}`)

//* Styled
console.log("%c I am some Big text", "font-size:30px;background:red");
// console.log("%c I am some great text", "text-shadow: 10px 10px 0 blue;font-sizze:50px;background:red")

//* warning!
console.warn("Oh Nooo!");

//* Error :|
console.error("Oh Shit!!");

//* Info
console.info("Elephants are the only mammals that cannot jump.");

//* Testing
const p = document.querySelector("p");
console.assert(p.classList.contains("ouch"), "That is wrong!");
console.assert(1 === 1, "Thats wrong");
console.assert(1 === 2, "Thats wrong");

//* clearing
console.clear();

//* Viewing DOM Elements
console.log(p); //shows element
console.dir(p); //shows all props and methods in prototype

//* Grouping together
dogs.forEach((dog) => {
   console.groupCollapsed(`${dog.name}`);
   console.log(`This is ${dog.name}`);
   console.log(`${dog.name} is ${dog.age} years old`);
   console.log(`${dog.name} is ${dog.age * 7} dog years old`);
   console.groupEnd(`${dog.name}`);
});

//* counting
console.groupCollapsed("A Counter");
console.count("Wes");
console.count("Wes");
console.count("Stef");
console.count("Stef");
console.count("Wes");
console.count("Wes");
console.count("Wes");

console.count("Stef");
console.count("Stef");
console.count("Wes");
console.count("Stef");
console.count("Stef");
console.groupEnd("Counter");
//* timing
console.time("Fetching Data");
fetch("https://api.github.com/users/wesbos")
   .then((data) => data.json())
   .then((data) => {
      console.timeEnd("Fetching Data");
      console.log(data);
   });

console.table(dogs);
