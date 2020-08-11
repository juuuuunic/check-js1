$(document).ready(function(){
	lp_owner_alert();
	search_btn();
	allmenu_btn();

	my_cp_helpbox();
	sr_select_btn();
	faq_accordion();
	HeightAuto();
	file_upload_make();
	tab_action();
	img_autoSize();
	checkbox_all_select();
	
	tax_calculator();
	lp_login();
	checkgroup_or_select();
	lp_bs_commercial();
	$('input, textarea').placeholder();
	lp_book();

	ta_total_quarter();
	quick_menu();
	
	accordion();

	// PC Web용 추가
	calendar_picker();
	checkbox_all();
	taxation_select();
	search_radio();
	input_file_make();

	lp_type1();
	lp_type2();
	lp_type3();
});

//accordion
function accordion(){
	var findAccordion = $('.accodian-btn').find('.acco-btn');

	findAccordion.on('click', function(){
	    if(findAccordion.find('input[name=authType]').is(':checked')) {
			$('.find-accodian').hide();
			$(this).siblings('.find-accodian').show();
		} else {
			$(this).siblings('.find-accodian').hide();
		}
	});
}

//input file
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

// Update
	function update(){
		alert("준비중입니다.");
	}

// Height Auto
	function HeightAuto(){
		$('.HeightAuto').css('height' ,  $(window).height() );
		$(window).resize(function() {
			$('.HeightAuto').css('height' ,  $(window).height() );
		});
	}

// search btn
	function search_btn(){
		$( ".search_icon" ).click(function() {
			if ($('.search_btn').hasClass('active')){
				$('.search_btn').removeClass('active');
				$(".search_wrap").slideToggle();
			}
			else {
				$('.search_btn').addClass('active');
				$(".search_wrap").slideToggle();
			}
		});
	}

// all menu btn
	function allmenu_btn(){
		$( ".all_menu_btn" ).click(function() {
			$(".all-menu").toggle();
		});
		$( ".all_menu_close" ).click(function() {
			$(".all-menu").hide();
		});
	}

// registration select box
	function mail_self(){
		//$('.mw4').hide();
			$('#user_mail_list').change(function(){
					if($('#user_mail_list').val() == 'self') {
							//$('.mw4').show();
							$("#user_mail_first").prop('disabled', true);
							$("#user_mail_first").addClass('in_disabled');
					} else {
							//$('.mw4').hide();
							$("#user_mail_first").prop('disabled', false);
							$("#user_mail_first").removeClass('in_disabled');
					}
			});
	}

// checkgroup or check
	function checkgroup_or_select(){
		$('.check_or_group').click(function(){
			if ($(this).prop('checked')) {
				$('.check_or_group').prop('checked', false);
				$(this).prop('checked', true);
			}
		});
		$('.check_or_group2').click(function(){
			if ($(this).prop('checked')) {
				$('.check_or_group2').prop('checked', false);
				$(this).prop('checked', true);
			}
		});
		$('.check_or_group3').click(function(){
			if ($(this).prop('checked')) {
				$('.check_or_group3').prop('checked', false);
				$(this).prop('checked', true);
			}
		});
	}

// my page company tax type
	function my_cp_helpbox(){
		$('.my_company_last').hide();
			$('#my_company_type').change(function(){
					if($('#my_company_type').val() == 'my_ct2') {
							$('.my_company_last').show();
							$('.secend_last').removeClass('last');
					} else {
							$('.my_company_last').hide();
							$('.secend_last').addClass('last');
					}
			});
		$('.help_text').click(function(){
			$(this).toggleClass('active');
			$('.help_box').toggle();
		});
		$( ".help_close_btn" ).click(function() {
			$('.help_box').hide();
			$('.help_text').removeClass('active');
		});
	}

// search select box
	function sr_select_btn(){
		$('.sr_sb1 li').each(function(i){
			$(this).click(function(){
				$(".sr_sb1 li").removeClass('active');
				$(this).addClass('active');
			});
		});
		$('.sr_sb2 li').each(function(i){
			$(this).click(function(){
				$(".sr_sb2 li").removeClass('active');
				$(this).addClass('active');
			});
		});
		$('.sr_sb3 li').each(function(i){
			$(this).click(function(){
				$(".sr_sb3 li").removeClass('active');
				$(this).addClass('active');
			});
		});
	}


// faq accordion
	function faq_accordion(){
		$('.title_wrap').click(function(){
			if ($(this).parent().attr('class') != 'active'){
				$('.accodian_contents').slideUp();
				$(this).parent().children(".accodian_contents").slideToggle();
				$('.ug_faq_wrap li').removeClass('active');
				$(this).parent().addClass('active');
			} else{
				$(this).parent().removeClass('active');
				$(this).parent().children(".accodian_contents").slideToggle();
			}
		});
	}


