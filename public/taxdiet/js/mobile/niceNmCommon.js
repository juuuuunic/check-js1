/*
if (navigator.userAgent.match(/iPad/) == null
		&& navigator.userAgent.match(/iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS/) != null
		|| location.href.indexOf('m.taxdiet.co.kr') > -1) {
	history.pushState(null, null, location.href);
	window.onpopstate = function () {
		if (location.href.indexOf("NM_01001_DN1") >= 0) {
			if (navigator.userAgent.match(/iPhone|iPad/) != null) {
				history.go(-1);
				//history.go(1);
			}
		}
		else {
			history.go(1);
		}			
	};
}

// ios에서는 파일다운시 이미지를 브라우저에 보여주기때문에 뒤로가기가 필요해서 일단 허용
if (navigator.userAgent.match(/iPhone|iPad/) == null) {
	history.pushState(null, null, location.href);
	window.onpopstate = function () {
		history.go(1);
	};
}
*/

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
    	width : 300,
        height : 150,
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
            opener.goNDSMain('/cm/ndsLogin.do');
        } else {
            if (window.top.document.getElementById('frameDialog')) {
                window.top.$.frameDialog.close();
                alert("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9\ud574 \uc8fc\uc138\uc694.");
                window.top.location.href = '/cm/ndsLogin.do';
            } else {
                alert("\ub85c\uadf8\uc778 \ud6c4 \uc774\uc6a9\ud574 \uc8fc\uc138\uc694.");
                location.href = '/cm/ndsLogin.do';
            }
        }
        return false;
    }

    try{
    	$.msgDialog.close();
    	$.msgDialog.error(data.ex_Message);
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

function fancybox_open(pSrc, returnURL, pSession) {
	
	if (pSession==null) {
		pSession = true;
	}
	if (pSession) {
		// Session Check후 정상일때 url호출
		$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
			if (result.status) {
				$.fancybox.open({
			        src  : pSrc
			        ,type : 'iframe'
			        ,opts : {
			            iframe : {
			                scrolling : 'yes'
			            }
			            ,closeBtn   : false
			            ,slideShow  : false
			            ,fullScreen : false
			            ,thumbs     : false
						,closeClickOutside : false
			        }
			    });
			}
			else {
				alert(result.status_msg);
	
				f_go_login(returnURL);
			}
		}, 'json')
		.fail(function(jqXHR) {
		    //alert("URL 호출을 실패했습니다.");
			alert("오류가 발생하였습니다.");
		});
	} else {
		$.fancybox.open({
	        src  : pSrc
	        ,type : 'iframe'
	        ,opts : {
	            iframe : {
	                scrolling : 'yes'
	            }
	            ,closeBtn   : false
	            ,slideShow  : false
	            ,fullScreen : false
	            ,thumbs     : false
	            ,closeClickOutside : false
	        }
	    });
	}
}

function fancybox_open_height(pSrc, pHeight, returnURL, pSession) {
	
	if (pSession==null) {
		pSession = true;
	}
	
	if (pSession) {
		// Session Check후 정상일때 url호출
		$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
			if (result.status) {
				$.fancybox.open({
			        src  : pSrc
			        ,type : 'iframe'
			        ,opts : {
			            iframe : {
			                scrolling : 'yes'
			                ,css : {height : pHeight}
			            }
			            ,closeBtn   : false
			            ,slideShow  : false
			            ,fullScreen : false
			            ,thumbs     : false
			            ,closeClickOutside : false
			            //,smallBtn : 'yes'
			            ,onComplete : function() {
			            }
			        }
			    });
			}
			else {
				alert(result.status_msg);
	
				f_go_login(returnURL);
			}
		}, 'json')
		.fail(function(jqXHR) {
		    //alert("URL 호출을 실패했습니다.");
			alert("오류가 발생하였습니다.");
		});
	} else {
		$.fancybox.open({
	        src  : pSrc
	        ,type : 'iframe'
	        ,opts : {
	            iframe : {
	                scrolling : 'yes'
	                ,css : {height : pHeight}
	            }
	            ,closeBtn   : false
	            ,slideShow  : false
	            ,fullScreen : false
	            ,thumbs     : false
	            ,closeClickOutside : false
	            //,smallBtn : 'yes'
	            ,onComplete : function() {
	            }
	        }
	    });
	}
}

function fancybox_close() {
	parent.jQuery.fancybox.close();
}

function f_go_home() {
	// 홈으로 이동시 SessionOut된 경우 자동로그인 때문에 환급비원(대시보드)로 이동해서 메인페이지로 이동하도록 returnUrl보내줌
	location.href="/nm/NM_20001.do?returnURL=7F4250422D02330A2A3315410631";
}

function f_go_mypage() {
	location.href="/nm/NM_27011.do";
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
			parent.opener.top.location.href="/cm/ndsLoginNm.do?returnURL=" + pReturnURL;
			parent.window.close();
		}
		else {
			parent.location.href="/cm/ndsLoginNm.do?returnURL=" + pReturnURL;
		}
	}
	else {
		if (opener != null) {
			opener.top.location.href="/cm/ndsLoginNm.do?returnURL=" + pReturnURL;
			window.close();
		}
		else {
			location.href="/cm/ndsLoginNm.do?returnURL=" + pReturnURL;
		}
	}
}

