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
    let selectedAmount=getSelectedAmount();

    if((tmp=checkIfAlreadyThere(item_id)) == null)
    {
        basket.push(new BasketItem(item_id, selectedAmount));
    }
    else
    {
        basket[tmp].amount+=selectedAmount;
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

function getSelectedAmount() 
{
    let select = document.getElementById("amount-select");

    if(select != null)
    {
        return parseInt(select.selectedOptions[0].value); 
    }
    else
    {
        return 1;
    }
}