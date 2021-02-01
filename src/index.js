let addToy = false;
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(r => r.json())
    .then(toys => {
      let toysHTML = toys.map(function(toy){
        return `  
      <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>`
      })
      document.querySelector("#toy-collection").innerHTML = toysHTML.join('');
  });

  toyFormContainer.addEventListener('submit', function(e){
    e.preventDefault();
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
    .then(r => r.json())
    .then(newToy => console.log(newToy))

  });
 
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
