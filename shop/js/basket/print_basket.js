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
        basketHolder.innerHTML += items[item].PrintForBasket(basket_id);
        basket_id++;
    });    
}

if(basket.length > 0)
{
    printBasket();
}