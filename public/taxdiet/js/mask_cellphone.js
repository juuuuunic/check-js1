/**
 * 휴대폰 번호 마스크
 * 사용법 : $(셀렉터).mask(SPMaskBehavior, spOptions);
 * 
 * common-util.js 에서 isPhoneNumber 를 쓰면 휴대폰 규칙 검사도 시행
 */
var SPMaskBehavior = function(val) {
	return val.replace(/\D/g, "").length === 11 ? "000-0000-0009" : "000-000-00009";
},
spOptions = {
	onKeyPress: function(val, e, field, options) {
		field.mask(SPMaskBehavior.apply({}, arguments), options);
	}
};
