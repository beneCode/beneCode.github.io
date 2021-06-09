categories.forEach(element => {
    document.getElementById("categories-ul").innerHTML += `<li class="lower-holder-li category-li">${element.name}</li><input type="hidden" id="${element.name}" value="${element.category_id}">`
});

Array.from(document.getElementsByClassName("category-li")).forEach(element => {
    element.addEventListener("click", function() {
        localStorage.categorySearchId=document.getElementById(`${element.innerHTML}`).value;       
        window.location.href = `./${localStorage.location}sub-category-page/sub-category-page.html`;
        localStorage.location="../"
    });
});