<a href="./index.html" id="logo-link"></a> <!--link dla logo-->

<script src="./js/account.js"></script>
<script src="./js/account_JSON_handler.js"></script>

<?php
    require_once('./php/dane_bazy_danych/db_info.php');
    require_once('./php/dane_bazy_danych/db_connect.php');

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