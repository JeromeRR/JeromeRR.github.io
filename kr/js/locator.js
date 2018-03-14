var main = "/";
var main_kr = "/kr/";
$(document).ready(function(){	
	$.getJSON("http://ip-api.com/json/?callback=?", function(data) {
		if(data.countryCode == "KR" && document.location.pathname.indexOf("kr") == -1){
			document.location.replace(main_kr);
		}else if(data.countryCode != "KR" && document.location.pathname.indexOf("kr") != -1){
			document.location.replace(main);
		}
    });
});