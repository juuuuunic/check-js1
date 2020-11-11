(function() {
	// 모바일 높이
	function resizeHandler() {
        document.body.style.height = window.innerHeight +'px';
	}

	window.addEventListener('resize', resizeHandler);

	resizeHandler();

})();


//팝업 열기1
function ajaxLink(href,type,idx){//a:주소, b:type, c:넘길 값
	$.ajax({
		type: type,
		url: href,
		data : idx,
		async: false,
		success : function(data) {
			$('body').find('._pop-ajax').remove().end().append(data).find('._pop-ajax').fadeIn(150);
			if($('._pop-ajax').hasClass('_pop-slideUp')) {
				$('._pop-slideUp').find('._pop-wrap').css({"bottom":"0"})
			}
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
	$(obj).parents('div').toggleClass('is-active').siblings().removeClass('is-active');
	$(obj).siblings('.chk-view__drop').stop().slideToggle(250).parent().siblings().children('.chk-terms__drop').stop().slideUp(200); 
}

//파일첨부
function fileUploadNm(obj) {
	obj.addEventListener('change', function() { // 값이 변경되면 
		if(window.FileReader){ // modern browser 
            var filename = $(obj)[0].files[0].name; 
        } else { // old IE 
            var filename = $(obj).val().split('/').pop().split('\\').pop(); // 파일명만 추출 
		} 
		

		// 추출한 파일명 삽입 및 라벨 변경
		obj.parentNode.querySelector('.file-name').innerText = filename;
		var fileText = 16; //파일명 글자 수
		if(filename.length > fileText) {
			obj.parentNode.querySelector('.file-name').innerText = filename.substr(0,fileText)+'...';
		}

		// 첨부/삭제 버튼교체
		obj.parentNode.querySelector('.chk-view__txt').classList.add('hidden');
		obj.parentNode.querySelector('.file-name__remove').classList.remove('hidden');
		
		return;
	});
}

//파일삭제
function fileClear(obj) {
	var fileInput = obj.parentNode.querySelector('input[type=file]')
		clone = fileInput.cloneNode(true);
	console.log(fileInput)
	obj.parentNode.replaceChild(clone, fileInput);
	
	// 추출한 파일명 삽입 및 라벨 변경
	obj.parentNode.querySelector('.file-name').innerText = '';
	
	// 첨부/삭제 버튼교체
	obj.parentNode.querySelector('.file-name__remove').classList.add('hidden');
	obj.parentNode.querySelector('.chk-view__txt').classList.remove('hidden');
}

//숫자만 입력
function onlyNumber(obj) {
	obj.value=obj.value.replace(/[^0-9]/g,'');
}

//필수 checkbox	
function fnChkbox(name, text){	
	const form = document.forms[name];
	for(let i=0; i<form.elements.essential.length; i++) {
		if (!form.elements.essential[i].checked) { //동의함에 선택되어있지 않다면
			alert(text);
			return false;
		}		
	}
	return true;
}


//필수 입력	
function fnChkInput(name, text){	
	const form = document.forms[name];   
	for(let i=0; i<form.elements.essential.length; i++) {   
		if (form.elements.essential[i].value === '') { //입력이 비어있다면 
			alert(text);
			form.elements.essential[i].focus();
			return false;
		}	 
		return true;
	};
}