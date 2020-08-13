$(document).ready(function() {

});
  


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

function ajaxClose(a){
	$(a).fadeOut(150,function(){$(this).remove()});
	$('body').removeClass('fixed');
}

// 배달 활동지역 선택
// $('.btn-area').on('click', function() {
// 	var $this = $(this);
// 	$(document).on('change', 'input[name=delivery-area_list]', function() {
// 		var arr = new Array();
// 		var area = $(this).next('label').text();
// 		var limit = $(".conn_area-list > li:not(.list-non)").length;

// 		$("#pop-next").off("click").on('click', function() {
// 			console.log(area)
// 			if(!arr.includes(area)) { //활동지역이 배열에 없을 떄
// 				$(".conn_area-list").append('<li>'+area+'<span class="list_close"></span></li>');
// 				$(".list-non").stop().hide();  
				
// 				if(limit>=3) { //마지막 선택 삭제
// 					$(".conn_area-list > li:not(.list-non)")[0].remove();
// 					arr.pop();
// 				}
				
// 				// 선택된 활동지역 배열로 저장
// 				$(".conn_area-list > li:not(.list-non)").each(function() {
// 					arr.push($(this).text());
// 				});      
// 			}
// 		});                        
// 	});


// });


// $("#pop-next").off('click').on('click', function() {
// 	if(!arr.includes(area)) { //활동지역이 배열에 없을 떄
// 		$(".conn_area-list").append('<li>'+area+'<span class="list_close"></span></li>');
// 		$(".list-non").stop().hide();                      
// 		arr.push(area);
// 		if(limit>=3) { //마지막 선택 삭제
// 			$(".conn_area-list > li:not(.list-non)")[0].remove();
// 			arr.pop();
// 		}
// 		console.log(arr)
// 	}
// });          