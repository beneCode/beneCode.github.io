function saveItemsToJSON(items) 
{
    let itemsJSON = JSON.stringify(items);

    localStorage.items = itemsJSON;
}

function parseJSONToAccount() 
{
    JSON.parse(localStorage.items).forEach(item => {
        if(item != null)
        {
            items[item.item_id]= new Item(item.item_id, item.name, item.price, item.info, item.amount, item.picture);
        }        
    });
}

parseJSONToAccount();

console.log(items);