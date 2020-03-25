var startX , startY, endX, endY;

var crop = $(".croper");
var canvas = $("canvas")[0];
var img = $("#display-3 img");

var move = false;

img.mousedown(function(e) {
    startX = e.offsetX;
    startY = e.offsetY;

    $("#display-3 img").css("filter", "blur(0px)");

    move = true;
});

var minX, minY, maxX, maxY;

img.mousemove(function(e) {
    if(!move) return;

    let tX = e.offsetX;
    let tY = e.offsetY;

    minX = Math.min(startX, tX);
    minY = Math.min(startY, tY);
    
    maxX = Math.max(startX, tX);
    maxY = Math.max(startY, tY);

    maxX -= minX;
    maxY -= minY;

    crop.css("background-position", `-${minX}px -${minY}px`);
    crop.css("top", minY + "px");
    crop.css("left", minX + "px");
    crop.css("width", maxX + "px");
    crop.css("height", maxY + "px");
});

$("#display-3 img").mouseup(function(e) {
    if(!move) return;

    img.css("filter", "blur(3px)");
    move = false;

    canvas.width = maxX;
    canvas.height = maxY;

    let ctx = canvas.getContext("2d");
    let im = img[0];
    ctx.drawImage(im, -minX, -minY, im.width, im.height);
    $("#img")[0].value = canvas.toDataURL();
});

$("#load").on("change", function(e) {
    let reader = new FileReader();

    reader.onload = function(e) {
        $("#display-3 img").attr("src", e.target.result);
        crop.css("background-image", `url(${e.target.result})`);
    }

    reader.readAsDataURL($("#load")[0].files[0]);
});