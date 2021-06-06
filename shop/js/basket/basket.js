var basket = new Array();

parseJSONToBasket();

function checkIfAlreadyThere(item_id) 
{
    let basket_id = 0;
    let isTrue = 0;
    let n = 0;

    basket.forEach(item => {
        if(item.item_id == item_id)
        {
            isTrue = 1;
            n = basket_id;
        }
        basket_id++;
    });   

    if(isTrue == 1)
    {
        return n;
    }
    else
    {
        return null;
    }
}

function addToBasket(item_id)
{
    if((tmp=checkIfAlreadyThere(item_id)) == null)
    {
        basket.push(new BasketItem(item_id, 1));
    }
    else
    {
        basket[tmp].amount++;
    }
    
    saveBasketToJSON(basket);
    printBasket();
}

function deleteFromBasket(basket_id)
{
    basket.splice(basket_id, 1);
    saveBasketToJSON(basket);
    printBasket();
}