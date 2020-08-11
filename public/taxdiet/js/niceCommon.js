function context(){
	var Dns;
	Dns=location.href;
	Dns=Dns.split("//");
	var context = Dns[1]+"";
	context = context.split("/");
//	return "/" +context[1];
	return "";
}

var context;
context = context();

var NdsCommFunc = {
    imgOver : function($imgObj) {
        var image_src  = $imgObj.attr('src');
        var image_ext  = image_src.lastIndexOf('.') > 0 ? image_src.substring(image_src.lastIndexOf('.')) : '';
        var change_src = image_src.lastIndexOf('_on.') > 0 ? image_src : image_src.replace(image_ext, '_on' + image_ext);
        $imgObj.attr('src', change_src);
    },
    imgOut : function($imgObj) {
        var image_src  = $imgObj.attr('src');
        var image_ext  = image_src.lastIndexOf('.') > 0 ? image_src.substring(image_src.lastIndexOf('.')) : '';
        var change_src = image_src.lastIndexOf('_on.') > 0 ? image_src.replace('_on' + image_ext, image_ext) : image_src;
        $imgObj.attr('src', change_src);
    }
};

$(function() {
    /**
     * image swapping effect add
     */
    $('.swap_img').hover(function() {
        NdsCommFunc.imgOver($(this));
    }, function() {
        NdsCommFunc.imgOut($(this));
    });
});

/**
* \uc785\ub825\ub41c \uac12\uc774 \uc22b\uc790\uc778\uc9c0 \uccb4\ud06c
*/
function isNumber(key){
	if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105))
    {   /* '1' ~ '0' */
        return true;
    }else{
    	return false;
    }
}

/**
* \uc22b\uc790\uc640 -\ubd80\ud638\ub9cc \uc785\ub825\ub428
* onkeypress="isNumber2(this)"
*/
function isNumber2(obj){
	var key = window.event.keyCode;
	//alert(key);
	if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105))
    {   /* '1' ~ '0' */
        return true;
    }else if(key == 45){	//-\ubd80\ud638 \uc785\ub825 \uac00\ub2a5
    	return true;
    }
    else{
    	event.returnValue = false;
    }
}

/**
* \uc5d1\uc140 \ub2e4\uc6b4\ub85c\ub4dc \ud31d\uc5c5 \ud638\ucd9c
* btnVal : \ubc84\ud2bc id\ub610\ub294 \ud074\ub798\uc2a4(ex: #test, .test)
* bizURI : \uc5c5\ubb34\uc11c\ube44\uc2a4 URI
*/
function excelDownPop(btnVal, bizURI){
    $(btnVal).popupExcel({
  		windowURL : '../blank.html',
    	windowName : 'exceldown',
    	width : 500,
        height : 275,
        resizable : 0
    });
   	$('#form').attr('encoding', 'application/x-www-form-urlencoded');
   	$('#form').attr('action', bizURI);
   	$('#form').attr('target', 'exceldown');
   	$('#form').submit();
}

/*
 * \uc870\ud68c\uc2dc\uc791\uc77c\uc790\uac00 \uc870\ud68c \uc885\ub8cc\uc77c\uc790\uc758 \uc815\ud569\uc131 \uac80\uc99d
 */
function isValidYMD(startYMD, endYMD){
	if(startYMD.length != 8){
		alert("\uc870\ud68c\uc2dc\uc791\uc77c\uc790\ub97c \uc62c\ubc14\ub85c \uc785\ub825\ud558\uc138\uc694.");
		return false;
	}
	if(endYMD.length != 8){
		alert("\uc870\ud68c\uc885\ub8cc\uc77c\uc790\ub97c \uc62c\ubc14\ub85c \uc785\ub825\ud558\uc138\uc694.");
		return false;
	}
	var st = parseInt(startYMD, 10);
	var end = parseInt(endYMD, 10);
	
	if(st > end){
		alert("\uc870\ud68c\uc2dc\uc791\uc77c\uc790\ub294 \uc870\ud68c\uc885\ub8cc\uc77c\uc790\ubcf4\ub2e4 \ud074 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.");
		return false;
	}else{
		return true;
	}
}

