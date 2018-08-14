


var moss = (function(){

    var imgLoadCount = 0;
    var imgCount = 0;
    var pointer={};
    var parallex_sen = 4;
    var motionOff = false;

    // 화면에 보여지는 AR영역의 크기. Scroll Motion에 사용
    var AR_DISPLAY = {
        MAX : {
            WIDTH: null,
            HEIGHT : null
        },
        MIN : {
            WIDTH: null,
            HEIGHT : null
        },
        FINAL : {

        }
    };

    // AR 이미지의 에니메이션을 위한 스크롤 단계 값
    var SCROLL_MOTION = {
        STEP1 : {
            SCROLL : 700
        },
        STEP2 : {
            SCROLL: 700
        },
        STEP3 : {
            SCROLL : 700
        },
        LAST : {
            W : 0,
            H : 0,
            X : 0,
            Y: 0
        }
    };

    var PROP = {
        GORILLA : {
            FRAME : 25,
            FRAME_COUNT : 0,
            X : 960,
            Y: 400,
            WIDTH: 385,
            HEIGHT:385,
            DX: null,
            DY: 0,
            DW: 800,
            DH: 800
        },
        DRAGON : {
            FRAME : 30,
            FRAME_COUNT : 0,
            p0 : {x:300, y:100},
            p1 : {x:700, y:200},
            p2 : {x:1200, y:300},
            p3 : {x:1900, y:100},
            player : {x:0, y:0, speed:.0015, t:0},
            WIDTH: 1024,
            HEIGHT: 1024,
            DX: 0,
            DY: 0,
            DW: 1024,
            DH: 1024,
        },
        BALLOON : {
            WIDTH: 87,
            HEIGHT: 106,
            p0 : {x:1100, y:160},
            p1 : {x:1100, y:165},
            p2 : {x:1100, y:160},
            player : {x:0, y:0, speed:.005, t:0},
        },
        BALLOON_SMALL : {
            WIDTH: 57,
            HEIGHT: 70,
            p0 : {x:1000, y:110},
            p1 : {x:1000, y:115},
            p2 : {x:1000, y:110},
            player : {x:0, y:0, speed:.008, t:0}
        },
        SMOKE: {
            WIDTH: 1469,
            HEIGHT: 523,
            p0 : {x:1800, y:850},
            p1 : {x:1000, y:820},
            p2 : {x:50, y:850},
            player : {x:0, y:0, speed:.0001, t:0}
        }
    };

    //for moving animate
    PROP.DRAGON.CX = 3 * (PROP.DRAGON.p1.x - PROP.DRAGON.p0.x)
    PROP.DRAGON.BX = 3 * (PROP.DRAGON.p2.x - PROP.DRAGON.p1.x) - PROP.DRAGON.CX;
    PROP.DRAGON.AX = PROP.DRAGON.p3.x - PROP.DRAGON.p0.x - PROP.DRAGON.CX - PROP.DRAGON.BX;

    PROP.DRAGON.CY = 3 * (PROP.DRAGON.p1.y - PROP.DRAGON.p0.y);
    PROP.DRAGON.BY = 3 * (PROP.DRAGON.p2.y - PROP.DRAGON.p1.y) - PROP.DRAGON.CY;
    PROP.DRAGON.AY = PROP.DRAGON.p3.y - PROP.DRAGON.p0.y - PROP.DRAGON.CY - PROP.DRAGON.BY;

    var _moving3propname = ['BALLOON','BALLOON_SMALL','SMOKE'];

    for( var p=0; p <_moving3propname.length; p++){
        var propname = _moving3propname[p];
        PROP[propname].CX = 3 * (PROP[propname].p1.x - PROP[propname].p0.x);
        PROP[propname].AX = PROP[propname].p2.x - PROP[propname].p0.x - PROP[propname].CX;

        PROP[propname].CY = 3 * (PROP[propname].p1.y - PROP[propname].p0.y);
        PROP[propname].AY = PROP[propname].p2.y - PROP[propname].p0.y - PROP[propname].CY;
    }


    var feature01Point,feature02Point,feature03Point,feature04Point,roadmapPoint,icoPoint;
    var feature01fire,feature02fire,feature03fire,feature04fire,roadmapFire,icofire,icofireDone;

    // Canvas init
    // var arctx    = document.getElementById("mossland-ar").getContext("2d");
    // var realctx    = document.getElementById("mossland-reality").getContext("2d");


    //Requset animation object
    var req;

    //Object의 Frame rate 조절
    var fps = 30;
    var then = Date.now();
    var interval = 1000/fps;
    //Parallex를 위한 마진비율
    var arParallexMargin = 1.05;

    // Display 전역변수
    var wWidth,wHeight,centerX,centerY,mouseX,mouseY,realCanvasWidth,realCanvasHeight,realCenterX,realCenterY,realTop,realLeft,wRatio;

    var df = false;

    var parallex = {
        x1 : 0,
        x2 : 0,
        x3 : 0,
        x4 : 0,
        y1 : 0,
        y2 : 0,
        y3 : 0,
        y4 : 0
    };

    // 화면에 보여줄 AR Canvas 이미지 크기
    // Device Frame 이미지비율에 맞춘다
    // var arCanvasWidth = 1920;
    // var arCanvasHeight = 965;
    var arCanvasWidth = 2304;
    var arCanvasHeight = 1134;
    var arCanvasRatio = arCanvasWidth/arCanvasHeight;

    // Device 프레임 안에 들어갈 이미지 사이즈
    // 실제 이미지파일의 사이즈이다.
    var arImgWidth = 2172;
    var arImgHeight = 1086;
    var arImgX = (arCanvasWidth - arImgWidth) / 2 ;
    var arImgY = (arCanvasHeight - arImgHeight) / 2;
    var arTop = 0;
    var arLeft = 0;

    // $("#mossland-ar").css({
    //     left:       arLeft,
    //     top:        arTop
    // }).attr({
    //     width :     arCanvasWidth,
    //     height:     arCanvasHeight
    // });

    var IMAGES = {};

    function imageload(){

        var bgImagesSrc = [
            "img/main/device_b.png",  //device frame
            "img/main/r00.png",     //AR bg
            "img/main/r01.png",
            "img/main/r02.png",
            "img/main/r03.jpg",
            "img/main/m00.png",     //Reality BG
            "img/main/m01.png",
            "img/main/m02.png",
            "img/main/m03.jpg"
        ];


        // var gorillaSpriteSrc  = "img/main/object/gorilla3_800_sprite.png";
        // var flyBigSpriteSrc  = "img/main/object/dragon_big_sprite_1024_compressed.png";
        var gorillaSpriteSrc  = "img/main/object/gorilla3_800_sprite-min.png";
        var flyBigSpriteSrc  = "img/main/object/dragon_big_sprite_1024_compressed-min.png";
        var balloonSrc  = "img/main/object/balloon.png";
        var balloonSmallSrc  = "img/main/object/balloon2.png";
        var smokeSrc  = "img/main/object/particle_smoke.png";

        var gorillaImg = new Image() ;
        imgCount ++;

        var dragonBigImg = new Image() ;
        imgCount ++;

        var balloonImg = new Image() ;
        imgCount ++;

        var balloonSmallImg = new Image() ;
        imgCount ++;

        var smokeImg = new Image() ;
        imgCount ++;

        gorillaImg.onload = function(){
            checkload();
        };

        dragonBigImg.onload = function(){
            checkload();
        };
        balloonImg.onload = function(){
            checkload();
        };
        balloonSmallImg.onload = function(){
            checkload();
        };
        smokeImg.onload = function(){
            checkload();
        };

        gorillaImg.src = gorillaSpriteSrc;
        dragonBigImg.src = flyBigSpriteSrc;
        balloonImg.src = balloonSrc;
        balloonSmallImg.src = balloonSmallSrc;
        smokeImg.src = smokeSrc;

        imgCount += bgImagesSrc.length;
        var bgImages = [];
        for(var i = 0; i<bgImagesSrc.length; i++){
            bgImages[i] =new Image();
            bgImages[i].onload = function(){
                checkload();
            };
            bgImages[i].src=bgImagesSrc[i];
        };

        IMAGES.BG = bgImages;
        IMAGES.SMOKE = smokeImg;
        IMAGES.BALLOON = balloonImg;
        IMAGES.BALLOON_SMALL = balloonSmallImg;
        IMAGES.DRAGON = dragonBigImg;
        IMAGES.GORILLA = gorillaImg;

    }

    function init(){
        loading('show');
        initDisplay();
        imageload();
    }


    function initDisplay(){

        //브라우져 크기
        wWidth = $(window).width();
        wHeight = $(window).height();

        wRatio = wWidth / wHeight;

        // 화면의 중앙
        centerX = wWidth / 2;
        centerY = wHeight / 2;

        //마우스 이벤트를 위한 변수
        mouseX = centerX;
        mouseY = centerY;

        // 현실배경은 창 크기에 맞춘다
        // 현실배경 이미지의 비율은 2 (1920*960)

        if(wRatio < 2){
            realCanvasHeight = wHeight;
            realCanvasWidth = wHeight * 2;
        } else {
            realCanvasWidth = wWidth;
            realCanvasHeight = wWidth / 2;
        }

        realCenterX = realCanvasWidth / 2;
        realCenterY = realCanvasHeight / 2;
        realTop = (wHeight - realCanvasHeight) / 2;
        realLeft = (wWidth - realCanvasWidth) / 2;

        // 화면에 보여지는 AR영역의 position. Scroll Motion에 사용
        AR_DISPLAY.MAX.WIDTH = realCanvasWidth*2;
        AR_DISPLAY.MAX.HEIGHT = Math.round(AR_DISPLAY.MAX.WIDTH / arCanvasRatio);

        AR_DISPLAY.MIN.WIDTH = realCanvasWidth*0.6;
        AR_DISPLAY.MIN.HEIGHT = Math.round(AR_DISPLAY.MIN.WIDTH / arCanvasRatio);

        SCROLL_MOTION.STEP1.X = realCenterX;
        SCROLL_MOTION.STEP1.Y = realCenterY;
        SCROLL_MOTION.STEP1.WIDTH = AR_DISPLAY.MAX.WIDTH;
        SCROLL_MOTION.STEP1.HEIGHT = AR_DISPLAY.MAX.HEIGHT;

        SCROLL_MOTION.STEP2.X = realCenterX;
        SCROLL_MOTION.STEP2.Y = realCenterY + (realCanvasHeight * 0.05);
        SCROLL_MOTION.STEP2.WIDTH = AR_DISPLAY.MIN.WIDTH;
        SCROLL_MOTION.STEP2.HEIGHT = AR_DISPLAY.MIN.HEIGHT;

        SCROLL_MOTION.STEP3.X = realCenterX;
        SCROLL_MOTION.STEP3.Y = realCanvasHeight - (realCanvasHeight * 0.1) ;
        SCROLL_MOTION.STEP3.WIDTH = AR_DISPLAY.MIN.WIDTH;
        SCROLL_MOTION.STEP3.HEIGHT = AR_DISPLAY.MIN.HEIGHT;

        // Parallex 효과를 위한 pointer 변수
        // canvas-pointer.js
        //var canvaspara  = ge1doot.canvas("mossland-reality");
        // pointer
        //pointer = canvaspara.pointer;

        pointer.x  =  0;
        pointer.y  =  0;
        pointer.cx  =  realCanvasWidth / 2;
        pointer.cy  =  realCanvasHeight / 2;

        // Wrapper Size rest
        $("#loading").css({
            width :     wWidth,
            height :    wHeight
        });

        $("#mossland-reality").css({
            left:       realLeft,
            top:        realTop
        }).attr({
            width :     realCanvasWidth,
            height:     realCanvasHeight
        });

        // $("#motionwrap").css({
        //     "width" : wWidth,
        //     "height" : SCROLL_MOTION.STEP3.SCROLL + wHeight
        // });

        //Animate effect on scroll
        // icoPoint = ( $("#ico").offset().top ) - (wHeight / 2) -100;
        // feature01Point = ( $("#features-01").offset().top ) - (wHeight / 2) -200;
        // feature02Point = ( $("#features-02").offset().top ) - (wHeight / 2) -200;
        // feature03Point = ( $("#features-03").offset().top ) - (wHeight / 2) -200;
        // feature04Point = ( $("#features-04").offset().top ) - (wHeight / 2) -200;
        roadmapPoint = ( $("#roadmap").offset().top ) - (wHeight / 2) -100;
    }

    function mainMotionfire(){

        if(motionOff){
            cancelAnimationFrame(req);
            req = null;
        } else {

            if(!req) req = requestAnimationFrame(run);
        }

    };

    function scrollMotionfire(){


        //if(icofire && !icofireDone && ico_live){
        //    icoprogress();
        //    icofireDone = true;
        //}

        // if(feature01fire){
        //     $("#features-01").addClass('active');
        // }
        //
        // if(feature02fire){
        //     $("#features-02").addClass('active');
        // }
        //
        // if(feature03fire){
        //     $("#features-03").addClass('active');
        // }
        //
        // if(feature04fire){
        //     $("#features-04").addClass('active');
        // }

        if(roadmapFire){
            $("#roadmap").addClass('active');
        }

    };



    function initParallex(){

        // ease pointer
        pointer.cx += (pointer.x - pointer.cx) / 10;
        pointer.cy += (pointer.y - pointer.cy) / 10;
        var rx = -((realCanvasWidth  / 2) - Math.max(15, Math.min(pointer.cx, realCanvasWidth - 15))) / 7;
        var ry = -((realCanvasHeight / 2) - Math.max(0, Math.min(pointer.cy, realCanvasHeight - 5))) / 4.75;

        parallex.x1 = - rx/ (parallex_sen * 10);
        parallex.x2 = - rx/ (parallex_sen * 6);
        parallex.x3 = - rx/ (parallex_sen * 3);
        parallex.x4 = - rx/ (parallex_sen * 1);


        parallex.y1 = ry/ (parallex_sen * 10);
        parallex.y2 = ry/ (parallex_sen * 6);
        parallex.y3 = ry/ (parallex_sen * 3);
        parallex.y4 = ry/ (parallex_sen * 1);
    }


    function initParallex2(){

        // ease pointer
        pointer.cx += (pointer.x - pointer.cx) / 10;
        pointer.cy += (pointer.y - pointer.cy) / 10;
        var rx = -((realCanvasWidth  / 2) - Math.max(15, Math.min(pointer.cx, realCanvasWidth - 15))) / 7;
        var ry = -((realCanvasHeight / 2) - Math.max(0, Math.min(pointer.cy, realCanvasHeight - 5))) / 4.75;

        parallex.x1 = - rx/ (parallex_sen * 10);
        parallex.x2 = - rx/ (parallex_sen * 6);
        parallex.x3 = - rx/ (parallex_sen * 3);
        parallex.x4 = - rx/ (parallex_sen * 1);


        parallex.y1 = ry/ (parallex_sen * 10);
        parallex.y2 = ry/ (parallex_sen * 6);
        parallex.y3 = ry/ (parallex_sen * 3);
        parallex.y4 = ry/ (parallex_sen * 1);
    }

    // main loop
    function run() {

        // request next frame
        req = requestAnimationFrame(run);
        // clear screen
        // arctx.clearRect(0, 0, wWidth, wHeight);
        var scrollTop = $(document).scrollTop();

        initObjectFrameRate();
        initParallex();
        drawReal();
        drawAR();
        motionAR(scrollTop);
    }

// Motion AR image
    function motionAR(scrollTop){

        var t = scrollTop / SCROLL_MOTION.STEP3.SCROLL;
        if(t > 1){
            t = 1;
        };

        var cx = 3 * (SCROLL_MOTION.STEP2.X - SCROLL_MOTION.STEP1.X);
        var ax = SCROLL_MOTION.STEP3.X - SCROLL_MOTION.STEP1.X - cx  ;

        var cy = 3 * (SCROLL_MOTION.STEP2.Y - SCROLL_MOTION.STEP1.Y);
        var ay = SCROLL_MOTION.STEP3.Y - SCROLL_MOTION.STEP1.Y - cy ;

        var xt = ax*(t*t) + cx*t + SCROLL_MOTION.STEP1.X;
        var yt = ay*(t*t) + cy*t + SCROLL_MOTION.STEP1.Y;

        var cw = 3 * (SCROLL_MOTION.STEP2.WIDTH - SCROLL_MOTION.STEP1.WIDTH);
        var aw = SCROLL_MOTION.STEP3.WIDTH - SCROLL_MOTION.STEP1.WIDTH - cw  ;

        var ch = 3 * (SCROLL_MOTION.STEP2.HEIGHT - SCROLL_MOTION.STEP1.HEIGHT);
        var ah = SCROLL_MOTION.STEP3.HEIGHT - SCROLL_MOTION.STEP1.HEIGHT - ch;

        var wt = aw*(t*t) + cw*t + SCROLL_MOTION.STEP1.WIDTH;
        var ht = ah*(t*t) + ch*t + SCROLL_MOTION.STEP1.HEIGHT;

        var xt = xt - (wt/2);
        var yt = yt - (ht/2);

        // realctx.drawImage($('#mossland-ar')[0],xt,yt,wt,ht);

    }


    function initObjectFrameRate(){

        var now = Date.now();
        var delta = now - then;

        if (delta > interval) {

            then = now - (delta % interval);

            PROP.GORILLA.FRAME_COUNT ++
            PROP.DRAGON.FRAME_COUNT ++

            if( PROP.GORILLA.FRAME_COUNT > PROP.GORILLA.FRAME-1 ){
                PROP.GORILLA.FRAME_COUNT = 0;
            }

            if( PROP.DRAGON.FRAME_COUNT > PROP.DRAGON.FRAME-1 ){
                PROP.DRAGON.FRAME_COUNT = 0;
            }
        }
    }

    function initObjectFrameRate_2(){

        PROP.GORILLA.FRAME_COUNT ++;
        PROP.DRAGON.FRAME_COUNT ++;

        if( PROP.GORILLA.FRAME_COUNT > PROP.GORILLA.FRAME-1 ){
            PROP.GORILLA.FRAME_COUNT = 0;
        }

        if( PROP.DRAGON.FRAME_COUNT > PROP.DRAGON.FRAME-1 ){
            PROP.DRAGON.FRAME_COUNT = 0;
        }

    }

    function showCp(){

        if(df){
            // $('.motion-logo, .motion-title').addClass('active')
            $('.scrolldown').addClass('hidden');
        } else {
            // $('.motion-logo, .motion-title').removeClass('active')
            $('.scrolldown').removeClass('hidden');
        }
    }

    function animateGorilla(){

        var dx = PROP.GORILLA.FRAME_COUNT*PROP.GORILLA.DW;
        // arctx.drawImage(
        //     IMAGES.GORILLA,
        //     dx,
        //     PROP.GORILLA.DY,
        //     PROP.GORILLA.DW,
        //     PROP.GORILLA.DH,
        //     PROP.GORILLA.X + parallex.x2,
        //     PROP.GORILLA.Y + parallex.y2,
        //     PROP.GORILLA.WIDTH,
        //     PROP.GORILLA.HEIGHT
        // );
    }


    function animateDragonBig(){

        var t = PROP.DRAGON.player.t;

        var xt = PROP.DRAGON.AX*(t*t*t) + PROP.DRAGON.BX*(t*t) + PROP.DRAGON.CX*t + PROP.DRAGON.p0.x;
        var yt = PROP.DRAGON.AY*(t*t*t) + PROP.DRAGON.BY*(t*t) + PROP.DRAGON.CY*t + PROP.DRAGON.p0.y;

        PROP.DRAGON.player.t += PROP.DRAGON.player.speed;

        if (PROP.DRAGON.player.t > 1) {
            PROP.DRAGON.player.t = 0;
        }

        PROP.DRAGON.player.x = xt-PROP.DRAGON.WIDTH/2;
        PROP.DRAGON.player.y = yt-PROP.DRAGON.HEIGHT/2;

        var x = PROP.DRAGON.player.x+parallex.x3;
        var y = PROP.DRAGON.player.y+parallex.y3;

        // arctx.drawImage(
        //     IMAGES.DRAGON,
        //     PROP.DRAGON.FRAME_COUNT * PROP.DRAGON.WIDTH,
        //     PROP.DRAGON.DY,
        //     PROP.DRAGON.DW,
        //     PROP.DRAGON.DH,
        //     x,
        //     y,
        //     PROP.DRAGON.WIDTH,
        //     PROP.DRAGON.HEIGHT
        // );

    }

    function _animate_typeb(_key,_imgname,_parallex_level){

        var t = PROP[_key].player.t;
        var xt = PROP[_key].AX*(t*t) + PROP[_key].CX*t + PROP[_key].p0.x;
        var yt = PROP[_key].AY*(t*t) + PROP[_key].CY*t + PROP[_key].p0.y;

        PROP[_key].player.t += PROP[_key].player.speed;

        if (PROP[_key].player.t > 1) {
            PROP[_key].player.t = 0;
        }

        PROP[_key].player.x = xt-PROP[_key].WIDTH/2;
        PROP[_key].player.y = yt-PROP[_key].HEIGHT/2;

        if(_parallex_level === 1){
            var px = 'x1';
            var py = 'y1';
        } else if(_parallex_level === 2){
            var px = 'x2';
            var py = 'y2';
        } else if(_parallex_level === 3){
            var px = 'x3';
            var py = 'y3';
        } else if(_parallex_level === 4){
            var px = 'x4';
            var py = 'y4';
        }

        var x =          PROP[_key].player.x+parallex[px];
        var y =          PROP[_key].player.y+parallex[py];


        // arctx.drawImage(_imgname,x,y,PROP[_key].WIDTH,PROP[_key].HEIGHT);

    }

    function animateBalloon(){
        _animate_typeb('BALLOON',IMAGES.BALLOON,1);
    }

    function animateBalloonSmall(){

        _animate_typeb('BALLOON_SMALL',IMAGES.BALLOON_SMALL,1);

    }
    function animateSmoke(){
        _animate_typeb('SMOKE',IMAGES.SMOKE,3);
    }

    // AR 그리기
    function drawAR() {

        // arctx.clearRect(0,0,arCanvasWidth,arCanvasHeight);
        // arctx.drawImage(IMAGES.BG[4],arImgX + parallex.x1,arImgY,arImgWidth,arImgHeight);
        animateBalloon();
        animateBalloonSmall();

        // arctx.drawImage(IMAGES.BG[3],arImgX +parallex.x2,arImgY,arImgWidth,arImgHeight);
        animateGorilla();
        animateDragonBig();
        // arctx.drawImage(IMAGES.BG[2],arImgX + parallex.x3,arImgY,arImgWidth,arImgHeight);

        animateSmoke();


        // arctx.drawImage(IMAGES.BG[1],arImgX + parallex.x2, arImgY,arImgWidth,arImgHeight);

        // Device Frame을 가장 나중에 그린다
        // arctx.drawImage(IMAGES.BG[0],0,0,arCanvasWidth,arCanvasHeight);

    }

    // Reality Background 그리기
    function drawReal(){
        var rImgWidth = arParallexMargin * realCanvasWidth;
        var rImgHeight = arParallexMargin * realCanvasHeight;

        var rImgX = (realCanvasWidth - rImgWidth) / 2 ;
        var rImgY = (realCanvasHeight - rImgHeight) / 2;

        // realctx.drawImage(IMAGES.BG[8],rImgX + parallex.x1,rImgY + parallex.y1,rImgWidth,rImgHeight);
        // realctx.drawImage(IMAGES.BG[7],rImgX + parallex.x2,rImgY + parallex.y2,rImgWidth,rImgHeight);
        // realctx.drawImage(IMAGES.BG[6],rImgX + parallex.x3,rImgY + parallex.y3,rImgWidth,rImgHeight);
        // realctx.drawImage(IMAGES.BG[5],rImgX + parallex.x4,rImgY + parallex.y4,rImgWidth,rImgHeight);
    };

    function checkload(){
        imgLoadCount ++;
        if( imgCount == imgLoadCount ){
            titleMotionBinding();
            loading('hide');
            firstMotionFire();
            run();
        }
    }
    function loading(_state){
        if(_state =="show"){
            $("#loading").addClass("active");
        } else if(_state =="hide"){
            $("#loading").removeClass("active");
        }
    }

    /*
    Event
     */

    function firstMotionFire(){

        // $('.motion').css('opacity',1);

    };

    function titleMotionBinding(){
        $(window).scroll(function() {

            var scrollTop = $(window).scrollTop();

            if (scrollTop > SCROLL_MOTION.STEP1.SCROLL - 500) {
                df = true;
                showCp();
            } else {
                df = false;
                showCp();
            };
        })
    }

    // $('.motion').on('mousemove',function(e){
    //     pointer.x = e.clientX;
    //     pointer.y = e.clientY;
    // });


    $(window).resize(function(){
        initDisplay();
    });

    //$(window).on('mousewheel',function(e){
    //
    //    e.preventDefault();
    //
    //    var deltaY = e.originalEvent.deltaY;
    //
    //    if(deltaY < 0){
    //        deltaY -= 400;
    //    }else {
    //        deltaY += 400;
    //    };
    //
    //    setTimeout(function(){
    //        $('html, body').stop(true,false).animate({
    //            scrollTop : $(window).scrollTop()+deltaY
    //        },400,'easeOutQuad')
    //    },100)
    //
    //});


    $(window).scroll(function(){

        var scrollTop = $(window).scrollTop();
        if( scrollTop > SCROLL_MOTION.STEP3.SCROLL ) {
            $("#loading").css({
                "position" : "absolute",
                "bottom" : "0"
            });
        } else {
            $("#loading").css({
                "position" : "fixed",
                "bottom" : "0"
            });
        }

        if( scrollTop > 250) {
            $(".main-header").addClass('active');
            $("#burger").css({
              "color": "#2bd8ca",
            });

        } else {

            // 메인모션을 활성화한다
            $(".main-header").removeClass('active');
            $("#burger").css({
              "color": "white",
            });
        }

        // 스크롤이 모션영역을 지났을때
        if( scrollTop > wHeight) {
            // 메인모션을 정지한다
            motionOff = true;
            mainMotionfire();
            if( scrollTop > $('#tail').offset().top-250){
                $("#event").removeClass('active');
            } else {
                $("#event").addClass('active');
            }

            if(view_notice){
                $('#notice').addClass('active');

                setTimeout(function(){
                    $('#notice .notice-con').addClass('active');
                },200)
            }

        } else {

            // 메인모션을 활성화한다
            motionOff = false;
            mainMotionfire();
            $("#event").removeClass('active');


            $('#notice').removeClass('active');
            $('#notice .notice-con').removeClass('active');
        }

        if(scrollTop > icoPoint) {
            icofire = true;
        }

        if(scrollTop > feature01Point) {
            feature01fire = true;
        }

        if(scrollTop > feature02Point) {
            feature02fire = true;
        }

        if(scrollTop > feature03Point) {
            feature03fire = true;
        }

        if(scrollTop > feature04Point) {
            feature04fire = true;
        }

        if(scrollTop > roadmapPoint) {
            roadmapFire = true;
        }

        scrollMotionfire();

    });
  init()
});

