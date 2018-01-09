

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
            scrollTop : $(idstr).offset().top - $(".main-header").outerHeight()
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


    $("#btn-whitelist").click(function(){

        alert('Official KYC process will start on Jan 15, 2018. Please leave your email address to initiate the process.');
        window.open('https://eepurl.com/dgCDUT');
        return false;
    });

});
