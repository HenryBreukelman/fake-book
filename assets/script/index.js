'use strict';

import * as Utils from './utils.js';
import {Subscriber} from './Subscriber.js';

const user = Utils.select('.user');
const dialog = Utils.select('dialog');
const text = Utils.select('textarea');
const image = Utils.select('.image');
const post = Utils.select('.post');

let posts = []

let pagesArray = [
  'Me',
  'Minecraft',
  'Coding',
  'Canada',
  'Comedy'
]

let groupsArray = [
  'Family',
  'Class',
  'Cousins',
  'Church'
]

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

/*
  event listeners
*/

Utils.listen('click', user, userInfoOpen)
Utils.listen('click', dialog, userInfoClose)
