const input = document.getElementById("secretWord");
const errormsg = document.querySelector(".error-msg");

const pressed = [];
const secretCode = "secretword";
console.info(`The secret word is "${secretCode}"`);

input.addEventListener("keyup", (e) => {
   pressed.push(e.key);
   pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
   if (pressed.join("").includes(secretCode)) {
      errormsg.textContent = "You just got Cornified!!";
      errormsg.style.color = "green";
      cornify_add();
   } else {
      errormsg.style.color = "red";
      errormsg.textContent = "This is not the secret word";
   }
});
