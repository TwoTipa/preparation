// Кнопки

$("#newRequest_1").submit(function(e) {
    e.preventDefault();

    $("#newRequest_1").modal("hide");
    
    if($("#type_pass").val() == "limited") {
        $("#newRequest_2").modal("show");
    } else {
        $("#newRequest_3").modal("show");
    }
});

$("#newRequest_2").submit(function(e) {
    e.preventDefault();

    if(!validDate($("#start_date").val()) || !validDate($("#end_date").val())) {
        $("#errorNR_2").html("Некорректная дата");
    }

    $("#newRequest_2").modal("hide");
    $("#newRequest_3").modal("show");
});

$("#newRequest_3").submit(function(e) {
    e.preventDefault();

    var data = new FormData($("#newRequest_3 form")[0]);
    data.set("start_date", $("#start_date").val());
    data.set("end_date", $("#end_date").val());
    data.set("visit_purpose", $("#visit_purpose").val());
    data.set("fio", $("#fio").val());
    data.set("email", $("#email").val());
    data.set("type_pass", $("#type_pass").val());


    $.ajax({
        method: "POST",
        url: "./php/newRequest.php",
        data: data,
        processData: false,
        contentType: false,
        success: function(e) {
            alert(e);
        },
        error: function(e) {
            alert(e);
        }
    });
});

$("#newRequest_2back").click(function(e) {

    $("#newRequest_1").modal("show");
    $("#newRequest_2").modal("hide");
});

$("#newRequest_3back").click(function(e) {

    $("#newRequest_3").modal("hide");

    if($("#type_pass").val() == "limited") {
        $("#newRequest_2").modal("show");
    } else {
        $("#newRequest_1").modal("show");
    }
});

function validDate(date){ // date в формате 31.12.2014
    var d_arr = date.split('.');
    var d = new Date(d_arr[2]+'/'+d_arr[1]+'/'+d_arr[0]+''); // дата в формате 2014/12/31
    if (d_arr[2]!=d.getFullYear() || d_arr[1]!=(d.getMonth()) || d_arr[0]!=d.getDate() + 1) {
        return false; // неккоректная дата
    };
    return true;
}