function isValidYMD2(startYMD, endYMD){
	if(startYMD.length != 8){
		alert("\uce74\ub4dc\ubc1c\uae09\uc77c\uc790\ub97c \uc62c\ubc14\ub85c \uc785\ub825\ud558\uc138\uc694.");
		return false;
	}
	if(endYMD.length != 8){
		alert("\uce74\ub4dc\ud574\uc9c0\uc77c\uc790\ub97c \uc62c\ubc14\ub85c \uc785\ub825\ud558\uc138\uc694.");
		return false;
	}
	var st = parseInt(startYMD, 10);
	var end = parseInt(endYMD, 10);
	
	if(st > end){
		alert("\uce74\ub4dc\ubc1c\uae09\uc77c\uc790\ub294 \uce74\ub4dc\ud574\uc9c0\uc77c\uc790\ubcf4\ub2e4 \ud074 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.");
		return false;
	}else{
		return true;
	}
}

/**
* \ub3c4\uc6c0\ub9d0\uc744 \ud638\ucd9c\ud55c\ub2e4
* targetUrl : 
*/
function ndsHelper(btnVal, pgmId, menuCls){
//	$.frameDialog.open('form', { 
//		autoOpen : false
//		,message : ''
////			,timeout : 0
//		,title : 'NICE DATA ::: \ub3c4\uc6c0\ub9d0'
//		,hideTitlebar : false
//		,hideCloseBtn : true
//		,hideButtons : false
//		,closeText : '\ub2eb\uae30'
//		,method : 'post'
//		,modal : true
//		,resizable : false
//		,width : wid
//		,height : hei
//		,action : targetUrl
//	});

    if($('body #div_help').html() == null){
	    $('body').append('<div id="div_help" style="overflow:hidden;width:0px;height:0px;"></div>');
	    var form_html = '<form name="helpForm" id="helpForm" method="post">'
	    	          + '<input type="hidden" name="pgmId" value="' + pgmId + '">'
	                  + '<input type="hidden" name="menuCls" value="' + menuCls + '">'
	                  + '</form>';
	    $('body #div_help').html(form_html);
    }
    
    $(btnVal).popupHelp({
  		windowURL : '../blank.html',
    	windowName : 'helpPopup',
    	width : 900,
        height : 600,
        resizable : 0,
        scrollbars:1
    });
    
   	$('#helpForm').attr('action', context + '/cm/CM_01119_SL.do');
   	$('#helpForm').attr('target', 'helpPopup');
   	$('#helpForm').submit();
}

/**
* \ud31d\uc5c5\ucc3d\uc73c\ub85c \ub744\uc6e0\uc744\uacbd\uc6b0 \ub85c\uadf8\uc778 \ud398\uc774\uc9c0 \uc804\ud658\ucc98\ub9ac
*/
function goNDSMain(uri){
	if(opener && !opener.closed) {
		window.close();
		opener.goNDSMain(uri);
	} else {
		if(parent.document.getElementById("frameDialog")){
			window.parent.$.frameDialog.close();
			alert("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9\ud574 \uc8fc\uc138\uc694.");
			parent.location.href = uri;
		}else{
			alert("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9\ud574 \uc8fc\uc138\uc694.");
			location.href = uri;
		}
	}
}


/**
* \uc5d0\ub7ec \uc0c1\uc138\ub0b4\uc6a9
* data : 
*/
function ndsExceptionMsg(data) {
    if (data == null || data.ex_Message == '' || data.ex_Message == undefined) {
        return true;
    }
    
    if (data.ex_Message == "Session attribute 'loginInfo' required - not found in session") {
        if (window.opener && !window.opener.closed) {
            window.close();
            opener.goNDSMain('/cm/nTdLogin.do');
        } else {
            if (window.top.document.getElementById('frameDialog')) {
                window.top.$.frameDialog.close();
                alert("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9\ud574 \uc8fc\uc138\uc694.");
                window.top.location.href = '/cm/nTdLogin.do';
            } else {
                alert("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9\ud574 \uc8fc\uc138\uc694.");
                location.href = '/cm/nTdLogin.do';
            }
        }
        return false;
    }

    try{
    	progress.stop();
    	alert(data.ex_Message);
    }catch(exception){
    }

    return false;
}



