
MOSSCONFIG = {

    //브라우져 크기
    wWidth :null,
    wHeight : null,
    
    // 화면의 중앙
    centerX : 0,
    centerY : 0,
    
    shiftX : 0,
    shiftY : 0,

    // 화면에 보여줄 AR Canvas 이미지 크기
    // Device Frame 이미지비율에 맞춘다
    // var arCanvasWidth = 1920;
    // var arCanvasHeight = 965;
    arCanvasWidth : 2304,
    arCanvasHeight : 1134,
    arTop : 0,
    arLeft : 0,
    
    //현실배경은 창 크기에 맞춘다
    realCanvasWidth : 0,
    realCanvasHeight : 0,
    realTop : 0,
    realLeft : 0,

    //Object의 Frame rate 조절
    FPS : 24,
    NOW : null,
    THEN : Date.now(),
    INTERVAL : 1000/ this.FPS,
    DELTA : null,

    df : false,

    // AR 이미지의 에니메이션을 위한 스크롤 단계 값
    FRAMESTEP : [3000,4000,4600],

    // AR 캔버스처음 보여줄 배율
    FIRST_MAG : 2,
    // 가장 확대되었을때 배율
    FULL_MAG : 1,
    // 가장 축소되었을때 배율
    MIN_MAG : 0.6,

    PARALLEX : {

        MARGIN : 1.05,

        X1 : 0,
        X2 : 0,
        X3 : 0,
        X4 : 0,

        Y1 : 0,
        Y2 : 0,
        Y3 : 0,
        Y4 : 0
    },

    CTX : {
        AR : document.getElementById("mossland-ar").getContext("2d"),
        REAL : document.getElementById("mossland-reality").getContext("2d")
    },
    
    // AR 이미지가 이동한 마지막 값
    LAST : {
        scrollMag : null,
        arImgY : null,
        moveArImgY : null
    },

    IMAGE : {
        GORILLA: null,
        DRAGON: null,
        BG: [],
        SRC: {
            BG: [
                "img/main/device_b.png",    //device frame
                "img/main/r00.png",         //Reality bg
                "img/main/r01.png",         //Reality bg
                "img/main/r02.png",         //Reality bg
                "img/main/r03.jpg",         //Reality bg
                "img/main/m00.png",         //AR bg
                "img/main/m01.png",         //AR bg
                "img/main/m02.png",         //AR bg
                "img/main/m03.jpg"          //AR bg
            ],
            GORILLA: "img/main/object/gorilla_sprite_800_compressed.png", //sprite img
            DRAGON: "img/main/object/dragon_big_sprite_1024_compressed.png"
        }
    },

    // requestAnimationFrame 객체
    REQ : null,

    ANIMATE :  {
        GORILLA : {
            FRAME : 25,
            COUNT: 0
        },
        DRAGON : {
            FRAME : 30,
            COUNT : 0,
            OPT : {
                P0 : {X:300, Y:200},
                P1 : {X:500, Y:100},
                P2 : {X:1200, Y:300},
                P3 : {X:1900, Y:100},
                PLAYER : {X:0, Y:0, SPEED:.001, T:0},
            },
            WIDTH : 1024,
            HEIGHT: 1024
        }
    }

};


