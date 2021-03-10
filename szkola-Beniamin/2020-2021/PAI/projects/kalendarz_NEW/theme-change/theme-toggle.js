const chk = document.getElementById('theme-toggle-chk'); //checkbox

chk.addEventListener('change', () => {
	document.querySelectorAll("*[theme]").forEach(element => element.classList.toggle('dark')); //change theme
	rotate();
});

const themes = ["light", "dark"]; //themes
let theme = localStorage.theme ?? (localStorage.theme = "light") //local storage

if(localStorage.theme == "dark") //check if theme was dark
{
	document.querySelectorAll("*[theme]").forEach(element => element.classList.toggle('dark')); //change theme
	chk.checked = true;
}

const rotate = () => localStorage.theme = theme = themes[(themes.indexOf(theme)+1)%themes.length]; //rotate theme in local storage

const getTheme = () => localStorage.theme;