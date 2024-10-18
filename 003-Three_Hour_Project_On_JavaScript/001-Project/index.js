'use strict;'

// Project

/*
>>>>
>>>>
>>>>
>>>>
*/

const showList = document.getElementById('show-list');
const amount = document.getElementById('amount');
const description = document.getElementById('description');
const category = document.getElementById('category');

function removeDataFromLocalStorage(dataId) {
    const currentData = JSON.parse(localStorage.getItem('expenseList'));
    const updatedData = currentData.filter(item => item.dataId !== dataId);
    localStorage.setItem('expenseList', JSON.stringify(updatedData));
}

function deleteItem(event) {
    const parentElement = event.target.parentElement.parentElement.parentElement;
    console.log(parentElement);
    const dataId = Number(parentElement.getAttribute('data-id'));
    removeDataFromLocalStorage(dataId);

    showList.removeChild(parentElement);
}

function editItem(event) {
    const parentElement = event.target.parentElement.parentElement.parentElement;
    const dataId = Number(parentElement.getAttribute('data-id'));

    const expenseObj = JSON.parse(localStorage.getItem('expenseList')).find(item => item.dataId === dataId);
    amount.value = expenseObj.amount;
    description.value = expenseObj.description;
    category.value = expenseObj.category;

    deleteItem(event);
}

function addItem(expenseData) {
    const newDiv = document.createElement('div');
    newDiv.className = 'card col-md-auto';
    newDiv.style = "margin: 10px;";

    newDiv.innerHTML = `
    <div class="card-body">
        <h2 class="card-title">${expenseData.category}</h2>
        <h5 class="card-sub-title">$${expenseData.amount}</h5>
        <p class="card-text">${expenseData.description}</p>
        <a class="card-link">
            <button class="btn btn-info btn-sm edit-btn" onclick="editItem(event)">Edit</button>
        </a>
        <a class="card-link">
            <button class="btn btn-danger btn-sm delete-btn" onclick="deleteItem(event)">Delete</button>
        </a>
    </div>
`;


    // const newRow = document.createElement('tr');
    // newLi.className = 'list-group list-group-horizontal';
    // newLi.innerHTML = `
    // <li class="list-group-item">${expenseData.category}</li>
    //     <li class="list-group-item">${expenseData.description}</li>
    //     <li class="list-group-item">${expenseData.amount}</li>
    //     <li class="list-group-item">
    //         <div class="button-container">
    //             <button class="btn btn-info btn-sm edit-btn" onclick="editItem(event)">Edit</button>
    //             <button class="btn btn-danger btn-sm delete-btn" onclick="deleteItem(event)">Delete</button>
    //         </div>
    //     </li>`;

    // To uniquely identify the item.
    newDiv.setAttribute('data-id', expenseData.dataId);

    showList.appendChild(newDiv);
}

function submitForm(event) {
    event.preventDefault();

    let currentData = JSON.parse(localStorage.getItem('expenseList'));
    if (!currentData) {
        currentData = new Array();
    }

    let newDataId = localStorage.getItem('dataId');
    newDataId = newDataId === null ? 1 : Number(newDataId) + 1;

    const expenseData = {
        amount: amount.value,
        description: description.value.trim(),
        category: category.value,
        dataId: newDataId
    };

    addItem(expenseData);

    // Storing all data in the local storage.
    currentData.push(expenseData);
    localStorage.setItem('expenseList', JSON.stringify(currentData));
    localStorage.setItem('dataId', newDataId);

    // Clearing all field.
    amount.value = null;
    description.value = null;
}

document.addEventListener('DOMContentLoaded', function () {
    let currentData = JSON.parse(localStorage.getItem('expenseList'));

    for (let i in currentData) {
        addItem(currentData[i]);
    }
})