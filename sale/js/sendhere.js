const currencyType = {
    "Qtum":0,
    "Ethereum":1
}

const curr_min_max = [
    {
        min: 2,
        max: 1000
    },
    {
        min: 0.1,
        max: 20
    }
]

var curCurrency = currencyType.Qtum

function selectCurrency_sendhere(curr) {
    let curr_long_ele = [].slice.call(document.getElementsByClassName('currency_long'))
    let curr_short_ele = [].slice.call(document.getElementsByClassName('currency_short'))
    let curr_long_kor_ele = [].slice.call(document.getElementsByClassName('currency_long_kor'))
    let cuur_min_ele = [].slice.call(document.getElementsByClassName('currency_min'))
    let cuur_max_ele = [].slice.call(document.getElementsByClassName('currency_max'))

    let min_val = curr_min_max[currencyType[curr]].min
    let max_val = curr_min_max[currencyType[curr]].max
    curCurrency = currencyType[curr]

    switch(curCurrency){
        case currencyType.Qtum:
            curr_long_ele.forEach(ele => {
                ele.textContent = 'Qtum'
            });
            curr_short_ele.forEach(ele => {
                ele.textContent = 'Qtum'
            });
            curr_long_kor_ele.forEach(ele => {
                ele.textContent = '퀀텀'
            });
            cuur_min_ele.forEach(ele => {
                ele.textContent = ''+min_val
            });
            cuur_max_ele.forEach(ele => {
                ele.textContent = ''+max_val
            });
            break;
        case currencyType.Ethereum:
            curr_long_ele.forEach(ele => {
                ele.textContent = 'Ethereum'
            });
            curr_short_ele.forEach(ele => {
                ele.textContent = 'ETH'
            });
            curr_long_kor_ele.forEach(ele => {
                ele.textContent = '이더리움'
            });
            cuur_min_ele.forEach(ele => {
                ele.textContent = ''+min_val
            });
            cuur_max_ele.forEach(ele => {
                ele.textContent = ''+max_val
            });
            break;
        default:
            break;
    }
}

window.onload = function(){
    selectCurrency_sendhere("Qtum")
}