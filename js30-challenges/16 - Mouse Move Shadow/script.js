const hero = document.querySelector(".hero");
const text = hero.querySelector("h1");
const walk = 25; //100px

function shadow(e) {
   // let width = hero.offsetWidth;
   // let height = hero.offsetHeight;
   let { offsetHeight: height, offsetWidth: width } = hero;

   let { clientX: x, clientY: y } = e;

   const xwalk = Math.round((x / width) * walk - walk / 2);
   const ywalk = Math.round((y / height) * walk - walk / 2);

   text.style.textShadow = `
      ${xwalk}px ${ywalk}px 0 rgba(255,0,255,0.7),
      ${xwalk * -1}px ${ywalk * -1}px 0 rgba(0,255,255,0.7),
      ${ywalk}px ${xwalk * -1}px 0 rgba(255,255,0,0.7),
      ${ywalk * -1}px ${xwalk}px 0 rgba(255,0,0,0.7)
      
      `;
}

hero.addEventListener("mousemove", shadow);
