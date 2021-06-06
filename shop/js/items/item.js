var items = new Array(100);

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

    Print()
    {
        return `
            <div class="item">
                <div class="item-picture">
                    <img src="./img/${this.picture}" alt="${this.picture}">
                </div>

                <div class="item-name">
                    ${this.name}
                </div>

                <div class="item-price">
                    ${this.price} zł
                </div>

                <div class="item-add-to-basket">
                    <button onclick="addToBasket(${this.item_id});">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M11 7h1a.5.5 0 1 1 0 1h-1v1a.5.5 0 1 1-1 0V8H9a.5.5 0 0 1 0-1h1V6a.5.5 0 1 1 1 0v1zM5.323 4H8a.5.5 0 0 1 0 1H5.532l1.25 6h7.314l1.286-6H13a.5.5 0 1 1 0-1h3a.5.5 0 0 1 .489.605l-1.5 7A.5.5 0 0 1 14.5 12H6.99l.417 2H14a2 2 0 1 1-1.733 1H8.733a2 2 0 1 1-2.329-.91L4.094 3H2.5a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .49.398L5.322 4zM8 16a1 1 0 1 0-1.999-.001A1 1 0 0 0 8 16zm7 0a1 1 0 1 0-1.999-.001A1 1 0 0 0 15 16z">
                            </path>
                        </svg>
                    </button>
                </div>

                <div class="item-add-to-favourite">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 19.57l6.905-7.052A3.832 3.832 0 0 0 20 9.814a3.833 3.833 0 0 0-1.096-2.704A3.634 3.634 0 0 0 16.286 6c-.99 0-1.916.392-2.62 1.11L12 8.812l-.714-.73-.952-.972A3.637 3.637 0 0 0 7.714 6c-.99 0-1.916.392-2.619 1.11A3.835 3.835 0 0 0 4 9.814c0 1.025.388 1.983 1.095 2.704L12 19.571zm0-12.187l.685-.7.267-.272A4.635 4.635 0 0 1 16.286 5c1.26 0 2.442.501 3.333 1.41A4.832 4.832 0 0 1 21 9.815c0 1.286-.49 2.495-1.381 3.404L12 21l-7.62-7.782A4.835 4.835 0 0 1 3 9.814c0-1.285.49-2.494 1.38-3.403A4.635 4.635 0 0 1 7.715 5c1.26 0 2.443.501 3.334 1.41l.252.258.7.715z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }

    PrintForBasket(basket_id, isLast)
    {
        return `
            <li class="lower-holder-li" >
                <div class="item-basket ${isLast}">
                    <div class="item-basket-picture">
                        <img src="./img/${this.picture}" alt="${this.picture}">
                    </div>

                    <div class="item-basket-name">
                        ${this.name}
                    </div>

                    <div class="item-basket-price">
                        ${this.price} zł
                    </div>

                    <div class="item-basket-amount">
                        ${basket[basket_id].amount} szt.
                    </div>

                    <div class="item-delete-from-basket">
                        <button onclick="deleteFromBasket(${basket_id});">
                            <svg style="width: 100%;height: 100%;" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g fill-rule="evenodd">
                                    <path d="M8 7v12h8V7H8zM7 6h10v14H7V6z" fill-rule="nonzero"></path>
                                    <path d="M10 5v1h4V5h-4zM9 4h6v3H9V4z" fill-rule="nonzero"></path>
                                    <path d="M10 9h1v7h-1zM13 9h1v7h-1zM6 6h12v1H6z"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </li>
        `;
    }
}