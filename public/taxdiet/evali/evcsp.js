//
// SecuCL Client Java Script ver3.2
// 최종 수정일 : 2009.10.19
// 작성자 : jetdoc@evali.com
//

// 2008.03.11 : openDataFirst, openDataNext 추가
// 2008.02.19 : getSecretKey/getHashFile/Encrypt관련 추가
// 2008.02.04 : 서명검증시 경고모드시 원본값 추출 추가
// 2007.07.13 : checkVIDAndGetRnd() 추가
// 2007.06.28 : 인증서선택창 닫기시 에러 메시지 삭제
// 2007.04.16 : GPKI 관련 반영
// 2007.04.11 : signAndEnvPemFirst / signAndEnvPemNext 추가 
// 2007.03.22 : 버전체크하여 TrayIcon 기동 추가 
// 2007.03.16 : selectCertificateFromSignAndEnv() 추가, Codebase 제거 / 3,2,0,2 적용 
// 2007.02.06 : selectCertificateFromSignData(), getCommonName() 추가 / getCertAuthorityName(), getCertAuthorityCode() 수정
// 2006.12.26 : 3,1,0,7 적용
// 2006.12.05 : 3,1,0,5 적용
// 2006.11.27 : envelopDataPEM() 추가
// 2008.06.10 : InitEVCSP() SetStroagemenu() 추가
// 2008.06.10 : ldapCertificateValidation() 추가
// 2008.06.10 : 보안토큰 관련 추가
// 2008.06.10 : getCertAuthCode(), getCertAuthName() GPKI "PUBLIC OF KOREA" 추가
// 2008.06.13 : SelectCertificateView 추가 
// 2009.02.11 : getCertRnd() 추가
// 2009.04.02 : signAndEnvNext() 오류 수정:  rtnValue = PKIObject.returnArg(1); -> envObj.value = PKIObject.returnArg(1);
// 2009.04.02 : signAndEnvFileNext()  오류 부분 삭제 : envObj.value = PKIObject.returnArg(1) ;
// 2009.09.09 : signInfo4DTI() 추가
// 2009.09.09 : signFirst4DTI 추가
// 2009.09.09 : signNext4DTI 추가
// 2009.10.19 : signInfo4DTI() 노드 끝에 엔터 추가
// 2009.10.29 : CipherObject, HashObject  =>  PKIObject 사용 하게 변경(인터페이스 단일화를 위해)
// 2009.11.17 : getRandom() 함수에서 리턴 오류 return CipherObject.returnArg(1); => return PKIObject.returnArg(1); 수정
// 2009.11.19 : getAuthData() CipherObject => PKIObject
// 2009.11.25 : decrypt DecryptFile => DecryptData 수정
// 2010.03.03 : openData(), openFile() : PKIObject.SetStorageType(3); 추가
// 2010.07.01 : signFirst4DTI(), signNext4DTI()에 PKIObject.SetSignatureHashAlgorithm()처리 추가
// 2010.11.11 : signFirst4DTI() , signNext4DTI()에 signData4DTI() 함수 사용

///////////////////////////////////////////////////////////////////////////////
//////////////////// 해당 사이트 배너 사용할 경우에만 적용 ////////////////////
///////////////////////////////////////////////////////////////////////////////

//var bannerURL = "" ;
var bannerURL =  "";
//var bannerURL =  "http://" + window.location.host + "/images/pki-banner/bar.bmp";


///////////////////////////////////////////////////////////////////////////////
////////////////////////      cab 위치 및 버전정보     ////////////////////////
///////////////////////////////////////////////////////////////////////////////

var evcspURL = "/evali/" ;
var evcspVersion = "3,2,3,9";


///////////////////////////////////////////////////////////////////////////////
///////////////////////       사용인증서 정책 설정      ///////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////
/* 법인 범용 인증서정책 목록 */
var generalBizPolicy = "1.2.410.200004.5.2.1.1:1.2.410.200004.5.1.1.7:1.2.410.200005.1.1.5:1.2.410.200004.5.4.1.2:1.2.410.200012.1.1.3:1.2.410.200004.5.3.1.2" ;
/* 개인 범용 인증서정책 목록 */
var generalPerPolicy = "1.2.410.200004.5.2.1.2:1.2.410.200004.5.1.1.5:1.2.410.200005.1.1.1:1.2.410.200004.5.4.1.1:1.2.410.200012.1.1.1:1.2.410.200004.5.3.1.9" ;

/* 특별등급 인증서정책 목록 ( 해당 사이트에 적합하게 수정 ) */
var specialPolicy = "1.2.410.200012.5.1.1.281:1.2.410.200005.1.1.6.8:1.2.410.200004.5.4.2.360:1.2.410.200004.5.2.1.6.257:1.2.410.200004.5.4.2.80:1.2.410.200004.5.2.1.5:1.2.410.200004.5.4.2.318";

// 2017.09.18 한국전자인증 특수목적용 정책 추가
//specialPolicy = specialPolicy + ":" + "1.2.410.200004.5.4.2.80";

//var specialPolicy = "1.2.410.200004.5.4.1.1" ; /* 군인공제회 국방전자카드 인증서 */
//var specialPolicy = "1.2.410.200005.1.1.4:1.2.410.200004.5.2.1.7.1" ; /*인터넷뱅킹 인증서*/

/* 수용가능한 인증서정책 목록 */
var acceptPolicy = generalBizPolicy + ":" + specialPolicy ;
//var acceptPolicy = generalPerPolicy + ":" + specialPolicy ;

/* 모든 인증서 정책을 수용 */
//var acceptPolicy = "" ;

var gPW;
var gMedia = 3;

var EV_CIPHER = 0x03000000;
var gAlgorithm =  EV_CIPHER + 3;


///////////////////////////////////////////////////////////////////////////////
///////////////////////        기본 인증기관 설정       ///////////////////////
///////////////////////////////////////////////////////////////////////////////

/*  기본 인증기관 설정값  */
var TAB_ALL			= 0 ;
var TAB_KICA 		= 1 ;
var TAB_SIGNKOREA 	= 2 ;
var TAB_YESSIGN 	= 3 ;
var TAB_CROSSCERT 	= 4 ;
var TAB_TRADESIGN 	= 5 ;
var TAB_NCASIGN 	= 6 ;
var TAB_KAL 		= 7 ;
var TAB_GPKI 		= 8 ;

/* 디폴트 CA */
var defaultCA = TAB_ALL ;

/* 대한항공용 */ 
//var defaultCA = TAB_KAL ;

/* GPKI용 */ 
//var defaultCA = TAB_GPKI ;

