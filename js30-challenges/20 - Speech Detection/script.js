window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
let p = document.createElement("p");
let words = document.querySelector(".words");
words.appendChild(p);

recognition.addEventListener("result", (e) => {
   // console.log(e.results);
   let transcript = e.results[0][0].transcript;
   // let transcript = Array.from(e.results)
   //    .map((result) => result[0])
   //    .map((result) => result.transcript)
   //    .join("");
   const safeScript = transcript.replace(/heat|fire|lit/gi, "🔥");
   p.textContent = safeScript;
   // p.textContent = transcript;

   console.log(transcript);
   if (e.results[0].isFinal) {
      p = document.createElement("p");
      words.appendChild(p);
   }
});

recognition.addEventListener("end", recognition.start);
recognition.start();
