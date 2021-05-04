<?php
    require_once('./dane_bazy_danych/db_info.php');
    require_once('./dane_bazy_danych/db_connect.php');

    //łączenie z bazą
    $connect = getConnect($host, $user, $password, $db);

    //ustawienie zestawu znaków klienta
    $connect->set_charset('utf8');

    if(ISSET($_GET['mode']))
    {
        if(FILE_EXISTS("{$_GET['mode']}.php"))
        {
            include("{$_GET['mode']}.php");
        }
        else
        {
            echo "nie ma takiego pliku";
        }
    }
        
    //zamykanie połączenia z bazą
    disConnect($connect);
?>