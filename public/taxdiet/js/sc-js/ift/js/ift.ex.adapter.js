
var bankJson = {"002":"산업은행","003":"기업은행","004":"국민은행","007":"수협","011":"농협","020":"우리은행","023":"SC은행","027":"씨티은행","031":"대구은행","032":"부산은행","034":"광주은행","035":"제주은행","037":"전북은행","039":"경남은행","045":"새마을","048":"신협","071":"우체국","079":"우체국","081":"하나은행","088":"신한은행","089":"케이뱅크","090":"카카오뱅크"};
var cardJson = {"001":"신한카드","002":"현대카드","003":"삼성카드","004":"KB국민카드","005":"롯데카드","006":"하나카드","007":"우리카드","008":"농협카드","009":"씨티카드","010":"BC카드","011":"수협카드","012":"광주카드","013":"전북카드"};

var nxLoading;
var nxLoading = nxLoading || (function (opacity) {
	return {
		show: function(msg) {
			if($("#nxLoading").length) {
				
			} else {
				$("body").append(
					$("<div/>", {id: "nxLoading", style: "opacity:0.6;position: fixed;left: 0px;top: 0px;width: 100%;height: 100%;z-index: 9999;background: url('/js/sc-js/ift/css/img/page-loader-80.gif') 50% 50% no-repeat rgb(249,249,249);"}).addClass(".nx-loader")
				);
			}
			$("#nxLoading").show();
		},
		hide: function () {
			$("#nxLoading").hide();
		}
	};
})();

var uid = "";
var bizNo = "";
//var nxUrl = location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/../sc/nxWebC.do";
var nxUrl = "/sc/nxWebC.do";
var nxLogoUrl = "";
var resUrl = "http://t-renewal.nicedata.co.kr/vr/";
var resType = "SOAP";
var encYn = "N";
var npid = "";
var transData = {
	svcCls: ""
	, sysCd: ""
	, clientNo: ""
	, membNo: ""
};
var transDataForSch = {
		svcCls: ""
		, sysCd: ""
		, clientNo: ""
		, membNo: ""
	};
//var niceNxSetupUrl = location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/../download/sc/ift/NiceDmoa_setup_2017091804.exe";
var niceNxSetupUrl = "/download/sc/ift/NiceDmoa_setup_20171212.exe";

/**
 * @desc common load view
 */
function fnLoadView(url, target) {
	if($.cookie("nxInstalled") == "Y") {
		if(!target) location.href = url;
		else {
			$(target).attr("src", url);
		}
	} else {
		alert("설치가 필요합니다.");
		/*
		if(confirm("설치가 필요합니다.\n설치파일을 다운로드 하시겠습니까?")) {
			fnNxDownload();
		}
		*/
	}
}

/**
 * @page SC_main.html
 * @desc 설치확인
 */
function fnNxInstallCheck(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "setup"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(res) {
			$.cookie("nxInstalled", "Y", {expires: 7});
			// fnNxUpdateCheck(f);
			fnNxListSL(f);
		}
		, error: function(errMsg) {
			progress.stop();
			$("#nxListF").hide();
			$("#installF").show();
			$.cookie("nxInstalled", "N", {expires: 7});
			alert(errMsg);
			//fnNxDownload(niceNxSetupUrl);
		}
	});
}

function fnNxUpdateCheck(f) {
	if($.cookie("nxUpdated") == "Y") {
		fnNxListSL(f);
	} else {
		fnGetNxData({
			data: {
				url: nxUrl
				, op: "update"
				, transData: transData
			}
			, beforeSend: function() {
			}
			, success: function(res) {
				$.cookie("nxUpdated", "Y", {expires: 7});
				fnNxListSL(f);
			}
			, error: function(errMsg) {
				progress.stop();
				$.cookie("nxUpdated", "N", {expires: 7});
				alert(errMsg);
				fnNxDownload(niceNxSetupUrl);
			}
		});
	}
}

/**
 * @page SC_00.html
 * @desc 등록현황 조회
 */
function fnNxListSL(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
		, beforeSend: function() {
		}
		, success: function(nxData) {
			progress.stop();
			var orgList = [];
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				if(listMap.orgCd) orgList.push(listMap.orgCd);
			});
			var span, isReg;
			$.each($(f).find("table span"), function() {
				span = $(this);
				isReg = false;
				$.each(orgList, function(listNo, listVal) {
					if(span.is("." + listVal)) isReg = true;
				});
				if(isReg) {
					span.removeClass("reg_not");
					span.addClass("reg_ok");
					span.text("등록");
				} else {
					span.removeClass("reg_ok");
					span.addClass("reg_not");
					span.text("미등록");
				}
			});
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_01.html
 * @desc 홈택스 등록정보 조회
 */
function fnHometaxListSL(f) {
	var dtc = fnDetect();
	if("Mobile" == dtc.device.type || "Tablet" == dtc.device.type) {
		alert("모바일은 지원하지 않습니다.");
		return;
	}
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
	, beforeSend: function() {
		progress.start();
	}
	, success: function(nxData) {
		progress.stop();
		$.each(nxData.outJson.local_list, function(listNo, listMap) {
			if(listMap.orgCd == "hometax") {
				$(f).find("input[name=certificate_name]").val(listMap.certNm);
				$(f).find("input[name=entKey]").val(listMap.entKey);
				$(f).find("input[name=hmtDRBtn]").show();
			}
		});
		if(!$(f).find("input[name=certificate_name]").val()) {
			$(f).find("input[name=certificate_name]").val("미등록");
			$(f).find("input[name=entKey]").val("");
			$(f).find("input[name=hmtDRBtn]").hide();
		}
	}
	, error: function(errMsg) {
		progress.stop();
		alert(errMsg);
	}
	});
}

/**
 * @page SC_01.html
 * @desc 인증서 선택
 */
function fnHometaxCertIR00(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "certInfo"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnHometaxCertIR01(f, nxData);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_01.html
 * @desc 홈택스 로그인 검증
 */
function fnHometaxCertIR01(f, res) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "execute_check"
			, cid: res.outJson.certList[0].certPw
			, inJson: {
				orgCd: "hometax"
				, svcCd: "Z0000"
				, bizNo: bizNo
				, loginMethod: "CERT"
				, signCert: ""
				, signPri: ""
				, signPw: ""
			}
			, transData: transData
		}
		, beforeSend: function() {
		}
		, success: function(nxData) {
			progress.stop();
			if(nxData.outJson) {
				if(nxData.outJson.errYn && nxData.outJson.errYn == "Y") alert(nxData.outJson.errMsg || "인증서 정보가 올바르지 않습니다.\n홈택스에 등록된 인증서를 확인하세요.");
				else {
					$(f).find("input[name=certificate_name]").val(res.outJson.certList[0].certNm);
					$(f).find("input[name=certificate_name]").attr("data-cert", JSON.stringify(res));
				}
			}
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_01.html
 * @desc 홈택스 인증정보 등록
 */
function fnHometaxCertIR02(f) {
	var res;
	if($(f).find("input[name=certificate_name]").attr("data-cert")) {
		res = JSON.parse($(f).find("input[name=certificate_name]").attr("data-cert"));
	} else {
		alert("인증서가 선택되지 않았습니다.\n인증서를 선택하세요.");
		return false;
	}
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "upd_data"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, npid: npid
			, transData: transData
			, inJson: {
				entKey: ""
				, orgCd: "hometax"
				, orgDivCd: ""
				, useChannel: ""
				, loginMethod: "CERT"
				, userId: ""
				, userPw: ""
				, certNm: res.outJson.certList[0].certNm
				, certPw: res.outJson.certList[0].certPw
				, certOrgNm: res.outJson.certList[0].certOrgNm
				, certDate: res.outJson.certList[0].certDate
				, bizNo: bizNo
				, svcCd: ""
				, acctNo: ""
				, acctPw: ""
				, curCd: ""
				, cardNo: ""
				, etc1: res.outJson.certList[0].etc1 || ""
				, etc2: res.outJson.certList[0].etc2 || ""
				, etc3: res.outJson.certList[0].etc3 || ""
				, subClientNo : $(f).find("select[name=use_user_info]").val() == null ? "" : $(f).find("select[name=use_user_info]").val()
			}
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			progress.stop();
			var crtInf = "";
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				if(listMap.orgCd == "hometax") {
					crtInf = "인증서가 정상적으로 등록되었습니다.\n\n인증서: " + listMap.certNm + "\n만료일: " + listMap.certDate + "\n";
					$(f).find("input[name=certificate_name]").val(listMap.certNm);
					$(f).find("input[name=hmtIRBtn]").hide();
					$(f).find("input[name=hmtDRBtn]").show();
				}
			});
			if(crtInf) alert(crtInf);
			else alert("인증서 등록에 실패하였습니다.\n다시 등록하세요.");
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_01.html
 * @desc 홈택스 등록정보 확인
 */
