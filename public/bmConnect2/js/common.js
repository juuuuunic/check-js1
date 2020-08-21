$(document).ready(function() {
});
  

//팝업 열기
function ajaxLink(href,type,idx){//a:주소, b:type, c:넘길 값
	$.ajax({
		type: type,
		url: href,
		data : idx,
		async: false,
		success : function(data) {
			$('body').find('._pop-ajax').remove().end().append(data).find('._pop-ajax').fadeIn(150);
			$('body').addClass('fixed');
		}
	});

}

//팝업 닫기
function ajaxClose(a){
	$(a).fadeOut(150,function(){$(this).remove()});
	$('body').removeClass('fixed');
}

//dropDown
function dropDown(obj) {
	$(obj).parents('li').toggleClass('is-active').siblings().removeClass('is-active');
	$(obj).siblings('.conn_box-drop').stop().slideToggle(250).parent().siblings().children('.conn_box-drop').stop().slideUp(200); 
}

//select box
function slctDrop(obj)	{
	//selector
	var $drop_type2 = $(".conn_box-type2 > li");
	if(!$(obj).hasClass('is-active')) {
		$drop_type2.removeClass('is-active').find('.conn_box-drop').stop().slideUp(250);
		$(obj).toggleClass('is-active').find('.conn_box-drop').stop().slideToggle(250);

		if($(obj).find('.conn_box-drop').children('div').length > 5) $(obj).find('.conn_box-drop').css({"overflow-y":"scroll"});
	} else {            
		$(obj).toggleClass('is-active').find('.conn_box-drop').stop().slideUp(250); 
	}
	//select list
	var $drop_list = $(".conn_box-type2 .conn_box-drop");
	$drop_list.children('div').on('click', function () {
		if($(this).hasClass('is-active')) {
			$(this).parents('li').removeClass('is-active').find('.conn_box-drop').stop().slideUp(250);
		} 					
		$(this).parents('li').find('label').text($(this).text());
		$(this).parents('li').find('input').attr('value', $(this).attr('data-value'));
	});	
}


//이용약관 동의	
function fnChkTerms(){	
    var chk = $('input[type=checkbox]:not(#terms-all)');
    for(var i = 0; i < chk.length; i++) {
        var $this = $(chk[i]);
        if(!$this.is(":checked")) { //동의함에 선택되어있지 않다면
            alert('약관 확인 후 ‘동의함’에 체크해 주세요.');
            $this.focus();
            return false;
        }		
    }
    return true;
}

//커넥터 정보
function fnChkInput(){	
    var input = $(".conn_form input"); 
    for(var i = 0; i < input.length; i++) {
        var $this = $(input[i]);
        if($this.val() ==='') { //인풋박스가 비어있다면
            alert('신청자 정보 입력 항목에 모두 입력해 주세요.');
            $this.focus();
            return false;
        }		
    }
    return true;
}

//배달 정보
function fnChkDeliv(){	
	var input = $(".conn_box input[type=hidden]"); 
	if(input.attr('id','delivery').val() ==='') {
		alert('배달수단을 선택해 주세요.');
		input.attr('id','delivery').focus();
		return false;
	}	
	if(input.attr('id','insurance').val() ==='') {
		alert('보험을 선택해 주세요.');
		input.attr('id','insurance').focus();
		return false;
	}	
	if(input.attr('id','area1').val() ==='') {
		alert('배달가능 지역을 선택해 주세요.');
		input.attr('id','area1').focus();
		return false;
	}	
	if(input.attr('id','area2').val() ==='') {
		alert('배달가능 구를 선택해 주세요.');
		input.attr('id','area').focus();
		return false;
	}	
}

// 계좌 정보
function fnChkAccount(){	
    //인풋박스가 비어있다면
    if($("#acc_nm").val() ==='') {
        alert('예금주명을 입력해 주세요.');
        $("#acc_nm").focus();
        return false;
    }	
    if($("#acc_bank").val() ==='') {
        alert('은행명을 입력해 주세요.');
        $("#acc_bank").focus();
        return false;
    }		
    if($("#acc_no").val() ==='') {
        alert('계좌번호를 입력해 주세요.');
        $("#acc_no").focus();
        return false;
    }			
    return true;
}

//서류제출
function fnChkPaper(){	
    var input = $("input.file-name:not(.ncsry_non)"); 
    for(var i = 0; i < input.length; i++) {
        var $this = $(input[i]);
        if($this.val() ==='') { //인풋박스가 비어있다면
            alert('\'서류명\'을 첨부해주세요.');
            $this.focus();
            return false;
        }		
    }
    return true;
}

//파일첨부
function fileUploadNm() {
    $(".btn-file").on('change', function(){ // 값이 변경되면 
        if(window.FileReader){ // modern browser 
            var filename = $(this)[0].files[0].name; 
        } else { // old IE 
            var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
        } 
        
        var attr = $(this).siblings('label').attr('for')
        var replace = attr+'_rm'
        // 추출한 파일명 삽입 및 라벨 변경
        $(this).siblings('.file-name').val(filename);
        $(this).siblings('label').attr('for',replace).text('삭제하기');
    });
}