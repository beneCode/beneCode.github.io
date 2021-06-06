class BasketItem
{
    constructor(item_id, amount)
    {
        this.item_id = parseInt(item_id);
        this.amount = parseInt(amount);
    }
}

function saveBasketToJSON(basket) 
{
    let basketJSON = JSON.stringify(basket);

    localStorage.basket = basketJSON;
}

function parseJSONToBasket() 
{
    let basket_id=0;

    JSON.parse(localStorage.basket).forEach(item => {
        basket[basket_id] = new BasketItem(item.item_id, item.amount);     
        basket_id++;
    });
}