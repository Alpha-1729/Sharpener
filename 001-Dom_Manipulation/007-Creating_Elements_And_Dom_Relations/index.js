'use strict;'

// Creating Elements And Dom Relations

/*
>>>>
>>>>
>>>>
>>>>
*/

const heading = document.createElement('h3');
const headingText = document.createTextNode('Buy high quality organic fruits online');
heading.appendChild(headingText);
heading.style.fontStyle = 'italic';

const header = document.querySelector('#header');
header.appendChild(heading);

const secondDiv = document.querySelector('#basket');
const ul = document.querySelector('.fruits');
const para = document.createElement('p');
para.appendChild(document.createTextNode('Total fruits: 4'));
para.id = 'fruits-total';
secondDiv.insertBefore(para, ul);