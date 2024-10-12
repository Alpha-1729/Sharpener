'use strict;'

// Having Delete Functionality

/*
>>>>
>>>>
>>>>
>>>>
*/
const userList = document.querySelector('.user-list');

function handleFormSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const myObj = {
        username: username.value,
        email: email.value,
        phone: phone.value
    }



    if (!localStorage.getItem(email.value)) {
        localStorage.setItem(myObj.email, JSON.stringify(myObj));
        const newLi = document.createElement('li');
        const newLiText = document.createTextNode(`${username.value} - ${email.value} - ${phone.value}`);
        newLi.appendChild(newLiText);

        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.className = 'del-btn';
        newLi.appendChild(delBtn);
        userList.appendChild(newLi);

        delBtn.addEventListener('click', function (event) {
            userList.removeChild(event.target.parentElement);
            localStorage.removeItem(myObj.email);
        });
    }
}