//////////////////////////////////////////////////////////////////////////
// PKI관련 함수
//////////////////////////////////////////////////////////////////////////
var context;
function PrintEVCSPObject(contextPath)
{	
	var tag1, tag2, tag3;
	context = contextPath;
	bannerURL = "http://" + window.location.host + context + "/images/bar.bmp";
//	tag1 = '<OBJECT ID="PKIObject"  CLASSID="CLSID:5157ABA6-E138-404B-BFA9-FC42244EFB93" style="visibility:none;width:0px;height:0px"CODEBASE="' + evcspURL + 'EVCSP.cab#Version=' + evcspVersion + '" ></OBJECT>';
	tag1 = '<OBJECT ID="PKIObject" CLASSID="CLSID:5157ABA6-E138-404B-BFA9-FC42244EFB93" style="visibility:none;width:0px;height:0px"></OBJECT>';
//	tag2 = '<OBJECT ID="CipherObject" CLASSID="CLSID:BD64BD76-594A-47A6-A0EE-5CD6DF66BC8B" width=0 height=0></OBJECT>';
//	tag3 = '<OBJECT ID="HashObject" CLASSID="CLSID:FB53F020-D036-493A-9190-6222178121D5" width=0 height=0 ></OBJECT>';
	
	document.write(tag1);
//	document.write(tag2);
//	document.write(tag3);
	if (!isInstallEVCSP()) {
		alert("인증서관련 ActiveX가 설치되어있지 않아 설치 페이지로 이동합니다.");
		location.href = context + "/evali/install.htm";
	} else {
//		location.href="/evali/EVCSP(3.2.3.X)Setup.exe";
	}
  
	if (getVersion() > "3020000" ) {
		if(getVersion() < "3020309") {
			alert("인증서관련 ActiveX가 구버전이므로 설치 페이지로 이동합니다.");
			location.href = context + "/evali/install.htm";
		}
//		PKIObject.SetInterfaceTabView(0, 1); //CA 연결 상태 인터페이스 추가	
		if ( !isVista()) PKIObject.StartTrayIcon();
	}
}

function getVersion()
{
	if (isInstallEVCSP()) {
		PKIObject.GetVersion("",1);
		return 	PKIObject.returnArg(1) ;
	}
	return "0000000";
}

function isVista()
{
	if (navigator.appVersion.indexOf("Windows NT 6.")!=-1) {
		return true;	
	}
	return false;	
}

function isInstallEVCSP()
{
	if(PKIObject==null || typeof(PKIObject) == "undefined" || PKIObject.object==null) {
		return false;
	}
	return true;	
}

function initEVCSP() {
	if ( bannerURL != "" ) PKIObject.SetNoticeBmp(bannerURL);	
	
	if ( defaultCA == TAB_KAL ) {
		PKIObject.SetCAList(TAB_KAL);
		acceptPolicy = acceptPolicy + ":" + "1.2.410.100001.5.6.1" ; 
	}

	if ( defaultCA == TAB_GPKI ) {
		PKIObject.SetCAList(TAB_GPKI);
//		acceptPolicy = acceptPolicy + ":" + "1.2.410.100001.2.1.2" ; 
	}

	PKIObject.SetObjectIdentifier(acceptPolicy);	

	PKIObject.SetCACombo(defaultCA);
	
/* 클라이언트 인증서 유효성 체크 -  0:미사용, 1:사용(기본) */	
//	PKIObject.SetCertificateValidationCheck(0);
	
/* 외장하드 및 CDROM 인증서 사용 (외장하드,CDROM) - 0:미사용(기본), 1:사용 */
	PKIObject.SetRemoveStorageMenu(1, 0);

/* 군인공제회용 (구버전 스마트카드 리더기) */
//	PKIObject.SetSmartCardDevice(2);

/* 저장 장치 메뉴 설정 (보안토큰, 저장토근) - 0:미사용, 1:사용(기본) */
//	PKIObject.SetStorageMenu(0,0);

}

// 인증서 Error 메세지
function showCertError( msg) {

	var errorCode = PKIObject.getErrorCode();
	var errorMsg  = PKIObject.getErrorMessage();

	if ( errorCode == 1 || errorCode == 0)
		alert(msg);
	else
		alert(msg + " ["  + errorCode + "] " + errorMsg + "\n\n\n" + getUserErrorMsg(errorCode));
}

// 인증서 사용자 정의 Error 메세지
function getUserErrorMsg(code) {

	var userErrMsg;

	if ( code == "400500003" || code =="400500004")
		userErrMsg = "비밀번호 오류입니다.";
	else if ( code == "401200006" )
		userErrMsg = "인증서 내보내기/가져오기 작업으로 인한  인증서 오류입니다. \n\n해당 인증기관 사이트에서 인증서 암호변경 후 다시 시도하기기 바랍니다.";
	else if ( code == "401300001" || code =="401800001" )
		userErrMsg = "입력 데이터 중 빠진 값이 있습니다.";
	else if ( code == "401300002" || code =="401300003"  )
		userErrMsg = "전자서명 데이터가 손상되었습니다.";
	else if ( code == "401300007"  )
		userErrMsg = "암호화된 데이터가 손상되었습니다.";
	else if ( code == "401300009"  )
		userErrMsg = "전자봉투 개봉시 필요한 인증서를 찾을 수 없습니다. \n\n해당 인증서가 저장위치에 있는 경우 갱신 여부를 확인하시기 바랍니다.";
	else if ( code == "401800002"  )
		userErrMsg = "NPKI 또는 EVALICERT 폴더에 생성 및 쓰기 권한이 있는지 확인하시기 바랍니다.";
	else if ( code == "401800036" || code =="401800041" || code =="401800045" || code =="401800046" || code =="401800053" || code =="401800062" || code =="401800117" || code =="401800118" || code =="401900003" || code =="401900012")
		userErrMsg = "서버 또는 PC 시간이 현재 시간이 맞는지 확인하신 후,  방화벽 테스트를 해보시기 바랍니다.\n\n";
	else if ( code == "401800037"  )
		userErrMsg = "인증서가 저장 위치에 없거나 손상되었습니다. \n\n 해당 인증기관에 문의하시기 바랍니다.";
	else if ( code == "401800048"  )
		userErrMsg = "해당 인증기관 사이트에 접속하여 인증서 비밀번호를 확인해보세요. \n\n";
	else if ( code == "401800060"  )
		userErrMsg = "인증서의 유효기간이 남아 있는 경우에는 서버 또는 PC의 시간이 현재 시간인지 확인해보시기 바랍니다. \n\n ";
	else if ( code == "401800067" )
		userErrMsg = "분실로 인한 재발급 또는 인증서 갱신 등으로 해당 인증서가 폐지되었습니다. \n\n ";
	else if ( code == "401800084" || code =="401800087")
		userErrMsg = "인증서의 신원확인 정보(사업자등록번호) 오류입니다..\n\n제출하신 정보에서 사업자등록번호를 확인 바랍니다. \n\n(인증서는 사업자등록번호마다 각각 발급받으셔야 합니다.)";
	else if ( code == "401800088" || code == "401800089" || code == "401800091"  )
		userErrMsg = "인증서에 신원확인 정보(사업자등록번호)가 없습니다.\n\n해당 인증기관에 문의하셔서 공인인증서를 변환 또는 갱신 후 사용하시기 바랍니다.";
	else if ( code == "401800095"  )
		userErrMsg = "서버 또는 PC의 시간이 현재 시간인지 확인해보시기 바랍니다.";
	else if ( code == "401900002"  )
		userErrMsg = "네트워크에 문제가 있습니다. 방화벽 테스트를 해보시기 바랍니다." ;
	else if ( code == "402200030"  )
		userErrMsg = "NPKI/KISA 폴더에 인증서 쓰기 권한이 없습니다." ;
	else if ( code == "402200031"  )
		userErrMsg = "EVALICERT 폴더에 evalicert.cfg가 없거나 읽기권한이 없습니다." ;
	else if ( code == "402200032"  )
		userErrMsg = "EVALICERT 폴더에 policy.ini가 없거나 읽기권한이 없습니다." ;
	else if ( code == "402200033"  )
		userErrMsg = "EVALICERT 폴더에 evalicert.cfg를 쓸 공간이 없거나 권한이 없습니다." ;
	else if ( code == "402200034"  )
		userErrMsg = "EVALICERT 폴더에 policy.ini를 쓸 공간이 없거나 권한이 없습니다." ;
	else
		userErrMsg ="" ;

	return userErrMsg ;
}


