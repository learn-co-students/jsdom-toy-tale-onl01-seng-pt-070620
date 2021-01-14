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

// let the challenge begin!
// fetch toys
  function fetchToys() {
    return fetch("http://localhost:3000/toys")
      .then(response => response.json())
      // .then(results => addToys(results))
      .then(function(toys) {
        addToys(toys);
      })
  }

// add toy info to the card
  function addToys(toys) {
    toys.forEach(function(toy) {
      // create div with class card -> append to toy collection
      console.log(toy);
      let div = document.createElement("div");
      div.classList.add("card");
      let toyContainer = document.querySelector("#toy-collection");
      toyContainer.appendChild(div);
      // append each toy to div with class card
      let toyCard = document.querySelector("card");
      toyCard.textContent = toy;
      div.appendChild(toyCard)
    });
  }

      {
      let toyId = toy["id"];
      let toyName = toy["name"];
      let image = toy["image"];
      let likes = toy["likes"];

      let h2 = document.createElement("h2")
        h2.innerHTML = toyId
      let img = document.createElement("img").classList.add("toy-avatar")
        // continune to add more attributes of the img here...
        img.src = image["src"]
      let p = document.createElement("p")
        p.innerText = likes
      let btn = document.getElementById("new-toy-btn").classList.add("like-btn")
        btn.addEventListener("submit", addNewToys())

      let toyCollection = document.getElementById("toy-collection")
      let toyCard = document.createElement("div")
      toyCard.classList.add("card")
      
      let toyList = document.querySelector("card")
      toyList.appendChild("h2")
      toyList.appendChild("img")
      toyList.appendChild("p")
      toyList.appendChild("btn")
    }
  }

// add new toys
function addNewToys(toyName, toyUrl) {
  let toyForm = {
    toyName = toyName,
    toyUrl = toyUrl
  }

  let toyObject = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyForm)
  }
  return fetch("http://localhost:3000/toys", toyObject)
    .then()
    .then()
    .catch(error)
}