var moss_lite = function(){

    // $("#motionwrap").remove();
    // $(".maintop").show();

    // if(view_notice){
    //     $('#notice').addClass('active');
    // } else {
    //     $('#notice').removeClass('active');
    // }

    // $(".main-header,#main").addClass("mobile");

    // $(".main-header nav").addClass("mobile");
    var wHeight = $(window).height();

    //Animate effect on scroll
    // var icopoint = ( $("#ico").offset().top ) - (wHeight / 2) -100;
    //var feature01Point = ( $("#features-01").offset().top ) - (wHeight / 2) -200;
    //var feature02Point = ( $("#features-02").offset().top ) - (wHeight / 2) -200;
    //var feature03Point = ( $("#features-03").offset().top ) - (wHeight / 2) -200;
    //var feature04Point = ( $("#features-04").offset().top ) - (wHeight / 2) -200;
    var roadmapPoint = ( $("#roadmap").offset().top ) - (wHeight / 2) -100;

    var feature01fire,feature02fire,feature03fire,feature04fire,roadmapFire,icofire,icofireDone;

    function scrollMotionfireLite(){

        //if(icofire && !icofireDone && ico_live){
        //    icoprogress();
        //}

        // if(feature01fire){
        //     $("#features-01").addClass('active');
        // } else {
        //     $("#features-01").removeClass('active');
        // }
        //
        // if(feature02fire){
        //     $("#features-02").addClass('active');
        // } else {
        //     $("#features-02").removeClass('active');
        // }
        //
        // if(feature03fire){
        //     $("#features-03").addClass('active');
        // } else {
        //     $("#features-03").removeClass('active');
        // }
        //
        // if(feature04fire){
        //     $("#features-04").addClass('active');
        // } else {
        //     $("#features-04").removeClass('active');
        // }

        if(roadmapFire){
            $("#roadmap").addClass('active');
        } else {
            $("#roadmap").removeClass('active');
        }

    };

    $(window).on("scroll load", function(){

        var scrollTop = $(window).scrollTop();

        if(scrollTop > 200){
            if( scrollTop > $('#tail').offset().top - 800){
                $("#event-mobile").removeClass('active');
                $(".main-header").removeClass('active');
                $('#notice').removeClass('active');
            } else {
                $("#event-mobile").addClass('active');
                $(".main-header").addClass('active');
                $('#notice').addClass('active');
                 setTimeout(function(){
                    $('#notice .notice-con').addClass('active');
                },200)
            }
        } else {
            $("#event-mobile").removeClass('active');
            $('#notice').removeClass('active');
            $(".main-header").removeClass('active');
        }


        // if(scrollTop > icopoint) {
        //     icofire = true;
        // }

        // if(scrollTop > feature01Point) {
        //     feature01fire = true;
        // }

        // if(scrollTop > feature02Point) {
        //     feature02fire = true;
        // }

        // if(scrollTop > feature03Point) {
        //     feature03fire = true;
        // }

        // if(scrollTop > feature04Point) {
        //     feature04fire = true;
        // }

        if(scrollTop > roadmapPoint) {
            roadmapFire = true;
        }

        scrollMotionfireLite();

    });


};

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    moss_lite();
} else {
    moss();
}
