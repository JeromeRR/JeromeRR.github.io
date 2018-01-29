
var SETTING = {
    // 1 ETH 환율
    'PRICE' : 10000,

    // 보너스 비율
    'BONUS' : {
        '5' : '35',
        '10' : '40',
        '25' : '45',
        '75' : '50',
        'max' : '55'
    },

    //지갑주소
    'ADDRESS' : addr,
    //QR Code image
    'QR' : qr
};

$(function(){

    $("#wallet-address").val(SETTING.ADDRESS);
    $("#bta-qr-img").attr('src',SETTING.QR);

    $('#bta-eth-value').on('keyup',function(){

        // MOC 값 계산
        var value = $(this).val();

        //Bonus 계산
        var bonusvalue;

        if( value < 5 ){
            bonusvalue = parseInt(SETTING.BONUS['5']);
        } else if ( value < 10 ){
            bonusvalue = parseInt(SETTING.BONUS['10']);
        } else if ( value < 25 ){
            bonusvalue = parseInt(SETTING.BONUS['25']);
        } else if ( value < 75 ){
            bonusvalue = parseInt(SETTING.BONUS['75']);
        } else {
            bonusvalue = parseInt(SETTING.BONUS['max']);
        }

        var bonus = 100 + bonusvalue;
        var bonusprice = addComma(  (value * SETTING.PRICE * bonus / 100) );
        
        $("#moc-value").text(bonusprice);
        $("#bonus-price").text(bonusprice);

        //Send값 동기화
        $("#send-eth-value").text( value );

    });


    // 지갑주소 복사하기
    var clipboard = new Clipboard('#copy-wallet');
    clipboard.on('success', function(e) {
        $("#copy-result").addClass('active');
        setTimeout(function(){
            $("#copy-result").removeClass('active');
        },3000);
    });

});