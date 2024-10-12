'use strict;'

// Filter Functionality

/*
>>>>
>>>>
>>>>
>>>>
*/

const form = document.querySelector('form');
const formButton = document.querySelector('button');
const fruits = document.querySelector('.fruits');


// Adding Fruit Description Input.
const descInput = document.createElement('input');
descInput.type = 'text';
descInput.id = 'description';
descInput.placeholder = 'Fruit Description';

form.insertBefore(descInput, formButton);

// Adding default description for current fruits.
const fruitItems = document.getElementsByClassName('fruit');
for (let i = 0; i < fruitItems.length; i++) {
    const deleteBtn = fruitItems[i].firstElementChild;

    const fruitDesc = document.createElement('p');
    const fruitDescText = document.createTextNode('King of fruits');
    fruitDesc.appendChild(fruitDescText)

    fruitDesc.id = 'fruit-desc';
    fruitDesc.style.fontStyle = 'italic';

    fruitItems[i].insertBefore(fruitDesc, deleteBtn);
}


form.addEventListener('submit', function (event) {
    event.preventDefault();
    const fruitsToAdd = document.getElementById('fruit-to-add');
    const fruitsToAddDesc = document.getElementById('description');

    const newLi = document.createElement('li');
    newLi.className = 'fruit';

    // Add fruit name.
    const newLiText = document.createTextNode(fruitsToAdd.value);
    newLi.appendChild(newLiText);

    // Add fruit description.
    const newLiDescription = document.createElement('p');
    const newLiDescriptionText = document.createTextNode(fruitsToAddDesc.value);
    newLiDescription.appendChild(newLiDescriptionText)
    newLiDescription.style.fontStyle = 'italic';

    newLi.appendChild(newLiDescription);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = 'x';
    newLi.appendChild(deleteBtn);

    fruits.appendChild(newLi);
});


// Filter for fruit and fruit-description.
const filter = document.getElementById('filter');
filter.addEventListener('keyup', function (event) {
    const textEntered = event.target.value.toLowerCase();
    const fruitItems = document.getElementsByClassName('fruit');

    for (let i = 0; i < fruitItems.length; i++) {
        const currentFruitText = fruitItems[i].firstChild.textContent.toLowerCase();
        const currentFruitDescription = fruitItems[i].firstElementChild.textContent.toLowerCase();
        console.log(currentFruitText.currentFruitDescription);
        if (currentFruitText.indexOf(textEntered) !== -1 || currentFruitDescription.indexOf(textEntered) !== -1) {
            fruitItems[i].style.display = 'flex';
        } else {
            fruitItems[i].style.display = 'none';
        }
    }
});