items_categories.forEach(element => {
    if(element != null)
    {
        if(element.category_id == localStorage.categorySearchId)
        {
            document.getElementById("main-holder-grid").innerHTML += items[element.item_id].Print();
        }
    }
});