function showCertManager() {
	var rtnValue ;
	
	initEVCSP();
	rtnValue = PKIObject.GetCertificateManagement(); 
}


function signFirst( signObj, dn, serial, media, orgMsg) {
	var rtnValue ;
	
	if ( orgMsg == "" ) {
		alert("서명할 데이타가 없습니다.");
		return false;
	}
	
	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}
		
	initEVCSP();
	
	PKIObject.SetCACombo(TAB_ALL);
	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,serial, media,orgMsg); 	

	if ( rtnValue == 1 ) {
		gMedia = PKIObject.returnArg(2) ;
		signObj.value = PKIObject.returnArg(3) ;
		gPW = PKIObject.returnArg(4) ;
		return true ;
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("전자서명 실패");
 	    return false;
	}
}

function signNext( signObj, orgMsg) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("서명할 데이타가 없습니다.");
		return false;
	}

	rtnValue = PKIObject.SignData("",orgMsg,gPW) ;

	if ( rtnValue == 1 ) {
		signObj.value = PKIObject.returnArg(1) ;
		return true ; 
	} else {	 
		showCertError("전자서명 실패");
 	    return false;
	}
	
}

function signFirst4DTI( signObj, dn, serial, media, orgDigest) {

	var rtnValue ;
	
	if ( orgDigest == "" ) {
		alert("서명할 데이타가 없습니다.");
		return false;
	}
	
	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}
	initEVCSP();
	
	PKIObject.SetCACombo(TAB_ALL);
	rtnValue = PKIObject.SelectCertificateAndSignData("", 3, "", dn, serial, media, orgDigest); 
	if ( rtnValue == 1 ) {
		gMedia = PKIObject.returnArg(2) ;
		signObj.value = PKIObject.returnArg(3) ;
		gPW = PKIObject.returnArg(4) ;
		rtnValue = PKIObject.SignData4DTI("", orgDigest, gPW) ;
		if ( rtnValue == 1 ) {
			signObj.value = PKIObject.returnArg(1) ;
			return true;
		}
	}

	if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("전자서명 실패");
 	    return false;
	}
}

function signFirst4DTIwithR(rndObj, signObj, dn, serial, media, orgDigest) {
	var rtnValue ;
	if ( orgDigest == "" ) {
		alert("서명할 데이타가 없습니다.");
		return false;
	}
	
	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

	initEVCSP();
	
	PKIObject.SetCACombo(TAB_ALL);

	rtnValue = PKIObject.SelectCertificateAndSignData("", 3, "", dn, serial, media, orgDigest);
	if ( rtnValue == 1 ) {
		var tmp = PKIObject.returnArg(1);
		gMedia = PKIObject.returnArg(2) ;
//		signObj.value = PKIObject.returnArg(3) ;
		gPW = PKIObject.returnArg(4) ;
		rtnValue = PKIObject.SignData4DTI("", orgDigest, gPW) ;
		if ( rtnValue == 1 ) {
			signObj.value = PKIObject.returnArg(1) ;
	  		retValue = PKIObject.GetRandomFromPrivateKey("", tmp, gPW);
	  
	  		if ( rtnValue == 1 ) {
	  			rndObj.value = PKIObject.returnArg(1) ;
	  			//alert(rndObj.value);
	  		}else {
	  			showCertError("식별번호 랜덤값 추출 실패");
	  	 	    return false;
	  		}
	  		return true ;
		}
	}

	if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("전자서명 실패");
 	    return false;
	}
}
function signFirst4DTIwithRandVid(rndObj, signObj, dn, serial, media, orgDigest, vid) {
	var rtnValue ;
	if ( orgDigest == "" ) {
		alert("서명할 데이타가 없습니다.");
		return false;
	}
	
	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

	initEVCSP();
	
	PKIObject.SetCACombo(TAB_ALL);
	PKIObject.SetCertificateVID(vid);	

	rtnValue = PKIObject.SelectCertificateAndSignData("", 3, "", dn, serial, media, orgDigest);
	if ( rtnValue == 1 ) {
		var tmp = PKIObject.returnArg(1);
		gMedia = PKIObject.returnArg(2) ;
//		signObj.value = PKIObject.returnArg(3) ;
		gPW = PKIObject.returnArg(4) ;
		rtnValue = PKIObject.SignData4DTI("", orgDigest, gPW) ;
		if ( rtnValue == 1 ) {
			signObj.value = PKIObject.returnArg(1) ;
	  		retValue = PKIObject.GetRandomFromPrivateKey("", tmp, gPW);
	  
	  		if ( rtnValue == 1 ) {
	  			rndObj.value = PKIObject.returnArg(1) ;
	  			//alert(rndObj.value);
	  		}else {
	  			showCertError("식별번호 랜덤값 추출 실패");
	  	 	    return false;
	  		}
	  		return true ;
		}
	}

	if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("전자서명 실패");
 	    return false;
	}
}

