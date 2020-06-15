function numbersonly(e, decimal) { 
    var key; 
    var keychar; 

    if (window.event) { 
       // IE�먯꽌 �대깽�몃� �뺤씤�섍린 �꾪븳 �ㅼ젙 
        key = window.event.keyCode; 
    } else if (e) { 
      // FireFox�먯꽌 �대깽�몃� �뺤씤�섍린 �꾪븳 �ㅼ젙 
        key = e.which; 
    } else { 
        return true; 
    } 

    keychar = String.fromCharCode(key); 
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) 
            || (key == 27)) { 
        return true; 
    } else if ((("0123456789").indexOf(keychar) > -1)) { 
        return true; 
    } else if (decimal && (keychar == ".")) { 
        return true; 
    } else 
        return false; 
}


// index 怨듭��ы빆 ��삩 
function tabOn(tabid,a) {
	for (i=1;i<=10;i++) {
		if(i<10){inn="0"+i;} else {inn=""+i;}
		tabMenu = document.getElementById("tab"+tabid+"m"+i);
		tabContent = document.getElementById("tab"+tabid+"c"+i);
		if (tabMenu) { 
			if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace("_on.gif", ".gif"); } 
			if (tabMenu.tagName=="A") { tabMenu.className=""; } 
		}
		if (tabContent) { tabContent.style.display="none"; }
	}
	if(a<10){ann="0"+a;} else {ann=""+a;}
	tabMenu = document.getElementById("tab"+tabid+"m"+a);
	tabContent = document.getElementById("tab"+tabid+"c"+a);

	if (tabMenu) { 
		if (tabMenu.tagName=="IMG") { tabMenu.src = tabMenu.src.replace(".gif", "_on.gif"); } 
		if (tabMenu.tagName=="A") { tabMenu.className="on"; } 
	}
	if (tabContent) { tabContent.style.display="block"; }
	tabMore = document.getElementById("tab"+tabid+"more");
}