<script src="./../../js/items/item.js"></script>
<script src="./../../js/items/load_items.js"></script>

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

    while($row=$result->fetch_object())
    {
        echo<<<html
            items[$row->item_id] = new Item($row->item_id, '$row->name', $row->price, '$row->info', $row->amount, '$row->picture');
        html;
    }

    echo "</script>";

    //zamykanie połączenia z bazą
    disConnect($connect);
?>