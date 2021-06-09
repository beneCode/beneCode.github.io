$(document).ready(function() {
    $('#search-bar-input').keydown(function(event) {
        if (event.keyCode == 13) 
        {
            document.getElementById("search-bar-button").click();
            return false;
        }
    });
});

var search = [];

function searchCheck() 
{
    search=[];
    // Declare variables
    var input, filter, txtValue;
    input = document.getElementById('search-bar-input');
    filter = input.value.toUpperCase();
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < items.length; i++) 
    {
        if(items[i] != undefined)
        {
            txtValue = items[i].name;
            if (txtValue.toUpperCase().indexOf(filter) > -1)
            {
                search.push(items[i].item_id);
            }
        }
    }
    saveSearchToJSON(search);

    window.location.href=`./${localStorage.location}sub-search-page/sub-search-page.html`;
    localStorage.location = "../";
}

function saveSearchToJSON(search) 
{
    let searchJSON = JSON.stringify(search);

    localStorage.search = searchJSON;
}

function parseJSONToSearch() 
{
    search = JSON.parse(localStorage.search);
}

parseJSONToSearch();

console.log(search);