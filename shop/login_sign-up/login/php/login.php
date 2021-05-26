<?php
    require_once('./php/dane_bazy_danych/db_connect.php');
    require_once('./php/dane_bazy_danych/db_connect.php');

    //łączenie z bazą
    $connect = getConnect($host, $user, $password, $db);

    //ustawienie zestawu znaków klienta
    $connect->set_charset('utf8');

    $query = "SELECT * FROM account WHERE email='{$_GET['email']}'";
    $result=$connect->query($query)->fetch_object();

    if($result == NULL)
    {
        echo<<<html
            <script>
                localStorage.zly_email=1;
                window.location.replace("./login_sign-up/login/login.html");
            </script>
        html;
    }
    else
    {
        if($result->password != $_GET['password'])
        {
            echo<<<html
                <script>
                    localStorage.zly_haslo=1;
                    window.location.replace("./login_sign-up/login/login.html");
                </script>
            html;
        }
        else
        {
            echo<<<html
                <script>

                    localStorage.isFromIndexPHP = 1;
                    var account = new Account($result->account_id, '$result->name', '$result->surename', '$result->email', '$result->password', $result->isAdmin);

                </script>
            html;
        }
    }
?>