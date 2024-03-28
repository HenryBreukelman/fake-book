'use strict';

import * as Utils from './utils.js';
import {Subscriber} from './Subscriber.js';

const user = Utils.select('.user');
const dialog = Utils.select('dialog');
const text = Utils.select('textarea');
const image = Utils.select('.image');
const fileName = Utils.select('.file-name');
const post = Utils.select('.post');
const postContainer = Utils.select('.posts');
const imageInput = Utils.select('.image-input');

let pagesArray = ['Me', 'Minecraft', 'Coding', 'Canada', 'Comedy'];

let groupsArray = ['Family', 'Class', 'Cousins', 'Church'];

const newSubscriber = new Subscriber (
  '2956133', 
  'Henry Breukelman', 
  'Henry13B', 
  'henry@emial.com',
  pagesArray,
  groupsArray,
  false
);

/*
  functions
*/

function newDate() {
  const now = new Date();
  return now.toString().substring(0, 15);
}

function imageUrl(file) {
  const imageUrl = URL.createObjectURL(file);
  return imageUrl;
}

//dialog

function dialogInfo() {
  let userInfo = newSubscriber.getInfo();
  let info = userInfo.split(', ');
  const [name, username, email, pages, groups, monetize] = info;
  let userPages = pages.split(',').join(', ');
  let userGroups = groups.split(',').join(', ');
  let userMonetize;
  if (monetize) {
    userMonetize = 'No';
  } else {
    userMonetize = 'Yes';
  }
  return { name, username, email, userPages, userGroups, userMonetize };
}

function setDialog() {
  let { name, username, email, userPages, userGroups, userMonetize } = dialogInfo();
  const nameDiv = document.createElement('div');
  nameDiv.textContent = `Name: ${name}`;
  dialog.appendChild(nameDiv);

  const usernameDiv = document.createElement('div');
  usernameDiv.textContent = `Username: ${username}`;
  dialog.appendChild(usernameDiv);

  const emailDiv = document.createElement('div');
  emailDiv.textContent = `Email: ${email}`;
  dialog.appendChild(emailDiv);

  const pagesDiv = document.createElement('div');
  pagesDiv.textContent = `Pages: ${userPages}`;
  dialog.appendChild(pagesDiv);

  const groupsDiv = document.createElement('div');
  groupsDiv.textContent = `Groups: ${userGroups}`;
  dialog.appendChild(groupsDiv);

  const monetizeDiv = document.createElement('div');
  monetizeDiv.textContent = `Monetized: ${userMonetize}`;
  dialog.appendChild(monetizeDiv);
}

setDialog();

function userInfoOpen() {
  dialog.showModal();
}

function userInfoClose(event) {
  if (event.target === dialog) {
    dialog.close();
  }
}

//image name

function imageName(event) {
  const file = event.target.files[0].name;
  fileName.innerText = `${file}`;
}

//new post

function checkPost() {
  let newText = text.value.trim();
  let newFileName = fileName.innerText.trim();

  if (newText === '' && newFileName === '') {
    
  } else {
    makePost()
    clearInput()
  }
}

function makePost() {
  let newPost = document.createElement('div');
  let postContent = `
    <div class="post-header flex spacebetween">
      <div class="author flex">
        <i class="fa-solid fa-user"></i>
        <p>${newSubscriber.userName}</p>
      </div>
      <div>
        <p class="date">${newDate()}</p>
      </div>
    </div>`;

  if (text.value !== '') {
    postContent += `<p class="post-text">${text.value}</p>`;
  }

  if (fileName.innerText !== '') {
    const file = imageInput.files[0];
    const url = imageUrl(file);
    postContent += `<img class="post-image" src="${url}" alt="uploaded image">`;
  }

  newPost.innerHTML = postContent;

  postContainer.prepend(newPost);
}

function clearInput() {
  text.value = '';
  image.value = '';
  fileName.innerText = '';
}

/*
  event listeners
*/

Utils.listen('click', user, userInfoOpen);
Utils.listen('click', dialog, userInfoClose);
Utils.listen('change', image, imageName);
Utils.listen('click', post, checkPost);
