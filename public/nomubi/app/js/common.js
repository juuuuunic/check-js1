$(document).ready(function() {
	//main
	HeightAuto();
	btnQmark();
	setPositionFooter();
	minHeight();

	// lp
	lp_tabBlock();
	autoClose();
})



// 이용문의 전화걸기
function callNumber(num) {
	location.href = "tel:" + num;
}

// History Back: btnBack
window.onpageshow = function(event) {
	if(event.persisted || (window.performance && window.performance.navigation.type == 2)) {
		// 처리
	}
}


// Daily Background Images
var rndBg = new Array('01', '02', '03', '04', '05'); 
function randomBg(){ 	
	var today = new Date();
	var day = Math.floor(today/8.64e7); // == 1000 * 60 * 60 * 24: The number of milliseconds in one day
	$('#content').css({ background: 'no-repeat url(../app/images/bg/bg_' + rndBg[day % rndBg.length] + '.jpg) center top / cover', });
} 
window.onload = randomBg;


// Height Auto: 백그라운드 이미지 크기 고정
function HeightAuto(){
	if($('.HeightAuto').length !== 0) {
		$('.HeightAuto').css('height' ,  $(window).height() );
		$(document).resize(function() {
			$('.HeightAuto').css('height' ,  $(window).height() );
		});
	}
}

// 배경색/배경이미지 높이 차이 처리
function minHeight(){
	var minHeight = $(window).height() - $('header').innerHeight();
	var maxHeight = $('#content section').height() - ($('.dropList').innerHeight()*$('.dropList').length)
	if(maxHeight <  minHeight) {
		$('#content section').css('height' ,  minHeight );
		$(window).resize(function() {
			$('#content section').css('height' ,  minHeight );
		});
	} 
}

//Footer Position: 반응형에 따른 푸터 위치조정
function setPositionFooter() {
	if($('.setPosition').length !== 0) {
		$(window).resize(function(e){
			var wHeight = $(this).outerHeight();
			var lpHeight = $('.lp_content').outerHeight()+$('.setPosition').height();
			var lgHeight = $('.log_content').outerHeight()-$('.setPosition').height();
			if(wHeight > lpHeight) {
				$('.setPosition').css({'position':'fixed', 'left':0, "bottom":0});
			} else {
				$('.setPosition').css({'position':'relative', 'left':0, "bottom":0});
			}
			
			if(wHeight > lgHeight) {
				$('.setPosition').css({'position':'fixed', 'left':0, "bottom":0});
			} else {
				$('.setPosition').css({'position':'relative', 'left':0, "bottom":0});
			}
		});
		$(window).trigger("resize"); // 최초1회 호출

	}
}

// 추후 도움말 혹은 튜토리얼 연결: 앱 초기 대응을 위한 알림
function btnQmark() {
	if($('.btnQmark').length || $('.btnQmark_bk').lenth != 0) {
		$('.btnQmark, .btnQmark_bk').on('click', function() {
			alert('1670-1970로 전화주시기 바랍니다.')
		});
	}
}


// Tab Drop Down
function tapDrop(){
	$(".dropList > li").stop().hide();
	
    $(".dropItem").click(function() {
		var dropTarget = $(this).parents('ul').siblings('.dropList');
		var n = $(this).parents('tr').index();
		dropTarget.children('li').stop().hide();
        dropTarget.children('li').eq(n).stop().show();
		dropTarget.children('.dropClose').stop().show();
    })
    
    $(".dropClose").click(function() {
		$(this).siblings('li').stop().hide();
		$(this).stop().hide();
    })
}



///// lp_Back Alert
function backAlert() {
	$(".back_alert").css({opacity: "1"}, 400).delay(2000).animate({opacity: "0"}, 400);
}



// lp_Autocomplete Bar Close
function autoClose() {
	if($('.autoBar').length != 0) {

		// 커서인 됐을 때 x show
		$('.autoBar').focusin(function() {
			$(this).parents('form').siblings('div').css({"opacity": 1})
		});
		
		// 커서아웃 됐을 때
		$('.autoBar').focusout(function() {
			if($('.autoBar').val() != '') {
				$('.autoClose').css({"opacity": 1, "filter": "alpha(opacity=100)"})
			} else {
				$('.autoClose').css({"opacity": 0, "filter": "alpha(opacity=0)"})
			}
		});

		// autoClose 클릭
		$('.autoClose').click(function() {
			$(this).siblings('form').find('input').val('')
			$(this).css({"opacity": 0, "filter": "alpha(opacity=0)"})
		});

	}
}

            
// lp_Tabs
function lp_tabBlock() {
	if($('.lp_content .tab_option').length != 0) {

		// onload
		var target = $('.tab_option > div.active');
		if(target.index() == 1) {
			target.parents('li').siblings('.autocomplete').show();
		} else {
			target.parents('li').siblings('.autocomplete').hide();
		}
			
		// click
		$('.tab_option > div').on('click', function() {
			$(this).parents('li').children('div').removeClass('active');
			$(this).addClass('active');
			
			// 필터 두 개 일 때 중복 방지
			var target = $(this);
			if(target.index() == 1) {
				target.parents('li').siblings('.autocomplete').show();
			} else {
				target.parents('li').siblings('.autocomplete').hide();
			}
		});
	} 
}