function signNext4DTI( signObj, orgDigest) {

	var rtnValue ;

	if ( orgDigest == "" ) {
		alert("서명할 데이타가 없습니다.");
		return false;
	}

	rtnValue = PKIObject.SignData4DTI("", orgDigest, gPW) ;

	if ( rtnValue == 1 ) {
		signObj.value = PKIObject.returnArg(1) ;
		return true ; 
	} else {	 
		showCertError("전자서명 실패");
 	    return false;
	}	
}

function verifySignedData( orgMsgObj, signerObj,signVal) {
	var rtnValue ;
	
	if ( signVal == "" ) {
		alert("검증할 서명값이 없습니다.");
		return false;
	}
	
	rtnValue = PKIObject.VerifySignedData("",signVal) ;
	
	if ( rtnValue == 1 ) {
		orgMsgObj.value = PKIObject.returnArg(1) ;
		signerObj.value = PKIObject.returnArg(2) ;
		return true ;
	} else if ( rtnValue == 2 ) {
		orgMsgObj.value = PKIObject.returnArg(1) ;
		signerObj.value = PKIObject.returnArg(2) ;
		showCertError("서명한 인증서의 유효기간이 만료되었습니다.");
		return true ;
	}else {
		showCertError("서명검증 실패");			
		return false;
	}
}



function showCertificate() {
	var rtnValue;
	
	rtnValue = PKIObject.ShowCertificateView();  	
	
	if ( rtnValue == 1 ) {
 	    return true;
	} else {
		return false;
	}
}

function showCertificateLdap(dn) {
	var rtnValue;

	initEVCSP();

	rtnValue = PKIObject.SelectCertificate("",4,dn,4);
	
	if ( rtnValue != 1 ){
		showCertError("인증기관서버에서 인증서를 찾을 수 없습니다.");
		return false ;
	}
	
	rtnValue = PKIObject.ShowCertificateView();  	
	
	if ( rtnValue == 1 ) {
 	    return true;
	} else {
		return false;
	}
}


function showCertSignedData(signVal) {
	var rtnValue ;
	
	if ( signVal == "" ) {
		alert("검증할 서명값이 없습니다.");
		return false;
	}

	rtnValue = PKIObject.ShowCertificateFromSignedData(signVal) ;
	
	if ( rtnValue == 1 ) {
		return true ;
	}else {
		showCertError("서명검증 실패");			
		return false;
	}
}

function showCertSignAndEnvData(signVal) {
	var rtnValue ;
	
	if ( signVal == "" ) {
		alert("검증할 서명값이 없습니다.");
		return false;
	}

	rtnValue = PKIObject.ShowCertificateFromSignAndEnvelopData(signVal) ;
	
	if ( rtnValue == 1 ) {
		return true ;
	}else {
		showCertError("서명검증 실패");			
		return false;
	}
}


function verifyCertificate( dn, serial, media) {
	var rtnValue, sRand ;
	
	if(dn == "") {
		alert("선택된 인증서가 없습니다.") ;
		return false ;
	}

	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

	initEVCSP();

	sRand = getRandom(3);
	rtnValue = PKIObject.SelectCertificateAndSignData("", 3, "", dn,serial, media, sRand); 	
	
	if ( rtnValue == 1 ) {
		return true ;
	} else if (rtnValue == 0 ) {
		showCertError("인증서검증 취소");
		return false;
	} else {
		showCertError("인증서검증 실패");
 	    return false;
	}
}

function ldapCertificateValidation( dn ) {

	var rtnValue;

	rtnValue = selectCertificateFromLdap(dn);

	if ( rtnValue == 1 )
	{
		rtnValue = PKIObject.CertificateValidation(2);
	}		

	if ( rtnValue == 1 ) {
		return true ;
	} else {
		showCertError("인증서검증 실패");
 	    return false;
	}
}


function selectCertificateFromLdap(dn) {
	var rtnValue;
	
	if(dn == "") {
		alert("선택된 인증서가 없습니다.") ;
		return false ;
	}
	
	initEVCSP();

	rtnValue = PKIObject.SelectCertificate("",4,dn,4);
	
	if ( rtnValue == 1 ){
		return true ;
	} else 	{
		showCertError("인증기관서버에서 인증서를 찾을 수 없습니다.");
		return false ;
	}
}



function selectCertificateFromSignData(signVal) {
	var rtnValue;
	
	
	initEVCSP();

	rtnValue = PKIObject.SelectCertificateFromSignedData("",signVal);  	
	
	if ( rtnValue == 1 ) {
 	    return PKIObject.returnArg(1);
	} else {
		return "";
	}
}



function managerCertificate(signObj, orgMsg) {
	var rtnValue, sRand ;
	
	
	if ( orgMsg == null || orgMsg == "") {
		sRand = getRandom(3);
	}
	else {
		sRand = orgMsg ;		
	}
	
	initEVCSP();

	rtnValue = PKIObject.SelectCertificateAndSignData("", 3,"","","", 3,sRand);  	
	
	if ( rtnValue == 1 ) {
		gMedia = PKIObject.returnArg(2) ;
		if ( signObj != null ) {
			signObj.value = PKIObject.returnArg(3) ;
			gPW = PKIObject.returnArg(4) ;
		}
		return true ;
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("인증서선택 실패");
 	    return false;
	}
}


function checkVID(signObj, dn, media, vid, orgMsg) {
	var rtnValue,sRand;


	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

	if ( orgMsg == null || orgMsg == "") {
		sRand = getRandom(3);
	}
	else {
		sRand = orgMsg ;		
	}
		
	initEVCSP();
	PKIObject.SetCACombo(TAB_ALL);
	PKIObject.SetCertificateVID(vid);	
/* 군인공제회용 (스마트카드 핀번호 픽스) */
//	PKIObject.SetPINCode("99999999");	

	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,"", media, sRand); 	

	if ( rtnValue == 1 ) {
		gMedia = PKIObject.returnArg(2) ;
		signObj.value = PKIObject.returnArg(3) ;
		gPW = PKIObject.returnArg(4) ;
		
		return true ;
	} else if (rtnValue == 0 ) {
		showCertError("신원확인 취소");
		return false;
	} else {
		showCertError("신원확인 실패");
 	    return false;
	}
}

function checkVIDAndGetRnd(signObj,rndObj, dn, media, vid, orgMsg) {
	var rtnValue,sRand;


	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

	if ( orgMsg == null || orgMsg == "") {
		sRand = getRandom(3);
	}
	else {
		sRand = orgMsg ;		
	}
		
	initEVCSP();
	PKIObject.SetCACombo(TAB_ALL);
	PKIObject.SetCertificateVID(vid);	
/* 군인공제회용 (스마트카드 핀번호 픽스) */
//	PKIObject.SetPINCode("99999999");	

	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,"", media, sRand); 	

	if ( rtnValue == 1 ) {
		gMedia = PKIObject.returnArg(2) ;
		signObj.value = PKIObject.returnArg(3) ;
		gPW = PKIObject.returnArg(4) ;
		
		retValue = PKIObject.GetRandomFromPrivateKey("",PKIObject.returnArg(1),gPW);
		
		if ( rtnValue == 1 ) {
			rndObj.value = PKIObject.returnArg(1) ;
		}else {
			showCertError("식별번호 랜덤값 추출 실패");
	 	    return false;
		}
		
		return true ;
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("신원확인 실패");
 	    return false;
	}
}

