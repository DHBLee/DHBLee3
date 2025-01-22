const menuBtn = document.getElementById('menuBtn');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const profile = document.getElementById('profile');
const introContainer = document.querySelector('.first__page')
const settingsContainer = document.querySelector('.settings');
const mainContainer = document.querySelector('.main');
const headerContainer = document.querySelector('header')
menuBtn.addEventListener('click', () => console.log('hello'))

profile.addEventListener('click', () => {
    mainContainer.style.display = mainContainer.style.display === 'none' ? "flex" : "none";   
    settingsContainer.style.display = mainContainer.style.display === "none" ? "flex" : "none";
})
loginBtn.addEventListener('click', () => {
    mainContainer.style.display = "flex";
    headerContainer.style.display = "flex";
    introContainer.style.display = "none"; 
})
logoutBtn.addEventListener('click', () => {
    settingsContainer.style.display = "none";
    introContainer.style.display = "flex"; 
    headerContainer.style.display = "none";
})

