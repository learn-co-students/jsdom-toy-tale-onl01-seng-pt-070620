let addToy = false;

// function addNewToy(name, image) {
//   let formData = {
//     name: name,
//     image: image
//   };

//   let configObj = {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(formData)
//   };
//   fetch('http://localhost:3000/toys', configObj);
// };

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
  loadToys();
});

// function loadToys() {
//   fetch('http://localhost:3000/toys')
//   .then(response => response.json())
//   .then(toys => newToy(toys))
  

// };

// function newToy(toy){
//   let div = document.createElement('div');
//   div.setAttribute('class', 'card');
//   let h2 = document.createElement('h2');
//   h2.textContent = toy['name'];
//   div.appendChild(h2);
//   let img = document.createElement('img');
//   img.setAttribute('src', toy['image']);
//   img.setAttribute('class', 'toy-avatar');
//   div.appendChild(img);
//   let p = document.createElement('p');
//   p.textContent = toy['likes'];
//   div.appendChild(p);
//   let button = document.createElement('button');
//   button.setAttribute('class', 'like-btn');
//   button.setAttribute('onclick', 'likeBtn(event');
//   div.appendChild(button);

// }

function loadToys() {
  fetch('http://localhost:3000/toys')
.then(function(response) {
  return response.json();
})
.then(function(toys) {
  for (const toy of toys) {
    buildNewToy(toy);
    }
  });
}

function buildNewToy(toy){
  let div = document.createElement('div');
    div.setAttribute('class', 'card');
    let h2 = document.createElement('h2');
    h2.textContent = toy['name'];
    div.appendChild(h2);
    let img = document.createElement('img');
    img.setAttribute('src', toy['image']);
    img.setAttribute('class', 'toy-avatar');
    div.appendChild(img);
    let p = document.createElement('p');
    p.textContent = toy['likes'];
    div.appendChild(p);
    // let button = document.createElement('button');
    // button.setAttribute('class', 'like-btn');
    // button.setAttribute('onclick', 'likeBtn(event)');
    // div.appendChild(button);
};


