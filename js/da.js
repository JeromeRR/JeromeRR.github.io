/*
Init
 */

// UTC+0
var now = new Date();
var today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
// UTC+9
//var today = new Date();

// PRE ICO 시작시간
// 이 시간이 되면 화면이 ico 시작화면으로 변경됨.
//var preicoStartDate = new Date("January 25, 2018 5:17");
var preicoStartDate = new Date("January 29, 2018 13:00");
var buyTokenButtonDate = new Date("January 29, 2018 12:00");

// PRE ICO 끝 날짜
// 이벤트 없음
var preicoEndDate = new Date("February 11, 2018");


// 지갑주소
var addr = '0x3B3D913C2DE8Aa5be94A40BF73d044233861c38b';

// QR코드 이미지 1:1 비율
var qr = 'img/dummyqr.jpg';

// Hardcap
var ico_hardcap = 25000000.00;

// 공지사항을 나타낼것인지
var view_notice = false;

// 지갑데이터 수신 받기 전 초기 값.
var ico_current = 0;


/*
 Load ETH
 */

function loadeth(){

    var Web3 = require('web3');
    var web3 = new Web3();

    web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io'));

    var abi = [ {
        name : 'saled',
        type : 'function',
        constant : true,
        inputs : [],
        outputs : [ {
            name : 'saled',
            type : 'uint256'
        } ]
    } ];

    var saled = function(coin, callback) {
        var contract = web3.eth.contract(abi).at(coin);

        try {
            contract.saled.call(callback);

            setInterval( function(){

                contract.saled.call(callback)
            },10000)
        }
        catch(exception){
            //console.log(exception)
        }
    };

    var token_addr = '0x86789b2DE83B9A93F89F8C2Cb14d622CD73515e9';
    saled(token_addr, function(err, result)
    {
        result.e -= 18;
        ico_current = Math.max(0, result.toNumber() - 41949386.94);
        icoprogress();
    });

}


function mosstimer(_date,_target,_fn){

    var timer = new Timer();
    var thedate = _date;
    var diffdate = thedate-today;
    var sec  = diffdate / 1000;

    timer.start({countdown: true, startValues: {seconds: sec}});
    timer.addEventListener('secondsUpdated', function (e) {
        var time =  timer.getTimeValues();
        $(_target).find(".timer-days").html(time.days);
        $(_target).find(".timer-hours").html(time.hours);
        $(_target).find(".timer-minutes").html(time.minutes);
        $(_target).find(".timer-seconds").html(time.seconds);
    });

    timer.addEventListener('targetAchieved', function (e) {

        if(_fn == "preicostart"){
            $("#upcomming").removeClass("active");
            $("#preico").addClass("active");
            loadeth();
        };

    });

}


function icoprogress(){

    var percent = Math.ceil( ( ico_current/ico_hardcap ) * 100 );
    if(percent > 100) percent = 100;
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
    var percent_number_step = $.animateNumber.numberStepFactories.append(' %');

    $("#current-value").animateNumber(
        {
            number: ico_current,
            //numberStep: comma_separator_number_step,

            numberStep: function(now, tween) {

                // see http://stackoverflow.com/a/14428340
                var formatted = now.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                $(tween.elem).text(formatted);
            },
            easing: 'easeInQuad'

        },2000,function(){
            // 현재 값부터 카운트 시작하도록
            // 이 코드를 삭제 시 0부터 시작
            $("#current-value").prop('number',ico_current)
        }
    );

    // Hardcap animation 없앰
    //$("#hardcap-value").animateNumber(
    //    {
    //        number: ico_hardcap,
    //        numberStep: function(now, tween) {
    //            // see http://stackoverflow.com/a/14428340
    //            var formatted = now.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //            $(tween.elem).text(formatted);
    //        },
    //        easing: 'easeInQuad'
    //    },2000
    //);

    $("#hardcap-value").text(addComma(ico_hardcap)+".00");

    $("#progressbar").css({
        width : percent+'%'
    });

    $(".progressbar-current").animateNumber(
        {
            number: percent,
            numberStep: percent_number_step,
            easing: 'easeInQuad'
        },2000
    );

    icofireDone = true;
};

function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(function(){


    $(".whitepaper-part-1").on("click",function(){
        $('.whitepaper-part-1, .whitepaper-part-2, .whitepaper-download-area').addClass('active');
    });

    $(".whitepaper-part-2 > .back").on("click",function(){
        $('.whitepaper-part-1, .whitepaper-part-2, .whitepaper-download-area').removeClass('active');
        return false;

    })



    $(".nav > a").on("click",function(){
        var idstr = $(this).attr('href');

        $('html, body').animate({
            scrollTop : $(idstr).offset().top - $(".main-header").outerHeight() + 5
        },1000)

        $(".nav").removeClass('active');

        return false;

    });

    $(".btn-menu").on("click",function(){
        $(".nav").toggleClass('active');
    });

    $("#footer-whitepaper-download").change(function(){

        if($(this).val() != ''){
            window.open( $(this).val() );
        }
    });

    $("#footer-faq-download").change(function(){

        if($(this).val() != ''){
            window.open( $(this).val() );
        }
    });


    //Timer
    mosstimer(preicoStartDate,"#upcomming","preicostart");
    mosstimer(preicoEndDate,"#preico");

    //Pre ICO start 화면 변경
    var diffdate = today-preicoStartDate;
    var remaining = diffdate/1000;

    var buttondate = today - buyTokenButtonDate;
    var buttonremaining = buttondate/1000;

    if(remaining < 0){
        $("#upcomming").addClass("active");
        $("#preico").removeClass("active");
        console.log(buttonremaining);
        if(buttonremaining < 0) {
            $("#buytoken-button").removeClass("active");
            $("#whitelist-button").addClass("active");
        }
        else{
            $("#buytoken-button").addClass("active");
            $("#whitelist-button").removeClass("active");
        }
    } else {
        $("#upcomming").removeClass("active");
        $("#preico").addClass("active");
        loadeth();
    }

});

