(function($) {
	var pg = {};
	pg.defaults = {
		formId       : ""           // 폼 ID
	   ,orderGname   : ""           // 구매명
	   ,orderCls     : ""
	   ,orderCode    : ""           // 구매코드
	   ,resultUrl    : ""           // 구매 후 결과 페이지 url  ex) as/AS_40801.do
	};
	
	pg.one = {
		    formId       : ""           // 폼 ID  
		   ,orderGname   : ""           // 구매명
		   ,orderCls     : "001"
		   ,orderCode    : ""           // 구매코드
		   ,orderPdcInf  : ""           // 구매 상품 정보
		   ,orderTotAmt  : null
		   ,orderPdcCnt  : null         // 상품건수
		   ,resultUrl    : ""           // 구매 후 결과 페이지 url  ex) as/AS_40801.do
		   ,workType     : ""        
		   ,useMonth     : "0"
	};
	
	pg.sum = {
		    formId       : ""           // 폼 ID
		   ,orderGname   : ""           // 구매명
		   ,orderCls     : "002"
		   ,orderCode    : ""           // 구매코드
		   ,orderTotAmt  : 0            // 구매총가격 (숫자만 입력)
		   ,orderPdcInf  : ""           // 구매 상품 정보
		   ,resultUrl    : ""           // 구매 후 결과 페이지 url  ex) as/AS_40801.do
		   ,workType     : ""           
		   ,useMonth     : "0"
	};
	
	var settings = pg.defaults;
	
	pg.open = function(formId, options) {
		if (options.orderCls == "") {
			alert("결제 진행시 문제가 발생하였습니다.");
			return false;
		}
		
		if (options.orderCls == "001") {
			settings = $.extend({}, pg.one, options || {});
		} else if (options.orderCls = "002") {
			settings = $.extend({}, pg.sum, options || {});
		}
		
		var DateCode= new Date;
		
		var formName = $("#" + formId).attr("name");
		var f = eval("document." + formName);
		
		if (settings.formId == "") {
			settings.formId = formId;
		}
		
		f.Moid.value = DateCode.getTime(); 
		  
		f.GoodsName.value   = settings.orderGname;		                                                      
		f.memTyp.value 		= settings.orderCode; 
		f.stlmCls.value 	= settings.orderCode;
		f.payCode.value 	= settings.orderCode;		
		f.useMonth.value 	= settings.useMonth;                                                            
		f.workType.value 	= settings.workType;	

		f.resultUrl.value   = settings.resultUrl;
		f.orderPdcInf.value = settings.orderPdcInf;
		f.orderCode.value   = settings.orderCode;
		f.orderCls.value    = settings.orderCls;

		if (settings.orderCls == "001") {
			if (settings.orderTotAmt != null) {
				f.orderTotAmt.value = settings.orderTotAmt;
			}
			
			pdcInf(f, formId);
			
			if (settings.orderPdcCnt != null && f.orderPdcCnt.value != settings.orderPdcCnt) {
				alert("결제 진행시 문제가 발생하였습니다.");
				return false;
			}
		} else if (settings.orderCls == "002") {  
			
			if (f.orderPdcInf.value == "") {
				   alert("구매상품이 없습니다.");
				   return false;
			}
			
			f.Amt.value = settings.orderTotAmt;
		}	 

		if (f.Amt.value == "") {
			alert("결제 진행시 문제가 발생하였습니다.");
			return false;
		}

		encryptData(formId);
		
		if ($("#EncryptData").val() != "") {
			goPay(f);
		} else {
			alert("결제 진행시 문제가 발생하였습니다.");
			return false;
		}
	};
	
	$.extend({
		pg : pg
	   ,formId : function() {
		   return settings.formId;
	   }
	});
	
	$.fn.pg = function(options) {
		return this.each(function() {
			$(this).click(function() {
				if (typeof options == 'undefined') {
					options = {};
				}
				
				if (options.orderCls == "001") {
					settings = $.extend({}, $.pg.one, options || {});
				} else if (options.orderCls = "002") {
					settings = $.extend({}, $.pg.sum, options || {});
				}
				$.pg.open(settings);
				return false;
			});
		});
	};
	

	function pdcInf(obj, formId) { 
		$.ajax({
			type   : 'POST',
			url    : '/cm/CM_PG_AMT.do',
			async  : false,
			data   : $('#' + formId).serialize(),			
			success: function(data, status) {
				if (data != null) {
					var result = data.pdcAmt.replace(/\s/g, "");
					obj.Amt.value = result;
					obj.orderPdcCnt.value = data.pdcCnt;
					return;
				} else {
					obj.Amt.value = "";
					obj.orderPdcCnt.value = "";
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				return;
			}
		});
	}
	
	function encryptData(formId) { 
		$.ajax({
			type   : 'POST',
			url    : '/cm/CM_PG_ENC.do',
			async  : false,
			data   : $('#' + formId).serialize(),			
			success: function(text, status) {
				var result = text.replace(/\s/g, "");
				$("#EncryptData").val(result);
				return;
			},
			error: function (xhr, textStatus, errorThrown) {
				return;
			}
		});		
	}
	
})(jQuery);

