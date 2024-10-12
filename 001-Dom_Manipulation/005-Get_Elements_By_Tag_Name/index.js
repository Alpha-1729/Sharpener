'use strict;'

// Get Elements By Tag Name

/*
>>>>
>>>>
>>>>
>>>>
*/

const listElements = document.getElementsByTagName('li');
listElements[4].style.color = 'blue';

for (let i = 0; i < listElements.length; i++) {
    listElements[i].style.fontStyle = 'italic';
}