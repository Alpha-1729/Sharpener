'use strict;'

// Correct Way To Store Data In Local Storage

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
    };

    localStorage.setItem('User Details', JSON.stringify(myObj));
}