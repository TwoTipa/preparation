<?php

include "db.php";

$url = $_GET["url"];
$query = mysqli_query($db, "SELECT * FROM request WHERE url = '$url' LIMIT 1");

$row = mysqli_fetch_assoc($query);

if($query) {

    if($row['status'] == "consideration") {
        include "../layout/consideration.html";
    } else if($row['status'] == "accept") {
        $path = "./images/" . $row['photo'];
        $fio = $row['fio'];
        $start = $row['start_date'];
        $end = $row['end_date'];
        include "../layout/showPass.php";
    } else {
        $reject_cause = $row['reject_cause'];
        include "../layout/reject.php";
    }

} else {
    echo "ошибка запроса";
}

mysqli_close($db);