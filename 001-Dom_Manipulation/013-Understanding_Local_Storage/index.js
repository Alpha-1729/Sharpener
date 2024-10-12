'use strict;'

// Understanding Local Storage

/*
>>>>
>>>>
>>>>
>>>>
*/

const forms = document.querySelector('.user-form');
forms.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');

    localStorage.setItem('Username', username.value);
    localStorage.setItem('Email', email.value);
    localStorage.setItem('Phone', phone.value);
});