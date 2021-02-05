let addToy = false;
const toyInput = document.querySelector(".input-text");
let container = document.getElementById("toy-collection");


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        addNewToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function addNewToy(toy_data) {
  fetch("http://localhost:3000/toys", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "name": toy_data.name.value,
    "image": toy_data.image.value,
    "likes": 0
  })
})
.then(resp => resp.json())
.then((toy_obj) => {
  let newToy = toy_obj;
  console.log(newToy)
})
}

fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(results => results.forEach(
    function (element) {
      addToyInfo(element);
    }  ))

function addToyInfo(element) {

  let card = document.createElement("div");
  card.className = "card";
  container.appendChild(card);

  let image = document.createElement("img");
  image.src = element.image;
  image.className = "toy-avatar";
  card.appendChild(image)

  let heading = document.createElement("h2");
  heading.innerHTML = element.name;
  card.appendChild(heading)

  let likes = document.createElement("p");
  likes.innerHTML = element.likes;
  card.appendChild(likes)

  let likeButton = document.createElement("button");
  likeButton.className = "like-btn"
  likeButton.innerHTML = "Like"
  card.appendChild(likeButton)
}

let newToyButton = document.getElementById("new-toy-btn")

// let newToyForm = document.querySelector(".add-toy-form")
// newToyForm.addEventListener('click', function(e) {
//   e.preventDefault();

  // addNewToy()
  // addToyInfo()
// })

let lkbtn = document.querySelector("like-btn")
