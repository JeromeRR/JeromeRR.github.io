const eth_min = 0.1;
const eth_max = 20;
const qtum_min = 3;
const qtum_max = 600;

window.onload = function(){
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
       document.getElementById("copy-wallet").classList.add("hidden");
    }
    calculator = ethCalc;
    document.getElementById("eth_price_dollar").textContent = ether_usd;
}

function onChangeCheckbox(this_){
            if(!this_.checked){
                document.getElementById('bnt_next_hidden').disabled = !this_.checked;
                document.getElementById('bnt_next_hidden').id = 'bnt_next';
            }
            else{
               document.getElementById('bnt_next').disabled = !this_.checked;
               document.getElementById('bnt_next').id = 'bnt_next_hidden'; 
            }
            
}
function onNextBtnClick() {
    if(document.getElementById('agreeCheckbox_').checked){
        window.location.href = 'send-here.html'
    }            
}
function copyToClipBoard() {
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      return;
    }
    /* Get the text field */
    var copyText = document.getElementById("wallet-address");
    copyText.contenteditable = true;
    copyText.readonly = false;
    
  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("Copy");
    copyText.contenteditable = false;
    copyText.readonly = true;

  /* Alert the copied text */
  alert("Copied: " + "0x8047560624ef10ccfec60ff91b5165e1114db2fd");
}

function onSelectCurrency(currency){
    
    let dropdownText =document.getElementById("currency_dropdown");
    if(currency.includes("Ethereum")){
        dropdownText.innerHTML = 'Currency : <i class="fab fa-ethereum"></i>&nbsp;Ehereum'
        document.getElementById("eth_price_dollar").textContent = ether_usd;
        document.getElementById("max_val").textContent = eth_max;
        document.getElementById("min_val").textContent = eth_min;
        calculator = ethCalc;
    }
    else if(currency.includes("QTUM")){
        dropdownText.innerHTML = 'Currency : <i class="cc QTUM" title="QTUM"></i>&nbsp;QTUM'
        document.getElementById("eth_price_dollar").textContent = qtum_usd;
        document.getElementById("max_val").textContent = qtum_max;
        document.getElementById("min_val").textContent = qtum_min;
        calculator = qtumCalc;
    }
    else{
        
    }
    ChangeCurrencyStr(currency);
    let = sendVal = document.getElementById("send__value").textContent;
    if(sendVal)
        calculator();
}

function ChangeCurrencyStr(currency){
    let type = currency.includes("Eth") ? 0/* ethereum */ : 1 /*qtum*/
    let curCurrency_short = type == 0 ? "ETH" : "QTUM";
    let curCurrency_long = type == 0 ? "Ehtereum" : "QTUM";
    let short_ele = document.getElementsByClassName("currency_short");
    let long_ele = document.getElementsByClassName("currency_long");
    for(var i = 0; i < short_ele.length; ++i)    
        short_ele[i].textContent  = curCurrency_short;
    for(var j = 0; j < long_ele.length; ++j)
        long_ele[j].textContent  = curCurrency_long;
}

function ethCalc() {
    var x = Number(document.getElementById("send__value").value)
    var ethPriceEle = document.getElementById("eth_price_dollar");
    var ethPriceValue = parseFloat(ethPriceEle.textContent);

    if(isNaN(x)){
        document.getElementById("warning").classList.add('hidden'); 
        return;
    }
        

    if(x < 0.1 )
    {
        document.getElementById("warning").classList.remove('hidden');
        document.getElementById("output__value").innerHTML = "invalid";
        return;
    }
    else if( x > 20)
    {
        document.getElementById("warning").classList.remove('hidden');
    }
    else
    {
       document.getElementById("warning").classList.add('hidden'); 
    }
    
    mocRate = ethPriceValue/0.12 | 0;
    result = x * mocRate * (100+getBonusRate()) * 0.01;
    
    if (isNaN(result)){
        document.getElementById("output__value").innerHTML = "invalid";
    } else{
        document.getElementById("output__value").innerHTML = result.toFixed();
    }
};



function qtumCalc() {
    var x = Number(document.getElementById("send__value").value)
    var ethPriceEle = document.getElementById("eth_price_dollar");
    var ethPriceValue = parseFloat(ethPriceEle.textContent);

    if(isNaN(x)){
        document.getElementById("warning").classList.add('hidden'); 
        return;
    }
        

    if(x < 3 )
    {
        document.getElementById("warning").classList.remove('hidden');
        document.getElementById("output__value").innerHTML = "invalid";
        return;
    }
    else if( x > 600)
    {
        document.getElementById("warning").classList.remove('hidden');
    }
    else
    {
       document.getElementById("warning").classList.add('hidden'); 
    }
    
    mocRate = ethPriceValue/0.12 | 0;
    result = x * mocRate * (100+getBonusRate()) * 0.01;
    
    if (isNaN(result)){
        document.getElementById("output__value").innerHTML = "invalid";
    } else{
        document.getElementById("output__value").innerHTML = result.toFixed();
    }
};