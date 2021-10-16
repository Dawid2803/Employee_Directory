//declaration of all globar variables//

const search = document.querySelector('.search-container');
const gallary = document.querySelector('#gallery');
//declaring mainBody element to make DOM traversal easier//
const mainBody = document.querySelector('body');
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
//moved the script tags to the end of body for better performance// 
mainBody.insertBefore(modalContainer, mainBody.children[2]);

console.log(mainBody);
