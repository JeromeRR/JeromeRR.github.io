

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


});
