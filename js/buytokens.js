
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
    'ADDRESS' : '0x92aE260701854235d6cE6d5165E620E2428063Ef'

};

function addComma(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(function(){

    $("#wallet-address").val(SETTING.ADDRESS);

    $('#bta-eth-value').on('keyup',function(){

        // MOC 값 계산
        var value = $(this).val();
        $("#moc-value").text( addComma(value * SETTING.PRICE) )

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

        var bonus = 1 + ( bonusvalue / 100 );
        var bonusprice = addComma(  (SETTING.PRICE * bonus) );

        $("#bonus-price").text(bonusprice);

    });

    var clipboard = new Clipboard('#copy-wallet');

    clipboard.on('success', function(e) {
        $("#copy-result").addClass('active');
        setTimeout(function(){
            $("#copy-result").removeClass('active');
        },3000);
    });

});