function fnDayCalcul(s, i){
	s = converPosi(s);
	var newDt = new Date(s);
	newDt.setDate( newDt.getDate() - i );
	return converDateString(newDt);
}
function fnMonCalcul(s, i){
	i = i/30;
	s = converPosi(s);
	var newDt = new Date(s);
	var nowDay = s.substring(3, 5);
	newDt.setMonth( newDt.getMonth() - i );
	newDt.setDate(nowDay);
	return converDateString(newDt);
}
function converPosi(s){
	s = s.replace(/[^0-9]/gi, "");
	var y = s.substring(0, 4);
	var m = s.substring(4, 6);
	var d = s.substring(6, 8);
	return m+"/"+d+"/"+y;
}
function converDateString(dt){
	return dt.getFullYear() + "-" + addZero(eval(dt.getMonth()+1)) + "-" + addZero(dt.getDate());
}
function addZero(i){
	var rtn = i + 100;
	return rtn.toString().substring(1,3);
}

function fn_addMonth(pdate, pAddMonthCnt) {
	pdate = pdate.replaceAll('-', '');
	var pYear = pdate.substring(0,4);
	var pMonth = pdate.substring(4,6);
	var pDay = pdate.substring(6,8);
	
	var oDate = new Date(pYear, pMonth, 1);
	oDate.setMonth(oDate.getMonth() + pAddMonthCnt);
	var iLastDate = (new Date(oDate.getFullYear(), oDate.getMonth()+2, 0).getDate());
	oDate.setDate((parseInt(pDay)>iLastDate)?iLastDate:parseInt(pDay));
	return oDate.getFullYear() + "-" + fn_lpad(oDate.getMonth(),2,"0") + "-" + fn_lpad(oDate.getDate(),2,"0");
}


/**
 * placeholder 는 input box에서 기본값을 만들어 주는 태그이다.
 * IE의 경우는 10부터 지원이 되어서 9이하도 동작할 수 있도록 추가함
 * @param $
 */
(function ($) {
	$.support.placeholder = ('placeholder' in document.createElement('input'));
})(jQuery);


//fix for IE7 and IE8
$(function () {
    if (!$.support.placeholder) {
        $("[placeholder]").focus(function () {
            if ($(this).val() == $(this).attr("placeholder")) $(this).val("");
        }).blur(function () {
            if ($(this).val() == "") $(this).val($(this).attr("placeholder"));
        }).blur();

        $("[placeholder]").parents("form").submit(function () {
            $(this).find('[placeholder]').each(function() {
                if ($(this).val() == $(this).attr("placeholder")) {
                    $(this).val("");
                }
            });
        });
    }
});


/*
 * doctype이 xhtml일때 text-overflow 속성 대체 메소드
 * 해당 element의 visible 기본값은 hidden이어야 함
 * 해당 element의 width는 고정되어 있어야 함
 * 1줄은 ellipsis, 2줄은 ellipsis2Row
 * 
 * ajax로 호출하는 데이터를 말줄임 해야할 경우, main_sub.jsp의 46, 62~66번째줄 참고
 */
function textEllipsis(elem, rowCnt){
	var obj = {
		text		: elem.html(),
		height    	: elem.height(),
		classes		: elem.attr("class"), 
		baseHeight 	: Number( elem.css("line-height").replace("px","") ),
		minHeight 	: 24,
		checked 	: false
	}
	
	/* 기준 높이 설정 */ 
	if( obj.baseHeight < obj.minHeight ) {
		obj.baseHeight = obj.minHeight;
	}
	
	obj.baseHeight *= rowCnt;
			
	/* 텍스트 줄이기 */
	var text = obj.text;
	while( obj.height > obj.baseHeight ){
		text = text.substring(0, text.length-1);
		elem.html(text);
		obj.height = elem.height();
		obj.checked = true;
		
	}
				
	/* 말줄임표 붙이기 */
	var ellipsis = "…";
	if( obj.checked == true ){
		text = text.substring(0, text.length-3);
		text += ellipsis;
		elem.html(text);
			
	}
	
	elem.css("visibility","visible");
}

function nvl(str, pattern){
	return str === null? pattern : str;
}

function f_go_home() {
	location.href="/cm/main.do";
}

