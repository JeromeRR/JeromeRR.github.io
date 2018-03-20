var tipCity = $('.js-tip-city');
var tipCityList = ['New York', 'Moscow', 'Seoul', 'Busan', 'Osaka', 'Beijing', 'Madrid', 'Barcelona', 'Hamburg', 'Paris'];
var tipEth = $('.js-tip-eth');
var tipTime = $('.js-tip-time');

function rounding(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function randomDec(min, max) {
    var rand = min + Math.random() * (max + 0.1 - min);
    rand = rounding(rand, 1);
    return rand;
}

function showHideTip(delay) {
    if($('.js-tip').hasClass('is-active')) {
        return;
    } else {
        tipContent();
        setTimeout(function () {
            $('.js-tip').addClass('is-active');
            setTimeout(function () {
                $('.js-tip').removeClass('is-active');
            }, 30000);
        },delay);
    }
}

function tipContent () {
    tipEth.html(randomDec(0.2, 10));
    tipCity.html(tipCityList[randomInteger(0, 9)]);
    tipTime.html(randomInteger(1, 30));
}

showHideTip(5000);
setInterval(function () {
    if($('.js-tip').hasClass('is-active')) {
        return;
    } else {
        showHideTip(20000);
    }
}, 1000);