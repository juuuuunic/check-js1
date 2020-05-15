 /* --------------------------------------------------
 알파벳인지 체크
 ------------------------------------------------*/
 function isAlphabet(ch) {
	var numUnicode = ch.charCodeAt(0); // number of the decimal Unicode
	if ( 65 <= numUnicode && numUnicode <= 90 ) return true; // 대문자
	if ( 97 <= numUnicode && numUnicode <= 122 ) return true; // 소문자
	return false;
 }

 /* --------------------------------------------------
 한글인지 체크
 ------------------------------------------------*/
 function isKorean(ch) {
	var numUnicode = ch.charCodeAt(0);
	if ( 44032 <= numUnicode && numUnicode <= 55203 || 12593 <= numUnicode && numUnicode <= 12643 ) return true;
 return false;
 }

 /* --------------------------------------------------
 숫자인지 체크
 ------------------------------------------------*/
 function isNumber(ch) {
	var numUnicode = ch.charCodeAt(0);
	if ( 48 <= numUnicode && numUnicode <= 57 ) return true;
 return false;
 }

 function is_Num(temp){
	 for(var i=0;i<temp.value.length;i++){
		 if(temp.value.charAt(i)>='0'&& temp.value.charAt(i)<='9'){
			 continue;
		 }else{
			 alert('숫자만 입력할 수 있습니다.');
			 temp.value="";
			 temp.focus();
			 return false;
		 }
	 }
	 return true;
 }

 function checkNum(temp){
	 for(var i=0;i<temp.value.length;i++){
		 if(temp.value.charAt(i)>='0'&& temp.value.charAt(i)<='9' || temp.value.charAt(i)=='-'){
			 continue;
		 }else{
			 alert('숫자만 입력할 수 있습니다.');
			 temp.value="";
			 temp.focus();
			 return false;
		 }
	 }
	 return true;
 }
 /* --------------------------------------------------
 숫자인지 체크
 ------------------------------------------------*/
 function is_Day(o){
	 checkNum(o);
	 var nocomma = o.value.replace(/-/gi,''); // 불러온 값중에서 컴마를 제거
		 var b = ''; // 값을 넣기위해서 미리 선언
		 var i = 0; // 뒤에서 부터 몇번째인지를 체크하기 위한 변수 선언

		 // 숫자를 뒤에서 부터 루프를 이용하여 불러오기
		 for (var k=0; k<(nocomma.length); k++) {
				 var a = nocomma.charAt(k);

				 if (k == 0 && a == 0) { // 첫자리의 숫자가 0인경우 입력값을 취소 시킴
						 o.value = '';
						 return;
				 }else {
						 // 뒤에서 3으로 나누었을때 나머지가 0인경우에 컴마 찍기
						 //i가 0인 경우는 제일 뒤에 있다는 것이므로 컴마를 찍으면 안됨
						 if (i == 4) {
								 b = b + "-" + a;
						 } else if(i == 6) {
							 b = b + "-" + a;
						 } else { // 나머지가 0인 아닌경우 컴마없이 숫자 붙이기
								 b = b + a;
						 }

						 i++;
				 }
		 }

		 o.value = b; // 최종값을 input값에 입력하기
		 return;
 }

 function is_bzNo(o){
	 checkNum(o);
	 var nocomma = o.value.replace(/-/gi,''); // 불러온 값중에서 컴마를 제거
		 var b = ''; // 값을 넣기위해서 미리 선언
		 var i = 0; // 뒤에서 부터 몇번째인지를 체크하기 위한 변수 선언

		 // 숫자를 뒤에서 부터 루프를 이용하여 불러오기
		 for (var k=0; k<(nocomma.length); k++) {
				 var a = nocomma.charAt(k);

				 if (k == 0 && a == 0) { // 첫자리의 숫자가 0인경우 입력값을 취소 시킴
						 o.value = '';
						 return;
				 }else {
						 // 뒤에서 3으로 나누었을때 나머지가 0인경우에 컴마 찍기
						 //i가 0인 경우는 제일 뒤에 있다는 것이므로 컴마를 찍으면 안됨
						 if (i == 3) {
								 b = b + "-" + a;
						 } else if(i == 5) {
							 b = b + "-" + a;
						 } else { // 나머지가 0인 아닌경우 컴마없이 숫자 붙이기
								 b = b + a;
						 }

						 i++;
				 }
		 }

		 o.value = b; // 최종값을 input값에 입력하기
		 return;
 }

 function isDate(day){
		var str = day.replace(/-/,"");
		str = str.replace(/-/,"");

		if(str.length != 8) return false;

		var arrMonthByDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var strYY = parseInt(str.substring(0, 4),10);
		var strMonth = parseInt(str.substring(4, 6),10);
		var strDay = parseInt(str.substring(6, 8),10);

		//월 check
		if(strMonth < 1 || strMonth > 12) return false;

		//일 check
		if(strMonth == 0) return false;

		//윤년이면 2월은 29일로 변경
		if(((strYY % 4 == 0) && (strYY % 100 != 0)) || (strYY % 400 == 0)) arrMonthByDay[1] = 29;
		if(strDay > arrMonthByDay[strMonth-1]) return false;

		return true;
	}

 function langChk(attribute){
	var rule = attribute.vcheck;
	var value = attribute.value;
	var str = lastLan(value);
	var chk = false;

	if(rule){
	 if(rule.indexOf("en") < 0 && !chk && str){
		chk = isAlphabet(str);
	 }
	 if(rule.indexOf("int") < 0 && !chk && str){
		chk = isNumber(str);
	 }
	 if(rule.indexOf("kr") < 0 && !chk && str){
		chk = isKorean(str);
	 }
	}

	if(chk){
	 alert('형식에 맞는 문자 및 숫자만 입력가능합니다.');
	 attribute.value = "";
	}
 }

 function cf_email(val) {
	if( val == 'undefined' ) return false;
	for(var l=0;l<=(val.length-1);l++)
	{
		if(val.indexOf(' ')>=0)
		{
			return false;
		}
	}
	if((val.indexOf('/'))!=-1 || (val.indexOf(';'))!=-1)
	{
		return false;
	}
	if((val.length!=0)&&(val.search(/(\S+)@(\S+)\.(\S+)/)==-1))
	{
		return false;
	}
	return true;
}
//금액입력시(','을 자동생성)//첫번째 자리에 0을 입력할 수 없는 스크립트
function commify(objInput){
	var reg = /(^[+-]?\d+)(\d{3})/;
	var val = objInput.value;
	for(var i=0;i<val.length;i++){
	if(i==0 && val==0){
		 alert('첫번째 자리는 0을 입력할 수 없습니다.');
		 objInput.value="";
		 objInput.focus();
		 return false;
	}else{
	if(val.charAt(i)>='0'&& val.charAt(i)<='9'|| val.charAt(i)==','){
	if(val)	val = val.split(",").join("");
	while(reg.test(val)){
		val = val.replace(reg,'$1'+','+'$2');
	}
	objInput.value = val;
	}else{
		 alert('숫자만 입력할 수 있습니다.');
		 objInput.value="";
		 objInput.focus();
		 return false;
	}
	}
	}
	 return true;
}
//금액입력시(','을 자동생성)//첫번째 자리에 0을 입력할 수 없는 스크립트
function commify1(objInput){
	var reg = /(^[+-]?\d+)(\d{3})/;
	var val = objInput.value;
	for(var i=0;i<val.length;i++){
	if(val.charAt(i)>='0'&& val.charAt(i)<='9'|| val.charAt(i)==','){
	if(val)	val = val.split(",").join("");
	while(reg.test(val)){
		val = val.replace(reg,'$1'+','+'$2');
	}
	objInput.value = val;
	}else{
		 alert('숫자만 입력할 수 있습니다.');
		 objInput.value="";
		 objInput.focus();
		 return false;
	}
	}
	 return true;
}
//한글,영어,(),숫자만 입력가능(성명,은행명,예금주 입력형식)
function onlyko_en(ch) {
	//var numUnicode = ch.charCodeAt(0); // number of the decimal Unicode
	for(var i=0;i<ch.value.length;i++){
		var on_key = ch.value.charAt(i);
		//if(!(ch.value.charAt(i)>='0'&& ch.value.charAt(i)<='9')){
		 if(!(on_key.search(/[()|0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/)==-1)){
			 continue;
		 }else{
			 alert('일부 특수문자는 입력할 수 없습니다.');
			 ch.value="";
			 ch.focus();
			 return false;
		 }
	}
	return true;
}

//한글,영어,(),숫자만 입력가능(성명,은행명,예금주 입력형식)
function onlyko_en_b(ch) {
	//var numUnicode = ch.charCodeAt(0); // number of the decimal Unicode
	for(var i=0;i<ch.value.length;i++){
		var on_key = ch.value.charAt(i);
		//if(!(ch.value.charAt(i)>='0'&& ch.value.charAt(i)<='9')){
		 if(!(on_key.search(/[()|0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝]/)==-1)){
			 continue;
		 }else if(on_key!=' '){
			 alert('일부 특수문자는 입력할 수 없습니다.');
			 ch.value="";
			 ch.focus();
			 return false;
		 }
	}
	return true;
}

//쿠키 저장 (쿠키 이름, 값, 저장 기간)
 function setCookie(name, value, expiredays) {
	var todayDate = new Date();
	if (expiredays == null) expiredays = 1;
	todayDate.setDate( todayDate.getDate() + expiredays );
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
 }

 //쿠키 가져오기
 function getCookie(name){
	var nameOfCookie = name + "=";
	var x = 0;
	while ( x <= document.cookie.length ){
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) endOfCookie = document.cookie.length;
			return unescape( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if ( x == 0 ) break;
	}
	return "";
 }

 //달력2 //2012/10/02추가
 //		2012/11/20/이영금-리스트형태의 날짜 입력창일 경우 id로 지정하면 하나만 나오므로 공통으로 사용가능하도록 class 지정 추가
$(function() {
	make_cal();
});

function make_cal() {	 
		$( "#startDay1, #startDay2, #startDay3, #startDay4, #startDay5, #startDay6, #startDay01, #startDay02, #startDay03, #startDay04, #startDay05, #startDay06, #startDay07, #startDay08" ).datepicker({
		 showOn: "button",
		 changeMonth: true,
		 changeYear: true,
		 yearRange: 'c-100:c+10',
		 buttonImage: "/images/img/img_date1.gif",
		 buttonImageOnly: true,
		 closeText : '닫기',
		 prevText : '이전달',
		 nextText : '다음달',
		 currentText : '오늘',
		 monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		 monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		 dayNames : ['일', '월', '화', '수', '목', '금', '토'],
		 dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
		 dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
		 weekHeader : 'Wk',
		 dateFormat : 'yy-mm-dd',
		 firstDay : 0,
		 isRTL : false,
		 showMonthAfterYear : false,
		 yearSuffix : '년',
		 showMonthAfterYear: true //년 뒤에 월 표시
		});
		$( ".startDay1, .startDay2, .startDay3, .startDay4" ).datepicker({
			 showOn: "button",
			 changeMonth: true,
			 changeYear: true,
			 yearRange: 'c-100:c+10',
			 buttonImage: "/images/img/img_date1.gif",
			 buttonImageOnly: true,
			 closeText : '닫기',
			 prevText : '이전달',
			 nextText : '다음달',
			 currentText : '오늘',
			 monthNames : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			 monthNamesShort : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			 dayNames : ['일', '월', '화', '수', '목', '금', '토'],
			 dayNamesShort : ['일', '월', '화', '수', '목', '금', '토'],
			 dayNamesMin : ['일', '월', '화', '수', '목', '금', '토'],
			 weekHeader : 'Wk',
			 dateFormat : 'yy-mm-dd',
			 firstDay : 0,
			 isRTL : false,
			 showMonthAfterYear : false,
			 yearSuffix : '년',
			 showMonthAfterYear: true //년 뒤에 월 표시
			});
		$("img.ui-datepicker-trigger").attr("style","margin-left:5px; vertical-align:middle; cusor:pointer;");//이미지 버튼
		$("#ui-datepicker-div").hide();//자동으로 생성되는 div객체 숨김
}
//글자 깜빡임 효과
 function doBlink() {
 var blink = document.all.tags("BLINK")
 for (var i=0; i < blink.length; i++)
 blink[i].style.visibility = blink[i].style.visibility == "" ? "hidden" : ""
 }
 function startBlink() {
 if (document.all)
 setInterval("doBlink()",600)
 }
 window.onload = startBlink;

 /*수령인 첨부파일 불러오는 스크립트*/
 function fileLoad(no_pay_file){
	 url="/download.jsp?filePath=notice/&fileName="+no_pay_file;
	 //alert(url);
	location.href=url;
}
 /*사업자등록증 첨부파일 불러오는 스크립트*/
 function fileLoad2(no_pay_file){
	 url="/download.jsp?filePath=company/&fileName="+no_pay_file;
	 //alert(url);
	location.href=url;
}

 /*엑셀 기능 수정기간 동안 임시 스크립트*/
 function PreviewProc1(){
	 alert("기능 준비중입니다.");
	 return;
 }

 /*잔액조회를 위한 스크립트*/
 function moneySearch(){
	 location.reload();
 }

 /*계좌검증 오류 팝업 스크립트*/
 function acPop(str){
	 alert(str);
 }