function f_go_mypage() {
	location.href="/cl/CL_01001_SL.do";
}

function f_go_login(pReturnURL) {
	var fancyBoxObj = false;

	try {
		fancyBoxObj = parent.jQuery.fancybox;
	}
	catch (e) {
		fancyBoxObj = false;
	}

	if (fancyBoxObj) {
		parent.jQuery.fancybox.close();

		if (parent.opener != null) {
			parent.opener.top.location.href="/cm/nTdLogin.do?returnURL=" + pReturnURL;
			parent.window.close();
		}
		else {
			parent.location.href="/cm/nTdLogin.do?returnURL=" + pReturnURL;
		}
	}
	else {
		// ie가 이상하게 동작해서 추가함
	    if (getIeVersion()) {
	    	location.href = "<c:out value='${ndsLoginURL}' escapeXml='false' />";
	    }
	    else {
			if (opener != null) {
				opener.top.location.href = "<c:out value='${ndsLoginURL}' escapeXml='false' />";
				window.close();
			}
			else {
				location.href = "<c:out value='${ndsLoginURL}' escapeXml='false' />";
			}
	    }
	}
}

function f_open_window_pos(w, h) {
	var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
	var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	var left = ((width / 2) - (w / 2)) + dualScreenLeft;
	var top = ((height / 2) - (h / 2)) + dualScreenTop;	

	return new Array(left, top);
}

function fancybox_close() {
	parent.jQuery.fancybox.close();
}
// 팝업 확인 위해 임시 주석처리
// function fancybox_open(pSrc, returnURL, pSmallBtn, pScroll) {
// 	if (pSmallBtn==null || pSmallBtn=="" || pSmallBtn=="no") {
// 		pSmallBtn = false;
// 	}
// 	if (pScroll==null || pScroll=="") {
// 		pScroll = "no";
// 	}

// 	// Session Check후 정상일때 url호출
// 	$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
// 		if (result.status) {
// 			$.fancybox.open({
// 		        src  : pSrc
// 		        ,type : 'iframe'
// 		        ,opts : {
// 		            iframe : {
// 		                scrolling : pScroll
// 		            }
// 		            ,closeBtn   : false
// 		            ,slideShow  : false
// 		            ,fullScreen : false
// 		            ,thumbs     : false
// 		            ,closeClickOutside : false
// 		            ,smallBtn : pSmallBtn
// 		            ,onComplete : function() {
// 		            }
// 		        }
// 		    });
// 		}
// 		else {
// 			alert(result.status_msg);

// 			if (returnURL==null || returnURL=="") {
// 				returnURL = location.pathname;
// 			}

// 			f_go_login(returnURL);
// 		}
// 	}, 'json')
// 	.fail(function(jqXHR) {
// 	    //alert("URL 호출을 실패했습니다.");
// 		alert("오류가 발생하였습니다.");
// 	});
// }

// function fancybox_open_height(pSrc, pHeight, returnURL, pSmallBtn, pScroll) {
// 	if (pSmallBtn==null || pSmallBtn=="" || pSmallBtn=="no") {
// 		pSmallBtn = false;
// 	}
// 	if (pScroll==null || pScroll=="") {
// 		pScroll = "no";
// 	}

// 	// Session Check후 정상일때 url호출
// 	$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
// 		if (result.status) {
// 			$.fancybox.open({
// 		        src  : pSrc
// 		        ,type : 'iframe'
// 		        ,opts : {
// 		            iframe : {
// 		                scrolling : pScroll
// 		                ,css : {height : pHeight}
// 		            }
// 		            ,closeBtn   : false
// 		            ,slideShow  : false
// 		            ,fullScreen : false
// 		            ,thumbs     : false
// 		            ,closeClickOutside : false
// 		            ,smallBtn : pSmallBtn
// 		            ,onComplete : function() {
// 		            }
// 		        }
// 		    });
// 		}
// 		else {
// 			alert(result.status_msg);

// 			if (returnURL==null || returnURL=="") {
// 				returnURL = location.pathname;
// 			}

// 			f_go_login(returnURL);
// 		}
// 	}, 'json')
// 	.fail(function(jqXHR) {
// 	    //alert("URL 호출을 실패했습니다.");
// 		alert("오류가 발생하였습니다.");
// 	});
// }