// tax calculator
function tax_calculator(){
		$('#tac_rt1').change(function(){
				if($('#tac_rt1').val() == 'rt1_s3') {
						$('.iwt_select').hide();
				} else {
						$('.iwt_select').show();
				}
		});
}

function file_upload_make(){
	var fileTarget = $('.filebox .upload-hidden');
	var fileTarget2 = $('.filebox2 .upload-hidden2');

	fileTarget.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.upload-name').val(filename);
	});

	fileTarget2.on('change', function(){
		if(window.FileReader){
			var filename = $(this)[0].files[0].name;
		} else {
			var filename = $(this).val().split('/').pop().split('\\').pop();
		}
		$(this).siblings('.upload-name2').val(filename);
	});
}



// tab action
function tab_action(){
	if($(".common_tab").length !== 0) {
		$(".tab_cont").hide();
		$(".tab_cont").eq(0).show();
		$(".common_tab li").each(function(i){
			$(this).click(function(){
				$(".common_tab li").removeClass("active");
				$(this).addClass("active");
				$(".tab_cont").hide();
				$(".tab_cont").eq(i).show();
			});
		});
	}
}

//book mark
function bookmarksite(title,url) { 
	 // Internet Explorer
	 if(document.all)
	 {
			 window.external.AddFavorite(url, title); 
	 }
	 // Google Chrome
	 else if(window.chrome){
			alert("Ctrl+D키를 누르시면 즐겨찾기에 추가하실 수 있습니다.");
	 }
	 // Firefox
	 else if (window.sidebar) // firefox 
	 {
			 window.sidebar.addPanel(title, url, ""); 
	 }
	 // Opera
	 else if(window.opera && window.print)
	 { // opera 
			var elem = document.createElement('a'); 
			elem.setAttribute('href',url); 
			elem.setAttribute('title',title); 
			elem.setAttribute('rel','sidebar'); 
			elem.click(); 
	 }
} 


// Image Auto Size
function img_autoSize(){
	if($(".ias").length !== 0) {
		var divs = $('.ias');
		for (var i = 0; i < divs.length; ++i) {
			var div = divs[i];
			var divAspect = div.offsetHeight / div.offsetWidth;
			div.style.overflow = 'hidden';
			
			var img = div.querySelector('img');
			var imgAspect = img.height / img.width;

			if (imgAspect <= divAspect) {
				var imgWidthActual = div.offsetHeight / imgAspect;
				var imgWidthToBe = div.offsetHeight / divAspect;
				var marginLeft = -Math.round((imgWidthActual - imgWidthToBe) / 2)
				img.style.cssText = 'width: auto; height: 100%; margin-left: '+ marginLeft + 'px;'
			} else {
				img.style.cssText = 'width: 100%; height: auto; margin-left: 0;';
			}
		}
	}
}

/* checkbox all select */
function checkbox_all_select(){
	if($("#table_check_all").length !== 0) {
		$("#table_check_all").click(function(){
			if($("#table_check_all").prop("checked")){
				$("input[name=table_check]").prop("checked",true);
			}else{
				$("input[name=table_check]").prop("checked",false);
			}
		});
	}
}

function doOpenCheck(chk){
		var obj = document.getElementsByName("table_check");
		for(var i=0; i<obj.length; i++){
				if(obj[i] != chk){
						obj[i].checked = false;
				}
		}
		$("#table_check_all").prop("checked",false);
}

function ta_total_quarter(){
	$('.quarter li').each(function(i){
		$(this).click(function(){
			$(".quarter li").removeClass('active');
			$(this).addClass('active');
		});
	});
}


//TO DO LIST
function quick_menu(){
	if ($(".qm-sub").length !== 0) {
		var showStaticMenuBar = false;
		$(window).scroll(function () {
			if (showStaticMenuBar == false) {
				if ($(window).scrollTop() >= 223) {
					$('.qm-sub').addClass('fixed');
					showStaticMenuBar = true;
				}
			}
			else {
				if ($(window).scrollTop() < 223) {
					$('.qm-sub').removeClass('fixed');
					showStaticMenuBar = false;
				}
			}
		});
	}
	if ($(".qm-main").length !== 0) {
		var showStaticMenuBar = false;
		$(window).scroll(function () {
			if (showStaticMenuBar == false) {
				if ($(window).scrollTop() >= 205) {
					$('.qm-main').addClass('fixed');
					showStaticMenuBar = true;
				}
			}
			else {
				if ($(window).scrollTop() < 205) {
					$('.qm-main').removeClass('fixed');
					showStaticMenuBar = false;
				}
			}
		});
	}
}


//---------------------------------------layer popup---------------------------------------//
// owner alert
	function lp_owner_alert(){
		try{
			$(".lp-owner_alert").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'no',
					css : {
						width : '480px'
					}
				}
			});
		}catch(exception){
		}
	}
// alert
	function lp_alert(){
		try{
			$(".lp-alert").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'no',
					css : {
						width : '480px'
					}
				}
			});
		}catch(exception){
		}
	}

