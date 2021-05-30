<?php
    require_once('./php/dane_bazy_danych/db_connect.php');
    require_once('./php/dane_bazy_danych/db_connect.php');

    //łączenie z bazą
    $connect = getConnect($host, $user, $password, $db);

    //ustawienie zestawu znaków klienta
    $connect->set_charset('utf8');

    $query="INSERT INTO account (name, surename, email, password, isAdmin) VALUES ('{$_GET['name']}', '{$_GET['surename']}', '{$_GET['email']}', '{$_GET['password']}', 0)";

    $connect->query($query);

    $query = "SELECT * FROM account WHERE email='{$_GET['email']}'";
    $result=$connect->query($query)->fetch_object();

    echo<<<html
        <script>

            localStorage.isFromIndexPHP = 1;
            var account = new Account($result->account_id, '$result->name', '$result->surename', '$result->email', '$result->password', $result->isAdmin);

        </script>
    html;

    //zamykanie połączenia z bazą
    disConnect($connect);
?>