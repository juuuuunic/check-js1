/**
 * (c) Infotech, Inc.
 * @file	ift.nx.js
 * @desc	nicedata Non-ActiveX for EX-Adapter
 * @author	rwg
 * @since	2017.07.28
 */

function fnNiceNxRequest(data) {
	
	var dtc = fnDetect();
	data.url = location.protocol + '//' + location.host + data.url;
	
	var _nxIframe;
	var _nxSrc = "";
	var _nxParams = "";
	
	$.each(data, function(k, v) {
		if("sid" == k || "nxDialogUrl" == k || "nxLogoUrl" == k || "url" == k || "resUrl" == k || "resYnUrl" == k || "cid" == k || "transData" == k) {
			if("IE" == dtc.browser.family) {
				_nxParams += "&" + k + "=" + encodeURIComponent(encodeURIComponent(v));
			} else {
				_nxParams += "&" + k + "=" + encodeURIComponent(v);
			}
		} else if("inJson" == k) {
			_nxParams += "&" + k + "=" + ("IE" == dtc.browser.family ? encodeURIComponent(encodeURIComponent(JSON.stringify(v))) : encodeURIComponent(JSON.stringify(v)));
		} else {
			_nxParams += "&" + k + "=" + v;
		}
	});
	
	_nxSrc = "niceDmoa:niceParam?";
	_nxSrc += _nxParams.substring(1) + "&dummy=1";
	
	if("Mobile" == dtc.device.type || "Tablet" == dtc.device.type) {
		
	} else {
		
		_nxIframe = "<iframe id='nxIframe' frameborder='0' height='0' marginheight='0' marginwidth='0' scrolling='yes' width='0' topmargin='0'"
			+ " src='" + _nxSrc + "'"
			+ "></iframe>";
		
		if($("#nxFrame").length) {
			$("#nxFrame").html("");
		} else {
			$("body").append($("<div/>", {"id":"nxFrame"}));
		}
		$("#nxFrame").append(_nxIframe);
	}
	
	$.fnLog((arguments.callee.name || ""), _nxSrc);
}
