/*
var version ="6.2.1.5";
var Viewer ="NPMyBuilder Viewer";

// run at server
if(userMBAgent()=="IE"){
*/
function Host(){
	var Dns;
	Dns=location.href;
	Dns=Dns.split("//");
	
	// nicedata 웹을 보도록 설정
	var parsedUrl = Dns[1].split(".");
	if (parsedUrl[0] != "www") {
		parsedUrl = "t-renewal";
	} else {
		parsedUrl = parsedUrl[0];
	}
	
	Dns="http://"+parsedUrl+".nicedata.co.kr";
	return Dns;
}

var Host;
Host = Host();

var ReportConfig = {
     envPath : Host + '/MyBuilder/Files'
};
var plugin_version = "6.2.3.7";

if(navigator.userAgent.indexOf("Trident") != -1 || navigator.userAgent.indexOf("MSIE") != -1) 
{

	
	if (navigator.platform == "Win64")
	{
		document.write('<object classid=clsid:2D50EB98-1EBE-4587-8E6E-87A38AF7E92F id=View1 width=100% height=100% align=left ');
		document.write('codebase="' + Host + '/MyBuilder/Biin/MyBuilderViewer64.cab#version=6,2,3,8"></object>');
	}
	else
	{
		var appName = navigator.appVersion;
		if (appName.indexOf("Windows NT 6") != -1 || navigator.appVersion.indexOf("Windows NT 10") != -1)
		{
//			document.write('<object classid=clsid:8403865C-C195-4D7B-B400-16FEAFE68A85 id=View1 width=100% height=100% align=left ');
//			document.write('codebase="' + Host + '/MyBuilder/Biin/MyBuilderViewer32.cab#version=6,2,3,8"></object>');
//			document.write('<object classid=clsid:3543897F-577B-4371-99E6-20EC4FA31A4F id=View1 width=100% height=100% align=left ');
			document.write('<object classid=clsid:8403865C-C195-4D7B-B400-16FEAFE68A85 id=View1 width=100% height=100% align=left ');
			document.write('codebase="' + Host + '/MyBuilder/Biin/MyBuilderViewer32.cab#version=6,2,3,8"></object>');
		}
		else
		{
			document.write('<object classid=clsid:3543897F-577B-4371-99E6-20EC4FA31A4F id=View1 width=100% height=100% align=left ');
			document.write('codebase="' + Host + '/MyBuilder/Biin/MyBuilderViewer.cab#version=6,2,3,8"></object>');
		}
	}
}
else
{
	if (checkPluginVersion())
	{
		document.write('<embed type="application/mybuilder-plugin" id="View1" width=100% height=100% align=left>');
	}
	else
	{
		alert("마이빌더 플러그인을 다운로드 받습니다.\n플러그인을 설치한 후 브라우저를 다시 실행하여 주십시요.");
		location.href = Host+"/MyBuilder/Biin/MyBuilderViewer" + plugin_version + ".exe";
	}
}

function checkPluginVersion()
{
	var found = false;
	for (var i=0; i<navigator.plugins.length; i++)
	{
		if (navigator.plugins[i].description == "MyBuilder Viewer")
		{
			var startPos = navigator.plugins[i].name.indexOf('6');
			var stringLength = navigator.plugins[i].name.length;
			var installVersion = navigator.plugins[i].name.substring(startPos, stringLength);

			//사용자 설치버전이 서버보다 크거나 같으면 통과
			if (installVersion >= plugin_version) return true;

			found = true;
		}
	}
	if (found) alert("마이빌더 플러그인이 업데이트 되었습니다...\n기존 MyBuilderViewer를 삭제하고 새 버전을 설치하여 주십시요.");
	return false;
}
// document.write(' <object classid=clsid:3543897F-577B-4371-99E6-20EC4FA31A4F id=View1 width=100% height=100% ');
// document.write('codebase="' + Host + '/MyBuilder/Biin/MyBuilderViewer.cab#version=6,2,3,8"></object>');
 ////document.write(' <object classid=clsid:15476266-9094-4F36-9895-0E670A392A93 id=View1 width=100% height=95% ');
 ////document.write('codebase="' + Host + '/MyBuilder/Biin/MyBuilderViewerU.cab#version=6,2,3,1"></object>');
 //document.write(' <object classid=clsid:8403865C-C195-4D7B-B400-16FEAFE68A85 id=View1 width=100% height=95% ');
 //document.write('codebase="http://www.nicedata.co.kr/MyBuilder/Biin/MyBuilderViewer.cab#version=6,2,3,2"></object>');
 //document.write(' <object classid=clsid:3543897F-577B-4371-99E6-20EC4FA31A4F id=View1 width=100% height=90% align=left ');
 //document.write('codebase="http://www.nicedata.co.kr/MyBuilder/Biin/MyBuilderViewer.cab#version=6,3,3,1"></object>');

