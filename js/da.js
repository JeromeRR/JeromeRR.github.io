

$(function(){



    $('.whitepaper-part-1').on('click',function(){

        $('.whitepaper-part-1, .whitepaper-part-2, .whitepaper-download-area').addClass('active');

    })

    $(".whitepaper-part-2 > .back").on('click',function(){

        $('.whitepaper-part-1, .whitepaper-part-2, .whitepaper-download-area').removeClass('active');
        return false;

    })


});
