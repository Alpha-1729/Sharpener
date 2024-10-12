'use strict;'

// Query Selector And Query Selector All Methods

/*
>>>>
>>>>
>>>>
>>>>
*/

const mainHeading = document.querySelector('#main-heading');
mainHeading.style.textAlign = 'right';


const basketHeading = document.querySelector('#basket-heading');
basketHeading.style.color = 'brown';

const evenFruits = document.querySelectorAll('.fruit:nth-child(even)');

for (let i = 0; i < evenFruits.length; i++) {
    evenFruits[i].style.backgroundColor = 'brown';
    evenFruits[i].style.color = 'white';
}