'use strict;'

// How To Scale

/*
>>>>
>>>>
>>>>
>>>>
*/

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

        const userList = document.querySelector('.user-list');
        const newLi = document.createElement('li');
        const newLiText = document.createTextNode(`${username.value} - ${email.value} - ${phone.value}`);
        newLi.appendChild(newLiText);
        userList.appendChild(newLi);
    }
}