function getCertRnd(rndObj, dn, media) {
	var rtnValue;
	var sRand = getRandom(3);


	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}
		
	initEVCSP();

	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,"", media, sRand); 	

	if ( rtnValue == 1 ) {
		gPW = PKIObject.returnArg(4) ;

		retValue = PKIObject.GetRandomFromPrivateKey("", PKIObject.returnArg(1), gPW);

		if ( rtnValue == 1 ) {
			rndObj.value = PKIObject.returnArg(1) ;
		}else {
			showCertError("식별번호 랜덤값 추출 실패");
	 	    return false;
		}
		
		return true ;
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("인증서 선택 실패");
 	    return false;
	}
}

function checkNoVID(signObj, dn, media,orgMsg) {
	var rtnValue,sRand;


	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

	if ( orgMsg == null || orgMsg == "") {
		sRand = getRandom(3);
	}
	else {
		sRand = orgMsg ;		
	}
		
	initEVCSP();
	PKIObject.SetCACombo(TAB_ALL);

	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,"", media, sRand); 	

	if ( rtnValue == 1 ) {
		gMedia = PKIObject.returnArg(2) ;
		signObj.value = PKIObject.returnArg(3) ;
		return true ;
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("인증서 선택 실패");
 	    return false;
	}
}


function signAndEnvFirst( envObj, recvDN, dn, serial, media, orgMsg) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("암호화할 데이타가 없습니다.");
		return false;
	}

	if(dn == "") {
		alert("선택된 인증서가 없습니다.") ;
		return;
	}

	if(recvDN == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}

	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

		
	initEVCSP();
	
	PKIObject.SetCACombo(TAB_ALL);
	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,serial, media,orgMsg); 	

	if ( rtnValue == 1 ) {
		gPW = PKIObject.returnArg(4) ;
		
		rtnValue = PKIObject.SignAndEnvelopData("",orgMsg,gPW,recvDN);
		if ( rtnValue == 1 ) {
			envObj.value = PKIObject.returnArg(1) ;
			return true ;
		}else {
			showCertError("암호화 실패");
	 	    return false;
		}
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("인증서 선택 실패");
 	    return false;
	}
}


function signAndEnvNext( envObj, recvDN, orgMsg) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("암호화할 데이타가 없습니다.");
		return false;
	}

	if(recvDN == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}


	rtnValue = PKIObject.SignAndEnvelopData("",orgMsg,gPW,recvDN) ;

	if ( rtnValue == 1 ) {
		envObj.value = PKIObject.returnArg(1) ;
		return true ; 
	} else {	 
		showCertError("암호화 실패");
 	    return false;
	}
	
}

function signAndEnvPemFirst( envObj, recvPEM, dn, serial, media, orgMsg) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("암호화할 데이타가 없습니다.");
		return false;
	}

	if(recvPEM == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}

	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

		
	initEVCSP();
	
	PKIObject.SetCACombo(TAB_ALL);
	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,serial, media,orgMsg); 	

	if ( rtnValue == 1 ) {
		gPW = PKIObject.returnArg(4) ;
		
		rtnValue = PKIObject.SignAndEnvelopDataByPem("",orgMsg,gPW,recvPEM);
		if ( rtnValue == 1 ) {
			envObj.value = PKIObject.returnArg(1) ;
			return true ;
		}else {
			showCertError("암호화 실패");
	 	    return false;
		}
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("인증서 선택 실패");
 	    return false;
	}
}


function signAndEnvPemNext( envObj, recvPEM, orgMsg) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("암호화할 데이타가 없습니다.");
		return false;
	}

	if(recvPEM == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}


	rtnValue = PKIObject.SignAndEnvelopDataByPem("",orgMsg,gPW,recvPEM) ;

	if ( rtnValue == 1 ) {
		envObj.value = PKIObject.returnArg(1) ;
		return true ; 
	} else {	 
		showCertError("암호화 실패");
 	    return false;
	}
	
}


function openAndVerify( decObj, signerObj, encMsg, passwd) {
	var rtnValue ;
		
	if ( encMsg == "" ) {
		alert("복호화할 데이타가 없습니다.");
		return false;
	}

	if ( passwd == null ) {
		passwd = "" ;
	}
	
	rtnValue = PKIObject.OpenAndVerifyData("","",encMsg,passwd); 	

	if ( rtnValue == 1 ) {
		decObj.value = PKIObject.returnArg(1) ;
		signerObj.value = PKIObject.returnArg(2) ;
		return true ;
	} else if ( rtnValue == 2 ) {
		decObj.value = PKIObject.returnArg(1) ;
		signerObj.value = PKIObject.returnArg(2) ;
		showCertError("서명한 인증서의 유효기간이 만료되었습니다.");
		return true ;
	}else {
		showCertError("복호화 실패");
 	    return false;
	}
		
}

/* inFile, outFile이 동일할 경우는 inFile을 자동 백업한다. (test.xls --> test_원본.xls */
function signAndEnvFileFirst(recvDN, dn, serial, media, inFile, outFile) {
	var rtnValue ;

	if ( inFile == "" ) {
		alert("암호화 파일이 지정되지 없습니다.");
		return false;
	}

	if(dn == "") {
		alert("선택된 인증서가 없습니다.") ;
		return;
	}

	if(recvDN == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}

	if ( !isFinite(media) || media == "") {
		alert("매체가 잘못 지정되었습니다.");
		return false;
	}

	if  ( outFile == null ) {
		outFile = inFile ;	
	}

		
	initEVCSP();
	
	PKIObject.SetCACombo(TAB_ALL);
	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,serial, media,inFile); 	

	if ( rtnValue == 1 ) {
		gPW = PKIObject.returnArg(4) ;
		
		rtnValue = PKIObject.SignAndEnvelopFile(outFile,inFile,gPW,recvDN);
		if ( rtnValue == 1 ) {
			return true ;
		}else {
			showCertError("파일 암호화 실패");
	 	    return false;
		}
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("인증서 선택 실패");
 	    return false;
	}
}

