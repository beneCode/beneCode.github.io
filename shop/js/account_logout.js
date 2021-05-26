function logout() 
{
    localStorage.isLoggedIn = 0;
    localStorage.accountInfo = "";
}

let wyloguj_button = document.querySelector('#button-wyloguj');

wyloguj_button.addEventListener('click', () => {
    logout();

    let mainLink = document.querySelector('#logo-link');
    mainLink.click();
});