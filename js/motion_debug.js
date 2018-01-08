! function () {


    //Init

    function loading(_state){

        if(_state =="show"){
            $("#loading").addClass("active");
        } else if(_state =="hide"){
            $("#loading").removeClass("active");
        }

    }

    loading('show');

    var imgLoadCount = 0
    var imgCount = 0

    // AR 이미지의 에니메이션을 위한 스크롤 단계 값
    var frameStep = [3000,4000,4600];

    var bgImages = [];

    // AR 이미지가 이동한 마지막 값
    var last = {
        scrollMag : null,
        arImgY : null,
        moveArImgY : null,
    };


    // 처음 보여줄 배율
    var arFirstMag = 2;

    // 가장 확대되었을때 배율
    var arFullMag = 1;

    // 가장 축소되었을때 배율
    var arMinMag = 0.6;

    var gorillaFrame = 25;
    var gorillaFrameCount = 0;

    var dragonBigFrame = 30;
    var dragonBigFrameCount = 0;

    function displayInit(){

        //브라우져 크기
        wWidth = $(window).width();
        wHeight = $(window).height();

        // 화면의 중앙
        centerX = wWidth / 2;
        centerY = wHeight / 2;

        //마우스 이벤트를 위한 변수
        mouseX = centerX;
        mouseY = centerY;
        shiftX = 0;
        shiftY = 0;
        parallex = {};
        parallex.x1 = shiftX/250;
        parallex.x2 = shiftX/170;
        parallex.x3 = shiftX/100;
        parallex.x4 = shiftX/50;

        parallex.y1 = shiftY/250;
        parallex.y2 = shiftY/200;
        parallex.y3 = shiftY/150;
        parallex.y4 = shiftY/100;


        // 화면에 보여줄 AR Canvas 이미지 크기
        // Device Frame 이미지비율에 맞춘다
        // var arCanvasWidth = 1920;
        // var arCanvasHeight = 965;
        arCanvasWidth = 2304;
        arCanvasHeight = 1134;
        arTop = 0;
        arLeft = 0;

        // //브라우져 Width보다 캔버스가 작을경우(사용자 브라우져비율이 16:8이 아닐때)
        // if( wWidth > arCanvasWidth ) {
        //     var arCanvasWidth = wWidth;
        //     var arCanvasHeight = wWidth / 2;
        //     var arTop = ( wHeight - arCanvasHeight ) / 2 ;
        //     var arLeft = 0;
        // };

        //현실배경은 창 크기에 맞춘다
        realCanvasWidth = wWidth;
        realCanvasHeight = wHeight;
        realTop = 0;
        realLeft = 0;

        // Wrapper Size rest
        $(".motion, #loading").css({
            width :     wWidth,
            height :    wHeight
        });

        $("#mossland-ar").css({
            left:       arLeft,
            top:        arTop
        }).attr({
            width :     arCanvasWidth,
            height:     arCanvasHeight
        });

        $("#mossland-reality").css({
            left:       realLeft,
            top:        realTop
        }).attr({
            width :     realCanvasWidth,
            height:     realCanvasHeight
        });

        $("#mossland-reality").css({
            left:       realLeft,
            top:        realTop
        }).attr({
            width :     realCanvasWidth,
            height:     realCanvasHeight
        });



        $("#motionwrap").css({
            "width" : wWidth,
            "height" : frameStep[2] + wHeight
        });
    }

    displayInit();




    var bgImagesSrc = [
        "img/main/device_b.png",  //device frame
        "img/main/r00.png",     //Reality bg
        "img/main/r01.png",     //Reality bg
        "img/main/r02.png",     //Reality bg
        "img/main/r03.jpg",     //Reality bg
        "img/main/m00.png",     //AR bg
        "img/main/m01.png",     //AR bg
        "img/main/m02.png",     //AR bg
        "img/main/m03.jpg"      //AR bg
    ];

    var gorillaSpriteSrc  = "img/main/object/gorilla_sprite_800_compressed.png";
    var flyBigSpriteSrc  = "img/main/object/dragon_big_sprite_1024_compressed.png";

    var gorillaImg = new Image() ;
    imgCount ++;

    var dragonBigImg = new Image() ;
    imgCount ++;

    gorillaImg.onload = function(){
        checkload();
    };

    dragonBigImg.onload = function(){
        checkload();
    };

    gorillaImg.src = gorillaSpriteSrc;
    dragonBigImg.src = flyBigSpriteSrc;

    imgCount += bgImagesSrc.length;

    for(var i = 0; i<bgImagesSrc.length; i++){
        bgImages[i] =new Image();
        bgImages[i].onload = function(){
            checkload();
        };
        bgImages[i].src=bgImagesSrc[i];
    };

    function checkload(){
        imgLoadCount ++;
        if( imgCount == imgLoadCount ){
            loading('hide');
            run();
        }
    }







    // Canvas init
    var arctx    = document.getElementById("mossland-ar").getContext("2d");
    var realctx    = document.getElementById("mossland-reality").getContext("2d");


    //Object의 Frame rate 조절
    var fps = 24;
    var now;
    var then = Date.now();
    var interval = 1000/fps;
    var delta;


    var objDragonBigOption = {
        p0 : {x:300, y:200},
        p1 : {x:500, y:100},
        p2 : {x:1200, y:300},
        p3 : {x:1900, y:100},
        player : {x:0, y:0, speed:.001, t:0},
    };

    var req;
    //Parallex를 위한 마진비율
    var arParallexMargin = 1.05;
    var wWidth,wHeight,centerX,centerY,mouseX,mouseY,shiftX,shiftY,parallex,arCanvasWidth,arCanvasHeight,arTop,arLeft,realCanvasWidth,realCanvasHeight,realTop,realLeft;
    var df = false;


    $(window).scroll(function(){

        var scrollTop = $(window).scrollTop();
        if( scrollTop > frameStep[2] ) {
            $(".motion").css({
                "position" : "absolute",
                "bottom" : "0"
            });
        } else {
            $(".motion").css({
                "position" : "fixed",
                "bottom" : "0"
            });
        }

        if( scrollTop > frameStep[2]+wHeight) {
            $(".main-header").addClass('active')
        } else {
            $(".main-header").removeClass('active')
        }



        if(scrollTop > frameStep[1]){
            df = true;
            showCp();
        } else {
            df = false;
            showCp();
        };
    });

    //마우스 이벤트
    $("#mossland-reality").mousemove(function(e) {

        mouseX = e.pageX - $(this).offset().left;
        mouseY = e.pageY - $(this).offset().top;

        shiftX = centerX - mouseX;
        shiftY = centerY - mouseY;

        //시점이동값 x1이 가장 뒤에있는 층
        parallex.x1 = shiftX/250;
        parallex.x2 = shiftX/170;
        parallex.x3 = shiftX/100;
        parallex.x4 = shiftX/50;

        parallex.y1 = shiftY/250;
        parallex.y2 = shiftY/200;
        parallex.y3 = shiftY/150;
        parallex.y4 = shiftY/100;
    });


    // main loop
    function run() {

        // request next frame
        req = requestAnimationFrame(run);
        // clear screen
        arctx.clearRect(0, 0, wWidth, wHeight);
        var scrollTop = $(document).scrollTop();
        // console.warn('Scrolltop : ',scrollTop);
        initObjectFrameRate();
        drawReal();
        drawAR();

        // drawObject();
        controlAR(scrollTop);
    }

    function controlAR(scrollTop){

        // 스크롤 위치에 따른 화면 배율
        var scrollMag = ( arFirstMag - ( scrollTop * ( (arFirstMag - arFullMag) / frameStep[0] ) ) );

        // 화면에 꽉차는 크기
        if(scrollTop < frameStep[1]){

            last.scrollMag = scrollMag;

            var arImgWidth =  arCanvasWidth * scrollMag;
            var arImgHeight =  arCanvasHeight * scrollMag;

            var arImgX = ( realCanvasWidth - arImgWidth ) / 2;
            var arImgY = ( realCanvasHeight - arImgHeight ) / 2;

            last.arImgX = arImgX;
            last.arImgY = arImgY;
            last.temp = arImgY;

            //크기를 고정하고 이동
        } else if(scrollTop < frameStep[2]){

            //크기를 고정한다
            var arImgWidth =  arCanvasWidth * last.scrollMag;
            var arImgHeight =  arCanvasHeight * last.scrollMag;
            var arImgX = ( realCanvasWidth - arImgWidth ) / 2;

            var arImgY = ( (scrollTop - frameStep[1]) ) + last.temp;

            last.arImgX = arImgX;
            last.arImgY = arImgY;

        } else {

            var arImgWidth =  arCanvasWidth * last.scrollMag;
            var arImgHeight =  arCanvasHeight * last.scrollMag;

            var arImgX = ( realCanvasWidth - arImgWidth ) / 2;
            var arImgY = last.arImgY;

        }

        //Reality CTX에 그리기
        realctx.drawImage($('#mossland-ar')[0],arImgX,arImgY,arImgWidth,arImgHeight);

        // realctx.drawImage($('#mossland-ar')[0],0,0,);
    }

    // Object 그리기
    function initObjectFrameRate(){

        var now = Date.now();
        var delta = now - then;

        if (delta > interval) {
            // update time stuffs

            // Just `then = now` is not enough.
            // Lets say we set fps at 10 which means
            // each frame must take 100ms
            // Now frame executes in 16ms (60fps) so
            // the loop iterates 7 times (16*7 = 112ms) until
            // delta > interval === true
            // Eventually this lowers down the FPS as
            // 112*10 = 1120ms (NOT 1000ms).
            // So we have to get rid of that extra 12ms
            // by subtracting delta (112) % interval (100).
            // Hope that makes sense.
            then = now - (delta % interval);

            gorillaFrameCount ++
            dragonBigFrameCount ++

            if( gorillaFrameCount > gorillaFrame-1 ){
                gorillaFrameCount = 0;
            }

            if( dragonBigFrameCount > dragonBigFrame-1 ){
                dragonBigFrameCount = 0;
            }
        }

    }

    function animateGorilla(){

        // arctx.drawImage(objectSrc['gorilla'],795+parallex.x2,210+parallex.y2,500,500);

        var gorillaX =          960+parallex.x2;
        var gorillaY =          400+parallex.y2;
        var gorillaWidth =      385;
        var gorillaHeight =     385;
        var gorillaDx =         gorillaFrameCount*800;
        var gorillaDY =         0;
        var gorillaDw =         800;
        var gorillaDh =         800;

        arctx.drawImage(gorillaImg,gorillaDx,gorillaDY,gorillaDw,gorillaDh,gorillaX,gorillaY,gorillaWidth,gorillaHeight);
    }

    function showCp(){

        if(df){
            $('.motion-logo').addClass('active')
            $('.motion-title').addClass('active')
        } else {
            $('.motion-logo').removeClass('active')
            $('.motion-title').removeClass('active')
        }
    }



    function animateDragonBig(){

        var imgWidth =      1024;
        var imgHeight =     1024;

        var t = objDragonBigOption.player.t;

        var cx = 3 * (objDragonBigOption.p1.x - objDragonBigOption.p0.x)
        var bx = 3 * (objDragonBigOption.p2.x - objDragonBigOption.p1.x) - cx;
        var ax = objDragonBigOption.p3.x - objDragonBigOption.p0.x - cx - bx;

        var cy = 3 * (objDragonBigOption.p1.y - objDragonBigOption.p0.y);
        var by = 3 * (objDragonBigOption.p2.y - objDragonBigOption.p1.y) - cy;
        var ay = objDragonBigOption.p3.y - objDragonBigOption.p0.y - cy - by;

        var xt = ax*(t*t*t) + bx*(t*t) + cx*t + objDragonBigOption.p0.x;
        var yt = ay*(t*t*t) + by*(t*t) + cy*t + objDragonBigOption.p0.y;

        objDragonBigOption.player.t += objDragonBigOption.player.speed;

        if (objDragonBigOption.player.t > 1) {
            objDragonBigOption.player.t = 0;

        }

        objDragonBigOption.player.x = xt-imgWidth/2;
        objDragonBigOption.player.y = yt-imgHeight/2;


        var dragonBigX =          objDragonBigOption.player.x+parallex.x3;
        var dragonBigY =          objDragonBigOption.player.y+parallex.y3;
        var dragonBigDx =         dragonBigFrameCount*imgWidth;
        var dragonBigDY =         0;
        var dragonBigDw =         1024;
        var dragonBigDh =         1024;

        arctx.drawImage(dragonBigImg,dragonBigDx,dragonBigDY,dragonBigDw,dragonBigDh,dragonBigX,dragonBigY,imgWidth,imgHeight);

    }


    // AR 그리기
    function drawAR() {

        var arImgWidth = 2172;
        var arImgHeight = 1086;
        var arImgX = (arCanvasWidth - arImgWidth) / 2 ;
        var arImgY = (arCanvasHeight - arImgHeight) / 2;

        arctx.drawImage(bgImages[4],arImgX + parallex.x1,arImgY,arImgWidth,arImgHeight);
        // animateDragon();
        arctx.drawImage(bgImages[3],arImgX +parallex.x2,arImgY,arImgWidth,arImgHeight);
        animateGorilla();
        animateDragonBig();
        arctx.drawImage(bgImages[2],arImgX + parallex.x3,arImgY,arImgWidth,arImgHeight);

        arctx.drawImage(bgImages[1],arImgX + parallex.x4,arImgY,arImgWidth,arImgHeight);

        // Device Frame을 가장 나중에 그린다
        arctx.drawImage(bgImages[0],parallex.x1,parallex.y1,arCanvasWidth,arCanvasHeight);

    }

    // Reality Background 그리기
    function drawReal(){

        var rImgWidth = arParallexMargin * realCanvasWidth;
        var rImgHeight = arParallexMargin * realCanvasHeight;

        var rImgX = (realCanvasWidth - rImgWidth) / 2 ;
        var rImgY = (realCanvasHeight - rImgHeight) / 2;


        realctx.drawImage(bgImages[8],rImgX + parallex.x1,rImgY + parallex.y1,rImgWidth,rImgHeight);
        realctx.drawImage(bgImages[7],rImgX + parallex.x2,rImgY + parallex.y2,rImgWidth,rImgHeight);
        realctx.drawImage(bgImages[6],rImgX + parallex.x3,rImgY + parallex.y3,rImgWidth,rImgHeight);
        realctx.drawImage(bgImages[5],rImgX + parallex.x4,rImgY + parallex.y4,rImgWidth,rImgHeight);


    }



    $(window).resize(function(){
        displayInit();
    });















}();