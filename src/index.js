let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch("http://localhost:3000/toys")
    .then(rsp => rsp.json())
    .then(data => createCards(data))
});

function createCards(toys) {
  let toyCollection = document.getElementById('toy-collection');
  for (const toy of toys) {
    console.log(toy)
    let newDiv = document.createElement('div')
    newDiv.className = "card"
    createName(toy, newDiv)
    createImage(toy, newDiv)
    createLikes(toy, newDiv)
    createLikeButton(toy, newDiv)
    toyCollection.appendChild(newDiv)
  }
};

function createName(toy, card) {
  let h2Tag = document.createElement('h2')
  h2Tag.innerHTML = toy.name
  card.appendChild(h2Tag)
};

function createImage(toy, card) {
  let imgTag = document.createElement('img')
  imgTag.className = "toy-avatar"
  imgTag.src = toy.image
  card.appendChild(imgTag)
};

function createLikes(toy, card) {
  let likes = document.createElement('p')
  likes.innerHTML = toy.likes + " Likes"
  card.appendChild(likes)
};

function createLikeButton(toy, card) {
  let likeButton = document.createElement('button')
  likeButton.addEventListener('click', function() {
    increaseLikes(toy);
  })
  likeButton.className = "like-btn"
  likeButton.innerHTML = "Like"
  card.appendChild(likeButton)
};

form = document.querySelector('.add-toy-form')
form.addEventListener('submit', submitData)

function submitData() {
  let formData = {
    "name": document.querySelectorAll('.input-text')[0].value,
    "image": document.querySelectorAll('.input-text')[1].value,
    "likes": "0"
  };
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch("http://localhost:3000/toys", configObj)
    .then(rsp => rsp.json())
    .then(data => console.log(data))

};

function increaseLikes(toy) {
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(toy.likes) + 1
    })
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
};