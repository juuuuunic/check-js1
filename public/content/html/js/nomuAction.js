$(document).ready(function () {
	
	$('.goAction').click(function (event){
		// 기본동작 차단
		event.preventDefault();
		location.href = $(this).attr('href');
	});
	
});

//iframe 자동높이조절 start
function doIframe(){
	o = document.getElementsByTagName('iframe');
	for(var i=0;i<o.length;i++){
		if (/\bautoHeight\b/.test(o[i].className)){
			setHeight(o[i]);
			addEvent(o[i],'load', doIframe);
		}
	}
}

function setHeight(e){
	if(e.contentDocument){
		e.height = e.contentDocument.body.offsetHeight+35;
	} else {
		e.height = e.contentWindow.document.body.scrollHeight;
	}
}

function addEvent(obj, evType, fn){
	if(obj.addEventListener){
		obj.addEventListener(evType, fn,false);
		return true;
	} else if (obj.attachEvent){
		 var r = obj.attachEvent("on"+evType, fn);
		 return r;
	} else {
		return false;
	}
}

if (document.getElementById && document.createTextNode){
	addEvent(window,'load', doIframe);
}
// iframe 자동높이조절 end