MOSSLAND = function(){


    var MOSS = this;

    this.GORILLA_COUNT = 0;
    this.DRAGON_COUNT = 0;

    this.IMAGE_INIT = function(){

        var gorillaImg = new Image();
        gorillaImg.src =  MOSSCONFIG.IMAGE.SRC.GORILLA;

        var dragonImg = new Image();
        dragonImg.src =  MOSSCONFIG.IMAGE.SRC.DRAGON;

        var bgimg = [];
        for(var i = 0; i<MOSSCONFIG.IMAGE.SRC.BG.length; i++){
            bgimg[i] =new Image();
            bgimg[i].src=MOSSCONFIG.IMAGE.SRC.BG[i];
        };

        MOSSCONFIG.IMAGE.GORILLA = gorillaImg;
        MOSSCONFIG.IMAGE.DRAGON = dragonImg;
        MOSSCONFIG.IMAGE.BG = bgimg;

    };


    this.ANIMATE_GORILLA = function(){


        var gorillaX =          960+MOSSCONFIG.PARALLEX.X2;
        var gorillaY =          400+MOSSCONFIG.PARALLEX.Y2;
        var gorillaWidth =      385;
        var gorillaHeight =     385;
        var gorillaDx =         MOSSCONFIG.ANIMATE.GORILLA.FRAME*800;
        var gorillaDY =         0;
        var gorillaDw =         800;
        var gorillaDh =         800;

        MOSSCONFIG.CTX.AR.drawImage(
            MOSSCONFIG.IMAGE.GORILLA,
            gorillaDx,
            gorillaDY,
            gorillaDw,
            gorillaDh,
            gorillaX,
            gorillaY,
            gorillaWidth,
            gorillaHeight
        );


    };



    this.ANIMATE_DRAGON = function(){


        var t = MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.T;

        var cx = 3 * (MOSSCONFIG.ANIMATE.DRAGON.OPT.P1.X - MOSSCONFIG.ANIMATE.DRAGON.OPT.P0.X)
        var bx = 3 * (MOSSCONFIG.ANIMATE.DRAGON.OPT.P2.X - MOSSCONFIG.ANIMATE.DRAGON.OPT.P1.X) - cx;
        var ax = MOSSCONFIG.ANIMATE.DRAGON.OPT.P3.X - MOSSCONFIG.ANIMATE.DRAGON.OPT.P0.X - cx - bx;

        var cy = 3 * (MOSSCONFIG.ANIMATE.DRAGON.OPT.P1.Y - MOSSCONFIG.ANIMATE.DRAGON.OPT.P0.Y);
        var by = 3 * (MOSSCONFIG.ANIMATE.DRAGON.OPT.P2.Y - MOSSCONFIG.ANIMATE.DRAGON.OPT.P1.Y) - cy;
        var ay = MOSSCONFIG.ANIMATE.DRAGON.OPT.P3.Y - MOSSCONFIG.ANIMATE.DRAGON.OPT.P0.Y - cy - by;

        var xt = ax*(t*t*t) + bx*(t*t) + cx*t + MOSSCONFIG.ANIMATE.DRAGON.OPT.P0.X;
        var yt = ay*(t*t*t) + by*(t*t) + cy*t + MOSSCONFIG.ANIMATE.DRAGON.OPT.P0.Y;

        MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.T += MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.SPEED;

        if (MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.T > 1) {
            MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.T = 0;
        }

        MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.X = xt-MOSSCONFIG.ANIMATE.DRAGON.WIDTH/2;
        MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.Y = yt-MOSSCONFIG.ANIMATE.DRAGON.HEIGHT/2;

        var dragonBigX =          MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.X+MOSSCONFIG.PARALLEX.X3;
        var dragonBigY =          MOSSCONFIG.ANIMATE.DRAGON.OPT.PLAYER.Y+MOSSCONFIG.PARALLEX.Y3;
        var dragonBigDx =         MOSSCONFIG.ANIMATE.DRAGON.COUNT*MOSSCONFIG.ANIMATE.DRAGON.WIDTH;
        var dragonBigDY =         0;
        var dragonBigDw =         MOSSCONFIG.ANIMATE.DRAGON.WIDTH;
        var dragonBigDh =         MOSSCONFIG.ANIMATE.DRAGON.HEIGHT;


        MOSSCONFIG.CTX.AR.drawImage(MOSSCONFIG.IMAGE.DRAGON,dragonBigDx,dragonBigDY,dragonBigDw,dragonBigDh,dragonBigX,dragonBigY,MOSSCONFIG.ANIMATE.DRAGON.WIDTH,MOSSCONFIG.ANIMATE.DRAGON.HEIGHT);

    };

    this.displayinit = function(){

        //브라우져 크기
        MOSSCONFIG.wWidth = $(window).width();
        MOSSCONFIG.wHeight = $(window).height();

        // 화면의 중앙
        MOSSCONFIG.centerX = MOSSCONFIG.wWidth / 2;
        MOSSCONFIG.centerY = MOSSCONFIG.wHeight / 2;

        //현실배경은 창 크기에 맞춘다
        MOSSCONFIG.realCanvasWidth = MOSSCONFIG.wWidth;
        MOSSCONFIG.realCanvasHeight = MOSSCONFIG.wHeight;
        MOSSCONFIG.realTop = 0;
        MOSSCONFIG.realLeft = 0;

        // Wrapper Size rest
        $(".motion, #loading").css({
            width :     MOSSCONFIG.wWidth,
            height :    MOSSCONFIG.wHeight
        });

        $("#mossland-ar").css({
            left:       MOSSCONFIG.arLeft,
            top:        MOSSCONFIG.arTop
        }).attr({
            width :     MOSSCONFIG.arCanvasWidth,
            height:     MOSSCONFIG.arCanvasHeight
        });

        $("#mossland-reality").css({
            left:       MOSSCONFIG.realLeft,
            top:        MOSSCONFIG.realTop
        }).attr({
            width :     MOSSCONFIG.realCanvasWidth,
            height:     MOSSCONFIG.realCanvasHeight
        });

        $("#mossland-reality").css({
            left:       MOSSCONFIG.realLeft,
            top:        MOSSCONFIG.realTop
        }).attr({
            width :     MOSSCONFIG.realCanvasWidth,
            height:     MOSSCONFIG.realCanvasHeight
        });

        $("#motionwrap").css({
            "width" : self.wWidth,
            "height" : MOSSCONFIG.FRAMESTEP[2] + MOSSCONFIG.wHeight
        });

    };



    this.loading = function(_state){

        if(_state =="show"){
            $("#loading").addClass("active");
        } else if(_state =="hide"){
            $("#loading").removeClass("active");
        }
    };


    this.RUN =  function(){
        var scrollTop = $(window).scrollTop();

        // request next frame
        MOSSCONFIG.REQ = requestAnimationFrame(this.RUN);
        // clear screen
        MOSSCONFIG.CTX.AR.clearRect(0, 0, MOSSCONFIG.wWidth, MOSSCONFIG.wHeight);
        MOSSCONFIG.CTX.REAL.clearRect(0, 0, MOSSCONFIG.wWidth, MOSSCONFIG.wHeight);

        this.initObjectFrameRate();

        this.drawReal();
        this.drawAR();
        this.controlAR(scrollTop);

    };

    this.controlAR = function(scrollTop){


        // 스크롤 위치에 따른 화면 배율
        var scrollMag = ( MOSSCONFIG.FIRST_MAG - ( scrollTop * ( (MOSSCONFIG.FIRST_MAG - MOSSCONFIG.FULL_MAG) / MOSSCONFIG.FRAMESTEP[0] ) ) );

        // 화면에 꽉차는 크기
        if(scrollTop < MOSSCONFIG.FRAMESTEP[1]){

            MOSSCONFIG.LAST.scrollMag = scrollMag;

            var arImgWidth =  MOSSCONFIG.arCanvasWidth * scrollMag;
            var arImgHeight =  MOSSCONFIG.arCanvasHeight * scrollMag;

            var arImgX = ( MOSSCONFIG.realCanvasWidth - arImgWidth ) / 2;
            var arImgY = (MOSSCONFIG.realCanvasHeight - arImgHeight ) / 2;

            MOSSCONFIG.LAST.arImgX = arImgX;
            MOSSCONFIG.LAST.arImgY = arImgY;
            MOSSCONFIG.LAST.temp = arImgY;

            //크기를 고정하고 이동
        } else if(scrollTop < MOSSCONFIG.FRAMESTEP[2]){

            //크기를 고정한다
            var arImgWidth = MOSSCONFIG.arCanvasWidth * scrollMag;
            var arImgHeight = MOSSCONFIG.arCanvasHeight * scrollMag;
            var arImgX = (MOSSCONFIG.realCanvasWidth - arImgWidth ) / 2;

            var arImgY = ( (scrollTop - MOSSCONFIG.FRAMESTEP[1]) ) + MOSSCONFIG.LAST.temp;



            MOSSCONFIG.LAST.arImgX = arImgX;
            MOSSCONFIG.LAST.arImgY = arImgY;

        } else {

            var arImgWidth = MOSSCONFIG.arCanvasWidth * scrollMag;
            var arImgHeight = MOSSCONFIG.arCanvasHeight * scrollMag;

            var arImgX = (MOSSCONFIG.realCanvasWidth - arImgWidth ) / 2;
            var arImgY = MOSSCONFIG.LAST.arImgY;

            MOSSCONFIG.LAST.temp = arImgY;
        }



        //Reality CTX에 그리기
        MOSSCONFIG.CTX.REAL.drawImage($('#mossland-ar')[0],arImgX,arImgY,arImgWidth,arImgHeight);


    };

    this.initObjectFrameRate = function(){
        var now = Date.now();
        var delta = now - MOSSCONFIG.then;

        if (delta >  MOSSCONFIG.interval) {

            MOSSCONFIG.then = now - (delta % MOSSCONFIG.interval);

            this.GORILLA_COUNT ++
            this.DRAGON_COUNT ++

            if( this.GORILLA_COUNT > MOSSCONFIG.ANIMATE.GORILLA.frame-1 ){
                this.GORILLA_COUNT = 0;
            }

            if( this.DRAGON_COUNT > MOSSCONFIG.ANIMATE.DRAGON.frame-1 ){
                this.DRAGON_COUNT = 0;
            }

        }
    };

    this.showCp = function(){
        if(MOSSCONFIG.df){
            $('.motion-logo').addClass('active')
            $('.motion-title').addClass('active')
        } else {
            $('.motion-logo').removeClass('active')
            $('.motion-title').removeClass('active')
        }
    };

    this.drawAR = function(){

        var arImgWidth = 2172;
        var arImgHeight = 1086;
        var arImgX = (MOSSCONFIG.arCanvasWidth - arImgWidth) / 2 ;
        var arImgY = (MOSSCONFIG.arCanvasHeight - arImgHeight) / 2;

        MOSSCONFIG.CTX.AR.drawImage(MOSSCONFIG.IMAGE.BG[4],arImgX + MOSSCONFIG.PARALLEX.X1,arImgY,arImgWidth,arImgHeight);
        // ANIMATEDragon();
        MOSSCONFIG.CTX.AR.drawImage(MOSSCONFIG.IMAGE.BG[3],arImgX +MOSSCONFIG.PARALLEX.X2,arImgY,arImgWidth,arImgHeight);
        this.ANIMATE_GORILLA();
        this.ANIMATE_DRAGON();

        MOSSCONFIG.CTX.AR.drawImage(MOSSCONFIG.IMAGE.BG[2],arImgX + MOSSCONFIG.PARALLEX.X3,arImgY,arImgWidth,arImgHeight);

        MOSSCONFIG.CTX.AR.drawImage(MOSSCONFIG.IMAGE.BG[1],arImgX + MOSSCONFIG.PARALLEX.X4,arImgY,arImgWidth,arImgHeight);

        // Device Frame을 가장 나중에 그린다
        MOSSCONFIG.CTX.AR.drawImage(MOSSCONFIG.IMAGE.BG[0],MOSSCONFIG.PARALLEX.X1,MOSSCONFIG.PARALLEX.Y1,MOSSCONFIG.arCanvasWidth,MOSSCONFIG.arCanvasHeight);

    };



    this.drawReal = function(){

        var rImgWidth = MOSSCONFIG.PARALLEX.MARGIN *MOSSCONFIG.realCanvasWidth;
        var rImgHeight = MOSSCONFIG.PARALLEX.MARGIN *MOSSCONFIG.realCanvasHeight;

        var rImgX = (MOSSCONFIG.realCanvasWidth - rImgWidth) / 2 ;
        var rImgY = (MOSSCONFIG.realCanvasHeight - rImgHeight) / 2;

        MOSSCONFIG.CTX.REAL.drawImage(MOSSCONFIG.IMAGE.BG[8],rImgX + MOSSCONFIG.PARALLEX.X1,rImgY + MOSSCONFIG.PARALLEX.Y1,rImgWidth,rImgHeight);
        MOSSCONFIG.CTX.REAL.drawImage(MOSSCONFIG.IMAGE.BG[7],rImgX + MOSSCONFIG.PARALLEX.X2,rImgY + MOSSCONFIG.PARALLEX.Y2,rImgWidth,rImgHeight);
        MOSSCONFIG.CTX.REAL.drawImage(MOSSCONFIG.IMAGE.BG[6],rImgX + MOSSCONFIG.PARALLEX.X3,rImgY + MOSSCONFIG.PARALLEX.Y3,rImgWidth,rImgHeight);
        MOSSCONFIG.CTX.REAL.drawImage(MOSSCONFIG.IMAGE.BG[5],rImgX + MOSSCONFIG.PARALLEX.X4,rImgY + MOSSCONFIG.PARALLEX.Y4,rImgWidth,rImgHeight);



    };

    this.EVENT =  function(){

        $(window).scroll(function(){

            var scrollTop = $(window).scrollTop();
            if( scrollTop > MOSSCONFIG.FRAMESTEP[2] ) {
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

            if( scrollTop > MOSSCONFIG.FRAMESTEP[2]+MOSSCONFIG.wHeight) {
                $(".main-header").addClass('active')
            } else {
                $(".main-header").removeClass('active')
            }



            if(scrollTop > MOSSCONFIG.FRAMESTEP[1]){
                MOSSCONFIG.df = true;
                self.showCp();
            } else {
                MOSSCONFIG.df = false;
                self.showCp();
            };
        });

        //마우스 이벤트
        $("#mossland-reality").mousemove(function(e) {



            var mouseX = e.pageX - $(this).offset().left;
            var mouseY = e.pageY - $(this).offset().top;



            var shiftX = MOSSCONFIG.centerX - mouseX;
            var shiftY = MOSSCONFIG.centerY - mouseY;



            //시점이동값 x1이 가장 뒤에있는 층
            MOSSCONFIG.PARALLEX.X1 = shiftX/250;
            MOSSCONFIG.PARALLEX.X2 = shiftX/170;
            MOSSCONFIG.PARALLEX.X3 = shiftX/100;
            MOSSCONFIG.PARALLEX.X4 = shiftX/50;

            MOSSCONFIG.PARALLEX.Y1 = shiftY/250;
            MOSSCONFIG.PARALLEX.Y2 = shiftY/200;
            MOSSCONFIG.PARALLEX.Y3 = shiftY/150;
            MOSSCONFIG.PARALLEX.Y4 = shiftY/100;
        });

    };

    this.init = function(){

        this.displayinit();

        this.IMAGE_INIT();
        this.EVENT();
        this.RUN();

    };


    this.init();

}();









