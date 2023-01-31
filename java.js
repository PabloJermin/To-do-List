// *******Selecting Items**********
const alert = document.querySelector(".alert")
const form = document.querySelector(".grocery-form")
const grocery = document.getElementById("grocery")
const submit = document.querySelector(".submit-btn")
const container = document.querySelector(".grocery-container")
const list = document.querySelector(".grocery-list")
const clearbtn = document.querySelector(".clear-btn")

// Edit option
let editEl 
let editFlag = false
let editID = ""

// Event Listeners

// submit form
form.addEventListener("submit", addItem)

// clearing items
clearbtn.addEventListener("click", clearItems)

// Functions
function addItem(e){
    e.preventDefault();
    const gVale = grocery.value
    const glenth= grocery.value.length 
  
     const id = new Date().getTime().toString()

    //  if gvale is truethy and editFlag is also falsy, peform the action
      if(gVale && !editFlag && glenth > 2 ){ 
        //   create an element
          const element = document.createElement("article")
       
          //   add class
        element.classList.add("grocery-item")
       
        // add id
        const attr = document.createAttribute("data-id")
        attr.value = id

        // attach attribute to element
        element.setAttributeNode(attr);

        element.innerHTML = ` <p class="title">${gVale}
        <div class="btn-container">
            <button type="button" class="edit-btn">
              edit
            </button>
            <button type="button" class="delete-btn">
              remove
            </button>
        </div>
    </p>`

    const deletBtn = element.querySelector(".delete-btn")
    const editBtn = element.querySelector(".edit-btn")

    deletBtn.addEventListener("click", deleteItem)
    editBtn.addEventListener("click", editItem)
    
    
    // add child list
    list.appendChild(element)
    displayAlert("Item added to list", "success")

    // show the hidden container
    container.classList.add("show-container")
    
    // add local storage
    addToLocalStorage(id, gVale)
 
    // set to default
    setToDefault()
     }
    //  if gvale is truethy and editFlag is truthy(since it is false by command), peform the action
      else if(gVale  && editFlag && glenth > 2 ){
        editEl.innerHTML = gVale
        displayAlert("Editing complete", "success")
        setToDefault()
        // edit local storage
        editLocalStorage(editID, value)
      
          
      }
      else if (  glenth <= 2 && glenth > 0){
        displayAlert("Item Name is too short" , 'danger')
        setToDefault()
      }

      else{
       displayAlert("Please add an item" , 'danger')
        
      }
}

// display alert
function displayAlert( text, action){
    alert.textContent= text
    alert.classList.add(`alert-${action}`)

    // set time out
    setTimeout(function(){
        alert.textContent= ""
        alert.classList.remove(`alert-${action}`)
    },1000)

}
// clear items
function clearItems(){
  const grIt = document.querySelectorAll("grocery-item")
  if(grIt.length > 0){
    grit.forEach(function(itr){
      list.removechild(itr)
    }
    )}
    container.classList.remove("show-container")
    displayAlert("All items cleared","success")
    setToDefault()
   
    // local storage

}

// delete function
function deleteItem(e){
  const del = e.currentTarget.parentElement.parentElement
  const gig = del.dataset.id
  list.removeChild(del);
  if(list.children.length===0) {
    container.classList.remove("show-container")
  }
  displayAlert("All items has been cleared","success")
    setToDefault()

    // remove from local storage
    romoveFromLocalStorage(gig) 
}


// edit function
function editItem(e){
  const del = e.currentTarget.parentElement.parentElement
  // edit items
  editEl = e.currentTarget.parentElement.previousElementSibling
  // set form value
  grocery.value = editEl.textContent
  editFlag = true
  submit.textContent = "Edit"
  editID = del.dataset.id
  submit.textContent = "Edit"
 

}


// set to defualt
function setToDefault(){
 grocery.value = ""
 editFlag = false
 editID = ""
  submit.textContent = "submit"
}


// Local Storage
function addToLocalStorage(gvale, value){
  const gocery = {gvale, value}
   let item = getLocalstorage()
// console.log(item)

   item.push(gocery);
   localStorage.setItem("list", JSON.stringify(item))
   
    
}

function removeFromLocalStorage(id){
  let tes = getLocalstorage();

  let tems = tems.filter(function(ite){
    if( ite!== gig){
      return ite
    }
  })
  localStorage.setItem("list", JSON.stringify(item))
  
}

function editLocalStorage(id,value){
   
}

function getLocalstorage(){
 return localStorage.getItem("list")
   ?JSON.parse(localStorage.getItem("list"))
    :[];
}

// LCAL STORAGE
// // set values
// localStorage.setItem("thyson",  JSON.stringify("mango", "Banana"))

// // get item
// const ton = JSON.parse(localStorage.getItem("thyson"))
// console.log(ton)

// // remove item
// localStorage.removeItem("thyson")

// SETUP ITEMS