// login
	function lp_login(){
		try{
			$(".lp-login").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'yes',
					css : {
						width : '700px'
					}
				}
			});
		}catch(exception){
		}
	}

// login
	function lp_bs_commercial(){
		try{
			$(".lp-bs_commercia").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'yes',
					css : {
						width : '620px'
					}
				}
			});
		}catch(exception){
		}
	}

// login
	function lp_book(){
		try{
			$(".lp-book").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'yes'
				}
			});
		}catch(exception){
		}
	}
	
// PC Web용 추가
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

function hideExclude(excludeClass) {
	$(".dashboard__search__type").children().each(function() {
		$(this).hide();
	});
	$("." + excludeClass).show();
}


function ajaxLink(href,type,idx){
	$.ajax({
		type: type,
		url: href,
		data : idx,
		success : function(data) {
			$('body').find('.layerpop').remove().end().append(data);
			$('body').addClass('fixed');
		}
	});
}

function ajaxClose(a){
	$(a).fadeOut(500,function(){$(this).remove()});
	$('body').removeClass('fixed');
}

//es6
//select value show hide
function showDiv(target, element){
	document.getElementsByClassName(target)[0].style.display = element.value === target ? 'block' : 'none';
}

// toggle display
function toggleDisplay(element){
	let target = document.querySelector(element).style;
	(function(style) {
		style.display = style.display === 'block' ? '' : 'block';
	})(target);
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
				yearRange: "c-10:c+5",
				yearSuffix: '년'
			});
		});
	}
}

function table_select(){
	if($(".td__table-set2__select").length !== 0) {
		$(".td__table-set2__select").change(function() {
			var selectValue = $(this).val();
			if (selectValue == "target") {
				$(this).closest('tr').addClass('positive');
				$(this).closest('tr').removeClass('negative');
				$(this).closest('tr').removeClass('undefine');
			} else if (selectValue == "nontarget") {
				$(this).closest('tr').addClass('negative');
				$(this).closest('tr').removeClass('positive');
				$(this).closest('tr').removeClass('undefine');
			} else if (selectValue == "unclassified") {
				$(this).closest('tr').addClass('undefine');
				$(this).closest('tr').removeClass('positive');
				$(this).closest('tr').removeClass('negative');
			}
		});
	}
}

function checkbox_all(){
	if($(".parents-check").length !== 0) {
		$( '.parents-check' ).click( function() {
			$( '.child-check' ).prop( 'checked', this.checked );
		} );
	}
}

function taxation_select(){
	if($(".taxation-change").length !== 0) {
		$(".taxation-change").change(function() {
			var selectValue = $(this).val();
			if (selectValue == "V102") {
				$('.hidden').addClass('active');
			} else {
				$('.hidden').removeClass('active');
			}
		});
	}
}

function popupType1(urlLink,w,h){
	var url = urlLink;
	var name = "";
	var option = "width = " + w + ", height = " + h + ", top = 100, left = 200, location = no";
	window.open(url, name, option);
}

function search_radio(){
	if($(".search-hidden").length !== 0) {
		hideExclude("change-day");

		$("input[name=search_radio]").change(function() {
			var radioValue = $(this).val();
			if (radioValue == "day") {
				hideExclude("change-day");
			} else if (radioValue == "month") {
				hideExclude("change-month");
			} else if (radioValue == "quarter") {
				hideExclude("change-quarter");
			}
		});
		
		var checkCnt = $("input[name=search_radio]:checked").length;
		if (checkCnt == 0) {
			$("input[name=search_radio]").eq(0).attr("checked", true);
		}
	}
}

function hideExclude(excludeClass) {
	$(".search-hidden").children().each(function() {
		$(this).hide();
	});
	$("." + excludeClass).show();
}

function lp_type1(){
	if($(".lp-type1").length !== 0) {
		try{
			$(".lp-type1").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'yes',
					css : {
						width : '740px'
					}
				}
			});
		}catch(exception){
		}
	}
}

function lp_type2(){
	if($(".lp-type2").length !== 0) {
		try{
			$(".lp-type2").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'yes',
					css : {
						width : '450px'
					}
				}
			});
		}catch(exception){
		}
	}
}

function lp_type3(){
	if($(".lp-type3").length !== 0) {
		try{
			$(".lp-type3").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'yes',
					css : {
						width : '500px'
					}
				}
			});
		}catch(exception){
		}
	}
}

function lp_type3(){
	if($(".lp-type4").length !== 0) {
		try{
			$(".lp-type4").fancybox({
				closeBtn   : false,
				slideShow  : false,
				fullScreen : false,
				thumbs     : false,
				closeClickOutside : false,
				smallBtn : 'yes',
				iframe : {
					scrolling : 'yes',
					css : {
						width : '750px'
					}
				}
			});
		}catch(exception){
		}
	}
}
