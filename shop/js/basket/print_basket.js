function printBasket()
{
    let basketHolder = document.getElementById("basket-holder");
    basketHolder.innerHTML = ``;

    let basket_id = 0;

    if(basket.length <= 0)
    {
        basketHolder.innerHTML = `
            <li class="lower-holder-li" id="empty-basket">Twój koszyk jest pusty</li>
        `;

        return;
    }

    basket.forEach(item => {
        if(basket_id < basket.length-1)
        {
            basketHolder.innerHTML += items[item.item_id].PrintForBasket(basket_id, "");
        }
        else
        {
            basketHolder.innerHTML += items[item.item_id].PrintForBasket(basket_id, "item-basket-last");
        }
        basket_id++;
    });    
}

if(basket.length > 0)
{
    printBasket();
}