// function fancybox_open_width(pSrc, pWidth, returnURL, pSmallBtn, pSession, pScroll) {
// 	if (pSmallBtn==null || pSmallBtn=="" || pSmallBtn=="no") {
// 		pSmallBtn = false;
// 	}
// 	if (pSession==null) {
// 		pSession = true;
// 	}
// 	if (pScroll==null || pScroll=="") {
// 		pScroll = "no";
// 	}

// 	if (pSession) {
// 		// Session Check후 정상일때 url호출
// 		$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
// 			if (result.status) {
// 				$.fancybox.open({
// 			        src  : pSrc
// 			        ,type : 'iframe'
// 			        ,opts : {
// 			            iframe : {
// 			                scrolling : pScroll
// 			                ,css : {width : pWidth}
// 			            }
// 			            ,closeBtn   : false
// 			            ,slideShow  : false
// 			            ,fullScreen : false
// 			            ,thumbs     : false
// 			            ,closeClickOutside : false
// 			            ,smallBtn : pSmallBtn
// 			            ,onComplete : function() {
// 			            }
// 			        }
// 			    });
// 			}
// 			else {
// 				alert(result.status_msg);
	
// 				if (returnURL==null || returnURL=="") {
// 					returnURL = location.pathname;
// 				}
	
// 				f_go_login(returnURL);
// 			}
// 		}, 'json')
// 		.fail(function(jqXHR) {
// 		    //alert("URL 호출을 실패했습니다.");
// 			alert("오류가 발생하였습니다.");
// 		});
// 	}
// 	else {
// 		$.fancybox.open({
// 	        src  : pSrc
// 	        ,type : 'iframe'
// 	        ,opts : {
// 	            iframe : {
// 	                scrolling : pScroll
// 	                ,css : {width : pWidth}
// 	            }
// 	            ,closeBtn   : false
// 	            ,slideShow  : false
// 	            ,fullScreen : false
// 	            ,thumbs     : false
// 	            ,closeClickOutside : false
// 	            ,smallBtn : pSmallBtn
// 	            ,onComplete : function() {
// 	            }
// 	        }
// 	    });
// 	}
// }

// function fancybox_open_width_height(pSrc, pWidth, pHeight, returnURL, pSmallBtn, pSession, pScroll) {
// 	if (pSmallBtn==null || pSmallBtn=="" || pSmallBtn=="no") {
// 		pSmallBtn = false;
// 	}
// 	if (pSession==null) {
// 		pSession = true;
// 	}
// 	if (pScroll==null || pScroll=="") {
// 		pScroll = "no";
// 	}

// 	if (pSession) {
// 		// Session Check후 정상일때 url호출
// 		$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
// 			if (result.status) {
// 				$.fancybox.open({
// 			        src  : pSrc
// 			        ,type : 'iframe'
// 			        ,opts : {
// 			            iframe : {
// 			                scrolling : pScroll
// 			                ,css : {width : pWidth, height : pHeight}
// 			            }
// 			            ,closeBtn   : false
// 			            ,slideShow  : false
// 			            ,fullScreen : false
// 			            ,thumbs     : false
// 			            ,closeClickOutside : false
// 			            ,smallBtn : pSmallBtn
// 			            ,onComplete : function() {
// 			            }
// 			        }
// 			    });
// 			}
// 			else {
// 				alert(result.status_msg);
	
// 				if (returnURL==null || returnURL=="") {
// 					returnURL = location.pathname;
// 				}
	
// 				f_go_login(returnURL);
// 			}
// 		}, 'json')
// 		.fail(function(jqXHR) {
// 		    //alert("URL 호출을 실패했습니다.");
// 			alert("오류가 발생하였습니다.");
// 		});
// 	}
// 	else {
// 		$.fancybox.open({
// 	        src  : pSrc
// 	        ,type : 'iframe'
// 	        ,opts : {
// 	            iframe : {
// 	                scrolling : pScroll
// 	                ,css : {width : pWidth, height : pHeight}
// 	            }
// 	            ,closeBtn   : false
// 	            ,slideShow  : false
// 	            ,fullScreen : false
// 	            ,thumbs     : false
// 	            ,closeClickOutside : false
// 	            ,smallBtn : pSmallBtn
// 	            ,onComplete : function() {
// 	            }
// 	        }
// 	    });
// 	}
// }

