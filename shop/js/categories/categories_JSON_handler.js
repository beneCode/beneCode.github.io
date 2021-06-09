function saveCategoriesToJSON(categories)
{
    let categoriesJSON = JSON.stringify(categories);

    localStorage.categories = categoriesJSON;
}

function parseJSONToCategories() 
{
    JSON.parse(localStorage.categories).forEach(category => {
        if(category != null)
        {
            categories[category.category_id]= new Category(category.category_id, category.name);
        }        
    });
}

parseJSONToCategories();

console.log(categories);