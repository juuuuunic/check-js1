/**
 * (c) Infotech, Inc.
 * @file	ift.nx.js
 * @desc	Infotech common util java script
 * @author	seung (stoas0605@gmail.com)
 * @since	2016.06.22
 */

/**
 * ua.browser.family: "Mobile Safari"
 * ua.browser.name: "Mobile Safari 4.0.5"
 * ua.browser.version: "4.0.5"
 * ua.browser.major: 4
 * ua.browser.minor: 0
 * ua.browser.patch: 5
 * ua.device.family: "iPhone"
 * ua.device.name: "iPhone"
 * ua.device.version: ""
 * ua.device.major: null
 * ua.device.minor: null
 * ua.device.patch: null
 * ua.device.type: "Mobile"
 * ua.device.manufacturer: "Apple"
 * ua.os.family: "iOS"
 * ua.os.name: "iOS 4"
 * ua.os.version: "4"
 * ua.os.major: 4
 * ua.os.minor: 0
 * ua.os.patch: null
 */
var deviceInfo;
$(function() {
	
	deviceInfo = detect.parse(navigator.userAgent);
	if("IE" == deviceInfo.browser.family && 9 > parseInt(deviceInfo.browser.version) && navigator.userAgent.indexOf("Trident/5.0") > -1) deviceInfo.browser.version = 9;
	if("IE" == deviceInfo.browser.family && 9 > parseInt(deviceInfo.browser.version) && navigator.userAgent.indexOf("Trident/6.0") > -1) deviceInfo.browser.version = 10;
	if(_LOG) console.log(JSON.stringify(deviceInfo));
	
	//enter event
	$(".data-enter").on("keypress", function(e) {
		if(e.which == 13) {
			e.preventDefault();
			$(this).closest("form").find($(this).attr("data-enter")).click();
		}
	});
});

var _LOG = true;
_LOG = false;

