

! function () {

    "use strict";

    //Init
    var wWidth = $(window).width();
    var wHeight = $(window).height();

    // 화면에 보여줄 AR Canvas 이미지 크기
    // 16:9 원본비율을 유지하여 브라우져의 높이에 맞춘다.
    var arCanvasWidth = wHeight * 1.777;
    var arCanvasHeight = wHeight;
    var arTop = 0;
    var arLeft = (wWidth-arCanvasWidth)/2;

    // AR 이미지가 Full로 보이는 스크롤 위치
    var arFullScrollTop = 4000;

    // AR 이미지가 하단으로 이동하게되는 스크롤위치
    var arMoveScrollTop = 10000;

    // 처음 보여줄 배율
    var arFirstMag = 2;

    // 가장 확대되었을때 배율
    var arFullMag = 1;

    // 가장 축소되었을때 배율
    var arMinMag = 0.6;

    var gorillaFrame = 0;


    //Parallex를 위한 마진비율
    var arParallexMargin = 1.1;

    $('.motion').css({
        width : wWidth,
        height : wHeight
    });

    $("#mossland-ar").css({
        left: arLeft
    }).attr({
        width : arCanvasWidth,
        height:arCanvasHeight
    });


    // main loop
    function run() {
        // request next frame
        requestAnimationFrame(run);
        // clear screen
        arctx.clearRect(0, 0, wWidth, wHeight);
        var scrollTop = $(document).scrollTop();
        console.warn('Scrolltop : ',scrollTop);
        drawReal(scrollTop);
        drawAR(scrollTop);
        // drawObject(scrollTop);

    }


    // Object 그리기
    function drawObject(scrollTop){

        if((gorillaImages[gorillaFrame])){
            var src = gorillaImages[gorillaFrame];
            gorillaFrame ++
        } else {
            var src = gorillaImages[0];
            gorillaFrame  =0
        }

        arctx.drawImage(src,300,500);

        var imageData = arctx.getImageData(300, 500, 640, 480);
        var data = imageData.data;
        var start = {
            red: data[0],
            green: data[1],
            blue: data[2]
        };
        // iterate over all pixels
        var tolerance = 150;
        for(var i = 0, n = data.length; i < n; i += 4) {
            var diff = Math.abs(data[i] - data[0]) + Math.abs(data[i+1] - data[1]) + Math.abs(data[i+2] - data[2]);
            if(diff < tolerance) {
                data[i + 3] = 0;
            }
        }
        arctx.putImageData(imageData, 300, 500);


    }


    // AR 그리기
    function drawAR(scrollTop){

        // var arImgWidth = arFirstMag * arParallexMargin * arCanvasWidth;
        // var arImgHeight = arFirstMag * arParallexMargin * arCanvasHeight;

        var center = [arCanvasWidth / 2, arCanvasHeight / 2];

        //Animation 구간

        //화면에 꽉차게 확대
        if(scrollTop < arFullScrollTop){

            // 스크롤 위치에 따른 화면 배율
            var scrollMag = ( arFirstMag - ( scrollTop * ( (arFirstMag - arFullMag) / arFullScrollTop ) ) );

            var arImgWidth =  arCanvasWidth * scrollMag;
            var arImgHeight =  arCanvasHeight * scrollMag;

            var arImgX = ( arCanvasWidth - arImgWidth ) / 2;
            var arImgY = ( arCanvasHeight - arImgHeight ) / 2;

        //멈춤
        // } else if( scrollTop < 2500 ) {
        //
        //     var scrollTop = arFullScrollTop;
        //
        //     // 스크롤 위치에 따른 화면 배율
        //     var scrollMag = (arFirstMag - (scrollTop * ((arFirstMag - arFullMag) / arFullScrollTop)));
        //
        //     var arImgWidth = arCanvasWidth * scrollMag;
        //     var arImgHeight = arCanvasHeight * scrollMag;
        //
        //     var arImgX = (arCanvasWidth - arImgWidth) / 2;
        //     var arImgY = (arCanvasHeight - arImgHeight) / 2;


        //축소되어 하단으로 이동
        } else if( scrollTop < arMoveScrollTop ) {

            // 멈춰있던 만큼 스크롤 값 조정
            // var scrollTop = scrollTop - 500 ;

            // 스크롤 위치에 따른 화면 배율
            var scrollMag = ( arFirstMag - ( scrollTop * ( (arFirstMag - arFullMag) / arFullScrollTop ) ) );

            // 가장 작은사이즈로 축소 되었을 때
            // 축소되는것을 멈추고 하단으로 이동한다
            if( scrollMag < arMinMag ){

                // 더이상 축소하지 않게 배율을 고정
                scrollMag = arMinMag;

                var arImgWidth =  arCanvasWidth * scrollMag;
                var arImgHeight =  arCanvasHeight * scrollMag;


                //하단으로 이동
                var arImgX = ( arCanvasWidth - arImgWidth ) / 2;


                arMoveScrollTop - scrollTop

                var arImgY = ( ( arCanvasHeight - arImgHeight ) / 2 )  ;



            } else {

                var arImgWidth =  arCanvasWidth * scrollMag;
                var arImgHeight =  arCanvasHeight * scrollMag;

                var arImgX = ( arCanvasWidth - arImgWidth ) / 2;
                var arImgY = ( arCanvasHeight - arImgHeight ) / 2;
            }

        };


        //background
        arctx.drawImage(arImages[4],arImgX,arImgY,arImgWidth,arImgHeight);
        arctx.drawImage(arImages[3],arImgX,arImgY,arImgWidth,arImgHeight);
        arctx.drawImage(arImages[2],arImgX,arImgY,arImgWidth,arImgHeight);

        //Device Frame
        arctx.drawImage(arImages[1],arImgX,arImgY,arImgWidth,arImgHeight);
        // arctx.drawImage(arImages[2],0,0,arWidth,arHeight);
        // arctx.drawImage(arImages[3],0,0,arWidth,arHeight);
        // arctx.drawImage(arImages[4],0,0,arWidth,arHeight);
        // arctx.drawImage(arImages[5],0,0,arWidth,arHeight);

    };


    // AR 그리기
    function drawReal(scrollTop){

        arctx.drawImage(arImages[0],0,0,arCanvasWidth,arCanvasHeight);

    }

    // Canvas init
    var arctx    = document.getElementById('mossland-ar').getContext('2d');
    var arImages = [];
    var gorillaImages = [];
    var arImagesSrc = [
        "img/main/original_qhd.jpg",
        "img/main/device.png",
        "img/main/p01.png",
        "img/main/p02.png",
        "img/main/b03.jpg"
    ];

    var gorillaSrc  = [
        "img/main/chromakey/Gorilla_0000.jpg",
        "img/main/chromakey/Gorilla_0001.jpg",
        "img/main/chromakey/Gorilla_0002.jpg",
        "img/main/chromakey/Gorilla_0003.jpg",
        "img/main/chromakey/Gorilla_0004.jpg",
        "img/main/chromakey/Gorilla_0005.jpg",
        "img/main/chromakey/Gorilla_0006.jpg",
        "img/main/chromakey/Gorilla_0007.jpg",
        "img/main/chromakey/Gorilla_0008.jpg",
        "img/main/chromakey/Gorilla_0009.jpg",
        "img/main/chromakey/Gorilla_0010.jpg"
    ];

    for(var i = 0; i<arImagesSrc.length; i++){
        arImages[i] =new Image();
        arImages[i].src=arImagesSrc[i];
    };

    for(var j = 0; j<gorillaSrc.length; j++){
        gorillaImages[j] =new Image();
        gorillaImages[j].src=gorillaSrc[j];
    };

    console.log(arImages[0].width);
    run();

}();