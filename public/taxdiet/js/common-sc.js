$(document).ready(function(){
	bank_select_btn();
	bc_select();
	checkbox_all_select();
	//cr_btn();
	sc_btn();
	cr_table();
	sc_01();
	sc_02();
	sc_03();
	sc_05();


	$('input, textarea').placeholder();
	word_cut();
});

/* security card show/hide */
function sc_btn(){
	$( "#card_reg" ).click(function() {
		$(".sb_security_card_wrap").toggle();
	});
	$( "#security_card_close" ).click(function() {
		$(".sb_security_card_wrap").hide();
	});
}

/* bank/card list show/hide */
function bank_select_btn(){
	$( ".bc_select_btn" ).click(function() {
		$(".bc_all").toggle();
	});
}

/* bank/card select action */
function bc_select(){
	$(".result_section").hide();
	$(".show_bc_list li").hide();
	$(".show_bc_list li").eq(0).show();
	$(".bc_all").hide();
	$(".common_bank li").each(function(i){
		$(this).click(function(){
			$(".sc_contents_05").hide();
			$(".select_box_wrap").show();
			
			$(".btn_bc_list li").eq(i).click();
		});
	});
	$(".common_card li").each(function(i){
		$(this).click(function(){
			$(".sc_contents_05").hide();
			$(".select_box_wrap").show();
			
			$(".btn_bc_list li").eq(i).click();
		});
	});
	$(".btn_bc_list li").each(function(i){
		$(this).click(function(){
			$(".btn_bc_list li").removeClass("active");
			$(this).addClass("active");
			$(".result_section").show();
			$(".bc_all").hide();
			$(".show_bc_list li").hide();
			$(".show_bc_list li").eq(i).show();
			
			/*추가*/
			if($("#bankF").length) fnSetBankOption("#bankF");
			if($("#cardF").length) fnSetCardOption("#cardF");
		});
	});
}

/* certificate registration tr click */
function cr_table(){
	$( ".cr_table tbody tr" ).click(function() {
		if ($(this).attr('class') != 'cr_select'){
			$('.cr_table tbody tr').removeClass('cr_select');
			$(this).addClass('cr_select');
		} else {
			$(this).removeClass('cr_select');
		}
	});
}


/* certificate registration show/hide */
/*function cr_btn(){
	$( "#cf_name_find" ).click(function() {
		$(".certificate_registration_wrap").toggle();
	});
	$( "#cr_close" ).click(function() {
		$(".certificate_registration_wrap").hide();
	});

	$( "#cf_name_search" ).click(function() {
		$(".bank_select_pop_wrap").toggle();
	});
	$( "#bs_close" ).click(function() {
		$(".bank_select_pop_wrap").hide();
	});
}*/


/* checkbox all select */
function checkbox_all_select(){
	$("#table_check_all").click(function(){
		if($("#table_check_all").prop("checked")){
			$("input[name=table_check]").prop("checked",true);
		}else{
			$("input[name=table_check]").prop("checked",false);
		}
	});
}


/* selectbox action */

function sc_01(){
	$('#id_wrap_out').hide();
    $('#login_system_out').change(function(){
        if($('#login_system_out').val() == 'ls_certificate') {
            $('#certificate_wrap_out').show();
            $('.certificate_select').show();
        } else {
            $('#certificate_wrap_out').hide(); 
            $('.certificate_select').hide();
        }
        if($('#login_system_out').val() == 'ls_id') {
            $('#id_wrap_out').show(); 
        } else {
            $('#id_wrap_out').hide(); 
        } 
    });
}

