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
var preicoStartDate = new Date("March 21, 2018 13:00");
var buyTokenButtonDate = new Date("March 21, 2018 12:00");

// PRE ICO 끝 날짜
// 이벤트 없음
var preicoEndDate = new Date("April 18, 2018 13:00");

var newNotice = false;

// 지갑주소
var addr = '0x3B3D913C2DE8Aa5be94A40BF73d044233861c38b';

// QR코드 이미지 1:1 비율
var qr = 'img/qrcode.png';

// 공지사항을 나타낼것인지
var view_notice = true;

var presaled = 66948856;
// 지갑데이터 수신 받기 전 초기 값.
var ico_current = presaled;

// Hardcap
var ico_hardcap = presaled + 123750302.00;

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
        ico_current = Math.max(0, result.toNumber() + 3421860);
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

    mosstimer(preicoEndDate,"#preico");
    mosstimer(preicoEndDate,"#table-timer");


function icoprogress(){

    var percent = Math.ceil( ( ico_current/ico_hardcap ) * 100 );
    if(percent > 100) percent = 100;
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',');
    var percent_number_step = $.animateNumber.numberStepFactories.append(' %');


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

    var selected = $(".advisors-select > .selected");
    var selectedcontents = $("#ico-advisor");
    $(".progressbar-current").prop('number',36);
    $(".whitepaper-part-1").on("click",function(){
        $('.whitepaper-part-1, .whitepaper-part-2, .whitepaper-download-area').addClass('active');
    });

    $(".whitepaper-part-2 > .back").on("click",function(){
        $('.whitepaper-part-1, .whitepaper-part-2, .whitepaper-download-area').removeClass('active');
        return false;
    });

    if(newNotice) {
        $("#notice-icon").addClass('icon-steemit-log-new');
    }
    else {
        $("#notice-icon").addClass('icon-steemit-logo');
    }



    $(".header__menu a, .scroll-down").on("click",function(){
        var idstr = $(this).attr('href');

        $('html, body').animate({
            scrollTop : $(idstr).offset().top - $(".main-header").outerHeight() + 5
        },1000)

        $(".js-menu-btn").removeClass('menu-opened');
        $("#header").removeClass('menu-opened');
        $(".header__menu").removeClass('is-opened');

        return false;

    });

    var menuBtn = document.querySelector('.js-menu-btn');
    var menu = document.querySelector('.js-menu');
    var header = document.getElementById('header');
    menuBtn.addEventListener('click', function () {
      this.classList.toggle('menu-opened');
      header.classList.toggle('menu-opened');
      menu.classList.toggle('is-opened');
    });

    // $(".btn-menu").on("click",function(){
    //     $(".nav").toggleClass('active');
    // });

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

    var timer;

    $(".advisors-select > div").hover(function(){
        var $this = $(this);
        var ref = this;

        timer = setTimeout(function() {
            selected.removeClass('selected');
            selectedcontents.addClass('inactive');

            selected = $this;

            if(ref.innerText == 'ICO')
                selectedcontents = $('#ico-advisor');
            else if(ref.innerText == 'Product')
                selectedcontents = $('#product-advisor');
            
            selectedcontents.removeClass('inactive');
            $this.addClass('selected');
        }, 300);
    }, function() {
        clearTimeout(timer);
    });
    
    $("#viewmore").on("click", function(){
        $(".expand").addClass("inactive");
        $(".readmore").addClass("inactive");
        $("#ico-advisor").removeClass("ico-limit");
    });

    $("#viewmore2").on("click", function(){
        $(".expand2").addClass("inactive");
        $(".readmore2").addClass("inactive");
        $("#product-advisor").removeClass("product-limit");
    });

    loadeth();
});

$(document).ready(function() {
    $('.js-to-whitepapper').click(function (event) {
        event.preventDefault();
    
        $('html, body').animate({
            scrollTop: $('#whitepaper').offset().top - 100
        }, 500);

        $(".whitepaper-part-1").click();
    });

    $('.js-close-tip').click(function (event) {
        event.preventDefault();
        $('.tip').removeClass('is-active');
    });
});

