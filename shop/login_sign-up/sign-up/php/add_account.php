<?php
    require_once('./php/dane_bazy_danych/db_connect.php');
    require_once('./php/dane_bazy_danych/db_connect.php');

    //łączenie z bazą
    $connect = getConnect($host, $user, $password, $db);

    //ustawienie zestawu znaków klienta
    $connect->set_charset('utf8');

    $query="INSERT INTO account (name, surename, email, password, isAdmin) VALUES ('{$_GET['name']}', '{$_GET['surename']}', '{$_GET['email']}', '{$_GET['password']}', 0)";

    $connect->query($query);
    header('Location:./index.html');

    //zamykanie połączenia z bazą
    disConnect($connect);
?>