//* start with strings, numbers and booleans
let age = 100;
let age2 = age;
console.log(`age = ${age}, age2 = ${age2}`);
age = 200;
console.log(`age = ${age}, age2 = ${age2}`);

let name1 = "Sam";
let name2 = name1;
console.log(`name1 = ${name1}, name2=${name2}`);
name1 = "Samsung";
console.log(`name1 = ${name1}, name2=${name2}`);

//* Let's say we have an array
const players = ["Wes", "Sarah", "Ryan", "Poppy"];

//*and we want to make a copy of it.
const team = players;
console.log(` players = ${players} \n team = ${team}`);

//* You might think we can just do something like this:
// team[3] = "Lux";
// console.log(` players = ${players} \n team = ${team}`);

// however what happens when we update that array?
// now here is the problem!
// oh no - we have edited the original array too!
// Why? It's because that is an array reference, not an array copy. They both point to the same array!

//* So, how do we fix this? We take a copy instead!
// one way
const team2 = players.slice();

// or create a new array and concat the old one in
const team3 = [].concat(players);

// or use the new ES6 Spread
const team4 = [...players];

const team5 = Array.from(players);

// now when we update it, the original one isn't changed
team4[3] = "heee hawww";
console.log(team4);

//* The same thing goes for objects, let's say we have a person object
// with Objects
const person = {
   name: "Wes Bos",
   age: 80,
};

// and think we make a copy:
// const captain = person;
// captain.age = 99;
// console.log(person)

// how do we take a copy instead?
const cap2 = Object.assign({}, person, { number: 99, age: 12 });
console.log(cap2);
console.log(person);

// We will hopefully soon see the object ...spread
const cap3 = { ...person };
cap3.age = 09;
console.log(cap3);
console.log(person);

//* Things to note - this is only 1 level deep - both for Arrays and Objects.
//* lodash has a cloneDeep method, but you should think twice before using it.
const sam = {
   name: "Sam",
   age: 99,
   social: {
      twitter: "@ssam",
      fb: "wesbos.dev",
   },
};
console.clear();
console.log(sam);

const dev = Object.assign({}, sam);
//changing name
console.log(dev);
dev.name = "Samsung";
console.log(sam);
console.log(dev);

//changing social (obj inside obj) ====changes OG obj
dev.social.twitter = "@SSS";
console.log(dev.social);
console.log(sam.social);

//? Cheap Deep Clone
const dev2 = JSON.parse(JSON.stringify(sam));
