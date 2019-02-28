const allburgers = []
const burgerMenu = document.querySelector('#burger-menu')
const orderList = document.querySelector('#order-list')
const burgerForm = document.querySelector('#custom-burger')
let burgerURL = `http://localhost:3000/burgers`

document.addEventListener("DOMContentLoaded", () => {

  fetchBurgers()
}) //end of DOMContentLoaded

function fetchBurgers() {
  fetch(burgerURL)
  .then(res => res.json())
  .then(data => {
    allBurgers = data
    renderAllBurgers()
  })
}

function renderAllBurgers() {
  return allBurgers.map(renderSingleBurger).join('')
}

function renderSingleBurger(burger) {
  burgerMenu.innerHTML+= `
  <div class="burger">
    <h3 class="burger_title">${burger.name}</h3>
    <img src=${burger.image}>
    <p class="burger_description">
    ${burger.description}
    </p>
    <button data-id=${burger.id} class="button">Add to Order</button>
    </div>
  `
}

function addClickEventToMenu(){
  burgerMenu.addEventListener('click', e => {
    // console.log(e.target)
    if(e.target.className === "button"){
      let clickedBurger = allBurgers.find(burger => {
        if(burger.id === parseInt(e.target.dataset.id)) {
          orderList.innerHTML += `
          <li>${burger.name}</li>
          `
        }
      })
    }
  })
}

function burgerFormEventListener(){
  burgerForm.addEventListener('submit', e => {
    e.preventDefault()
    // console.log(e.target)
    let newBurgerName = document.querySelector('#burger-name').value
    let newBurgerDescription = document.querySelector('#burger-description').value
    let newBurgerImage = document.querySelector('#burger-image').value
    // console.log(newBurgerName, newBurgerDescription, newBurgerImage)
    orderList.innerHTML += `
    <li>${newBurgerName}</li>
    `
    fetch(burgerURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newBurgerName,
        description: newBurgerDescription,
        image: newBurgerImage
      })
    })
    .then(res => res.json())
    .then(data => {
      allBurgers = data
    })
  })
}

addClickEventToMenu()
burgerFormEventListener()