function fnHometaxCertDR00(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnHometaxCertDR01(f, nxData);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_01.html
 * @desc 홈택스 등록정보 삭제
 */
function fnHometaxCertDR01(f, res) {
	$.each(res.outJson.local_list, function(listNo, listMap) {
		if(listMap.orgCd == "hometax") {
			fnGetNxData({
				data: {
					url: nxUrl
					, op: "del_data"
					, resUrl: resUrl
					, resType: resType
					, encYn: encYn
					, transData: transData
					, inJson: {
						entKey: listMap.entKey
					}
				}
				, beforeSend: function() {
				}
				, success: function(nxData) {
					progress.stop();
					var crtInf = "";
					$.each(nxData.outJson.local_list, function(listNo, listMap) {
						if(listMap.orgCd == "hometax") crtInf = listMap.certNm;
					});
					if(crtInf) alert("홈택스 인증정보가 삭제되지 않았습니다.\n다시 시도하세요.");
					else {
						$(f).find("input[name=certificate_name]").val("미등록");
						alert("홈택스 인증정보가 정상적으로 삭제되었습니다.");
						$(f).find("input[name=hmtIRBtn]").show();
						$(f).find("input[name=hmtDRBtn]").hide();
					}
				}
				, error: function(errMsg) {
					progress.stop();
					alert(errMsg);
				}
			});
		}
	});
}

/**
 * @page SC_02.html
 * @desc 은행 등록정보 조회
 */
function fnBankListSL(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
	, beforeSend: function() {
		progress.start();
	}
	, success: function(nxData) {
		progress.stop();
		$(f).find(".table_type1 tbody").html("");
		var bankListSize = 0;
		$.each(nxData.outJson.local_list, function(listNo, listMap) {
			if(listMap.orgCd == "bank") {
				bankListSize++;
				$(f).find(".table_type1 tbody").append(
					$("<tr/>")
						.append(
							$("<td/>").append(bankJson[listMap.orgDivCd])
						)
						.append(
							$("<td/>").append($.fnAccountNumberFormat({bankCd: listMap.orgDivCd, accNo: listMap.acctNo}))
						)
						.append(
							$("<td/>").append($("<a/>", {href: "#", onclick: "javascript:fnBankDR00('form[name=bankF]', '" + listMap.entKey + "'); return false;"}).addClass("del_btn").append("삭제"))
						)
				);
			}
		});
		if(bankListSize == 0) {
			$(f).find(".table_type1 tbody").append(
				$("<tr/>")
					.append(
						$("<td/>", {colspan: "3"}).append("등록된 은행정보를 찾을 수 없습니다.")
					)
			);
		}
	}
	, error: function(errMsg) {
		progress.stop();
		alert(errMsg);
	}
	});
}

/**
 * @page SC_02.html
 * @desc 은행 VO 설정
 */
function fnBankVO(json) {
	var vo = {};
	vo.orgCd = "bank";
	if(json.service_type == "service_type1") {
		vo.orgCd = "bank";
		vo.useChannel = "1";
	} else if(json.service_type == "service_type2") {
		vo.orgCd = "cbk";
		vo.useChannel = "2";
	} else if(json.service_type == "service_type4") {
		vo.orgCd = "cbk";
		vo.useChannel = "3";
	} else if(json.service_type == "service_type3") {
		vo.orgCd = "sbk";
		vo.useChannel = "S";
	}
	if(vo.orgCd == "sbk") {
		vo.loginMethod = "ID";
	} else {
		if(json.login_type == "login_type1") {
			vo.loginMethod = "CERT";
		} else if(json.login_type == "login_type2") {
			vo.loginMethod = "ID";
		} else if(json.login_type == "login_type3") {
			vo.loginMethod = "ID";
		} else {
			vo.loginMethod = "";
		}
	}
	vo.bankCd = json.bankCd || "";
	vo.signCert = "";
	vo.signPri = "";
	vo.signPw = "";
	if(vo.useChannel == "S") {
		vo.userId = json.sbk_id ? $.trim(json.sbk_id) : "";
		vo.userPw = json.sbk_pw ? $.trim(json.sbk_pw) : "";
		//bankJson = {"002":"산업은행","003":"기업은행","004":"국민은행","007":"수협","011":"농협","020":"우리은행","023":"SC은행","027":"씨티은행","031":"대구은행","032":"부산은행","034":"광주은행","035":"제주은행","037":"전북은행","039":"경남은행","045":"새마을","048":"신협","071":"우체국","079":"우체국","081":"하나은행","088":"신한은행"};
		if(
			json.bankCd == "004"//국민
			|| json.bankCd == "088"//신한
			|| json.bankCd == "031"//대구
			|| json.bankCd == "048"//신협
			) {
			vo.bizNo = json.sbk_personal_number ? $.trim(json.sbk_personal_number) : "";
			vo.acctNo = json.sbk_bank_number ? $.trim(json.sbk_bank_number) : "";
			if(json.bankCd != "004") {
				vo.acctPw = json.sbk_bank_pw ? $.trim(json.sbk_bank_pw) : "";
			}
		}else{
			vo.bizNo = json.sbk_personal_number ? $.trim(json.sbk_personal_number) : "";
			vo.acctNo = json.sbk_bank_number ? $.trim(json.sbk_bank_number) : "";
			vo.acctPw = json.sbk_bank_pw ? $.trim(json.sbk_bank_pw) : "";
		}
	} else {
		if (vo.loginMethod == "CERT"){
			vo.certNm = json.cf_name ? $.trim(json.cf_name) : "";
			vo.certPw = json.cf_name_pw ? $.trim(json.cf_name_pw) : "";
			vo.certOrgNm = json.cf_org_nm ? $.trim(json.cf_org_nm) : "";
			vo.certDate = json.cf_date ? $.trim(json.cf_date) : "";
		}else{
			vo.userId = json.cf_id ? $.trim(json.cf_id) : "";
			vo.userPw = json.cf_pw ? $.trim(json.cf_pw) : "";
		}
	}
	
	vo.sdate = $.fnGetDate({format:"yyyyMMdd"});
	vo.edate = $.fnGetDate({format:"yyyyMMdd"});
	
	vo.subClientNo = $.trim(json.sub_user_info) || "";
	return vo;
}
function fnSetBankOption(f) {
	
	var bankCd = $(f).find(".btn_bc_list li.active").attr("data-code");
	
	if(
		bankCd == "088"//신한
		|| bankCd == "031"//대구
		|| bankCd == "048"//신협
		|| bankCd == "089"//케이 - 향후를 위해 처리(인포텍에서 개인인터넷뱅킹 아이디 조회를 빠른조회에 적용해준다고하면 바로 쓸 수 있도록 조치)
		|| bankCd == "090"//카카오 - 향후를 위해 처리(인포텍에서 인터넷뱅킹 아이디 조회를 빠른조회에 적용해준다고하면 바로 쓸 수 있도록 조치)
		) {
		$(f).find(".cfl_id2").show();
		$(f).find(".cfl_pw2").show();
	} else if(bankCd == "004") {
		$(f).find(".cfl_id2").show();
		$(f).find(".cfl_pw2").hide();
	} else {
		$(f).find(".cfl_id2").hide();
		$(f).find(".cfl_pw2").hide();
	}
}

/**
 * @page SC_02.html
 * @desc 은행 VO 검증
 */
function fnBankValid(f, json) {
	
	if(!json.bankCd) {
		alert("은행을 선택하세요.");
	} else if(!json.loginMethod) {
		alert("로그인 방식을 선택하세요.");
	} else if(json.useChannel != "S" && json.loginMethod == "CERT" && !json.certNm) {
		alert("인증서를 선택하세요.");
		$(f).find("input[name=cf_name_pw]").val("");
		$(f).find("input[name=cf_name]").val("").focus();
	} else if(json.useChannel != "S" && json.loginMethod == "ID" && !json.userId) {
		alert("아이디를 입력하세요.");
		$(f).find("input[name=cf_id]").val("").focus();
	} else if(json.useChannel != "S" && json.loginMethod == "ID" && !json.userPw) {
		alert("비밀번호를 입력하세요.");
		$(f).find("input[name=cf_pw]").val("").focus();
	} else if(json.useChannel == "S" && json.orgDivCd == "004" && !json.userId) {
		alert("아이디를 입력하세요.");
	} else if(json.useChannel == "S") {
		if(
			json.orgDivCd == "088"//신한
			|| json.orgDivCd == "031"//대구
			|| json.orgDivCd == "048"//신협
			) {
			if(!json.userId) {
				alert("아이디를 입력하세요.");
				return false;
			} else if(!json.userPw) {
				alert("비밀번호를 입력하세요.");
				return false;
			}
		}else {
			return true;
		}
	} else {
		return true;
	}
	
	return false;
}

/**
 * @page SC_02.html
 * @desc 인증서 조회
 */
function fnBankAccSL00(f) {
	
	$(f).find("input[name=table_check_all]").prop("checked", false);
	
	var formJson = $(f).formToJson();
	formJson.bankCd = $(f).find(".btn_bc_list li.active").attr("data-code");
	var inJson = fnBankVO(formJson);
	
	var bankValid = fnBankValid(f, inJson);
	if(bankValid) {
		
		if(inJson.loginMethod == "CERT") {
			fnGetNxData({
				data: {
					url: nxUrl
					, op: "certInfo"
					, transData: transData
				}
				, beforeSend: function() {
					progress.start();
				}
				, success: function(nxData) {
					fnBankAccSL01(f, inJson, nxData);
				}
				, error: function(errMsg) {
					progress.stop();
					alert(errMsg);
				}
			});
		} else if(inJson.useChannel == "S") {
			fnBankAccSL02(f, inJson);
		} else {
			fnBankAccSL01(f, inJson);
		}
		
	}
}

/**
 * @page SC_02.html
 * @desc 은행 전계좌 조회
 */
function fnBankAccSL01(form, json, res) {
	json.svcCd = "B0001";
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "execute_check"
			, cid: res ? res.outJson.certList[0].certPw : ""
			, inJson: json
			, transData: transData
		}
		, beforeSend: function() {
		}
		, success: function(nxData) {
			progress.stop();
			$(form).find(".bank_select_pop_wrap table tbody").html("");
			var inJson = {};
			$.each(nxData.outJson.outB0001.list, function(listNo, listMap) {
				
				inJson = {
					entKey: ""
					, orgCd: "bank"
					, orgDivCd: json.bankCd
					, useChannel: json.useChannel
					, loginMethod: json.loginMethod
					, userId: json.userId || ""
					, userPw: json.userPw || ""
					, certNm: res ? res.outJson.certList[0].certNm : ""
					, certPw: res ? res.outJson.certList[0].certPw : ""
					, certOrgNm: res ? res.outJson.certList[0].certOrgNm : ""
					, certDate: res ? res.outJson.certList[0].certDate : ""
					, bizNo: json.bizNo
					, svcCd: ""
					, acctNo: listMap.acctNo
					, acctPw: json.acctPw
					, curCd: ""
					, cardNo: ""
					, etc1: res ? res.outJson.certList[0].etc1 : ""
					, etc2: res ? res.outJson.certList[0].etc2 : ""
					, etc3: res ? res.outJson.certList[0].etc3 : ""
				};
				
				$(form).find(".bank_select_pop_wrap table tbody")
					.append(
						$("<tr/>")
							.append(
								$("<td/>").append($("<input/>", {type: "checkbox", name: "acctNo"}).val(JSON.stringify(inJson)))
							)
							.append(
								$("<td/>").append(listMap.acctNo)
							)
							.append(
								$("<td/>").append(listMap.acctNm)
							)
					)
					;
			});
			if(nxData.outJson.outB0001.list.length == 0) {
				$(form).find(".bank_select_pop_wrap table tbody")
					.append(
						$("<tr/>")
							.append(
								$("<td/>", {colspan: "3"}).append("등록 가능한 계좌를 찾을 수 없습니다.")
							)
					)
				;
			}
			$(form).find(".bank_select_pop_wrap").show();
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_02.html
 * @desc 은행 빠른계좌 조회
 */
function fnBankAccSL02(form, json, res) {
	json.svcCd = "B0002";
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "execute_check"
			, inJson: json
			, transData: transData
		}
	, beforeSend: function() {
	}
	, success: function(nxData) {
		progress.stop();
		fnBankAccIL01(
			form
			, [{
				entKey: ""
				, orgCd: "bank"
				, orgDivCd: json.bankCd
				, useChannel: json.useChannel
				, loginMethod: json.loginMethod
				, userId: json.userId || ""
				, userPw: json.userPw || ""
				, certNm: ""
				, certPw: ""
				, certOrgNm: ""
				, certDate: ""
				, bizNo: json.bizNo
				, svcCd: ""
				, acctNo: json.acctNo || ""
				, acctPw: json.acctPw || ""
				, curCd: ""
				, cardNo: ""
				, etc1: ""
				, etc2: ""
				, etc3: ""
			}]
			, 1
		);
	}
	, error: function(errMsg) {
		progress.stop();
		alert(errMsg);
	}
	});
}

