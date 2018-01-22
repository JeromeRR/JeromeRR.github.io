function mosstimer(_year,_month,_day){

    var timer = new Timer();
    //var today = new Date();
	
	var now = new Date();
	var today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	
    var thedate = new Date(_year,_month-1,_day,13);
    var diffdate = thedate-today;
    var sec  = diffdate / 1000;
    timer.start({countdown: true, startValues: {seconds: sec}});
    timer.addEventListener('secondsUpdated', function (e) {
        var time =  timer.getTimeValues();
        $("#timer-days").html(time.days);
        $("#timer-hours").html(time.hours);
        $("#timer-minutes").html(time.minutes);
        $("#timer-seconds").html(time.seconds);
    });
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




    $("#btn-whitelist").click(function(){

        //alert('Official KYC process will start on Jan 15, 2018. Please leave your email address to initiate the process.');
        //window.open('https://eepurl.com/dgCDUT');
        //return false;
    });


});
