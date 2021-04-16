const logo = document.querySelector('#logo');
const mainLink = document.querySelector('#logo-link');

logo.addEventListener('click', () => {
    mainLink.click();
});