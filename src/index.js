let addToy = false;

let toyCollection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', function(event) {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toys => {
      toys.forEach(toy => {
        //function to render toys goes here or something
        displayToys(toy)
      })
    })
}

function postToy(data) {
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },

    body: JSON.stringify({
      "name": data.name.value,
      "image": data.image.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then(object => {
    displayToys(object)
  })
}

function displayToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('class', 'toy-avatar')
  img.src = toy.image

  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = 'Like <3'
  btn.addEventListener('click', function(event) {
    likeToy(event)
  })


  let toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')
  toyCard.append(h2, img, p, btn)
  toyCollection.append(toyCard)
}

function likeToy(event) {
  event.preventDefault()
  let moreLike = parseInt(event.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": moreLike
    })
  })
  .then(response => response.json())
  .then((object => {
    event.target.previousElementSibling.innerText = `${moreLike} Likes`
  }))

}


fetchToys()