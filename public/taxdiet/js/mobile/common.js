$(document).ready(function(){
	mobile_scroll_stop();
	calendar_picker();
	search_radio();
	dashboard_select();
	gnbfixed();
	topBtn();
	topFixed();
	input_file_make();
	setPositionFooter();
});

// Top btn Action
function topBtn(){
	var scrollTop = $(".top-btn");
	$(scrollTop).click(function() {
		$('html, body').animate({
			scrollTop: 0
		}, 800);
		return false;
	});
}

// gnb_action
function mobile_scroll_stop(){
	if ($(".gnb__btn__action").length !== 0) {
		$('.gnb__btn__action').click(function() {
			$('body').toggleClass('fixed');
			$('.header__hidden-bg').toggleClass('show');
		});
	}
}

// calendar picker
function calendar_picker(){
	if($("input[id^='calendar']").length !== 0) {
		$("input[id^='calendar']").each(function() {
			var _this = this.id;
			$('#'+_this).datepicker({
				dateFormat: "yy-mm-dd",
				prevText: '이전 달',
				nextText: '다음 달',
				monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				dayNames: [ '일','월','화','수','목','금','토' ],
				dayNamesShort: [ '일','월','화','수','목','금','토' ],
				dayNamesMin:  [ '일','월','화','수','목','금','토' ],
				showMonthAfterYear: true,
				changeMonth: true,
				changeYear: true,
				yearRange: "1900:",
				yearSuffix: '년'
			});
		});
	}
}

function search_radio(){
	if($(".type__con").length !== 0) {
		hideExclude("change-day");

		$("input[name=searchGbn]").change(function() {
			var radioValue = $(this).val();
			if (radioValue == "day") {
				hideExclude("change-day");
			} else if (radioValue == "month") {
				hideExclude("change-month");
			} else if (radioValue == "quarter") {
				hideExclude("change-quarter");
			}
		});
		
		var checkCnt = $("input[name=searchGbn]:checked").size();
		if (checkCnt == 0) {
			$("input[name=searchGbn]").eq(0).attr("checked", true);
		}
	}
}

function hideExclude(excludeClass) {
	$(".dashboard__search__type").children().each(function() {
		$(this).hide();
	});
	$("." + excludeClass).show();
}


function dashboard_select(){
	if($(".dashboard-info__select").length !== 0) {

		$('.dashboard-info__select').each(function() {
			if ($(this).find('option:eq(0)').is(':selected')) {
				$(this).addClass('positive');
				$(this).removeClass('negative');
				$(this).removeClass('undefine');
			} else if ($(this).find('option:eq(1)').is(':selected')) {
				$(this).removeClass('positive');
				$(this).addClass('negative');
				$(this).removeClass('undefine');
			} else if ($(this).find('option:eq(2)').is(':selected')) {
				$(this).removeClass('positive');
				$(this).removeClass('negative');
				$(this).addClass('undefine');
			}
		});

		$(".dashboard-info__select").change(function() {
			var selectValue = $(this).val();
			if (selectValue == "target") {
				$(this).addClass('positive');
				$(this).removeClass('negative');
				$(this).removeClass('undefine');
			} else if (selectValue == "nontarget") {
				$(this).addClass('negative');
				$(this).removeClass('positive');
				$(this).removeClass('undefine');
			} else if (selectValue == "unclassified") {
				$(this).addClass('undefine');
				$(this).removeClass('positive');
				$(this).removeClass('negative');
			}
		});
	}
}


// header scroll
function gnbfixed(){
	var showStaticMenuBar = false;

	$(window).scroll(function () {
		if (showStaticMenuBar == false) {
			if ($(window).scrollTop() >= 36) {
				$('.header').addClass('header--fixed');
				showStaticMenuBar = true;
			}
		}
		else {
			if ($(window).scrollTop() < 36) {
				$('.header').removeClass('header--fixed');
				showStaticMenuBar = false;
			}
		}
	});
}

// header scroll
function topFixed(){
	var showStaticMenuBar = false;

	$(window).scroll(function () {
		if (showStaticMenuBar == false) {
			if ($(window).scrollTop() >= 36) {
				$('.top-btn').fadeIn(300);
				showStaticMenuBar = true;
			}
		}
		else {
			if ($(window).scrollTop() < 36) {
				$('.top-btn').fadeOut(300);
				showStaticMenuBar = false;
			}
		}
	});
}


function ajaxLink(href,type,idx){
	$.ajax({
		type: type,
		url: href,
		data : idx,
		success : function(result) {
			if (result.ex_Message != null && result.ex_Message != "") {
				alert(result.ex_Message);

				if (result.returnURL!="") {
					f_go_login(result.returnURL);
				}
			}
			else {
				$('body').find('.common-popup').remove().end().append(result).find('.common-popup').fadeIn(500);
				$('body').addClass('fixed');
			}
		}
	});
}

function ajaxClose(a){
	$(a).fadeOut(500,function(){$(this).remove()});
	$('body').removeClass('fixed');
}

function ajaxInnerClose(a){
	$(a).fadeOut(500,function(){$(this).remove()});
	$('body').removeClass('fixed');
}

// input file
function input_file_make(){
	if($(".input-file").length !== 0) {
		(function($){
			var $fileBox = null;
			$(function() {
				init();
			})
			function init() {
				$fileBox = $('.input-file');
				fileLoad();
			}
			function fileLoad() {
				$.each($fileBox, function(idx){
					var $this = $fileBox.eq(idx),
						$btnUpload = $this.find('[type="file"]'),
						$label = $this.find('.file-label');

				$btnUpload.on('change', function() {
					var $target = $(this),
						fileName = $target.val(),
						$fileText = $target.siblings('.file-name');
					$fileText.val(fileName);
				})

				$btnUpload.on('focusin focusout', function(e) {
					e.type == 'focusin' ?
						$label.addClass('file-focus') : $label.removeClass('file-focus');
					})      
				})
			}
		})(jQuery);
	}
}

//es6
//select value show hide
function showDiv(target, element){
	document.getElementsByClassName(target)[0].style.display = element.value === target ? 'block' : 'none';
}

// toggle display
function toggledisplay(element){
	let target = document.querySelector(element).style;
	(function(style) {
		style.display = style.display === 'block' ? '' : 'block';
	})(target);
}




function fnResetInput( val ){
	if (val == 'C'){
		$("#card_no3").val("");
	} else {
		$("#card_no1").val("");
		$("#card_no2").val("");
	}
}


//footer위치 조정
function setPositionFooter() {
	$(window).resize(function(e){
		var wHeight = $(this).outerHeight();
		var cHeight = $(".wrap").outerHeight() - 80;
		
		if(wHeight > cHeight) {
			$(".footer").addClass("footer--fixed");
		} else {
			$(".footer").removeClass("footer--fixed");
		}
	});
	$(window).trigger("resize"); // 최초1회 호출
}

//footer위치 조정
function setPositionGnb() {
	$(window).resize(function(e){
		$('.gnb__contents__scroll').css('height', $(window).height() - $('.gnb__contents__header').innerHeight())
	});
	$(window).trigger("resize"); // 최초1회 호출
}setPositionGnb();