/* inFile, outFile이 동일할 경우는 inFile을 자동 백업한다. (test.xls --> test_원본.xls */
function signAndEnvFileNext(recvDN, inFile, outFile) {
	var rtnValue ;

	if ( inFile == "" ) {
		alert("암호화할 파일이 지정되지 않았습니다.");
		return false;
	}

	if(recvDN == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}

	if  ( outFile == null ) {
		outFile = inFile ;	
	}

	rtnValue = PKIObject.SignAndEnvelopFile(outFile,inFile,gPW,recvDN) ;

	if ( rtnValue == 1 ) {		
		return true ; 
	} else {	 
		showCertError("파일 암호화 실패");
 	    return false;
	}
	
}

/* inFile, outFile이 동일할 경우는 inFile을 자동 백업한다. (test.xls --> test_원본.xls */
function openAndVerifyFile(signerObj, inFile, outFile) {
	var rtnValue ;
		
	if ( inFile == "" ) {
		alert("복호화할 파일이 지정되지 않았습니다.");
		return false;
	}

	if  ( outFile == null ) {
		outFile = inFile ;	
	}

	
	rtnValue = PKIObject.OpenAndVerifyFile(outFile,"",inFile,""); 	

	if ( rtnValue == 1 ) {
		signerObj.value = PKIObject.returnArg(1) ;
		return true ;
	} else if ( rtnValue == 2 ) {
		signerObj.value = PKIObject.returnArg(1) ;
		showCertError("서명한 인증서의 유효기간이 만료되었습니다.");
		return true ;
		
	}else {
		showCertError("복호화 실패");
 	    return false;
	}
		
}


function envelopDataFirst( envObj, recvDN, orgMsg) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("암호화할 데이타가 없습니다.");
		return false;
	}

	if(recvDN == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}
		
	initEVCSP();
	
	rtnValue = PKIObject.SelectCertificate("",3,recvDN,4); 	

	if ( rtnValue == 1 ) {		
		rtnValue = PKIObject.EnvelopedData_Enclose("",orgMsg);
		if ( rtnValue == 1 ) {
			envObj.value = PKIObject.returnArg(1) ;
			return true ;
		}else {
			showCertError("암호화 실패");
	 	    return false;
		}
		
	} else {	 
		showCertError("LDAP에서 수신자 인증서 얻기 실패");
 	    return false;
	}
}

function envelopDataPEM( envObj,orgMsg,recvPEM) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("암호화할 데이타가 없습니다.");
		return false;
	}

	if(recvPEM == "") {
		alert("수신자 PEM인증서가 지정되지 않았습니다.") ;
		return;
	}

	initEVCSP();
	
	rtnValue = PKIObject.EnvelopedData_EncloseByPem("",orgMsg,recvPEM);
	
	if ( rtnValue == 1 ) {
		envObj.value = PKIObject.returnArg(1) ;
		return true ;
	}else {
		showCertError("암호화 실패");
 	    return false;
	}
		
}



function envelopDataNext( envObj,orgMsg) {
	var rtnValue ;

	if ( orgMsg == "" ) {
		alert("암호화할 데이타가 없습니다.");
		return false;
	}

	rtnValue = PKIObject.EnvelopedData_Enclose("",orgMsg) ;

	if ( rtnValue == 1 ) {
		envObj.value = PKIObject.returnArg(1) ;
		return true ; 
	} else {	 
		showCertError("암호화 실패");
 	    return false;
	}
	
}


function openData( decObj, encMsg,passwd) {
	var rtnValue ;
		
	if ( encMsg == "" ) {
		alert("복호화할 데이타가 없습니다.");
		return false;
	}
	
	if ( passwd == null ) {
		passwd = "" ;
	}

	PKIObject.SetStorageType(3);
	rtnValue = PKIObject.EnvelopedData_Open("",encMsg,passwd); 	

	if ( rtnValue == 1 ) {
		decObj.value = PKIObject.returnArg(1) ;
		return true ;
	}else {
		showCertError("복호화 실패");
 	    return false;
	}
		
}



function openDataFirst( decObj, encMsg, dn) {
	var rtnValue ;
		
	if ( encMsg == "" ) {
		alert("복호화할 데이타가 없습니다.");
		return false;
	}
	
	if ( dn == null ) {
		dn = "" ;
	}
	
	initEVCSP();
	
	rtnValue = PKIObject.SelectCertificateAndSignData("",3,"",dn,"", 3,getRandom(3)); 	

	if ( rtnValue == 1 ) {
		gMedia = PKIObject.returnArg(2) ;
		gPW = PKIObject.returnArg(4) ;
	} else if (rtnValue == 0 ) {
		return false;
	} else {
		showCertError("인증서선택 실패");
 	    return false;
	}

	rtnValue = PKIObject.EnvelopedData_Open("",encMsg,gPW); 	

	if ( rtnValue == 1 ) {
		decObj.value = PKIObject.returnArg(1) ;
		return true ;
	}else {
		showCertError("복호화 실패");
 	    return false;
	}
}



function openDataNext( decObj, encMsg) {
	var rtnValue ;
		
	if ( encMsg == "" ) {
		alert("복호화할 데이타가 없습니다.");
		return false;
	}
	
	rtnValue = PKIObject.EnvelopedData_Open("",encMsg,gPW); 	

	if ( rtnValue == 1 ) {
		decObj.value = PKIObject.returnArg(1) ;
		return true ;
	}else {
		showCertError("복호화 실패");
 	    return false;
	}
		
}



function envelopFileFirst( recvDN, inFile, outFile) {
	var rtnValue ;

	if ( inFile == "" ) {
		alert("암호화 파일이 지정되지 없습니다.");
		return false;
	}

	if(recvDN == "") {
		alert("수신자의 인증서가 지정되지 않았습니다.") ;
		return;
	}

	if  ( outFile == null ) {
		outFile = inFile ;	
	}

	initEVCSP();
	
	rtnValue = PKIObject.SelectCertificate("",3,recvDN,4); 	

	if ( rtnValue == 1 ) {		
		rtnValue = PKIObject.EnvelopedFile_Enclose(outFile,inFile);
		if ( rtnValue == 1 ) {
			return true ;
		}else {
			showCertError("암호화 실패");
	 	    return false;
		}
		
	} else {	 
		showCertError("LDAP에서 수신자 인증서 얻기 실패");
 	    return false;
	}
}



function envelopFileNext(inFile, outFile) {
	var rtnValue ;

	if ( inFile == "" ) {
		alert("암호화 파일이 지정되지 없습니다.");
		return false;
	}

	if  ( outFile == null ) {
		outFile = inFile ;	
	}

	rtnValue = PKIObject.EnvelopedFile_Enclose(outFile,inFile) ;


	if ( rtnValue == 1 ) {
		return true ; 
	} else {	 
		showCertError("암호화 실패");
 	    return false;
	}
}