/**
 * @page SC_02.html
 * @desc 은행 계좌 리스트 확인
 */
function fnBankAccIL00(form) {
	//if($(form).find("select[name=service_type]") == "service_type3") {
	//} else if($(form).find("input[name=acctNo]:checked").length > 0) {
	if($(form).find("input[name=acctNo]:checked").length > 0) {
		var bankList = [];
		$.each($(form).find("input[name=acctNo]:checked"), function() {
			bankList.push(JSON.parse($(this).val()));
		});
		if(bankList.length > 0) fnBankAccIL01(form, bankList, bankList.length);
	} else {
		alert("등록하실 계좌를 선택하세요.");
	}
}

/**
 * @page SC_02.html
 * @desc 은행 등록정보 저장
 */
function fnBankAccIL01(form, bankList, totalCount) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "upd_data"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: bankList[0]
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			progress.stop();
			bankList.splice(0, 1);
			if(bankList.length > 0) fnBankAccIL01(form, bankList, totalCount);
			else {
				alert("[ " + totalCount + " ] 건의 은행정보가 등록되었습니다.");
				$(form).find(".bank_select_pop_wrap").hide();
				fnBankListSL(form);
			}
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_02.html
 * @desc 은행 등록정보 삭제
 */
function fnBankDR00(form, entKey) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "del_data"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: {
				entKey: entKey
			}
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnBankListSL(form);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}


/**
 * @page SC_03.html
 * @desc 유노트 등록정보 조회
 */
function fnUnoteListSL(f) {
	var dtc = fnDetect();
	if("Mobile" == dtc.device.type || "Tablet" == dtc.device.type) {
		alert("모바일은 지원하지 않습니다.");
		return;
	}
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
	, beforeSend: function() {
		progress.start();
	}
	, success: function(nxData) {
		progress.stop();
		$.each(nxData.outJson.local_list, function(listNo, listMap) {
			if(listMap.orgCd == "unote") {
				$(f).find("input[name=certificate_name]").val(listMap.certNm);
				$(f).find("input[name=entKey]").val(listMap.entKey);
				$(f).find("input[name=untDRBtn]").show();
			}
		});
		if(!$(f).find("input[name=certificate_name]").val()) {
			$(f).find("input[name=certificate_name]").val("미등록");
			$(f).find("input[name=entKey]").val("");
			$(f).find("input[name=untDRBtn]").hide();
		}
	}
	, error: function(errMsg) {
		progress.stop();
		alert(errMsg);
	}
	});
}

/**
 * @page SC_03.html
 * @desc 인증서 선택
 */
function fnUnoteCertIR00(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "certInfo"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnUnoteCertIR01(f, nxData);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_03.html
 * @desc 유노트 로그인 검증
 */
function fnUnoteCertIR01(f, res) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "execute_check"
			, cid: res.outJson.certList[0].certPw
			, inJson: {
				orgCd: "unote"
				, svcCd: "Z0000"
				, loginMethod: "CERT"
				, signCert: ""
				, signPri: ""
				, signPw: ""
			}
			, transData: transData
		}
		, beforeSend: function() {
		}
		, success: function(nxData) {
			progress.stop();
			if(nxData.outJson) {
				if(nxData.outJson.errYn && nxData.outJson.errYn == "Y") alert(nxData.outJson.errMsg || "인증서 정보가 올바르지 않습니다.\nU-NOTE에 등록된 인증서를 확인하세요.");
				else {
					$(f).find("input[name=certificate_name]").val(res.outJson.certList[0].certNm);
					$(f).find("input[name=certificate_name]").attr("data-cert", JSON.stringify(res));
				}
			}
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_03.html
 * @desc 유노트 인증정보 등록
 */
function fnUnoteCertIR02(f) {
	var res;
	if($(f).find("input[name=certificate_name]").attr("data-cert")) {
		res = JSON.parse($(f).find("input[name=certificate_name]").attr("data-cert"));
	} else {
		alert("인증서가 선택되지 않았습니다.\n인증서를 선택하세요.");
		return false;
	}
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "upd_data"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: {
				entKey: ""
				, orgCd: "unote"
				, orgDivCd: ""
				, useChannel: ""
				, loginMethod: "CERT"
				, userId: ""
				, userPw: ""
				, certNm: res.outJson.certList[0].certNm
				, certPw: res.outJson.certList[0].certPw
				, certOrgNm: res.outJson.certList[0].certOrgNm
				, certDate: res.outJson.certList[0].certDate
				, bizNo: ""
				, svcCd: ""
				, acctNo: ""
				, acctPw: ""
				, curCd: ""
				, cardNo: ""
				, etc1: res.outJson.certList[0].etc1 || ""
				, etc2: res.outJson.certList[0].etc2 || ""
				, etc3: res.outJson.certList[0].etc3 || ""
			}
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			progress.stop();
			var crtInf = "";
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				if(listMap.orgCd == "unote") crtInf = "인증서가 정상적으로 등록되었습니다.\n\n인증서: " + listMap.certNm + "\n만료일: " + listMap.certDate + "\n";
			});
			if(crtInf) {
				alert(crtInf);
				$(f).find("input[name=untDRBtn]").show();
			}
			else alert("인증서 등록에 실패하였습니다.\n다시 등록하세요.");
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_03.html
 * @desc 유노트 등록정보 확인
 */
function fnUnoteCertDR00(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnUnoteCertDR01(f, nxData);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_03.html
 * @desc 유노트 등록정보 삭제
 */
function fnUnoteCertDR01(f, res) {
	$.each(res.outJson.local_list, function(listNo, listMap) {
		if(listMap.orgCd == "unote") {
			fnGetNxData({
				data: {
					url: nxUrl
					, op: "del_data"
					, resUrl: resUrl
					, resType: resType
					, encYn: encYn
					, transData: transData
					, inJson: {
						entKey: listMap.entKey
					}
				}
				, beforeSend: function() {
				}
				, success: function(nxData) {
					progress.stop();
					var crtInf = "";
					$.each(nxData.outJson.local_list, function(listNo, listMap) {
						if(listMap.orgCd == "unote") crtInf = listMap.certNm;
					});
					if(crtInf) alert("유노트 인증정보가 삭제되지 않았습니다.\n다시 시도하세요.");
					else {
						$(f).find("input[name=certificate_name]").val("미등록");
						alert("유노트 인증정보가 정상적으로 삭제되었습니다.");
						$(f).find("input[name=untDRBtn]").hide();
					}
				}
				, error: function(errMsg) {
					progress.stop();
					alert(errMsg);
				}
			});
		}
	});
}

/**
 * @page SC_04.html
 * @desc 여신협회 등록정보 조회
 */
function fnCardsalesListSL(f) {
	var dtc = fnDetect();
	if("Mobile" == dtc.device.type || "Tablet" == dtc.device.type) {
		alert("모바일은 지원하지 않습니다.");
		return;
	}
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			progress.stop();
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				if(listMap.orgCd == "cardsales") {
					$(f).find("input[name=userId]").val(listMap.userId);
					$(f).find("input[name=bizNo]").val(listMap.bizNo);
					$(f).find("input[name=entKey]").val(listMap.entKey);
					$(f).find("input[name=cslDRBtn]").show();
				}
			});
			if(!$(f).find("input[name=userId]").val()) {
				$(f).find("input[name=entKey]").val("");
				$(f).find("input[name=cslDRBtn]").hide();
			}
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_04.html
 * @desc 여신협회 VO 설정
 */
function fnCardsalesVO(json) {
	var vo = {};
	vo.orgCd = "cardsales";
	vo.loginMethod = "ID";
	vo.userId = json.userId ? $.trim(json.userId) : "";
	vo.userPw = json.userPw ? $.trim(json.userPw) : "";
	vo.bizNo = json.bizNo ? $.trim(json.bizNo) : "";
	//vo.subClientNo = json.subClientNo ? $.trim(json.subClientNo) : "";
	vo.subClientNo = $.trim(json.use_user_info) || "";
	return vo;
}

/**
 * @page SC_04.html
 * @desc 여신협회 VO 검증
 */
function fnCardsalesValid(f, json) {
	
	if(json.loginMethod == "ID" && !json.userId) {
		alert("아이디를 입력하세요.");
		$(f).find("input[name=userId]").val("").focus();
	} else if(json.loginMethod == "ID" && !json.userPw) {
		alert("비밀번호를 입력하세요.");
		$(f).find("input[name=userPw]").val("").focus();
	} else if(!json.bizNo) {
		alert("사업자번호를 입력하세요.");
		$(f).find("input[name=bizNo]").val("").focus();
	} else {
		return true;
	}
	
	return false;
}

