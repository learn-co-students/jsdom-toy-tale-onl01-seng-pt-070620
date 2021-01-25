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
});

//above is provided code

//console.log(fetch('http://localhost:3000/toys'))

//you get the promise object back w/the above, that's what fetch does

let divCollectd = document.querySelector('#toy-collection')

//where we want to put toys on dom

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

//fetch the data and parse

getToys().then(toys => {
  toys.forEach(toy => {

    renderToys(toy)
  })
})

//iterating over the json-ed data to run renderToys on each


function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "Like"
  btn.addEventListener('click', function() {
  p.innerText = `${toy.likes + 1} likes`
   })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollectd.append(divCard)
}

//like button needs work, not updating database

const subBtn = document.querySelector(".add-toy-form");

//Don't use # in queryselector here, # is for ids, . is for classes

subBtn.addEventListener('submit', e => {
  e.preventDefault()
  addNewToy(e)
  subBtn.reset()
})

//e is event, runs the below

const addNewToy = e => {
  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: 0
  }
  createToy(newToy)
}

//sets the data entered, then uses below

const createToy = toy => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)
  })
    .then(resp => resp.json())
    .then(renderToys(toy))
}

//runs the fetch
