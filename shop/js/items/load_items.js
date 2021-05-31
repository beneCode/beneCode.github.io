localStorage.items_load_first ?? (localStorage.items_load_first = 1);

if(localStorage.items_load_first == 1)
{
    window.location.href = "./php/items/load_items.php";
}

localStorage.items_load_first = 1;