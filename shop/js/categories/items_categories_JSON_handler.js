function saveItems_CategoriesToJSON(items_categories)
{
    let items_categoriesJSON = JSON.stringify(items_categories);

    localStorage.items_categories = items_categoriesJSON;
}

function parseJSONToItems_Categories() 
{
    JSON.parse(localStorage.items_categories).forEach(element => {
        if(element != null)
        {
            items_categories[element.items_categories_id]= new Items_Categories(element.items_categories_id, element.item_id, element.category_id);
        }        
    });
}

parseJSONToItems_Categories();

console.log(items_categories);