// 팝업 확인 위해 Session check none
function fancybox_open(pSrc, returnURL, pSmallBtn, pScroll) {
	$.fancybox.open({
		src  : pSrc
		,type : 'iframe'
		,opts : {
			iframe : {
				scrolling : pScroll
			}
			,closeBtn   : false
			,slideShow  : false
			,fullScreen : false
			,thumbs     : false
			,closeClickOutside : false
			,smallBtn : pSmallBtn
			,onComplete : function() {
			}
		}
	});
}

function fancybox_open_height(pSrc, pHeight, returnURL, pSmallBtn, pScroll) {
	$.fancybox.open({
		src  : pSrc
		,type : 'iframe'
		,opts : {
			iframe : {
				scrolling : pScroll
				,css : {height : pHeight}
			}
			,closeBtn   : false
			,slideShow  : false
			,fullScreen : false
			,thumbs     : false
			,closeClickOutside : false
			,smallBtn : pSmallBtn
			,onComplete : function() {
			}
		}
	});
}

function fancybox_open_width(pSrc, pWidth, returnURL, pSmallBtn, pSession, pScroll) {
	$.fancybox.open({
		src  : pSrc
		,type : 'iframe'
		,opts : {
			iframe : {
				scrolling : pScroll
				,css : {width : pWidth}
			}
			,closeBtn   : false
			,slideShow  : false
			,fullScreen : false
			,thumbs     : false
			,closeClickOutside : false
			,smallBtn : pSmallBtn
			,onComplete : function() {
			}
		}
	});
}

function fancybox_open_width_height(pSrc, pWidth, pHeight, returnURL, pSmallBtn, pSession, pScroll) {
	$.fancybox.open({
		src  : pSrc
		,type : 'iframe'
		,opts : {
			iframe : {
				scrolling : pScroll
				,css : {width : pWidth, height : pHeight}
			}
			,closeBtn   : false
			,slideShow  : false
			,fullScreen : false
			,thumbs     : false
			,closeClickOutside : false
			,smallBtn : pSmallBtn
			,onComplete : function() {
			}
		}
	});
}


function f_post_submit(pUrl, returnURL, callFunc) {
	progress.start();

	$.post(pUrl, $("#form", document).serialize(), function(result) {
		progress.stop();

		if (result.ex_Message != null && result.ex_Message != "") {
			alert(result.ex_Message);

			// Session종료인 경우
			if (result.returnURL!="") {
				if (returnURL==null || returnURL=="") {
					returnURL = result.returnURL;
				}

				f_go_login(returnURL);
			}
		}
		else {
			if (callFunc!=null && callFunc!="") {
				window[callFunc](result);
			}
			else {
				f_call_result(result);
			}
		}
	}, 'json')
	.fail(function(request,status,error){
   		var errorMsg = "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error;

   		console.log(errorMsg);

		progress.stop();

		alert(error);
	});
}

function f_ajax_submit(pUrl, pDataType, pData, returnURL, callFunc) {
	progress.start();

	$.ajax({
		url : pUrl
		,type : "post"
		,dataType : pDataType
		,data : pData
		,success : function(result){
		    progress.stop();

			if (result.ex_Message != null && result.ex_Message != "") {
				alert(result.ex_Message);

				// Session종료인 경우
				if (result.returnURL!="") {
					if (returnURL==null || returnURL=="") {
						returnURL = result.returnURL;
					}

					f_go_login(returnURL);
				}
			}
			else {
				if (callFunc!=null && callFunc!="") {
					window[callFunc](result);
				}
				else {
					f_call_result(result);
				}
			}
		}
		,error : function(request,status,error){
       		var errorMsg = "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error;

       		console.log(errorMsg);

    		progress.stop();

    		alert(error);
       	}
	});
}