function sc_02(){
	//$('.inquiry_type1_1').hide();
	$('.inquiry_type1_2').hide();
	$('.inquiry_type2_1').hide();
	$('.inquiry_type3_1').hide();
	$('.inquiry_type3_2').hide();
	$('.inquiry_type3_3').hide();
	$('.cfl_id1').hide();
	$('.cfl_pw1').hide();
	$('.inquiry_contents1').hide();
	$('.inquiry_contents2').hide();
	$('.bank_btn_wrap').hide();
	$('#inquiry_type').change(function(){
		if($('#inquiry_type').val() == 'certificate_inquiry') {
			$('.inquiry_type1_1').show();
			$('.bank_btn_wrap').hide();
		} else {
			$('.inquiry_type1_1').hide();
		}
		if($('#inquiry_type').val() == 'quick_inquiry') {
			$('.inquiry_type1_2').show();
			$('.inquiry_contents2').show();
			$('.inquiry_type1_1').hide();
			$('.inquiry_type2_1').hide();
			$('.inquiry_type2_1').hide();
			$('.it3').hide();
			$('.inquiry_contents1').hide();
			$('.bank_btn_wrap').hide();
		} else {
			$('.inquiry_type1_2').hide();
			$('.inquiry_contents2').hide();
		} 
	});
	
	/* 추가 */
	$('#service_type').change(function(){
		if($('#service_type').val() == 'service_type1' || $('#service_type').val() == 'service_type2' || $('#service_type').val() == 'service_type4') {
			$('.inquiry_type1_1').show();
			$('.bank_btn_wrap').hide();
		} else {
			$('.inquiry_type1_1').hide();
		}
		if($('#service_type').val() == 'service_type3') {
			$('.inquiry_type1_2').show();
			$('.inquiry_contents2').show();
			$('.inquiry_type1_1').hide();
			$('.inquiry_type2_1').hide();
			$('.inquiry_type2_1').hide();
			$('.it3').hide();
			$('.inquiry_contents1').hide();
			$('.bank_btn_wrap').hide();
			fnSetBankOption($(this).closest("form"));
		} else {
			$('.inquiry_type1_2').hide();
			$('.inquiry_contents2').hide();
		} 
	});
	/* 추가 */
	
	$('#login_type').change(function(){
		if($('#login_type').val() == 'login_type1') {
			$('.inquiry_type2_1').show();
			$('.inquiry_contents1').show();
			$('.cfl_name').show();
			/*$('.cfl_pw').show();*/
			$('.cfl_id1').hide();
			$('.cfl_pw1').hide();
			$('.bank_btn_wrap').hide();
		} else {
			$('.inquiry_type2_1').hide();
		}
		if($('#login_type').val() == 'login_type2') {
			$('.inquiry_contents1').show();
			$('.cfl_id1').show();
			$('.cfl_pw1').show();
			$('.cfl_name').hide();
			/*$('.cfl_pw').hide();*/
			$('.bank_btn_wrap').show();
		} else {
		}
	});
	$('#storage_type').change(function(){
		if($('#storage_type').val() == 'cf_storage1') {
			$('.inquiry_type3_1').hide();
			$('.inquiry_type3_2').hide();
			$('.inquiry_type3_3').hide();
		} else {
			
		}
		if($('#storage_type').val() == 'cf_storage2') {
			$('.inquiry_type3_1').show();
			$('.inquiry_type3_2').hide();
			$('.inquiry_type3_3').hide();
		} else {
			$('.inquiry_type3_1').hide();
		} 
		if($('#storage_type').val() == 'cf_storage3') {
			$('.inquiry_type3_1').hide();
			$('.inquiry_type3_2').show();
			$('.inquiry_type3_3').hide();
		} else {
			$('.inquiry_type3_2').hide();
		} 
		if($('#storage_type').val() == 'cf_storage4') {
			$('.inquiry_type3_1').hide();
			$('.inquiry_type3_2').hide();
			$('.inquiry_type3_3').show();
		} else {
			$('.inquiry_type3_3').hide();
		} 
	});
}

function sc_03(){
	$('.cs_usb').hide();
	$('.cs_usb_token').hide();
	$('.cs_hsm').hide();
	$('#certificate_storage').change(function(){
		if($('#certificate_storage').val() == 'cf_storage1') {
			$('.cs_usb').hide();
			$('.cs_usb_token').hide();
			$('.cs_hsm').hide();
		} else {
		}
		if($('#certificate_storage').val() == 'cf_storage2') {
			$('.cs_usb').show();
			$('.cs_usb_token').hide();
			$('.cs_hsm').hide();
		} else {
			$('.cs_usb').hide();
		}
		if($('#certificate_storage').val() == 'cf_storage3') {
			$('.cs_usb').hide();
			$('.cs_usb_token').show();
			$('.cs_hsm').hide();
		} else {
			$('.cs_usb_token').hide();
		}
		if($('#certificate_storage').val() == 'cf_storage4') {
			$('.cs_usb').hide();
			$('.cs_usb_token').hide();
			$('.cs_hsm').show();
		} else {
			$('.cs_hsm').hide();
		} 
	});
}

function sc_05(){
	$('#certificate_wrap').hide();
	$('.certificate_select').hide();
	$('#id_wrap').hide();
    $('#login_system').change(function(){
    	
    	/* 추가*/
    	fnSetCardOption("#cardF");
    	
    	/*
        if($('#login_system').val() == 'ls_certificate') {
            $('#certificate_wrap').show();
            $('.certificate_select').show();
        } else {
            $('#certificate_wrap').hide();
            $('.certificate_select').hide();
            $('.storage_usb_short').hide();
        }
        if($('#login_system').val() == 'ls_id') {
            $('#id_wrap').show(); 
        } else {
            $('#id_wrap').hide(); 
        } 
        */
    });
}

/* word cut */
function word_cut(){
	$('.wc').each(function(){//인증서 글자수
		var length = 22;//표시할 글자수 정하기
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');//지정한 글자수 이후 표시할 텍스트(...)
		}
	});
	$('.wc_bank').each(function(){//표시할 글자수 정하기
		var length = 9;//표시할 글자수 정하기
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');//지정한 글자수 이후 표시할 텍스트(...)
		}
	});
	$('.wc_cr').each(function(){//표시할 글자수 정하기
		var length = 7;//표시할 글자수 정하기
		if( $(this).text().length >= length ){
			$(this).text($(this).text().substr(0,length)+'...');//지정한 글자수 이후 표시할 텍스트(...)
		}
	});
}