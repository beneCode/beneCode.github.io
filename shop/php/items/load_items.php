<script src="./../../js/items/item.js"></script>
<script src="./../../js/items/item_JSON_handler.js"></script>

<script src="./../../js/categories/categories.js"></script>
<script src="./../../js/categories/categories_JSON_handler.js"></script>

<script src="./../../js/categories/items_categories.js"></script>
<script src="./../../js/categories/items_categories_JSON_handler.js"></script>

<?php
    require_once('./../dane_bazy_danych/db_info.php');
    require_once('./../dane_bazy_danych/db_connect.php');

    //łączenie z bazą
    $connect = getConnect($host, $user, $password, $db);

    //ustawienie zestawu znaków klienta
    $connect->set_charset('utf8');

    $query = "SELECT * FROM items";

    $result=$connect->query($query);

    echo "<script>";

    while($row=$result->fetch_object())//items
    {
        echo<<<html
            items[$row->item_id] = new Item($row->item_id, '$row->name', $row->price, '$row->info', $row->amount, '$row->picture');
        html;
    }

    $query = "SELECT * FROM categories";

    $result=$connect->query($query);

    while($row=$result->fetch_object())//categories
    {
        echo<<<html
            categories[$row->category_id] = new Category($row->category_id, '$row->name');
        html;
    }

    $query = "SELECT * FROM items_categories";

    $result=$connect->query($query);

    while($row=$result->fetch_object())//items_categories
    {
        echo<<<html
            items_categories[$row->items_categories_id] = new Items_Categories($row->items_categories_id, $row->item_id, $row->category_id);
        html;
    }

    echo<<<html
        saveItemsToJSON(items);
        saveCategoriesToJSON(categories);
        saveItems_CategoriesToJSON(items_categories);

        localStorage.items_load_first = 0;

        window.location.href = "./../../index.html";

    html;

    echo "</script>";

    //zamykanie połączenia z bazą
    disConnect($connect);
?>