function f_post_submit(pUrl, returnURL, callFunc) {
	$.post(pUrl, $("#form", document).serialize(), function(result) {
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
	.fail(function(jqXHR) {
	    //alert("URL 호출을 실패했습니다.");
		alert("오류가 발생하였습니다.");
	});
}

function f_ajax_submit(pUrl, pDataType, pData, returnURL, callFunc) {
	$.ajax({
		url : pUrl
		,type : "post"
		,dataType : pDataType
		,data : pData
		,success : function(result){
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
		,error : function(){
		    //alert("URL 호출을 실패했습니다.");
			alert("오류가 발생하였습니다.");
		}
	});
}

function f_ajax_content_submit(pUrl, pData, returnURL, callFunc, pProcessData, pContentType) {
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
       	type: 'POST',
       	success: function(result){
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
       	error : function(){	
		    //alert("URL 호출을 실패했습니다.");
			alert("오류가 발생하였습니다.");
       	}
	});
}

function f_form_submit(pUrl, returnURL) {
	// Session Check후 정상일때 url호출
	$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
		if (result.status) {
			$('#form').attr('action', pUrl).submit();
		}
		else {
			alert(result.status_msg);

			f_go_login(returnURL);
		}
	}, 'json')
	.fail(function(jqXHR) {
	    //alert("URL 호출을 실패했습니다.");
		alert("오류가 발생하였습니다.");
	});
}

function fancybox_chk(pUrl, chk) {
	$.fancybox.open({
		src  : pUrl
		,type : 'iframe'
		,opts : {
			iframe : {
				scrolling : 'yes'
			}
			,closeBtn   : false
			,slideShow  : false
			,fullScreen : false
			,thumbs     : false
			,closeClickOutside : false
			,onComplete : function() {	
				// var chkElement = $('.fancybox-iframe').contents().find('.common-btn__btn');
				// //var element = $('.fancybox-iframe').contents().find('.common-btn__btn');
				// chkElement.on('click', function() {
				// 	if($(this).attr('id') == 'btn_modify_submit') chk.prop("checked", true);
				// 	else chk.prop("checked", false);
				// });
				//f_chk_input();
			}, afterClose : function() {
				// console.log($("input:checkbox[value='Y']:checked").length)
				// if($("input:checkbox[value='Y']:checked").length == 2) $("input:checkbox[id='allCheck']").prop("checked", true);
				// else $("input:checkbox[id='allCheck']").prop("checked", false);
				// var inpElement = $("input:checkbox[value='Y']").prop("checked", true).length;
				// //if(inpElement == true) alert('hihi')
				// console.log(inpElement)
			}
		}
	});
}


function fancybox_chk_open(pSrc, returnURL, pSession) {
	
	if (pSession==null) {
		pSession = true;
	}
	if (pSession) {
		// Session Check후 정상일때 url호출
		$.post("/cm/CM_SESSION_VALID.do", "", function(result) {
			if (result.status) {
				$.fancybox.open({
			        src  : pSrc
			        ,type : 'iframe'
			        ,opts : {
			            iframe : {
			                scrolling : 'yes'
			            }
			            ,closeBtn   : false
			            ,slideShow  : false
			            ,fullScreen : false
			            ,thumbs     : false
						,closeClickOutside : false
			        }
			    });
			}
			else {
				alert(result.status_msg);
	
				f_go_login(returnURL);
			}
		}, 'json')
		.fail(function(jqXHR) {
		    //alert("URL 호출을 실패했습니다.");
			alert("오류가 발생하였습니다.");
		});
	} else {
		$.fancybox.open({
	        src  : pSrc
	        ,type : 'iframe'
	        ,opts : {
	            iframe : {
	                scrolling : 'yes'
	            }
	            ,closeBtn   : false
	            ,slideShow  : false
	            ,fullScreen : false
	            ,thumbs     : false
				,closeClickOutside : false
				,onComplete : function() {
					
					//f_chk_elements()
					//console.log(f_chk_input(arguments))
					//f_chk_input();
					// var chkElement = $('.fancybox-iframe').contents().find('.common-btn__btn');
					// chkElement.on('click', function() {
					// 	if($(this).attr('id') == 'btn_modify_submit') alert('hihi') //chk.prop("checked", true);
					// 	else chk.prop("checked", false);
					// });
				}, afterClose : function() {

					
				}
	        }
	    });
	}
}

//var ifrm = getIframe(".fancybox-iframe");
//console.log(ifrm.$("body > div"));

// function f_chk_elements() {	
// 	var btnElement = $('.fancybox-iframe').contents().find('.common-btn__btn');
// 	var inpElement = $(".wrap").find("input:checkbox[name='checked']");
// 	//console.log($(".wrap").find("input:checkbox[value='N']"))
// 	btnElement.on('click', function() {
// 		if($(this).attr('id') == 'btn_modify_submit') inpElement.prop("checked", true);

// 		if(inpElement.length == 2) $("input:checkbox[id='allCheck']").prop("checked", true);
// 		//else $("input:checkbox[id='allCheck']").prop("checked", false);
// 	});
// }

// function f_chk_input() {
// 	console.log(arguments)
// 	return arguments;
// }

