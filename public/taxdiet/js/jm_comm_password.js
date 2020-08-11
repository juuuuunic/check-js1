$(document).ready(function(){
	// 비밀번호 입력 event
	$("input[name=pswd]").on("keyup", function() {
		var inputKey		= $("#pswd").val();
		
		if(inputKey != ""){
			if(inputKey.length < 8){
				$("#text_layer_pswd").text("비밀번호는 8자 ~ 16자 이내로 입력하셔야 합니다.");
				return false;
			}
			
			if(!isCheck_pswd(inputKey)){
				$("#text_layer_pswd").text("영문자,숫자,특수문자!@#$%^&*() 조합으로 8~16자리 이내로 입력하세요.");
				return false;
				
			} else {
				$("#text_layer_pswd").text("안전");
				return false;
			}
			
		} else {
			$("#text_layer_pswd").text("");
		}
	});


	//비밀번호 확인 event
	$("input[name=rePswd]", this).bind({
		blur: function() {
			check_rePswd();
		},
		keyup: function() {
			check_rePswd();
		}
	});
	
	
	$("#emailHostList").change(function(){
		$("#emailHost").val(this.value);
		
		if($(this).val() != ""){
			$("#emailHost").attr("readonly", "readonly");
		} else {
			$("#emailHost").removeAttr("readonly");
		}
		
	});
});


//비밀번호 확인 체크
function check_rePswd(){
	if($("#rePswd").val() != ""){
		if($("#pswd").val() == $("#rePswd").val()){
			if(isCheck_pswd($("#pswd").val())){
				$("#text_layer_rePswd").text("일치");
			}
			
		} else {
			$("#text_layer_rePswd").text("비밀번호가 맞지 않습니다.");
		}
		
	} else {
		$("#text_layer_rePswd").text("");
	}
}