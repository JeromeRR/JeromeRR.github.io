window.onload = function(){
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
       document.getElementById("copy-wallet").classList.add("hidden");
    }
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