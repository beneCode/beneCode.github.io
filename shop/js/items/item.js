class Item
{
    constructor(item_id, name, price, info, amount, picture)
    {
        this.item_id = parseInt(item_id);
        this.name = name;
        this.price = parseFloat(price);
        this.info = info;
        this.amount = parseInt(amount);
        this.picture = picture;
    }
}