/**
 * @page SC_04.html
 * @desc 여신협회 등록정보 검증
 */
function fnCardsalesIdIR00(f) {
	
	var formJson = $(f).formToJson();
	var inJson = fnCardsalesVO(formJson);
	
	var cardsalesValid = fnCardsalesValid(f, inJson);
	if(cardsalesValid) {
		fnCardsalesIdIR01(f, inJson);
	}
}

/**
 * @page SC_04.html
 * @desc 여신협회 가맹점
 */
function fnCardsalesIdIR01(f, json, res) {
	json.svcCd = "B0001";
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "execute_check"
			, inJson: json
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			if(nxData.outJson) {
				if(nxData.outJson.outB0001.list.length > 0) {
					fnCardsalesIdIR02(f, json, nxData)
				} else {
					progress.stop();
					alert("가맹점 정보를 확인할 수 없습니다.");
				}
			}
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_04.html
 * @desc 여신협회 인증정보 등록
 */
function fnCardsalesIdIR02(f, json, res) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "upd_data"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: {
				entKey: ""
				, orgCd: "cardsales"
				, orgDivCd: ""
				, useChannel: ""
				, loginMethod: "ID"
				, userId: json.userId
				, userPw: json.userPw
				, certNm: ""
				, certPw: ""
				, certOrgNm: ""
				, certDate: ""
				, bizNo: ""
				, svcCd: "B0021"
				, acctNo: ""
				, acctPw: ""
				, curCd: ""
				, cardNo: ""
				, etc1: res.outJson.outB0001.list[0].memGrpId
				, etc2: ""
				, etc3: ""
			}
		}
		, beforeSend: function() {
		}
		, success: function(nxData) {
			progress.stop();
			var crtInf = "";
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				if(listMap.orgCd == "cardsales") {
					crtInf = "인증정보가 정상적으로 등록되었습니다.\n\n아이디: " + listMap.userId + "\n가맹점: " + res.outJson.outB0001.list[0].memNm + "\n";
					$(f).find("input[name=userId]").val(listMap.userId);
					$(f).find("input[name=userPw]").val("");
					$(f).find("input[name=cslDRBtn]").show();
				}
			});
			if(crtInf) alert(crtInf);
			else alert("인증정보 등록에 실패하였습니다.\n다시 등록하세요.");
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_04.html
 * @desc 여신협회 등록정보 확인
 */
function fnCardsalesIdDR00(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnCardsalesIdDR01(f, nxData);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_04.html
 * @desc 여신협회 등록정보 삭제
 */
function fnCardsalesIdDR01(f, res) {
	$.each(res.outJson.local_list, function(listNo, listMap) {
		if(listMap.orgCd == "cardsales") {
			fnGetNxData({
				data: {
					url: nxUrl
					, op: "del_data"
					, resUrl: resUrl
					, resType: resType
					, encYn: encYn
					, transData: transData
					, inJson: {
						entKey: listMap.entKey
					}
				}
				, beforeSend: function() {
				}
				, success: function(nxData) {
					progress.stop();
					var crtInf = "";
					$.each(nxData.outJson.local_list, function(listNo, listMap) {
						if(listMap.orgCd == "cardsales") crtInf = listMap.userId;
					});
					if(crtInf) alert("여신금융협회 인증정보가 삭제되지 않았습니다.\n다시 시도하세요.");
					else {
						$(f).find("input[name=userId]").val("");
						$(f).find("input[name=userPw]").val("");
						$(f).find("input[name=cslDRBtn]").hide();
						alert("여신금융협회 인증정보가 정상적으로 삭제되었습니다.");
					}
				}
				, error: function(errMsg) {
					progress.stop();
					alert(errMsg);
				}
			});
		}
	});
}

/**
 * @page SC_05.html
 * @desc 카드 등록정보 조회
 */
function fnCardListSL(f) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "inq_data"
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			progress.stop();
			$(f).find(".table_type1 tbody").html("");
			var cardListSize = 0;
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				if(listMap.orgCd == "card") {
					cardListSize++;
					$(f).find(".table_type1 tbody").append(
						$("<tr/>")
							.append(
								$("<td/>").append(cardJson[listMap.orgDivCd])
							)
							.append(
								$("<td/>").append($.fnCardNumberFormat({cardNo:listMap.cardNo}))
							)
							.append(
								$("<td/>").append($("<a/>", {href: "#", onclick: "javascript:fnCardDR00('form[name=cardF]', '" + listMap.entKey + "'); return false;"}).addClass("del_btn").append("삭제"))
							)
					);
				}
			});
			if(cardListSize == 0) {
				$(f).find(".table_type1 tbody").append(
					$("<tr/>")
						.append(
							$("<td/>", {colspan: "3"}).append("등록된 카드정보를 찾을 수 없습니다.")
						)
				);
			}
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_05.html
 * @desc 카드 VO 설정
 */
function fnCardVO(json) {
	var vo = {};
	vo.orgCd = json.orgCd || "";
	vo.svcCd = "";
	vo.loginMethod = json.loginMethod || "";
	vo.cardCd = json.cardCd || "";
	vo.signCert = "";
	vo.signPri = "";
	vo.signPw = "";
	vo.certNm = vo.loginMethod == "CERT" ? $.trim(json.cf_name) : "";
	vo.certPw = vo.loginMethod == "CERT" ? $.trim(json.cf_name_pw) : "";
	vo.certOrgNm = vo.loginMethod == "CERT" ? $.trim(json.cf_org_nm) : "";
	vo.certDate = vo.loginMethod == "CERT" ? $.trim(json.cf_date) : "";
	vo.userId = vo.loginMethod == "ID" ? $.trim(json.userId) : "";
	vo.userPw = vo.loginMethod == "ID" ? $.trim(json.userPw) : "";
	vo.bizNo = json.bizNo ? json.bizNo.replace(/-/g, "") : "";
	vo.cardNo = json.cardNo ? json.cardNo.replace(/-/g, "") : "";
	vo.sdate = "";
	vo.edate = "";
	vo.subClientNo = $.trim(json.sub_user_info) || "";
	return vo;
}
//function fnSetCardOption(f) {
//	
//	var cardInfos = {
//		card: {
//			"001": ["CERT", "ID"]
//			, "002": ["CERT", "ID"]
//			, "003": ["CERT", "ID"]
//			, "004": ["CERT", "ID"]
//			, "005": ["CERT", "ID"]
//			, "006": ["CERT", "ID"]
//			, "007": ["CERT", "ID"]
//			, "008": ["CERT", "ID"]
//			, "009": ["CERT", "ID"]
//			, "010": ["CERT", "ID"]
//		}
//		, ccd: {
//			"001": ["ID"]
//			, "002": ["ID"]
//			, "003": ["ID"]
//			, "004": ["CERT", "ID", "BIZNO"]
//			, "005": ["ID"]
//			, "006": ["ID", "BIZNO"]
//			, "007": ["CERT"]
//			, "008": ["CERT", "BIZNO"]
//			, "009": ["ID", "BIZNO"]
//			, "010": ["CERT", "ID", "BIZNO"]
//		}
//		/*
//		, ccd: {
//			"001": ["ID", "BIZNO"]
//			, "002": ["ID", "BIZNO"]
//			, "003": ["ID", "BIZNO"]
//			, "004": ["CERT", "ID", "BIZNO"]
//			, "005": ["ID", "BIZNO"]
//			, "006": ["ID", "BIZNO"]
//			, "007": ["CERT", "BIZNO"]
//			, "008": ["CERT", "BIZNO"]
//			, "009": ["ID", "BIZNO"]
//			, "010": ["CERT", "ID", "BIZNO"]
//		}
//		 */
//	};
//	
//	var formJson = $(f).formToJson();
//	formJson.cardCd = $(f).find(".btn_bc_list li.active").attr("data-code");
//	var inJson = fnCardVO(formJson);
//	
//	//alert(JSON.stringify(inJson, null, 2))
//	
//	if(inJson.orgCd && inJson.loginMethod && inJson.cardCd && inJson.cardCd != "888") {
//		
//		$('#certificate_wrap').show();
//		$(f).find(".bizNo").hide();
//		
//		var cardInfo = cardInfos[inJson.orgCd][inJson.cardCd];
//		
//		if(cardInfo.indexOf("BIZNO") > -1) {
//			$(f).find(".bizNo").show();
//			$(f).find("input[name=bizNo]").addClass("active");
//		} else {
//			$(f).find(".bizNo").hide();
//			$(f).find("input[name=bizNo]").removeClass("active");
//		}
//		
//		if(cardInfo.indexOf("CERT") > -1 && cardInfo.indexOf("ID") > -1) {
//			
//			$(f).find(".id_certificate").hide();
//			$(f).find(".both").show();
//			
//			if(inJson.loginMethod == "CERT") $(f).find(".id").hide();
//			else $(f).find(".id").show();
//			
//		} else if(cardInfo.indexOf("CERT") > -1) {
//			
//			$(f).find(".id_certificate").hide();
//			$(f).find(".certService").show();
//			
//			if($(f).find("select[name=loginMethod]").val() == "ID") {
//				alert("인증서 조회만 가능합니다.");
//				$(".id").hide();
//				$(f).find("select[name=loginMethod]").val("CERT");
//			}
//			
//		} else if(cardInfo.indexOf("ID") > -1) {
//			
//			$(f).find(".id_certificate").hide();
//			$(f).find(".idService").show();
//			
//			if($(f).find("select[name=loginMethod]").val() == "CERT") {
//				alert("아이디 조회만 가능합니다.");
//				$(f).find("select[name=loginMethod]").val("ID");
//				$(f).find(".id").show();
//			}
//			
//		} else {
//			
//			$(f).find(".id").hide();
//			
//		}
//		
//	} else {
//		if(inJson.cardCd == "888") {
//			$(f).find(".id_certificate").hide();
//			$(f).find(".notService").show();
//		}
//		$('#certificate_wrap').hide();
//	}
//}

