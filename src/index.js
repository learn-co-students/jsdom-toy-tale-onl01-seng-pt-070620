let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector('#toy-collection')

document.addEventListener("DOMContentLoaded", () => {
  getAndyToys();
  addNewToy();
  increaseLikes();
 
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

// get all Andy's toys fetch request

function getAndyToys(){
  return fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    let toysHTML = toys.map(function(toy){
      return ` <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes}Likes </p>
      <button data-id="${toy.id}" class="like-btn">Like</button>
      <button data-id="${toy.id}" class="delete-btn">Delete Image</button>
    </div>`
    })
    // console.log(toysHTML)
    toyCollection.innerHTML += toysHTML
  })
}

// add new toy to Andy's collection

function addNewToy(){
  toyFormContainer.addEventListener('submit', function(e){
    e.preventDefault()
    const toyName = e.target.name.value
    const toyImage = e.target.image.value
    
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: toyName,
        image: toyImage,
        likes: 0
      })
      })
      .then(response => response.json())
      .then(toy => {
        console.log(toy)
        let newToyHTML = ` <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes}Likes </p>
        <button data-id="${toy.id}" class="like-btn">Like</button>
        <button data-id="${toy.id}" class="delete-btn">Delete Image</button>
      </div>`
      toyCollection.innerHTML += newToyHTML
      e.target.reset();
    })
  }) 
}



function increaseLikes(){
  toyCollection.addEventListener('click', (e) => {
     if (e.target.className === 'like-btn'){
      // console.log( e.target.dataset.id)
      let currentLikes = parseInt(e.target.previousElementSibling.innerText) 
      let newLikes = currentLikes + 1
      e.target.previousElementSibling.innerText = newLikes + " likes"
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
        body: JSON.stringify({
          "likes": newLikes
        })
      })
     }
     if (e.target.className === "delete-btn"){
      fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
        method: "DELETE"
      })
      .then(r => {
        // div cart
        e.target.parentElement.remove()
      })
     }
  })
}



// i can replace line 25 - 30 with the following 
// let h2 = document.createElement('h2')
// h2.innerText = toy.name

// let img = document.createElement('img')
// img.setAttribute('src', toy.image)
// img.setAttribute('class', 'toy-avatar')

// let p = document.createElement('p')
// p.innerText = `${toy.likes} likes`

// let btn = document.createElement('button')
// btn.setAttribute('class', 'like-btn')
// btn.setAttribute('id', toy.id)
// btn.innerText = "like"
// btn.addEventListener('click', (e) => {
//   console.log(e.target.dataset);
//   likes(e)
// })

// let divCard = document.createElement('div')
// divCard.setAttribute('class', 'card')
// divCard.append(h2, img, p, btn)