//파일업로드시 ajaxSubmit 방식이 안되는 경우가 있어서 formData방식을 사용함
function f_ajax_content_submit(pUrl, pData, returnURL, callFunc, pProcessData, pContentType) {
	progress.start();

	if (pProcessData==null || pProcessData=="") {
		pProcessData = false;
	}

	if (pContentType==null || pContentType=="") {
		pContentType = false;
	}

	$.ajax({
		url: pUrl,
       	processData: pProcessData,
       	contentType: pContentType,
       	data: pData,
       	type: "post",
       	success: function(result){
		    progress.stop();

			if (result.ex_Message != null && result.ex_Message != "") {
				alert(result.ex_Message);

				// Session종료인 경우
				if (result.returnURL!="") {
					if (returnURL==null || returnURL=="") {
						returnURL = result.returnURL;
					}

					f_go_login(returnURL);
				}
			}
			else {
				if (callFunc!=null && callFunc!="") {
					window[callFunc](result);
				}
				else {
					f_call_result(result);
				}
			}
       	},
       	error : function(request,status,error){
       		var errorMsg = "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error;

       		console.log(errorMsg);

    		progress.stop();

    		alert(error);
    	    //alert("URL 호출을 실패했습니다.");
       	}
	});
}

// 파일업로드시 formData 방식이 ie11에서 오류가 발생하는 경우가 있어서 ajaxSubmit방식을 사용함
function f_ajax_submit_content(pUrl, returnURL, callFunc) {
	progress.start();

	$("#form").ajaxSubmit({
		url : pUrl,
		success : function(result, status, xhr, $form) {
		    progress.stop();

			if (result.ex_Message != null && result.ex_Message != "") {
				alert(result.ex_Message);

				// Session종료인 경우
				if (result.returnURL!="") {
					if (returnURL==null || returnURL=="") {
						returnURL = result.returnURL;
					}

					f_go_login(returnURL);
				}
			}
			else {
				if (callFunc!=null && callFunc!="") {
					window[callFunc](result);
				}
				else {
					f_call_result(result);
				}
			}
	   },
       error : function(request,status,error){
    	   var errorMsg = "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error;

    	   console.log(errorMsg);

    	   progress.stop();

    	   alert(error);
       },
	   dataType : "json"
	});
}

function f_form_submit(pUrl, returnURL, callFunc) {
	progress.start();

	// Session Check후 정상일때 url호출
	$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
		if (result.status) {
			$('#form').attr('action', pUrl).submit();
		}
		else {
		    progress.stop();

			if (callFunc!=null && callFunc!="") {
				window[callFunc](result);
			}
			else {
				alert(result.status_msg);

				if (returnURL==null || returnURL=="") {
					returnURL = location.pathname;
				}

				f_go_login(returnURL);
			}
		}
	}, 'json')
	.fail(function(request,status,error){
   		var errorMsg = "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error;

   		console.log(errorMsg);

		progress.stop();

		alert(error);
	});
}

function f_form_submit_nosession(pUrl) {
	progress.start();

	$('#form').attr('action', pUrl).submit();
}

function f_location_href(pUrl, returnURL, callFunc) {
	progress.start();

	// Session Check후 정상일때 url호출
	$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
		if (result.status) {
			location.href = pUrl;
		}
		else {
		    progress.stop();

			if (callFunc!=null && callFunc!="") {
				window[callFunc](result);
			}
			else {
				alert(result.status_msg);

				if (returnURL==null || returnURL=="") {
					returnURL = location.pathname;
				}

				f_go_login(returnURL);
			}
		}
	}, 'json')
	.fail(function(request,status,error){
   		var errorMsg = "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error;

   		console.log(errorMsg);

		progress.stop();

		alert(error);
	});
}

function f_location_href_nosession(pUrl) {
	progress.start();

	location.href = pUrl;
}

function f_naviForm_submit(pUrl, returnURL, callFunc) {
	progress.start();

	// Session Check후 정상일때 url호출
	$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
		if (result.status) {
			$('#naviForm').attr('action', pUrl).submit();
		}
		else {
		    progress.stop();

			if (callFunc!=null && callFunc!="") {
				window[callFunc](result);
			}
			else {
				alert(result.status_msg);

				if (returnURL==null || returnURL=="") {
					returnURL = location.pathname;
				}

				f_go_login(returnURL);
			}
		}
	}, 'json')
	.fail(function(request,status,error){
   		var errorMsg = "code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error;

   		console.log(errorMsg);

		progress.stop();

		alert(error);
	});
}