function openFile( inFile, outFile) {
	var rtnValue ;
		
	if ( inFile == "" ) {
		alert("암호화 파일이 지정되지 없습니다.");
		return false;
	}

	if  ( outFile == null ) {
		outFile = inFile ;	
	}
	
	PKIObject.SetStorageType(3);
	rtnValue = PKIObject.EnvelopedFile_Open(outFile,inFile,""); 	

	if ( rtnValue == 1 ) {
		return true ;
	}else {
		showCertError("복호화 실패");
 	    return false;
	}
}




/**
 * 인증서정보에서 인증기관 이름 구하기
 * PKIObject   : PKI 처리하는 Object
 */
function getCertAuthorityName(dn) {
	var strDn ;
	
	if  ( dn == null ) {
		strDn = getCertProp(4,2) ;
	}else {
		strDn = dn ;	
	}
	return getCertAuthName(getCertAuthority(strDn));	
}

/**
 * 인증서정보에서 인증기관코드 구하기
 * PKIObject   : PKI 처리하는 Object
 */
function getCertAuthorityCode(dn) {
	var strDn ;

	if  ( dn == null ) {
		strDn = getCertProp(4,2) ;
	}else {
		strDn = dn ;	
	}
	return getCertAuthCode(getCertAuthority(strDn));
}

/**
 * 인증서정보에서 유효기간 시작을 구하기
 * PKIObject   : PKI 처리하는 Object
 */
function getExpireFrom() {
	return getCertProp(7,2).substring(0,10);
}

/**
 * 인증서정보에서 유효기간 끝을 구하기
 * PKIObject   : PKI 처리하는 Object
 */
function getExpireTo() {
	return getCertProp(8,2).substring(0,10);
}

/**
 * 인증서정보에서 OID(정책값) 구하기
 * PKIObject   : PKI 처리하는 Object
 */
function getOID() {
	return getCertProp(17,2);
}

/**
 * 인증서정보에서 Serial Number 구하기
 * PKIObject   : PKI 처리하는 Object
 */
function getSerial() {
	return getCertProp(2,2);
}


/**
 * 인증서정보에서 DN 구하기
 * PKIObject   : PKI 처리하는 Object
 */
function getCertDN() {
	return getCertProp(5,2);
}

function getCertProp(propID,certType) {

	var rtnValue;

	rtnValue = PKIObject.GetCertificatePropertyFromID("",propID,certType) ; 

 	if ( rtnValue != 1) {
 		alert("인증서가 선택되지 않았습니다.");	
 		return ;
	}
	return PKIObject.returnArg(1);
}


function getCertPEM(certType) {

	var rtnValue;

	rtnValue = PKIObject.GetCertificate("",certType) ; 

	return PKIObject.returnArg(1);
}


/**
 * Hash 구하기
 * HashObject   : Hash 처리하는 Object
 */
function getHash( str) {
	var rtnValue;
	
    rtnValue = PKIObject.HashData("",str) ; //해쉬값
 
	return PKIObject.returnArg(1);
}


/**
 * Hash 구하기
 * HashObject   : Hash 처리하는 Object
 */
function getHashFile( str) {
	var rtnValue;
	
    rtnValue = PKIObject.HashFile("",str) ; //해쉬값
 
	return PKIObject.returnArg(1);
}




/**
 * Random Number 구하기
 * CipherObject   : Cipher 처리하는 Object
 */
function getRandom( len) {
	var rtnValue;
	
    rtnValue = PKIObject.GenerateRandomNumber("",len) ;
 
	return PKIObject.returnArg(1);
}


/**
 * 암호화된 비번 구하기
 * CipherObject   : Cipher 처리하는 Object
 */
function getEncPassword() {
	var rtnValue;


	rtnValue = PKIObject.DeriveSecretKeyFromPassword("",getCertHash() );

	rtnValue = PKIObject.EncryptData("",gPW,PKIObject.returnArg(1)); 

	return PKIObject.returnArg(1);

}

/**
 * 암호화된 비번 구하기
 * CipherObject   : Cipher 처리하는 Object
 */
function getAuthKey(pw) {
	var rtnValue;

	rtnValue = PKIObject.DeriveSecretKeyFromPassword("",pw );

	return PKIObject.returnArg(1);

}

/**
 * 로그인을 위한 암호화된 데이타 구하기
 * CipherObject   : Cipher 처리하는 Object
 */
function getAuthData(pw,rand) {
	var rtnValue;


	rtnValue= PKIObject.DeriveSecretKeyFromPassword("",pw );

	rtnValue = PKIObject.EncryptData("",rand,PKIObject.returnArg(1)); 

	return PKIObject.returnArg(1);

}


//////////////////////////////////////////////////////////////////////////
// 암호화(Cipher) 함수
//////////////////////////////////////////////////////////////////////////



/**
 * 암호화 알고리즘 세팅
 * CipherObject   : Cipher 처리하는 Object
 */
function setAlgorithm(iAlgo)
{
	PKIObject.SetEncryptionAlgorithm(EV_CIPHER + iAlgo)	;
}

/**
 * 설정된 암호화 알고리즘 얻기
 * CipherObject   : Cipher 처리하는 Object
 */
function getAlgorithm()
{	
	var sAlgorithmName ="" ;
	
	gAlgorithm = PKIObject.GetEncryptionAlgorithm();

	switch (gAlgorithm)
	{
		case EV_CIPHER + 1 :
			sAlgorithmName = "DES";
			break;
		case EV_CIPHER + 2 :
			sAlgorithmName = "3DES_2KEY";
			break;
		case EV_CIPHER + 3 :
			sAlgorithmName = "3DES_3KEY";
			break;
		case EV_CIPHER + 4 :
			sAlgorithmName = "SEED";
			break;
		case EV_CIPHER + 5 :
			sAlgorithmName = "BLOWFISH";
			break;
		case EV_CIPHER + 6 :
			sAlgorithmName = "AES";
			break;
		case EV_CIPHER + 7 :
			sAlgorithmName = "CAST";
			break;
		case EV_CIPHER + 8 :
			sAlgorithmName = "IDEA";
			break;
		case EV_CIPHER + 9 :
			sAlgorithmName = "RC2";
			break;
		case EV_CIPHER + 10 :
			sAlgorithmName = "RC5";
			break;
		case EV_CIPHER + 11 :
			sAlgorithmName = "SKIPJACK";
			break;
		case EV_CIPHER + 12 :
			sAlgorithmName = "RC4_40";
			break;
		case EV_CIPHER + 13 :
			sAlgorithmName = "RC4_128";
			break;
	
	}

	return sAlgorithmName ;
	
}	

/**
 * 랜덤키 생성
 * CipherObject   : Cipher 처리하는 Object
 */
function getSecretKey() {
	var rtnValue;

	rtnValue = PKIObject.GenerateSecretKey("");
	
	return PKIObject.returnArg(1);
}

/**
 * 암호화
 * CipherObject   : Cipher 처리하는 Object
 */