(/**
 * @param $
 */
function($) {
	$.extend({
		/**
		 * fnGetDate({cardCd:999,cardNo:1234567890});
		 */
		fnCardNumberFormat: function(json) {
			
			var formatNumber = "";
			
			if(!json.cardNo) return "";
			
			var cardNo = json.cardNo.trim().replace(/-/g, "");
			
			if(cardNo.length == 14) formatNumber = cardNo.replace(/(.{4})(.{4})(.{4})(.{2})/, '$1-$2-$3-$4');
			else if(cardNo.length == 15) formatNumber = cardNo.replace(/(.{4})(.{4})(.{4})(.{3})/, '$1-$2-$3-$4');
			else if(cardNo.length == 16) formatNumber = cardNo.replace(/(.{4})(.{4})(.{4})(.{4})/, '$1-$2-$3-$4');
			
			return formatNumber;
		}
		/**
		 * fnGetDate({bankCd:999,accNo:1234567890});
		 */
		, fnAccountNumberFormat: function(json) {
			
			var formatNumber = "";
			var accNo = "";
			var accNo_length = "";
			var accNo_mid = "";
			
			if(!json.bankCd || !json.accNo) return "";
			
			accNo = json.accNo.trim().replace(/-/g,'');
			accNo_length = accNo.length;
			
			switch(json.bankCd) {
				//산업은행
				case "002":
					if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{3})(.{4})(.{4})(.{3})/, '$1-$2-$3-$4');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//기업은행
				case "003":
					if(accNo_length=="11"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{3})(.{3})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{4})(.{3})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{3})(.{6})(.{2})(.{3})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="16"){
						formatNumber = accNo.replace(/(.{3})(.{6})(.{2})(.{5})/, '$1-$2-$3-$4');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//국민은행	
				case "004":
					if(accNo_length=="12") {
						if(accNo.substr(5,2)=="18") formatNumber = accNo.replace(/(.{6})(.{2})(.{4})/, '$1-$2-$3');
						else formatNumber = accNo.replace(/(.{3})(.{2})(.{4})(.{3})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="13") {
						formatNumber = json.accNo;
					}
					else if(accNo_length=="14") {
						formatNumber = accNo.replace(/(.{6})(.{2})(.{6})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//수협
				case "007":
					if(accNo_length=="11"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//농협
				case "011":
					if(accNo_length=="11"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{4})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="13"){
						formatNumber = accNo.replace(/(.{3})(.{4})(.{4})(.{2})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{6})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="15"){
						formatNumber = accNo.replace(/(.{6})(.{3})(.{6})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//우리은행
				case "020":
					if(accNo_length=="11"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{4})(.{3})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="13"){
						formatNumber = accNo.replace(/(.{4})(.{3})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})(.{3})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="15"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})(.{4})/, '$1-$2-$3-$4');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//SC은행
				case "023":
					if(accNo_length=="11"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//씨티은행
				case "027":
					formatNumber = json.accNo;
					break;
				//대구은행
				case "031":
					if(accNo_length=="11"){
						formatNumber = json.accNo.replace(/(.{3})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})(.{1})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="13"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{2})(.{5})(.{1})/, '$1-$2-$3-$4-$5');
					}
					else if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})(.{3})/, '$1-$2-$3-$4');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//부산은행
				case "032":
					if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})(.{1})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="15"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})(.{4})/, '$1-$2-$3-$4');
					}	 
					else{
						formatNumber = json.accNo;
					}
					break;
				//광주은행
				case "034":
					if(accNo_length=="10"){
						formatNumber = accNo.replace(/(.{2})(.{2})(.{5})(.{1})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="11"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{5})(.{1})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{3})(.{3})(.{6})/, '$1-$2-$3');
					}		 
					else{
						formatNumber = json.accNo;
					}
					break;
				//제주은행
				case "035":
					if(accNo_length=="10"){
						formatNumber = accNo.replace(/(.{2})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{2})(.{4})(.{3})/, '$1-$2-$3-$4-$5');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//전북은행
				case "037":
					if(accNo_length=="10"){
						formatNumber = accNo.replace(/(.{2})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{7})/, '$1-$2-$3');
					}
					else if(accNo_length=="16"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{7})(.{4})/, '$1-$2-$3-$4');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//경남은행
				case "039":
					if(accNo_length=="12"){
					if(!isNaN(accNo.substr(4,2)))
						formatNumber = accNo.replace(/(.{3})(.{2})(.{7})/, '$1-$2-$3');
					else
						formatNumber = accNo.replace(/(.{3})(.{3})(.{6})/, '$1-$2-$3');
					}		 
					else{
						formatNumber = json.accNo;
					}
					break;
				//새마을
				case "045":
					if(accNo_length=="13"){
						formatNumber = accNo.replace(/(.{4})(.{2})(.{6})(.{1})/, '$1-$2-$3-$4');
					}
					else if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{4})(.{3})(.{6})(.{1})/, '$1-$2-$3-$4');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				
				//신협
				case "048":
					if(accNo_length=="13"){
						formatNumber = accNo.replace(/(.{5})(.{2})(.{6})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//우체국
				case "071":
				case "079":
					if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{6})(.{2})(.{6})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//하나은행
				case "081":
					if(accNo_length=="14"){
						formatNumber = accNo.replace(/(.{3})(.{6})(.{5})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				//신한은행
				case "088":
					if(accNo_length=="11"){
						formatNumber = accNo.replace(/(.{3})(.{2})(.{6})/, '$1-$2-$3');
					}
					else if(accNo_length=="12"){
						formatNumber = accNo.replace(/(.{3})(.{3})(.{6})/, '$1-$2-$3');
					}
					else{
						formatNumber = json.accNo;
					}
					break;
				default:
					formatNumber = json.accNo;
					break;
			}
			return formatNumber || json.accNo;
		}
		/**
		 * fnGetDate({date: new Date(), format: "yyyy-MM-dd HH:mm:ss", yyyy: "", MM: "", dd: "", HH: "", mm: "", ss: "", add: {yyyy: 0, MM: 0, dd: 0, HH: 0, mm: 0, ss: 0}});
		 */
		, fnGetDate: function(opt) {
			
			var options = opt || {};
			
			options.date = options.date || new Date();
			options.format = options.format || "yyyy-MM-dd";
			
			if(options.yyyy) options.date.setFullYear(options.yyyy);
			if(options.MM) options.date.setMonth(options.MM - 1);
			if(options.dd) options.date.setDate(options.dd);
			if(options.HH) options.date.setHours(options.HH);
			if(options.mm) options.date.setMinutes(options.mm);
			if(options.ss) options.date.setSeconds(options.ss);
			
			if(options.add) {
				if(options.add.yyyy) options.date.setFullYear(options.date.getFullYear() + options.add.yyyy);
				if(options.add.MM) options.date.setMonth(options.date.getMonth() + options.add.MM);
				if(options.add.dd) options.date.setDate(options.date.getDate() + options.add.dd);
				if(options.add.HH) options.date.setHours(options.date.getHours() + options.HH);
				if(options.add.mm) options.date.setMinutes(options.date.getMinutes() + options.add.mm);
				if(options.add.ss) options.date.setSeconds(options.date.getSeconds() + options.add.ss);
			}
			
			var yyyy = (options.date.getFullYear()).toString();
			var MM = (options.date.getMonth() + 1).toString();
			var dd = options.date.getDate().toString();
			var HH = options.date.getHours().toString();
			var mm = options.date.getMinutes().toString();
			var ss = options.date.getSeconds().toString();
			
			var format = options.format;
			format = format.replace("yyyy", yyyy);
			format = format.replace("MM", (MM[1] ? MM : "0" + MM[0]));
			format = format.replace("dd", (dd[1] ? dd : "0" + dd[0]));
			format = format.replace("HH", (HH[1] ? HH : "0" + HH[0]));
			format = format.replace("mm", (mm[1] ? mm : "0" + mm[0]));
			format = format.replace("ss", (ss[1] ? ss : "0" + ss[0]));
			
			return format;
		}
		/**
		 * @param	src	: source
		 * @return	half width char
		 */
		, fnFullWidthToHalfWidth: function(src) {
			var halfWidth = "";
			var c;
			for(var i = 0; i < src.length; i++) {
				c = src.charCodeAt(i);
				if(c >= 65281 && c <= 65374 && c != 65340) {
					halfWidth += String.fromCharCode(c - 65248);
				} else if(c == 8217) {
					halfWidth += String.fromCharCode(39);
				} else if(c == 8221) {
					halfWidth += String.fromCharCode(34);
				} else if(c == 12288) {
					halfWidth += String.fromCharCode(32);
				} else if(c == 65507) {
					halfWidth += String.fromCharCode(126);
				} else if(c == 65509) {
					halfWidth += String.fromCharCode(92);
				} else {
					halfWidth += src.charAt(i);
				} 
			}
			return halfWidth;
		}
		/**
		 * @param	src	: source
		 * @return	true: full width, false: half width
		 */
		, fnIsFullWidth: function(src) {
			var c;
			for(var i = 0; i < src.length; i++) {
				c = src.charCodeAt(i);
				if(c < 256 || (c >= 0xff61 && c <= 0xff9f)) {
					return false;
				}
			}
			return true;
		}
		/**
		 * @param s	: string
		 * @return bytes length
		 */
		, fnGetByteLength: function(s) {
			return !s ? 0 : encodeURI(s).split(/%..|./).length - 1;
		}
		/**
		 * @param	fn: function name
		 * @param	t: text
		 */
		, fnLog: function(fn, t) {
			if(_LOG) console.log("[" + fn + "] " + t);
		}
	});
	$.fn.extend({
		/**
		 * @param e	: event
		 */
		goAnchor: function(e) {
			e.preventDefault();
			$("html,body").animate({scrollTop:($(this).attr("href") == "#" ? 0 : $($(this).attr("href")).offset().top)}, 500);
		}
		/**
		 * form serialize Array to JSON Object
		 * @return	json
		 */
		, formToJson: function() {
			var json = {};
			$.each($(this).serializeArray(), function(i, f) {json[f.name] = f.value || "";});
			return json;
		}
	});
})($);

