var basket = new Array();

parseJSONToBasket();

function addToBasket(item_id)
{
    basket.push(item_id);
    saveBasketToJSON(basket);
    printBasket();
}

function deleteFromBasket(basket_id)
{
    basket.splice(basket_id, 1);
    saveBasketToJSON(basket);
    printBasket();
}