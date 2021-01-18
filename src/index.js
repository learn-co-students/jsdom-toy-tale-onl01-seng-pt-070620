let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyContainer = document.querySelector("#toy-collection")

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

// let the challenge begin!
// fetch/get toys
  async function fetchToys() {
    return fetch("http://localhost:3000/toys")
      .then(response => response.json())
  }

  fetchToys().then(toys => {
    toys.forEach(toy => {
      renderToys(toy)
    })
  })

// display all toys on the page
// parse user input with form
function postToy(toys) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toys.name.value,
      "image": toys.image.value,
      "likes": 0
    })
  })
  .then(response => response.json())
  .then((newToyObj) => {
    let newToy = renderToys(newToyObj)
    toyContainer.append(newToy)
  })
}

// add toy info to the card
  function renderToys(toy) {
      // parse each toy data, set variables, manipulate dom, and add event lisenser
      // impotant!!! Never use the Dot Notation when using a Variable
      // let toyId = toy["id"]; // or toy.id
      // let toyName = toy["name"]; // or toy.name
      // let toyImage = toy["image"]; // or toy.image
      // let toyLikes = toy["likes"]; // or toy.likes

      let h2 = document.createElement("h2")
      h2.innerText = toy.name

      let img = document.createElement("img")
      // .classList.add("toy-avatar"); ---> this causes cannot read prperty for next line; why???
      img.setAttribute('class', "toy-avatar")
      img.setAttribute('src', toy.image);

      let p = document.createElement("p")
      p.innerText = `${toy.likes} likes`

      let btn = document.createElement('button')
      // .classList.add("like-btn"); ---> this line causes cannot read property for next line like above; why??
      btn.setAttribute('class', "like-btn")
      btn.setAttribute('id', toy.id)
      btn.innerHTML = "like"
      btn.addEventListener('click', (event) => {
        console.log(event.target.dataset);
        likesToy(event)
      })
      
      // create div with class card -> append to toy collection
      // append each toy attribute to div with class card
      let divCard = document.createElement('div')
      divCard.setAttribute('class', 'card')
      divCard.append(h2, img, p, btn)
      toyContainer.append(divCard)
  }

    // likeToys function to handle like toys button
  function likesToy(event) {
    event.preventDefault()
    let moreLikes = parseInt(event.target.previousElementSibling.innerText) + 1

    fetch(`http://localhost:3000/toys/${event.target.id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "likes": moreLikes
      })
    })
    .then(response => response.json())
    .then(moreLike_object => {
      event.target.previousElementSibling.innerText = `${moreLikes} likes`;
    })
  }

// create new toys
// initial idea. why this is not efficient???
  // async function createToys(toyName, toyImage) {
  //   let toyForm = {
  //     name: toyName,
  //     image: toyImage
  //   }

  //   let toyObject = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify(toyForm)
  //   }

  //   return fetch("http://localhost:3000/toys", toyObject)
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(newToyData => renderNewToys(newToyData)
  //     )
  //     .catch(function(error) {
  //       alert("something is not right. trace and debug!");
  //       console.log(error.message);
  //     });

  //     function renderNewToys(newToyData) {

  //       let h2 = document.createElement("h2")
  //       h2.innerHTML = newToyData.name

  //       let img = document.createElement("img")
  //       img.setAttribute('class', "toy-avatar")
  //       img.setAttribute('src', newToyData.image)

  //       let btn = document.createElement('button')
  //       btn.setAttribute('class', "like-btn")
  //       btn.setAttribute('id', newToyData.id)
  //       btn.innerHTML = "Like this Toy"
  //       btn.addEventListener('click', (event) => {
  //         console.log(event.target.dataset);
  //         likesToy(event)
  //       })

  //       let divCard = document.createElement('div')
  //       divCard.setAttribute('class', 'card')
  //       divCard.appendChild(h2, img, p, btn)
  //       toyContainer.appendChild(divCard)
  //     }
  // }
