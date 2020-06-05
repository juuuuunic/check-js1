function excel_down(job) {
	ifrm_work.location.href = '/nomuMnu.do?sdo=공통_엑셀다운&job='+job;
}
function excel_down_frm(frm) {
	excel_frm = $("#"+frm);
	ifrm_work.location.href = '/nomuExcel.ado?'+excel_frm.serialize();
}
function excel_down_job(frm, job) {
	excel_frm = $("#"+frm);
	ifrm_work.location.href = '/nomuExcel.ado?job='+job+'&'+excel_frm.serialize();
}
function open_win(w_url, nm, cw, ch){
	var sw=screen.availWidth;
	var sh=screen.availHeight;
	//열 창의 포지션
	var px=(sw-cw)/2;
	var py=(sh-ch)/2;
	var _new_win= window.open(w_url, nm,'left='+px+',top='+py+',width='+cw+',height='+ch+',location=no,toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=no');
	_new_win.focus();
	return _new_win;
}
function smartPopOpen(param) {
	$.smartPop.open(param);
}
function smartPopOpen1(param) {
	$.smartPop1.open(param);
}
//레이어 팝업닫기(공통)
function smartPopClose1() {
	$.smartPop1.close();
}
function smartPop1Close() {
	$.smartPop1.close();
}
function smartPopClose() {
	$.smartPop.close();
}
function smartPopClsoe() {
	$.smartPop.close();
}
//레이어 팝업 사이즈 조절(공통)
function smartPopResize(setH) {
	$.smartPop.resizeHeight(setH);
}
function smartPopWidth(setW) {
	$.smartPop.opts.width = setW;
	$.smartPop.resize();   
}
function popup_open(name, idx, iwidth, iheight, left){
	if(getCookie(idx)!="done") {
		noteWindow = window.open( name , '', 'width=' + iwidth + ',height=' + iheight+',left='+left+',top=0');
		noteWindow.opener = self;
	}
}
function setCookie(name, value, expiredays)	{
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	document.cookie = name + "=" + escape( value ) + "; path=/;expires=" + todayDate.toGMTString() + ";"
	self.close();
}

function urlencode(str) {
    str = (str + '').toString();
    return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A')
        .replace(/%20/g, '+');
}

function _utf8_encode(string) { 
	string = string.replace(/\r\n/g,'\n');
	var utftext = '', c;
  
	for (var n = 0; n < string.length; n++) {
		var c = string.charCodeAt(n);
  
		if (c < 128)
			utftext += String.fromCharCode(c);
		else if((c > 127) && (c < 2048))
			utftext += String.fromCharCode((c >> 6) | 192, (c & 63) | 128);
		else
			utftext += String.fromCharCode((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
	}
	return utftext;
}
 
function base64_enc(input) {
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
   
	input = _utf8_encode(input);
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	
	while (i < input.length) {
	
	    chr1 = input.charCodeAt(i++);
	    chr2 = input.charCodeAt(i++);
	    chr3 = input.charCodeAt(i++);
	
	    enc1 = chr1 >> 2;
	    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
	    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
	    enc4 = chr3 & 63;
	
	    if (isNaN(chr2)) {
	        enc3 = enc4 = 64;
	    } else if (isNaN(chr3)) {
	        enc4 = 64;
	    }
	
	    output += keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
	}
	return output;
}

function replace_url(str, base_url) {
	if(base_url==null || base_url=='') base_url = "http://www.nomubi.com";
	str = str.replace(/href=\/css\//g,'href='+base_url+'/css/');
	str = str.replace(/href="\/css\//g,'href="'+base_url+'/css/');
	str = str.replace(/\/images\//g, base_url+'/images/');
	str = str.replace(/src=\/js\//g,'src='+base_url+'/js/');
	str = str.replace(/src="\/js\//g,'src="'+base_url+'/js/');
	str = str.replace(/src=\/mlrpt\//g,'src='+base_url+'/mlrpt/');
	str = str.replace(/src="\/mlrpt\//g,'src="'+base_url+'/mlrpt/');
	return str;
}

function PreviewProc_pwp() {
	var frm = document.pwp_frm; 
	frm.target = 'ifrm_work';
	frm.action = 'http://www.nicednb.com/pwpPrint.do';
	html = document.documentElement.innerHTML;
	html = replace_url(html);
	html = base64_enc(html);
	frm.html.value = html; 
	frm.submit();
}
function pdf_pwp() {
	var frm = document.pwp_frm; 
	frm.target = 'ifrm_work';
	frm.action = 'http://www.nicednb.com/pwpPrint.do';
	html = document.documentElement.innerHTML;
	html += '\n<script>$().ready(function() {check_obj();PdfProc();});</script>';
	html = replace_url(html);
	html = base64_enc(html);
	frm.html.value = html; 
	frm.submit();
}
function pdf_save(fn) {
	var frm = document.pwp_frm; 
	frm.target = 'ifrm_work';
	frm.action = 'http://www.nicednb.com/pwpPrint.do';
	html = document.documentElement.innerHTML;
	html += '\n<script>$().ready(function() {check_obj();PdfSave("'+fn+'");});</script>';
	html = replace_url(html);
	html = base64_enc(html);
	frm.html.value = html; 
	frm.submit();
}
function addComma(str) {
	if(str==null) return "0";
	str = String(str);
	var lhs = str.replace(/,/g,"");
	var result;
	
	if (isNumber(lhs)) {
		var len = lhs.length;
		var comma = len % 3;
		result = lhs.substring(0, comma);
		for (var i=comma; i<len; i+=3) {
			result = (result.length == 0) ? lhs.substring(i,i+3) : result + "," + lhs.substring(i,i+3);
		}
	}
	return result;
}
function isNumber(val) {
	var chars = ",0123456789";

	for (var inx = 0; inx < val.length; inx++) {
		if (chars.indexOf(val.charAt(inx)) == -1)
			return false;
	}
	return true;
}