/*
}else{
	  if(checkMB4FF()){
	    document.write('<embed type="application/mybuilder-plugin" id="View1" width=100% height=95%>');
	    //document.write('<embed type="application/mybuilder-unicode-plugin" id="View1"  width=980 height=640 align=left>');
	  }else{
	      alert('\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\u02bf\ufffd\ufffd\ufffd \ufffd\u00f7\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\u067f\ufffd\u03b5\ufffd \ufffd\u07bd\ufffd\ufffd\u03f4\ufffd. \n\ufffd\ufffd\u0121 \ufffd\ufffd \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\u067d\ufffd \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\u05bd\u02bd\u00ff\ufffd.');
	      location.href ='http://report.nicedata.co.kr/MyBuilder/firefox/MyBuilderViewer'+version+'.exe';
	  }

}

window.onerror = function(ErrorMessage, Url, Line){
	  //window.status = 'Error : ' + ErrorMessage + ' : ' + Line + ' Line';   //\ufffd\ufffd\ufffd\ufffd \ufffd\u07bc\ufffd\ufffd\ufffd \u01e5\ufffd\ufffd
	  window.status = '';   //\ufffd\ufffd\ufffd\ufffd \ufffd\u07bc\ufffd\ufffd\ufffd \ufffd\ufffd\ufffd\u07f1\ufffd
	  return true;
	}

	function userMBAgent() {
	 var browser = "";

	 if(navigator.userAgent.indexOf("MSIE") !=-1) {
	  browser = "IE";
	  return browser;
	 }
	 if(navigator.userAgent.indexOf("Mozilla") !=-1) {
	  browser = "MOZILLA";
	  return browser;
	 }
	 browser = "NG"; 
	 return browser;
	}

	function checkMB4FF() {

	  var found = false;
			try {

				for (i = 0; i < navigator.plugins.length && found==false; i++) {
				   // alert(navigator.plugins[i].description);
				  if (navigator.plugins[i].description == Viewer) {
					   var startPos = navigator.plugins[i].name.indexOf('6');
					   var stringLength = navigator.plugins[i].name.length;

	            var installVersion = navigator.plugins[i].name.substring(startPos, stringLength);

					  if (installVersion >= version) {  //\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\ufffd\u0121\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \u0169\ufffd\u0173\ufffd \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\ufffd\ufffd
					    found = true;
					  }else{
					    alert('\ufffd\ufffd\ufffd\u033a\ufffd\ufffd\ufffd \ufffd\u00f7\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\ufffd \ufffd\ufffd\ufffd\ufffd\ufffd\ufffd\u01ae \ufffd\u01fe\ufffd\ufffd\ufffd\u03f4\ufffd.. \n\ufffd\ufffd\ufffd\ufffd MyBuilder Viewer \ufffd\ufffd\ufffd\ufffd\ufffd\u03fd\u00f0\ufffd \ufffd\ufffd\ufffd\ufffd \ufffd\ufffd\u0121\ufffd\u03ff\ufffd \ufffd\u05bd\u02bd\u00ff\ufffd.');
					  }
					}
				}
			} catch (e) {
				found=true;
			}
			return found;
	 
	}
 */