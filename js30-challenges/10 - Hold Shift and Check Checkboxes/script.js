const checkboxes = document.querySelectorAll("input[type='checkbox']");

let lastChecked;
let lastUnchecked;

function handleCheck(e) {
   //For Checking: check if shift key was down
   //and check if they are checking it
   //not unchecking it
   let inBetweenCheck = false;
   if (e.shiftKey && this.checked) {
      checkboxes.forEach((cb) => {
         if (cb === this || cb === lastChecked) {
            inBetweenCheck = !inBetweenCheck;
         }
         if (inBetweenCheck) {
            cb.checked = true;
         }
      });
      lastChecked = undefined;
   }

   //For Unchecking: check if shift key was down
   //and check if they are unchecking it
   //not checking it
   let inBetweenUnchecked = false;
   if (e.shiftKey && !this.checked) {
      checkboxes.forEach((cb) => {
         if (cb === this || cb === lastUnchecked) {
            inBetweenUnchecked = !inBetweenUnchecked;
         }
         if (inBetweenUnchecked) {
            cb.checked = false;
         }
      });
      lastUnchecked = undefined;
   }
   if (this.checked) {
      lastChecked = this;
   }

   if (!this.checked) {
      lastUnchecked = this;
   }
}

checkboxes.forEach((checkbox) => {
   checkbox.addEventListener("click", handleCheck);
});
