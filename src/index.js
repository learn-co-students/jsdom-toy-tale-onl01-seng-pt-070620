let addToy = false;
const addBtn = document.getElementById("new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const submit = document.querySelector('.submit')
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
  .then(r => r.json())
  .then(toys => {
    //take my toys array and make html with them to add them to my dom
   let toysHTML = toys.map(function(toy){
      return`
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn">Like <3</button>
    </div>
      `
    })
    toyCollection.innerHTML = toysHTML.join(" ")
  })
    toyFormContainer.addEventListener("submit", function(e){
      e.preventDefault()
      console.log(e.target.name)

      const toyName = e.target.name.value
      const toyImage = e.target.image.value

      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: toyName,
          image: toyImage,
          likes: 99
        })
      })
     .then( r => r.json())
     .then( newToy => {
      
      let newToyHTML = `
      <div class="card">
        <h2>${newToy.name}</h2>
        <img src=${newToy.image} class="toy-avatar" />
        <p>${newToy.likes} Likes</p>
        <button class="like-btn">Like <3</button>
      </div>
      `
      toyCollection.innerHTML += newToyHTML
    })

      toyCollection.addEventListener('click', (e) =>{ 
          console.log(e.target)
      })
  
 
    });
    addBtn.addEventListener("click", () => {
      console.log("button clicked")
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    });
  });