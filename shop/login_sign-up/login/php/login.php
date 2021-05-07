<?php
    require_once('./dane_bazy_danych/db_connect.php');
    require_once('./dane_bazy_danych/db_connect.php');

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
                localStorage.zly_email=true;
            </script>
        html;
        header('Location:./../login_sign-up/login/login.html');
    }
    else
    {
        if($result->password != $_GET['password'])
        {
            echo<<<html
                <script>
                    localStorage.zly_haslo=true;
                </script>
            html;
            header('Location:./../login_sign-up/login/login.html');
        }
        else
        {
            echo<<<html
                zalogowano
            html;
            //header('Location:./../index.html');
        }
    }
?>