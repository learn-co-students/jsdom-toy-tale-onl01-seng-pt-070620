const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;
let toyCollection = document.querySelector('#toy-collection')


addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })


  function getToys() {
    fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => {
      toys.forEach(toy => {
        renderToy(toy)
      })
    })
  }


  
  function renderToy(toy){
    toyCollection.innerHTML += `
      <div class="card" >
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar"/>
        <p>${toy.likes} Likes</p>
        <button data-id=${toy.id} class='like-btn'>Like <3</button>
        <button data-id=${toy.id} class='delete-btn'>Delete</button>
      </div>
      `
  }

  function createToy(){
    toyFormContainer.addEventListener("submit", function(e){
      e.preventDefault()
      const toyName = e.target.name.value
      const toyUrl = e.target.image.value

      fetch('http://localhost:3000/toys', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyUrl,
          likes: 0
          })
        })
      .then(resp => resp.json())
      .then(data => {
        let newToy = renderToy(data)
        toyCollection.append(newToy)
      })
      })
    }
  

  function likeToy() {
    toyCollection.addEventListener('click', (e) => {
      console.log(e.target)
      if (e.target.className === "like-btn") {
        let currentLikes = 
        parseInt(e.target.previousElementSibling.innerText)
        let newLikes = currentLikes + 1
        e.target.previousElementSibling.innerText = newLikes + " likes"

        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
          method: "PATCH",
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
          },
          body: JSON.stringify({
          likes: newLikes
          })
        })
      }

      if(e.target.className ==="delete-btn"){
        fetch(`http://localhost:3000/toys/${e.target.dataset.id}`, {
          method: "DELETE"
      })
      .then(resp => {
        e.target.parentElement.remove()
      })
      }
    })
  }

  getToys()
  likeToy()
  createToy()