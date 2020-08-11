// 비밀번호 규칙
// 영문자, 특수문자, 숫자, 8~16
var regexPassword	= /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])[a-zA-Z0-9!@#$%^&*()]{8,16}$/;

// 비밀번호 체크
function isCheck_pswd(str){
	return regexPassword.test(str);
}