function encrypt(encObj, msg,key) {
	var rtnValue;

	rtnValue = PKIObject.DeriveSecretKeyFromPassword("",key );

	rtnValue = PKIObject.EncryptData("",msg,PKIObject.returnArg(1)); 

	if ( rtnValue == 1 ) {
		encObj.value = PKIObject.returnArg(1) ;
		return true ; 
	} else {	 
		showCertError("암호화 실패");
 	    return false;
	}
}

/**
 * 복호화
 * CipherObject   : Cipher 처리하는 Object
 */
function decrypt(decObj,msg,key) {
	var rtnValue;

	rtnValue = PKIObject.DeriveSecretKeyFromPassword("",key );

	rtnValue = PKIObject.DecryptData("",msg,PKIObject.returnArg(1)); 

	if ( rtnValue == 1 ) {
		decObj.value = PKIObject.returnArg(1) ;
		return true ; 
	} else {	 
		showCertError("복호화 실패");
 	    return false;
	}
}



/**
 * 암호화
 * CipherObject   : Cipher 처리하는 Object
 */
function encryptFile(key,inFile,outFile) {
	var rtnValue;

	if ( inFile == "" ) {
		alert("암호화 파일이 지정되지 없습니다.");
		return false;
	}

	if  ( outFile == null ) {
		outFile = inFile + ".enc" ;	
	}
	
	rtnValue = PKIObject.DeriveSecretKeyFromPassword("",key );


	rtnValue = PKIObject.EncryptFile(outFile,inFile,PKIObject.returnArg(1)); 

	if ( rtnValue == 1 ) {
		return true ;
	}else {
		showCertError("암호화 실패");
 	    return false;
	}
}

/**
 * 복호화
 * CipherObject   : Cipher 처리하는 Object
 */
function decryptFile(key,inFile,outFile) {
	var rtnValue;

	if ( inFile == "" ) {
		alert("암호화 파일이 지정되지 없습니다.");
		return false;
	}

	if  ( outFile == null ) {
		outFile = inFile + ".dec";	
	}

	rtnValue = PKIObject.DeriveSecretKeyFromPassword("",key );

	rtnValue = PKIObject.DecryptFile(outFile,inFile,PKIObject.returnArg(1)); 

	if ( rtnValue == 1 ) {
		return true ;
	}else {
		showCertError("복호화 실패");
 	    return false;
	}
}



//////////////////////////////////////////////////////////////////////////
// 기타 함수
//////////////////////////////////////////////////////////////////////////
function getCertHash(strDN) {
	var rtnValue;

	if ( strDN == null ) {
		strDN = PKIObject.returnArg(1);
	}
	
	return getHash(strDN);
}


function getMedia()
{
	return gMedia ;	
}


function getMediaName(strMediaCode) {
	var strMediaName ;

	if ( strMediaCode == null ) {
		strMediaCode = getMedia();
	}
	
	if(strMediaCode == "1") {
		strMediaName = "Smart Card";
	} else if(strMediaCode == "2") {
		strMediaName = "FDD";
	} else if(strMediaCode == "3") {
		strMediaName = "HDD";
	} else if(strMediaCode == "4") {
		strMediaName     = "Ldap Server";
	} else if(strMediaCode == "6") {
		strMediaName     = "Removable Disk";
	} else if(strMediaCode == "7") {
		strMediaName     = "Security Token";
	}
	
	return strMediaName ;
}

function getMediaNameKor(strMediaCode) {
	var strMediaName ;

	if ( strMediaCode == null ) {
		strMediaCode = getMedia();
	}
	if(strMediaCode == "1") {
		strMediaName = "스마트카드";
	} else if(strMediaCode == "2") {
		strMediaName = "플로피디스크";
	} else if(strMediaCode == "3") {
		strMediaName = "하드디스크";
	} else if(strMediaCode == "4") {
		strMediaName     = "인증기관";
	} else if(strMediaCode == "6") {
		strMediaName     = "이동식디스크";
	} else if(strMediaCode == "7") {
		strMediaName     = "보안토큰";
	}
	
	return strMediaName ;
}


function getCommonName(dn){
	var index, strCn ;
	index = dn.indexOf("cn=");
	strCn =  dn.substring(index+3) ;
	index = strCn.indexOf(",") ;
	strCn = strCn.substring(0,index) ;
	
	return strCn ;
}


function getCertAuthority(issuer){
	var index, strCertAuthority ;
	index = issuer.indexOf("o=");
	strCertAuthority =  issuer.substring(index+2) ;
	index = strCertAuthority.indexOf(",") ;
	strCertAuthority = strCertAuthority.substring(0,index) ;
	
	return strCertAuthority.toUpperCase() ;
}

function getCertAuthCode(strCertAuthority){
	var strCertAuthorityCode ;

	if(strCertAuthority == "KICA") {
		strCertAuthorityCode = "0";
	} else if(strCertAuthority == "SIGNKOREA") {
		strCertAuthorityCode = "1";
	} else if(strCertAuthority == "YESSIGN") {
		strCertAuthorityCode = "2";
	} else if(strCertAuthority == "CROSSCERT") {
		strCertAuthorityCode = "3";
	} else if(strCertAuthority == "TRADESIGN") {
		strCertAuthorityCode = "4";
	} else if(strCertAuthority == "NCASIGN") {
		strCertAuthorityCode = "5";
	} else if(strCertAuthority == "KAL") {
		strCertAuthorityCode = "6";
	} else if((strCertAuthority == "GOVERNMENT OF KOREA")||(strCertAuthority == "PUBLIC OF KOREA")) {
		strCertAuthorityCode = "7";
	}
	return strCertAuthorityCode ;
}

function getCertAuthName(strCertAuthority) {
	var strCertAuthorityName ;

	if(strCertAuthority == "KICA") {
		strCertAuthorityName = "한국정보인증";
	} else if(strCertAuthority == "SIGNKOREA") {
		strCertAuthorityName = "한국증권전산";
	} else if(strCertAuthority == "YESSIGN") {
		strCertAuthorityName = "금융결제원";
	} else if(strCertAuthority == "CROSSCERT") {
		strCertAuthorityName     = "한국전자인증";
	} else if(strCertAuthority == "TRADESIGN") {
		strCertAuthorityName = "한국무역정보통신";
	} else if(strCertAuthority == "NCASIGN") {
		strCertAuthorityName = "한국전산원";
	} else if(strCertAuthority == "KAL") {
		strCertAuthorityName = "대한항공사설";
	} else if((strCertAuthority == "GOVERNMENT OF KOREA")||(strCertAuthority == "PUBLIC OF KOREA")) {
		strCertAuthorityName = "행정자치부";
	}

	return strCertAuthorityName ;
}

