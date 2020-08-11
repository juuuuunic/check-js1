/**
 * pure 쿠키 설정
 * millisecond : 밀리 세컨드
 *  
 */
function setCookie(cname, cvalue, millisecond){
	
	var d	= new Date();
	d.setMilliseconds(millisecond); 

	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
}

function deleteCookie(cname, exdays){
	var d = new Date();
	
	d.setDate(d.getDate());

	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=; " + expires + ";path=/";;
}

function getCookie(cname) {
	var name			= cname + "=";
	var decodedCookie	= decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() {
	var user=getCookie("username");
	if (user != "") {
		alert("Welcome again " + user);
	} else {
		user = prompt("Please enter your name:","");
		if (user != "" && user != null) {
			setCookie("username", user, 30);
		}
	}
}
