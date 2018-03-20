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
    /* Get the text field */
    var copyText = document.getElementById("wallet-address");

  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("Copy");

  /* Alert the copied text */
  alert("Copied: " + copyText.value);
}