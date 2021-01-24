let addToy = false;

const toyFormContainer = document.querySelector(".container");
const toyBox = document.querySelector('#toy-collection');
const addToyForm = document.querySelector('form.add-toy-form');

// Form submission actions
function addNewToy(formData){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({...formData, likes: 0})
  })
  .then(resp => resp.json())
  .then(data => displayToy(data))
  .catch(error => console.log(error))
};

// Submit Event
addToyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = document.getElementsByName('name')[0].value
  let image = document.getElementsByName('image')[0].value
  let formData = {
    'name': name,
    'image': image
  }
  addNewToy(formData)
  addToyForm.reset()
});

// // fetchToys
  function fetchToys() {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(data => {
      for (const element of data){
        displayToy(element)
      }
    })
  };

  function likeToy(toy, e) {
   return fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: toy.likes + 1})
    })
     .then(resp => resp.json())
     .then(toy => likeCounter(toy, e))
     .catch(error => console.log(error))
  };

  function likeCounter(toy, e) {
    let toyCard = e.target.closest('div')
    let likes = toyCard.querySelector('p')
    likes.innerText = `${toy.likes} likes`
  }

  function displayToy(element){
    const newToyDiv = document.createElement('div');
    const toyName = document.createElement('h2');
    const toyPic = document.createElement('img');
    const toyLikes = document.createElement('p');
    const likeButton = document.createElement('button');

    newToyDiv.classList = 'card'

    toyName.innerText = element.name
      console.log(element.name);

      toyPic.src = element.image;
      toyPic.classList = 'toy-avatar'
      console.log(element.image);

      toyLikes.innerText = `${element.likes} Likes`;
      console.log(element.likes);

      likeButton.classList = 'like-btn'
      likeButton.innerText = '<3'
      likeButton.addEventListener('click', (e) => {
        e.preventDefault()
        likeToy(element, e)
      });
      newToyDiv.appendChild(toyName);
      newToyDiv.appendChild(toyPic);
      newToyDiv.appendChild(toyLikes);
      newToyDiv.appendChild(likeButton)

      toyBox.appendChild(newToyDiv);
 };



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

// Calls
  fetchToys();
});
