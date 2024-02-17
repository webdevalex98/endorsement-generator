import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://scrimba-solo-project-e026d-default-rtdb.europe-west1.firebasedatabase.app/",
};

 const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementListInDB = ref(database, "endorsementList"); 

const publishBtn = document.getElementById("publish-btn");
const endorsementListEl = document.getElementById("endorsement-list");
const inputFieldEL = document.getElementById("input-field");

let endorsementsRendered = false

onValue(endorsementListInDB, function(snapshot){
        if (snapshot.exists()) {
            let itemsArray = Object.entries(snapshot.val())
        
            clearEndorsementListEl()
            
            for (let i = 0; i < itemsArray.length; i++) {
                
                let currentItem = itemsArray[i]
                let currentItemID = currentItem[0]
                let currentItemValue = currentItem[1]
                
                appendEndorsementToList(currentItem)
                }    
        } else {
            endorsementListEl.innerHTML = `<p class = "no-items-text">No items here... yet</p>`
        }

})

inputFieldEL.addEventListener("keydown", function(event) {

  if (event.keyCode === 13) {

    event.preventDefault();
    
    publishBtn.click();
  }
});

publishBtn.addEventListener("click", function () {
  let inputValue = inputFieldEL.value;

  push(endorsementListInDB, inputValue)
  
  clearInputField();
});

function clearEndorsementListEl() {
    
    endorsementListEl.innerHTML = ""
}

function clearInputField() {
    
  inputFieldEL.value = "";
}

function appendEndorsementToList(item) {
    
    let currentItemID = item[0]
    let currentItemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = currentItemValue
    newEl.className = "endorsement-item"
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsementList/${currentItemID}`)

        remove(exactLocationOfItemInDB)
    })
    
    endorsementListEl.appendChild(newEl)
}
