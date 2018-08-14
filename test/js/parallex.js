

! function () {

    "use strict";


    // draw parallax image
    function parallax (id, x, y) {
        var image = images[id];
        if (image) {
            ctx.drawImage(image, x, y);
        }
    }

    // main loop
    function run() {
        // request next frame
        requestAnimationFrame(run);
        // clear screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // ease pointer
        pointer.cx += (pointer.x - pointer.cx) / 10;
        pointer.cy += (pointer.y - pointer.cy) / 10;
        var rx = -((canvas.width  / 2) - Math.max(15, Math.min(pointer.cx, canvas.width - 15))) / 7;
        var ry = -((canvas.height / 2) - Math.max(0, Math.min(pointer.cy, canvas.height - 5))) / 4.75;
        // parallax
        parallax(0, -20 + (rx / 2), -80 + (ry * 2));
        parallax(1, -40 + (rx / 2),  20 + (ry / 2));
        parallax(2, -20 + (rx / 3),  90 + (ry / 3));
        parallax(3, -20 - (rx / 2), 130 - (ry / 2));
        parallax(4,   0 - (rx / 1), 160 - (ry / 1));
        parallax(5, 240 - (rx * 2), 220 - (ry * 2));
    }

    // canvas
    var canvas  = ge1doot.canvas("canvas");
    var ctx     = canvas.ctx;
    // pointer
    var pointer = canvas.pointer;
    pointer.cx  = pointer.x = canvas.width / 2;
    pointer.cy  = 0;
    pointer.y = canvas.height;
    // images
    var images = [];
    // make jpg images transparent images
    chromaKey("img/main/is05.jpg", 0);
    chromaKey("img/main/is04.jpg", 1);
    chromaKey("img/main/is03.jpg", 2);
    chromaKey("img/main/is02.jpg", 3);
    chromaKey("img/main/is01.jpg", 4);
    chromaKey("img/main/is07.jpg", 5);
    // zyva!
    run();

}();