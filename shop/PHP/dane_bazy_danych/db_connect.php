<?php
    function getConnect($host, $user, $password, $db)
    {
        $connect=new mysqli($host, $user, $password, $db);

        if($connect->connect_error)
        {
            echo "wystapil problem z polaczeniem ".$connect->connect_error;
            echo "<br>";
            echo "wystapil problem z polaczeniem kod bledu to: ".$connect->connect_errno;
        }

        return $connect;
    }

    function disConnect($connect)
    {
        $connect->close();
    }
?>