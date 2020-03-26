<?php

if(isset($_POST['fio'],
$_POST['email'],
$_POST['type_pass'],
$_POST['start_date'],
$_POST['end_date'],
$_POST['visit_purpose'])) {

    include "db.php";

    $fio = $_POST['fio'];
    $email = $_POST['email'];
    $type_pass = $_POST['type_pass'];
    $start_date = $_POST['start_date'];
    $end_date = $_POST['end_date'];
    $purpose = $_POST['visit_purpose'];
    $photo = $_POST['photo'];

    $uploaddir = "../images/";
    $photo = str_replace("data:image/png;base64,", '', $photo);
    $photo = str_replace("data:image/jpeg;base64,", '', $photo);
    $photo = str_replace(" ", '+', $photo);
    $data = base64_decode($photo);
    $file_name = generateStr(8) . ".jpg";
    $uploadfile = $uploaddir . $file_name;
    $url = "localhost/OneMore/" . generateStr(8);

    if(file_put_contents($uploadfile, $data)) {

        if($type_pass == "limited") {
            $query = mysqli_query($db, "INSERT INTO
            request (fio, email, type_pass, start_date, end_date, visit_purpose, photo, url)
            VALUES ('$fio', '$email', '$type_pass', '$start_date', '$end_date', '$purpose', '$file_name', '$url')");
        } else {
            $query = mysqli_query($db, "INSERT INTO
            request (fio, email, type_pass, photo, url)
            VALUES ('$fio', '$email', '$type_pass', '$file_name', '$url')");
        }
    
        if($query) {
            mysqli_close($db);
            echo "200ок";
        } else {
            mysqli_close($db);
            echo "ошибка запроса";
        }
    
    } else {
        echo "er";
    }

} else {
    echo "Ты чо тут забыл ?";
}

function generateStr($strlenght = 8) {
    $chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789";
    $charsCount = strlen($chars);
    $str = '';
    for($i = 0; $i < $strlenght; $i++) {
        $str .= substr($chars, rand(1, $charsCount) - 1, 1);
    }
    return $str;
}