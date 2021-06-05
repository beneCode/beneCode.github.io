function saveBasketToJSON(basket) 
{
    let basketJSON = JSON.stringify(basket);

    localStorage.basket = basketJSON;
}

function parseJSONToBasket() 
{
    basket = JSON.parse(localStorage.basket);
}