<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ваш пропуск</title>
    <link rel="stylesheet" href="./css/bootstrap.css">
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    <div class="content">
        <h1>Ваш пропуск одобрен и готов к печати</h1>
        <?php 
        if($row['type_pass'] == "unlimited") {
            include "../media/employee.php";
        } else if($row['type_pass'] == "limited") {
            include "../media/guest.php";
        } else {
            "ЧО ? это как ? КТО с Бд играл ?";
        } ?>
    </div>
</body>
</html>