function fnSetCardOption(f) {
	
	var cardInfos = {
		card: {
			"001": ["CERT", "ID"]
			, "002": ["CERT", "ID"]
			, "003": ["CERT", "ID"]
			, "004": ["CERT", "ID"]
			, "005": ["CERT", "ID"]
			, "006": ["CERT", "ID"]
			, "007": ["CERT", "ID"]
			, "008": ["CERT", "ID"]
			, "009": ["CERT", "ID"]
			, "010": ["CERT", "ID"]
			, "011": ["CERT"]
			, "012": ["CERT"]
			, "013": ["CERT", "ID"]
		}
		, ccd: {
			"001": ["ID"]
			, "002": ["ID"]
			, "003": ["ID"]
			, "004": ["CERT", "ID", "BIZNO"]
			, "005": ["ID"]
			, "006": ["ID", "BIZNO"]
			, "007": ["CERT"]
			, "008": ["CERT", "BIZNO"]
			, "009": ["ID", "BIZNO"]
			, "010": ["CERT", "ID", "BIZNO"]
			, "011": ["CERT"]
			, "012": ["CERT"]
			, "013": ["CERT"]
		}
		/*
		, ccd: {
			"001": ["ID", "BIZNO"]
			, "002": ["ID", "BIZNO"]
			, "003": ["ID", "BIZNO"]
			, "004": ["CERT", "ID", "BIZNO"]
			, "005": ["ID", "BIZNO"]
			, "006": ["ID", "BIZNO"]
			, "007": ["CERT", "BIZNO"]
			, "008": ["CERT", "BIZNO"]
			, "009": ["ID", "BIZNO"]
			, "010": ["CERT", "ID", "BIZNO"]
		}
		 */
	};
	
	var formJson = $(f).formToJson();
	formJson.cardCd = $(f).find(".btn_bc_list li.active").attr("data-code");
	var inJson = fnCardVO(formJson);
	
	//alert(JSON.stringify(inJson, null, 2))
	
	if(inJson.orgCd && inJson.loginMethod && inJson.cardCd && inJson.cardCd != "888") {
		
		//$("#certificate_wrap").show();
		//$(".sb_footer").hide();
		//$(f).find(".bizNo").hide();
		$(".sb_footer").show();
		$(".sb_footer_sub").hide();
		$(".card_no_wrap").show();
		
		var cardInfo = cardInfos[inJson.orgCd][inJson.cardCd];
		
		if(cardInfo.indexOf("BIZNO") > -1) {
			//$(f).find(".bizNo").show();
			$(".biz_no_wrap").show();
			//$(f).find("input[name=bizNo]").addClass("active");
		} else {
			//$(f).find(".bizNo").hide();
			$(".biz_no_wrap").hide();
			//$(f).find("input[name=bizNo]").removeClass("active");
		}
		
		if(cardInfo.indexOf("CERT") > -1 && cardInfo.indexOf("ID") > -1) {
			
			$(f).find(".id_certificate").hide();
			$(f).find(".both").show();
			
			if(inJson.loginMethod == "CERT") $(".certificate_wrap").show(); //$(f).find(".id").hide();
			else $(".id_wrap").show(); //$(f).find(".id").show();
			
		} else if(cardInfo.indexOf("CERT") > -1) {
			
			$(f).find(".id_certificate").hide();
			$(f).find(".certService").show();
			$(".certificate_wrap").show();
			
			if($(f).find("select[name=loginMethod]").val() == "ID") {
				alert("인증서 조회만 가능합니다.");
				$(".id_wrap").hide(); //$(".id").hide();
				$(f).find("select[name=loginMethod]").val("CERT");
			}
			
		} else if(cardInfo.indexOf("ID") > -1) {
			
			$(f).find(".id_certificate").hide();
			$(f).find(".idService").show();
			$(".id_wrap").show();
			
			if($(f).find("select[name=loginMethod]").val() == "CERT") {
				alert("아이디 조회만 가능합니다.");
				$(f).find("select[name=loginMethod]").val("ID");
				$(".certificate_wrap").hide(); //$(f).find(".id").show();
			}
			
		} else {
			
			$(".certificate_wrap").show(); //$(f).find(".id").hide();
			
		}
		
	} else {
		if(inJson.cardCd == "888") {
			$(f).find(".id_certificate").hide();
			$(f).find(".notService").show();
		}
		//$('#certificate_wrap').hide();
	}
}

/**
 * @page SC_05.html
 * @desc 카드 VO 검증
 */
function fnCardValid(f, json) {
	
	if(!json.cardCd) {
		alert("은행을 선택하세요.");
	} else if(!json.loginMethod) {
		alert("로그인 방식을 선택하세요.");
	} else if(json.loginMethod == "ID" && !json.userId) {
		alert("아이디를 입력하세요.");
		$(f).find("input[name=userId]").val("").focus();
	} else if(json.loginMethod == "ID" && !json.userPw) {
		alert("비밀번호를 입력하세요.");
		$(f).find("input[name=userPw]").val("").focus();
	} else if(!json.bizNo && $(f).find("input[name=bizNo]").is(".active")) {
		alert("주민(사업자등록)번호를 입력하세요.");
		$(f).find("input[name=bizNo]").val("").focus();
	} else if(!json.cardNo) {
		alert("카드번호를 입력하세요.");
		$(f).find("input[name=cardNo]").val("").focus();
	} else {
		return true;
	}
	
	return false;
}

/**
 * @page SC_05.html
 * @desc 인증서 조회
 */
function fnCardIR00(f) {
	
	var formJson = $(f).formToJson();
	formJson.cardCd = $(f).find(".btn_bc_list li.active").attr("data-code");
	var inJson = fnCardVO(formJson);
	
	var cardValid = fnCardValid(f, inJson);
	if(cardValid) {
		
		if(inJson.loginMethod == "CERT") {
			fnGetNxData({
				data: {
					url: nxUrl
					, op: "certInfo"
					, transData: transData
				}
				, beforeSend: function() {
				}
				, success: function(nxData) {
					fnCardIR01(f, inJson, nxData);
				}
				, error: function(errMsg) {
					alert(errMsg);
				}
			});
		} else {
			fnCardIR01(f, inJson);
		}
		
	}
}

/**
 * @page SC_05.html
 * @desc 카드 로그인 검증
 */
function fnCardIR01(form, inJson, res) {
	inJson.svcCd = "C0005";
	inJson.sdate = $.fnGetDate({format:"yyyyMMdd"});
	inJson.edate = $.fnGetDate({format:"yyyyMMdd"});
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "execute_check"
			, cid: res ? res.outJson.certList[0].certPw : ""
			, inJson: inJson
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			if(nxData.outJson) {
				// 2017.04.24 - 이병웅 상무와 확인한 결과, 통합 errYn이 아닌 상세 err 정보를 보도록 확인.
				//if(nxData.outJson.errYn && nxData.outJson.errYn == "N") fnCardIR02(form, inJson, res);
				if(nxData.outJson.outC0005.errYn == "N") {
					alert("정보 확인이 완료되었습니다. 저장합니다.");
					fnCardIR02(form, inJson, res);
				}
				else {
					progress.stop();
					//alert(nxData.outJson.errMsg || "인증정보 인증에 실패하였습니다.\n카드사에 등록된 인증서(아이디/비밀번호)를 확인하세요.");
					alert(nxData.outJson.outC0005.errMsg || "인증정보 인증에 실패하였습니다.\n카드사에 등록된 인증서(아이디/비밀번호)를 확인하세요.");
				}
			}
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_05.html
 * @desc 카드 인증정보 등록
 */
function fnCardIR02(form, inJson, res) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "upd_data"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: {
				entKey: ""
				, orgCd: "card"
				, orgDivCd: inJson.cardCd
				, useChannel: inJson.orgCd == "card" ? "1" : "2"
				, loginMethod: inJson.loginMethod
				, userId: inJson.userId || ""
				, userPw: inJson.userPw || ""
				, certNm: res? res.outJson.certList[0].certNm : ""
				, certPw: res? res.outJson.certList[0].certPw : ""
				, certOrgNm: res? res.outJson.certList[0].certOrgNm : ""
				, certDate: res? res.outJson.certList[0].certDate : ""
				, bizNo: inJson.bizNo
				, svcCd: ""
				, acctNo: ""
				, acctPw: ""
				, curCd: ""
				, cardNo: inJson.cardNo
				, etc1: ""
				, etc2: ""
				, etc3: ""
			}
		}
		, beforeSend: function() {
		}
		, success: function(nxData) {
			progress.stop();
			var crtInf = "";
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				if(listMap.orgCd == "card") {
					crtInf = "인증정보가 정상적으로 등록되었습니다.\n\n카드사: " + cardJson[inJson.cardCd] + "\n카드번호: " + $.fnCardNumberFormat({cardNo:listMap.cardNo}) + "\n";
				}
			});
			if(crtInf) {
				//alert(crtInf);
			} else {
				alert("인증정보 등록에 실패하였습니다.\n다시 등록하세요.");
			}
			fnCardListSL(form);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}

/**
 * @page SC_05.html
 * @desc 카드 등록정보 삭제
 */
function fnCardDR00(form, entKey) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "del_data"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: {
				entKey: entKey
			}
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnCardListSL(form);
		}
		, error: function(errMsg) {
			progress.stop();
			alert(errMsg);
		}
	});
}


/**
 * @page SC_06.html
 * @desc 등록 인증정보 조회
 */
