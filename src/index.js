let addToy = false;

const incrementLikeCount = (obj,e ) => {
  const divCard = e.target.closest('div')
  const likes = divCard.querySelector('p')
  likes.innerText = (`${obj.likes} likes`)
};

const likeToy = (toy, e) => {

  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({ likes: toy.likes + 1 })
  })
      .then(r => r.json())
      .then(obj => incrementLikeCount(obj, e))
      .catch(err => console.log(err))
};

const renderToy = toy => {
  const card = document.createElement('div');
  const cardContainer = document.getElementById('toy-collection')
  const h2 = document.createElement('h2')
  const img = document.createElement('img')
  const pTag = document.createElement('p')
  const likeBtn = document.createElement('button')
  likeBtn.classList.add('like-btn')
  likeBtn.innerText = 'Like <3'
  card.classList.add('card')
  img.classList.add('toy-avatar')
  h2.innerText = `${toy.name}`
  img.setAttribute('src', `${toy.image}`)
  pTag.innerText = `${toy.likes} likes`
  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(pTag)
  card.appendChild(likeBtn)
  likeBtn.addEventListener('click', (e) => {
    e.preventDefault()
    likeToy(toy, e)
  });
  cardContainer.appendChild(card)
};

const fetchToys = () => {
  fetch("http://localhost:3000/toys").then(r => r.json()).then(objs => {
    for(const toy of objs){
      renderToy(toy)
    }
  })
};

const postToyCard = (toyObj) => {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
    body: JSON.stringify({...toyObj, likes: 0})
  })
      .then(r => r.json())
      .then(obj => renderToy(obj))
      .catch(error => console.log(error))
};

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector('form.add-toy-form')
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
  toyForm.addEventListener("submit", (e) => {
    let name = document.getElementsByName('name')[0].value
    let image = document.getElementsByName('image')[0].value
    let toyObj = {name: `${name}`, image: `${image}`}
    postToyCard(toyObj)
    e.preventDefault()
  });

  fetchToys();
});
