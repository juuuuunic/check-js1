/**
 * 아이디 중복 체크
 */
var validCheckDupId = function(){
	//사용자ID조회이후 입력된값을 변경하지 못하도록 함.
	if($("#form_join input[name=srch_membId]").val() != $("#form_join input[name=membId]").val()){
		$("#check_membId").val("F");
	}
	
	if($("#form_join input[name=check_membId]").val() == "F"){
		alert("아이디 중복여부를 체크하십시오.");
		return false;
	}
	
	return true;
};


/**
 * 아이디 체크(전체)
 */
var validCheckId =function(){
	
	if($("#form_join input[name=membId]").val().length === 0){
		alert("아이디를 입력해주세요.");
		$("#membId").focus();
		return false;
	}
	
	if($("#form_join input[name=membId]").val().length < 6 || $("#form_join input[name=membId]").val().length > 13){
		alert("아이디는 6~12자리로 입력해 주세요.");
		$("#form_join input[name=membId]").focus();
		return false;
	}
	
	if(!validCheckDupId()){
		return false;
	}
	
	return true;
};


/**
 * 비밀번호 체크
 */
var validCheckPswd = function(){
	if(!isCheck_pswd($("#form_join input[name=pswd]").val())){
		alert("비밀번호를 안전하게 다시 설정하십시오.");
		$('#form_join input[name=pswd]').focus();
		return false;
	}
	
	if($("#form_join input[name=pswd]").val() != $("#form_join input[name=rePswd]").val()){
		alert("비밀번호가 일치하지 않습니다.");
		return false;
	}
	
	return true;
};

/**
 * 이메일 체크
 */
var validCheckEmail = function(){
	if($("#form_join input[name=emailId]").val().length == 0){
		alert("이메일 ID를 입력해주세요.");
		$("#form_join input[name=emailId").focus();
		return false;
	}
	
	
	if($("#form_join input[name=emailHost]").val().length == 0){
		alert("이메일 호스트를 입력해주세요.");
		$("#form_join input[name=emailHost").focus();
		return false;
	}
	
	return true;
};


/**
 * 추가정보 체크 - 사업자
 */
var validJoinAddForm = function(){
	if($("#form_join input[name=bizNo]").val() == ""){
		alert("사업자 번호가 없습니다.");
		return false;
	}
	
	if($("#form_join input[name=rpsrName]").val() == ""){
		alert("대표자명이 없습니다.");
		return false;
	}
	
	
	if($("#form_join input[name=shop]").val() == ""){
		alert("업체명이 없습니다.");
		return false;
	}
	
	/*if($("#form_join input[name=telNo]").val() == ""){
		alert("사업장 전화번호가 없습니다.");
		return false;
	}*/
	
	
	/*if($("#form_join input[name=faxNo]").val() == ""){
		alert("사업장 팩스번호가 없습니다.");
		return false;
	}*/
	
	
	if($("#form_join input[name=ozipCode]").val() == ""){
		alert("우편 번호가 없습니다.");
		return false;
	}
	
	
	if($("#form_join input[name=oaddr1]").val() == ""){
		alert("기본주소가 없습니다.");
		return false;
	}
	
	
	if($("#form_join input[name=oaddr1]").val() == ""){
		alert("상세주소가 없습니다.");
		return false;
	}

	return true;
};

/**
 * 추가정보 체크 - 전문가
 */
var validJoinProForm = function(){
	if($("#form_join input[name=proBizNo]").val() == ""){
		alert("사업자 번호가 없습니다.");
		return false;
	}
	
	if($("#form_join input[name=proBizNo]").val().length != 10){
		alert("올바른 사업자 번호가 아닙니다.");
		return false;
	}
	
	if($("#form_join input[name=rpsrName]").val() == ""){
		alert("대표자명이 없습니다.");
		return false;
	}

	if($("#form_join input[name=proShop]").val() == ""){
		alert("업체명이 없습니다.");
		return false;
	}
	
	
	if($("#form_join input[name=ozipCode]").val() == ""){
		alert("우편 번호가 없습니다.");
		return false;
	}
	
	
	if($("#form_join input[name=oaddr1]").val() == ""){
		alert("기본주소가 없습니다.");
		return false;
	}
	
	
	/*if($("#form_join input[name=oaddr2]").val() == ""){
		alert("상세주소가 없습니다.");
		return false;
	}*/
	
	/*if($("#form_join input[name=telNo]").val() == ""){
		alert("사업장 전화번호가 없습니다.");
		return false;
	}
	
	
	if($("#form_join input[name=faxNo]").val() == ""){
		alert("사업장 팩스번호가 없습니다.");
		return false;
	}*/
	

	return true;
};

/*
 * 회원가입폼 - 기본
 */
var validJoinForm = function(){
	
	// 아이디 체크(전체)
	if(!validCheckId()){
		return false;
	}
	
	
	// 비밀번호 체크
	if(!validCheckPswd()){
		return false;
	}
	
	
	// 이메일 체크
	if(!validCheckEmail()){
		return false;
	}
	
	
	if($("#form_join input[name=membName]").val() == "" || $("#form_join input[name=hpNo]").val() == ""){
		alert("휴대폰 본인인증을 받으세요.");
		return false;
	}

	return true;
};


/**
 * 약관 체크
 */
var validCheckAgree = function(){
	if($("#joinAgreeUsage").prop("checked") != true){
		alert("[이용약관]에 동의를 하셔야 합니다.");
		$("#joinAgreeUsage").focus();
		return false;
	}
	
	
	if($("#joinAgreePrivacy").prop("checked") != true){
		alert("[개인정보 수집 및 이용안내]에 동의를 하셔야 합니다.");
		$("#joinAgreePrivacy").focus();
		return false;
	}
	
	return true;
};