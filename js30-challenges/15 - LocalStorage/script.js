const addItems = document.querySelector(".add-items");
const itemsList = document.querySelector(".plates");

let items = JSON.parse(localStorage.getItem("items")) || [];

function addItem(e) {
   e.preventDefault();
   let itemName = this.querySelector("[name = item]").value;
   let item = {
      itemName: itemName,
      done: false,
   };
   console.log(item);
   items.push(item);
   populateList(items, itemsList);
   localStorage.setItem("items", JSON.stringify(items));
   this.reset();
}

function populateList(plates = [], platesList) {
   platesList.innerHTML = plates
      .map((plate, i) => {
         return `
      <li>
      <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? "checked" : ""}/>
      <label for="item${i}">${plate.itemName}</label>
      <button class="deleteItem" data-index=${i}"><i class="fas fa-minus-circle" data-index=${i}></i></button>
      </li>
      `;
      })
      .join("");
}

function toggleDone(e) {
   if (!e.target.matches("input")) {
      return; //skip unless the target is an 'input' element
   }

   let elem = e.target;
   let idx = elem.dataset.index;
   items[idx].done = !items[idx].done;
   localStorage.setItem("items", JSON.stringify(items));
   populateList(items, itemsList);
}

function deleteItem(e) {
   if (!e.target.matches("i") && !e.target.matches("button")) {
      return; //skip unless the target is an 'input' element
   }

   let elem = e.target;
   let idx = elem.dataset.index;
   console.log(idx);
   items.splice(idx, 1);
   localStorage.setItem("items", JSON.stringify(items));
   populateList(items, itemsList);
}

addItems.addEventListener("submit", addItem);
itemsList.addEventListener("click", toggleDone);
itemsList.addEventListener("click", deleteItem);

populateList(items, itemsList);