function fnCollectListSL(f, installCheck) {
	var dtc = fnDetect();
	if("Mobile" == dtc.device.type || "Tablet" == dtc.device.type) {
		alert("모바일은 지원하지 않습니다.");
		return;
	}
	fnGetNxData({
		data: {
			url: nxUrl
			, op: (installCheck == "Y" ? "update" : "inq_data")
			, transData: transData
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			progress.stop();
			$(f).find(".table_type1 tbody").html("");
			var listSize = 0;
			var searchList = [];
			var searchMap;
			$.each(nxData.outJson.local_list, function(listNo, listMap) {
				/*if (sysCd != "ND"){
					var bLive = true;
					$.each(reqList, function(idx, reqMap) {
						if (listMap.orgCd == reqMap.orgCd){
							
							break;
						}
					});
					if (!bLive){
						continue;
					}
				}*/
				
				listSize++;
				searchMap = {};
				searchMap.orgCd = listMap.orgCd;
				switch(listMap.orgCd) {
					case "hometax":
						if (listMap.svcCd.indexOf("Z3001") != -1){
							searchMap.entKey = listMap.entKey;
							searchMap.svcCd = listMap.svcCd;
							searchMap.orgTxt = "홈택스";
							searchMap.svcTxt = "전자(세금)계산서 매출";
							searchMap.accTxt = "공인인증서";
							searchMap.sdate = listMap.aStartDt;
							searchMap.edate = listMap.aEndDt;
							searchMap.chkVal = JSON.stringify({
								orgCd: listMap.orgCd
								, entKey: listMap.entKey
								, orgDivCd: ""
								, svcCd: listMap.svcCd
								, bizNo: ""
								, sdate: listMap.aStartDt
								, edate: listMap.aEndDt
								, term: listMap.term || ""
								, opt1: listMap.subSvc || ""
								, opt2: listMap.subSvc2 || ""
								, opt3: listMap.subSvc3 || ""
								, subClientNo: listMap.subClientNo || ""
							});
							console.log(searchMap.chkVal);
							console.log(listMap);
							searchList.push(JSON.parse(JSON.stringify(searchMap)));
						}
						if (listMap.svcCd.indexOf("Z3002") != -1){
							searchMap.entKey = listMap.entKey;
							searchMap.svcCd = listMap.svcCd;
							searchMap.orgTxt = "홈택스";
							searchMap.svcTxt = "전자(세금)계산서 매입";
							searchMap.accTxt = "공인인증서";
							searchMap.sdate = listMap.aStartDt;
							searchMap.edate = listMap.aEndDt;
							searchMap.chkVal = JSON.stringify({
								orgCd: listMap.orgCd
								, entKey: listMap.entKey
								, orgDivCd: ""
								, svcCd: listMap.svcCd
								, bizNo: ""
								, sdate: listMap.aStartDt
								, edate: listMap.aEndDt
								, term: listMap.term || ""
								, opt1: listMap.subSvc || ""
								, opt2: listMap.subSvc2 || ""
								, opt3: listMap.subSvc3 || ""
								, subClientNo: listMap.subClientNo || ""
							});
							searchList.push(JSON.parse(JSON.stringify(searchMap)));
						}
						if (listMap.svcCd.indexOf("Z4001") != -1){
							searchMap.entKey = listMap.entKey;
							searchMap.svcCd = listMap.svcCd;
							searchMap.orgTxt = "홈택스";
							searchMap.svcTxt = "현금영수증 매출";
							searchMap.accTxt = "공인인증서";
							searchMap.sdate = listMap.aStartDt;
							searchMap.edate = listMap.aEndDt;
							searchMap.chkVal = JSON.stringify({
								orgCd: listMap.orgCd
								, entKey: listMap.entKey
								, orgDivCd: ""
								, svcCd: listMap.svcCd
								, bizNo: ""
								, sdate: listMap.aStartDt
								, edate: listMap.aEndDt
								, term: listMap.term || ""
								, opt1: listMap.subSvc || ""
								, opt2: listMap.subSvc2 || ""
								, opt3: listMap.subSvc3 || ""
								, subClientNo: listMap.subClientNo || ""
							});
							searchList.push(searchMap);
						}
						if (listMap.svcCd.indexOf("Z4002") != -1){
							searchMap.entKey = listMap.entKey;
							searchMap.svcCd = listMap.svcCd;
							searchMap.orgTxt = "홈택스";
							searchMap.svcTxt = "현금영수증 매입";
							searchMap.accTxt = "공인인증서";
							searchMap.sdate = listMap.aStartDt;
							searchMap.edate = listMap.aEndDt;
							searchMap.chkVal = JSON.stringify({
								orgCd: listMap.orgCd
								, entKey: listMap.entKey
								, orgDivCd: ""
								, svcCd: listMap.svcCd
								, bizNo: ""
								, sdate: listMap.aStartDt
								, edate: listMap.aEndDt
								, term: listMap.term || ""
								, opt1: listMap.subSvc || ""
								, opt2: listMap.subSvc2 || ""
								, opt3: listMap.subSvc3 || ""
								, subClientNo: listMap.subClientNo || ""
							});
							searchList.push(searchMap);
						}
						if (listMap.svcCd.indexOf("Z5010") != -1){
							searchMap.entKey = listMap.entKey;
							searchMap.svcCd = listMap.svcCd;
							searchMap.orgTxt = "홈택스";
							searchMap.svcTxt = "종합소득세 신고도움 서비스";
							searchMap.accTxt = "공인인증서";
							searchMap.sdate = listMap.aStartDt;
							searchMap.edate = listMap.aEndDt;
							searchMap.chkVal = JSON.stringify({
								orgCd: listMap.orgCd
								, entKey: listMap.entKey
								, orgDivCd: ""
								, svcCd: listMap.svcCd
								, bizNo: ""
								, sdate: listMap.aStartDt
								, edate: listMap.aEndDt
								, term: listMap.term || ""
								, opt1: listMap.subSvc || ""
								, opt2: listMap.subSvc2 || ""
								, opt3: listMap.subSvc3 || ""
								, attrYr: listMap.attrYr || ""
							});
							searchList.push(searchMap);
						}
						if (listMap.svcCd.indexOf("Z5020") != -1){
							searchMap.entKey = listMap.entKey;
							searchMap.svcCd = listMap.svcCd;
							searchMap.orgTxt = "홈택스";
							searchMap.svcTxt = "부가세예정고지 세액";
							searchMap.accTxt = "공인인증서";
							searchMap.sdate = listMap.aStartDt;
							searchMap.edate = listMap.aEndDt;
							searchMap.chkVal = JSON.stringify({
								orgCd: listMap.orgCd
								, entKey: listMap.entKey
								, orgDivCd: ""
								, svcCd: listMap.svcCd
								, bizNo: ""
								, sdate: listMap.aStartDt
								, edate: listMap.aEndDt
								, term: listMap.term || ""
								, opt1: listMap.subSvc || ""
								, opt2: listMap.subSvc2 || ""
								, opt3: listMap.subSvc3 || ""
							});
							searchList.push(searchMap);
						}
						if (null == listMap.svcCd|| undefined == listMap.svcCd || "" == listMap.svcCd){
							var hometaxSvcCdList = {
								"Z3001,Z3003":"전자(세금)계산서 매출",
								"Z3002,Z3004":"전자(세금)계산서 매입",
								"Z4001":"현금영수증 매출",
								"Z4002":"현금영수증 매입"
							};
							
							$.each(hometaxSvcCdList, function(c, n) {
								searchMap = {};
								searchMap.orgCd = listMap.orgCd;

								searchMap.entKey = listMap.entKey;
								searchMap.svcCd = c;
								searchMap.orgTxt = "홈택스";
								searchMap.svcTxt = n;
								searchMap.accTxt = "공인인증서";
								searchMap.sdate = listMap.aStartDt;
								searchMap.edate = listMap.aEndDt;
								searchMap.chkVal = JSON.stringify({
									orgCd: listMap.orgCd
									, entKey: listMap.entKey
									, orgDivCd: ""
									, svcCd: c
									, bizNo: ""
									, sdate: listMap.aStartDt
									, edate: listMap.aEndDt
									, term: listMap.term || ""
									, opt1: listMap.subSvc || ""
									, opt2: listMap.subSvc2 || ""
									, opt3: listMap.subSvc3 || ""
									, subClientNo: listMap.subClientNo || ""
								});
								searchList.push(searchMap);
							});
						}
						break;
					case "bank":
						searchMap.entKey = listMap.entKey;
						searchMap.orgTxt = bankJson[listMap.orgDivCd];
						searchMap.svcTxt = "통장거래내역(잔액 포함)";
						searchMap.accTxt = $.fnAccountNumberFormat({bankCd:listMap.orgDivCd, accNo:(listMap.dispCardAccoNum != null ? listMap.dispCardAccoNum : listMap.acctNo)});
						searchMap.sdate = listMap.aStartDt;
						searchMap.edate = listMap.aEndDt;
						searchMap.chkVal = JSON.stringify({
							orgCd: listMap.orgCd
							, entKey: listMap.entKey
							, orgDivCd: listMap.orgDivCd
							, svcCd: "B0002" // listMap.svcCd
							, bizNo: ""
							, sdate: listMap.aStartDt
							, edate: listMap.aEndDt
							, term: listMap.term || ""
							, opt1: listMap.subSvc || ""
							, opt2: listMap.subSvc2 || ""
							, opt3: listMap.subSvc3 || ""
							, subClientNo: listMap.subClientNo || ""
						});
						searchList.push(searchMap);
						break;
					case "unote":
						searchMap.entKey = listMap.entKey;
						searchMap.orgTxt = "U-NOTE";
						searchMap.svcTxt = "어음내역(발행,배서,보유)";
						searchMap.accTxt = "공인인증서";
						searchMap.sdate = listMap.aStartDt;
						searchMap.edate = listMap.aEndDt;
						searchMap.chkVal = JSON.stringify({
							orgCd: listMap.orgCd
							, entKey: listMap.entKey
							, orgDivCd: ""
							, svcCd: "B0001,B0011,B0021,B1001,B1011,B2001,B2011,B2021" // listMap.svcCd
							, bizNo: ""
							, sdate: listMap.aStartDt
							, edate: listMap.aEndDt
							, term: listMap.term || ""
							, opt1: listMap.subSvc || ""
							, opt2: listMap.subSvc2 || ""
							, opt3: listMap.subSvc3 || ""
						});
						searchList.push(searchMap);
						break;
					case "cardsales":
						searchMap.entKey = listMap.entKey;
						searchMap.orgTxt = "여신금융협회";
						searchMap.svcTxt = "신용카드 매출";
						searchMap.accTxt = "아이디";
						searchMap.sdate = listMap.aStartDt;
						searchMap.edate = listMap.aEndDt;
						searchMap.chkVal = JSON.stringify({
							orgCd: listMap.orgCd
							, entKey: listMap.entKey
							, orgDivCd: ""
							, svcCd: "B0011" // listMap.svcCd
							, bizNo: ""
							, sdate: listMap.aStartDt
							, edate: listMap.aEndDt
							, term: listMap.term || ""
							, opt1: listMap.subSvc || ""
							, opt2: listMap.subSvc2 || ""
							, opt3: listMap.subSvc3 || ""
							, subClientNo: listMap.subClientNo || ""
						});
						searchList.push(searchMap);
						break;
					case "card":
						searchMap.entKey = listMap.entKey;
						searchMap.orgTxt = cardJson[listMap.orgDivCd];
						searchMap.svcTxt = "신용카드 매입";
						searchMap.accTxt = $.fnCardNumberFormat({cardNo:(listMap.dispCardAccoNum != null ? listMap.dispCardAccoNum : listMap.cardNo)});
						searchMap.sdate = listMap.aStartDt;
						searchMap.edate = listMap.aEndDt;
						searchMap.chkVal = JSON.stringify({
							orgCd: listMap.orgCd
							, entKey: listMap.entKey
							, orgDivCd: listMap.orgDivCd
							, svcCd: "C0005" // listMap.svcCd
							, bizNo: ""
							, sdate: listMap.aStartDt
							, edate: listMap.aEndDt
							, term: listMap.term || ""
							, opt1: listMap.subSvc || ""
							, opt2: listMap.subSvc2 || "" // "err_skip"
							, opt3: listMap.subSvc3 || ""
							, subClientNo: listMap.subClientNo || ""
						});
						searchList.push(searchMap);
						break;
					default: break;
				}
			});
			if(listSize == 0) {
				$(f).find(".table_type1 tbody").append(
					$("<tr/>")
						.append(
							$("<td/>", {colspan: "6"}).append("등록된 인증정보를 찾을 수 없습니다.")
						)
				);
			} else {
				$(f).find("table.table_type2 tbody").html("");
				var order = ["hometax","bank","card","cardsales","unote"];
				$.each(order, function(orderNo, orderTxt) {
					$.each(searchList, function(listNo, listMap) {
						if(listMap.orgCd == orderTxt) {
							fnDrawCollectTable(f, listMap);
						}
					});
				});
			}
			
			if (useDefaultDt == "MANUAL"){
				// 수동 조회 시에 날짜값을 조회기간에 적용
				$(".dc_picker").change();
			}
			
			if (parent.jQuery.fancybox != null){
				// 팬시 화면 크기 재조정
				if (parent.jQuery.fancybox.getInstance()){
					parent.jQuery.fancybox.getInstance().update();
				}
			}
		}
		, error: function(errMsg) {
			progress.stop();
			if (installCheck == "Y"){
				/*errMsg += "\r\n\r\n설치 페이지로 이동하시겠습니까?";
				if (confirm(errMsg)){
					//location.href = "/sc/SC_10402.do?returnUrl=javascript%3Ahistory.back%28%29%3B";
					$(".bon_wrap").hide();
					$(".spi_wrap").show();
					
					fnNxDownload(niceNxSetupUrl);
				}*/
				errMsg += "\r\n\r\n설치화면으로 이동합니다.";
				alert(errMsg);
				
				$(".bon_wrap").hide();
				$(".spi_wrap").show();
				
				fnNxDownload(niceNxSetupUrl);
			}else{
				alert(errMsg);
			}
		}
	});
}
function fnDrawCollectTable(f, listMap) {
	//if(listMap.orgCd != "unote") {
		$(f).find("table.table_type2 tbody").append(
				$("<tr/>")
					.append(
							$("<td/>").append($("<input/>", {type:"checkbox",name:"table_check",checked:"checked","data-key":listMap.entKey,"data-sort":listMap.svcCd}).val(listMap.chkVal))
					)
					.append(
							$("<td class='a_left'/>").append(listMap.svcTxt)
					)
					.append(
							$("<td/>").append(listMap.orgTxt)
					)
					.append(
							$("<td/>").append(listMap.accTxt)
					)
					.append(
							$("<td" + (useAutoDt == "N" ? " style='display:none;'" : "") + "/>").append(useAutoDt == "N" ? "" : listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'))
					)
					.append(
							$("<td class='wc' />")
					)
					.append(
							$("<td style='display:none;'/>").append(useAutoDt == "N" ? "" : listMap.sdate)
					)
					.append(
							$("<td style='display:none;'/>").append(useAutoDt == "N" ? "" : listMap.edate)
					)
			);
	//}
}

function fnCollectExecute00(f) {
	
	if(!$(f).find("input[name=term_group]:checked").val()) {
		alert("기간 구분을 선택하세요.");
		return false;
	} else if($(f).find("input[name=term_group]").val() == "setting_term" && !$(f).find("input[name=dc_picker1]").val()) {
		alert($(f).find("input[name=dc_picker1]").val());
		alert("시작일을 설정하세요.");
		return false;
	} else if($(f).find("input[name=term_group]").val() == "setting_term" && !$(f).find("input[name=dc_picker2]").val()) {
		alert("종료일을 설정하세요.");
		return false;
	} else if($(f).find("input[name=table_check]:checked").length == 0) {
		alert("수집 인증정보가 선택되지 않았습니다.\n1개 이상의 수집 인증정보를 선택하세요.");
		return false;
	}
	
	var collectList = [];
	var collectMap;
	$.each($(f).find("input[name=table_check]:checked"), function() {
		$(this).closest("tr").find("td:eq(4)").text("");
		$(this).closest("tr").find("td:eq(5)").attr("style", "text-align:left;padding-left:4px;").text("처리중");
		collectMap = {};
		collectMap = JSON.parse($(this).val());
		if(collectMap.orgCd == "hometax" && collectMap.svcCd == "Z3001,Z3003") {
			var hometaxSvcList = ["Z3001","Z3003"];
			$.each(hometaxSvcList, function(no, val) {
				collectMap.svcCd = val;
				collectMap.bizNo = bizNo || "";
				if ($(f).find("input[name=term_group]:checked").val() == "setting_term"){
					collectMap.sdate = $(f).find("input[name=dc_picker1]").val();
					collectMap.sdate = collectMap.sdate ? collectMap.sdate.replace(/[^0-9]/g, "") : "";
					collectMap.edate = $(f).find("input[name=dc_picker2]").val();
					collectMap.edate = collectMap.edate ? collectMap.edate.replace(/[^0-9]/g, "") : "";
				}
				collectMap.term = collectMap.term || "M1";
				collectList.push(JSON.parse(JSON.stringify(collectMap)));
			});
		} else if(collectMap.orgCd == "hometax" && collectMap.svcCd == "Z3002,Z3004") {
			var hometaxSvcList = ["Z3002","Z3004"];
			$.each(hometaxSvcList, function(no, val) {
				collectMap.svcCd = val;
				collectMap.bizNo = bizNo || "";
				if ($(f).find("input[name=term_group]:checked").val() == "setting_term"){
					collectMap.sdate = $(f).find("input[name=dc_picker1]").val();
					collectMap.sdate = collectMap.sdate ? collectMap.sdate.replace(/[^0-9]/g, "") : "";
					collectMap.edate = $(f).find("input[name=dc_picker2]").val();
					collectMap.edate = collectMap.edate ? collectMap.edate.replace(/[^0-9]/g, "") : "";
				}
				collectMap.term = collectMap.term || "M1";
				collectList.push(JSON.parse(JSON.stringify(collectMap)));
			});
		} else if(collectMap.orgCd == "hometax" && collectMap.svcCd == "Z4") {
			var hometaxSvcList = ["Z4001","Z4002"];
			$.each(hometaxSvcList, function(no, val) {
				collectMap.svcCd = val;
				collectMap.bizNo = bizNo || "";
				if ($(f).find("input[name=term_group]:checked").val() == "setting_term"){
					collectMap.sdate = $(f).find("input[name=dc_picker1]").val();
					collectMap.sdate = collectMap.sdate ? collectMap.sdate.replace(/[^0-9]/g, "") : "";
					collectMap.edate = $(f).find("input[name=dc_picker2]").val();
					collectMap.edate = collectMap.edate ? collectMap.edate.replace(/[^0-9]/g, "") : "";
				}
				collectMap.term = collectMap.term || "M1";
				collectList.push(JSON.parse(JSON.stringify(collectMap)));
			});
		} else if(collectMap.orgCd == "unote") {
			/*$(this).prop("checked", false);
			$(this).closest("tr").find("td:eq(5)").text("미지원");*/
			var unoteSvcList = ["B0001","B0011","B0021","B1001","B1011","B2001","B2011","B2021"];
			$.each(unoteSvcList, function(no, val) {
				collectMap.svcCd = val;
				collectMap.bizNo = bizNo || "";
				if ($(f).find("input[name=term_group]:checked").val() == "setting_term"){
					collectMap.sdate = $(f).find("input[name=dc_picker1]").val();
					collectMap.sdate = collectMap.sdate ? collectMap.sdate.replace(/[^0-9]/g, "") : "";
					collectMap.edate = $(f).find("input[name=dc_picker2]").val();
					collectMap.edate = collectMap.edate ? collectMap.edate.replace(/[^0-9]/g, "") : "";
				}
				collectMap.term = collectMap.term || "N0"; // "M1";
				collectList.push(JSON.parse(JSON.stringify(collectMap)));
			});
		} else {
			collectMap.bizNo = bizNo || "";
			if ($(f).find("input[name=term_group]:checked").val() == "setting_term"){
				collectMap.sdate = $(f).find("input[name=dc_picker1]").val();
				collectMap.sdate = collectMap.sdate ? collectMap.sdate.replace(/[^0-9]/g, "") : "";
				collectMap.edate = $(f).find("input[name=dc_picker2]").val();
				collectMap.edate = collectMap.edate ? collectMap.edate.replace(/[^0-9]/g, "") : "";
			}
			collectMap.term = collectMap.term || "M1";
			collectMap.subClientNo = collectMap.subClientNo || "";
			
			if(collectMap.orgCd == "hometax" && collectMap.svcCd == "Z5010") {
				collectMap.attrYr = collectMap.attrYr ? collectMap.attrYr.replace(/[^0-9]/g, "") : "";
				collectMap.sdate = collectMap.attrYr + "0101";
				collectMap.edate = collectMap.attrYr + "0101";
			}else if(collectMap.orgCd == "hometax" && collectMap.svcCd == "Z5020") {
				collectMap.sdate = collectMap.edate;
			}
			
			collectList.push(collectMap);
		}
	});
	
	/*if(JSON.stringify(collectList).length < 1000) {
		fnCollectExecute01(f, collectList);
		//fnCollectExecute02(f, collectList);
	} else {*/
		fnCollectExecute02(f, collectList);
	//}
}

function fnCollectExecute01(f, collectList) {
	fnGetNxData({
		data: {
			url: nxUrl
			, op: "execute"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: {
				execute_list: collectList
			}
		}
		, beforeSend: function() {
			progress.start();
		}
		, success: function(nxData) {
			fnCollectExecute03(f, this.data, nxData);
		}
		, error: function(errMsg, nxData) {
			alert("시스템 오류입니다.\n관리자에게 문의하세요.");
		}
	});
}
function fnCollectExecute02(f, collectList) {
	
	var setExList;
	$.ajax({
		type: "post"
		, async: false
		, url: nxUrl
		, data: {
			op: "setExList"
			, from: "web"
			, execute_list: JSON.stringify(collectList)
			, transData: transData
		}
		, success: function(res) {
			progress.start();
			setExList = res;
		}
		, error: function(e) {
			//console.log(e.message);
		}
	});
	
	/*
	$.ajax({
		type: "post"
		, async: false
		, url: nxUrl + "?op=getExList"
		, data: {
			op: "getExList"
		}
		, success: function(res) {
			alert(JSON.stringify(res, null, 2));
		}
		, error: function(e) {
			//console.log(e.message);
		}
	});
	*/
	
	if(setExList) {
		fnGetNxData({
			data: {
				url: nxUrl
				, op: "execute"
				, resUrl: resUrl
				, resType: resType
				, encYn: encYn
				, npid: npid
				, transData: transData
				, inJson: {
					url: location.protocol + "//" + location.host + nxUrl + "?op=getExList"
					//, execute_list: collectList
				}
			}
			, beforeSend: function() {
			}
			, success: function(nxData) {
				fnCollectExecute03(f, this.data, nxData);
			}
			, error: function(errMsg, nxData) {
				alert("시스템 오류입니다.\n관리자에게 문의하세요.");
			}
		});
	}
}
var collectExecuteTimer = 0;
var collectExecute;
function fnCollectExecute03(f, data, res) {
	var svcCdTxt = {
		Z3001: "세금계산서 매출"
		, Z3002: "세금계산서 매입"
		, Z3003: "계산서 매출"
		, Z3004: "계산서 매입"
		, Z4001: "현금영수증 매출"
		, Z4002: "현금영수증 매입"
		, Z5010: "종합소득세 신고도움 서비스"
		, Z5020: "부가세예정고지 세액"
		, B0001: "발행(미지급제시)"
		, B0011: "발행(결제어음)"
		, B0021: "발행(부도어음)"
		, B1001: "배서(배서한어음)"
		, B1011: "배서(배서받은어음)"
		, B2001: "보유(결제받을어음)"
		, B2011: "보유(결제받은어음)"
		, B2021: "보유(부도어음)"
	};
	var tr, input;
	$.each($(f).find("input[name=table_check]:checked"), function() {
		input = $(this);
		$.each(res.outJson.execute_list, function(listNo, listMap) {
			if(input.attr("data-key") == listMap.entKey && (listMap.orgCd != "hometax" || input.attr("data-sort").indexOf(listMap.svcCd) != -1) && listMap.errYn) {
				tr = input.closest("tr");
				if(listMap.errYn == "N") {
					if(listMap.orgCd == "hometax" || listMap.orgCd == "unote") {
					//if(listMap.orgCd == "hometax") {
						if(listMap.svcCd == "Z3001" || listMap.svcCd == "Z3002" || listMap.svcCd == "B0001") {
							tr.find("td:eq(5)").css("text-align", "left").css("padding-left", "4px");
							tr.find("td:eq(4)").html("").append(listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
							tr.find("td:eq(5)").html("").append($("<div/>", {style: "font-size:11px;"}).append(svcCdTxt[listMap.svcCd] + " - " + listMap.errMsg));
							
							if(transData.indexOf("M,SC") != -1)
							{
								input.prop("checked", false);
							}
						} else if(listMap.svcCd == "Z3003" || listMap.svcCd == "Z3004" || listMap.svcCd == "B2021") {
							
							input.prop("checked", false);
							if(transData.indexOf("M,SC") != -1)
							{
								tr.find("td:eq(5)").css("text-align", "left").css("padding-left", "4px");
								tr.find("td:eq(4)").html("").append(listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
								tr.find("td:eq(5)").html("").append($("<div/>", {style: "font-size:11px;"}).append(svcCdTxt[listMap.svcCd] + " - " + listMap.errMsg));
							}
							else
							{
								tr.find("td:eq(5)").append($("<div/>", {style: "font-size:11px;"}).append(svcCdTxt[listMap.svcCd] + " - " + listMap.errMsg));
							}
						} else if(listMap.svcCd == "Z4001" || listMap.svcCd == "Z4002" || listMap.svcCd == "Z5010" || listMap.svcCd == "Z5020") {
							$("html,body").scrollTop(tr.offset().top - 400);
							input.prop("checked", false);
							tr.find("td:eq(5)").css("text-align", "left").css("padding-left", "4px");
							tr.find("td:eq(4)").text(listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
							tr.find("td:eq(5)").removeClass("fail").attr("title", listMap.errMsg).text(listMap.errMsg);
						} else {
							tr.find("td:eq(5)").append($("<div/>", {style: "font-size:11px;"}).append(svcCdTxt[listMap.svcCd] + " - " + listMap.errMsg));
						}
					} else {
						$("html,body").scrollTop(tr.offset().top - 400);
						input.prop("checked", false);
						tr.find("td:eq(5)").css("text-align", "left").css("padding-left", "4px");
						tr.find("td:eq(4)").text(listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
						tr.find("td:eq(5)").removeClass("fail").attr("title", listMap.errMsg).text(listMap.errMsg);
					}
				} else if(listMap.errYn == "Y") {
					if(listMap.orgCd == "hometax" || listMap.orgCd == "unote") {
					//if(listMap.orgCd == "hometax") {
						if(listMap.svcCd == "Z3001" || listMap.svcCd == "Z3002" || listMap.svcCd == "B0001") {
							tr.find("td:eq(5)").css("text-align", "left").css("padding-left", "4px");
							tr.find("td:eq(4)").html("").append(listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
							tr.find("td:eq(5)").html("").append($("<div/>", {style: "font-size:11px;color:#df1616;"}).append(svcCdTxt[listMap.svcCd] + " - " + listMap.errMsg));
						} else if(listMap.svcCd == "Z3003" || listMap.svcCd == "Z3004" || listMap.svcCd == "B2021") {
							input.prop("checked", false);
							tr.find("td:eq(5)").append($("<div/>", {style: "font-size:11px;color:#df1616;"}).append(svcCdTxt[listMap.svcCd] + " - " + listMap.errMsg));
						} else if(listMap.svcCd == "Z4001" || listMap.svcCd == "Z4002" || listMap.svcCd == "Z5010" || listMap.svcCd == "Z5020") {
							$("html,body").scrollTop(tr.offset().top - 400);
							input.prop("checked", false);
							tr.find("td:eq(5)").css("text-align", "left").css("padding-left", "4px");
							tr.find("td:eq(4)").text(listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
							tr.find("td:eq(5)").addClass("fail").attr("title", listMap.errMsg).text(listMap.errMsg.length > 50 ? listMap.errMsg.substr(0,48) + " ..." : listMap.errMsg);
						} else {
							tr.find("td:eq(5)").append($("<div/>", {style: "font-size:11px;color:#df1616;"}).append(svcCdTxt[listMap.svcCd] + " - " + listMap.errMsg));
						}
					} else {
						$("html,body").scrollTop(tr.offset().top - 400);
						input.prop("checked", false);
						tr.find("td:eq(5)").css("text-align", "left").css("padding-left", "4px");
						tr.find("td:eq(4)").text(listMap.sdate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3') + " ~ " + listMap.edate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
						tr.find("td:eq(5)").addClass("fail").attr("title", listMap.errMsg).text(listMap.errMsg.length > 50 ? listMap.errMsg.substr(0,48) + "..." : listMap.errMsg);
					}
				} else if(listMap.errYn == "P") {
				}
			}
		});
	});
	if($(f).find("input[name=table_check]:checked").length > 0) {
		var collectExecute = function() {
			$.ajax({
				type: "post"
				, url: nxUrl
				, data: {
					op: "execute"
					, from: "web"
					, transData: transData
				}
				, success: function(nxData) {
					if(nxData.outJson) {
						/*if(nxData.outJson == "ing"){
							collectExecuteTimer = setTimeout(collectExecute, 1000);
						} else */
						if(nxData.outJson.execute_list.length) {
							fnCollectExecute03(f, data, nxData);
						}
					} else {
						collectExecuteTimer = setTimeout(collectExecute, 1000);
					}
				}
				, error: function(e) {
					clearTimeout(collectExecuteTimer);
					//console.log(e.message);
				}
			});
		};
		collectExecuteTimer = setTimeout(collectExecute, 1000);
	} else {
		$(f).find("input[name=table_check_all]").prop("checked", false);
		clearTimeout(collectExecuteTimer);
		
		if (parent.jQuery.fancybox != null){
			// 팬시 화면 크기 재조정
			if (parent.jQuery.fancybox.getInstance()){
				parent.jQuery.fancybox.getInstance().update();
			}
		}
		
		progress.stop();
		
		try{
			window.external.onCompleate();
		}
		catch(e){
		}
	}
}

function fnSchExecute00(f, custSchInf) {
	
	fnNiceGetNxData({
		data: {
			url: nxUrl
			, op: "sch_execute"
			, resUrl: resUrl
			, resType: resType
			, encYn: encYn
			, transData: transData
			, inJson: {
				url: location.protocol + "//" + location.host + nxUrl + "?op=getSchExInf"
				//, execute_list: collectList
			}
		}
		, beforeSend: function() {
		}
		, success: function() {
			
		}
		, error: function() {
			alert("시스템 오류입니다.\n관리자에게 문의하세요.");
		}
	});
}
