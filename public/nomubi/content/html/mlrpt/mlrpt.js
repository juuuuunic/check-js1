
var offset=location.href.indexOf(location.host)+location.host.length;
var G_FULL_URL=location.href.substring(0,location.href.indexOf('/',offset+1));  

//var URL = "http://interface.nicednb.com/mlrpt/DD9P8N9W6HR57Z2.txt";
var URL = "http://www.creport.co.kr/mlrpt/DD9P8N9W6HR57Z2.txt";
//var URL = "http://www.creport.co.kr/mlrpt/DD9P8N9W6HR57Z2.pwl";// 개발라이센스


//var URL = "http://dev.creport.com/mlrpt/DD9P8N9W6HR57Z2.txt";
//var URL = "http://interface.nicednb.com/mlrpt/D2P385CW6645HSW.pwl";
//var URL = "http://www.creport.co.kr/mlreport/DD9P8N9W6HR57Z2.pwl";

/**
 * 미리보기
 */
function PreviewProc() {
	//this.pwp.License = URL;
	//this.pwp.enablescript = false; //ibsheet 때문에 필요함
	//this.pwp.previewdlg(document);

	var mlobj = document.getElementById("pwp");
	mlobj.SetCookie(document.cookie);
	mlobj.License = URL;
	mlobj.PreviewDlg(document);
}

/**
 * 설정
 */
function OptionProc() {
	this.pwp.optiondlg();
}



/**
 * 인쇄
 */

function PrintProc() { 
	//alert('출력됨');
	PreviewProc();
//if($("#printbtn").attr("src") == js_contextPath+"/images/common/icon_print_off.gif"){
		//  alert("출력 준비 중입니다.");
		  //return ;
	  //}
	  
	  //$("#printbtn").attr("src", js_contextPath+"/images/common/icon_print_off.gif");
	  //factory.printing.header = "";   // Header에 들어갈 문장
	  //factory.printing.footer = "";   // Footer에 들어갈 문장
//	  factory.printing.portrait = false   // true 면 가로인쇄, false 면 세로 인쇄
//	  factory.printing.leftMargin = 1.0   // 왼쪽 여백 사이즈
//	  factory.printing.topMargin = 1.0   // 위 여백 사이즈
//	  factory.printing.rightMargin = 1.0  // 오른쪽 여백 사이즈
//	  factory.printing.bottomMargin = 1.0  // 아래 여백 사이즈
//	  factory.printing.SetMarginMeasure(2); // 테두리 여백 사이즈 단위를 인치로 설정합니다.
	  //factory.printing.printer = "HP DeskJet 870C";  // 프린트 할 프린터 이름
//	  factory.printing.paperSize = "A4";   // 용지 사이즈
	  //factory.printing.paperSource = "Manual feed";   // 종이 Feed 방식
	  //factory.printing.collate = true;   //  순서대로 출력하기
	  //factory.printing.copies = 2;   // 인쇄할 매수
	  //factory.printing.SetPageRange(false, 1, 3); // True로 설정하고 1, 3이면 1페이지에서 3페이지까지 출력
	  //factory.printing.Print(true) // 출력하기
	  //$("#printbtn").attr("src", js_contextPath+"/images/common/icon_print.gif");
//	this.pwp.License = URL;
//	this.pwp.PrintIndirect (document);
}

/*ML report 호출  자바스크립트 */
function PrintProcML() {
	//this.pwp.License = URL;
    //this.pwp.PrintIndirect (document);    
	PreviewProc();	
}

function PrintProc2() {  
	this.pwp.License = URL;
    this.pwp.PrintIndirect (document);
}

/**
 * PDF 변환
 */
function PdfProc() { 
	this.pwp.License = URL;
	this.pwp.MakePdf (document);
//	MakePDFwithPath (document, filePath);
}

function PdfSave(fn) { 
	this.pwp.License = URL;
	this.pwp.MakePDFwithPath(document, fn);
}

function MakePDFAllwithPath() {
	var URLList =  "http://mlreport.infraware.co.kr/mlreport_site/support/2.0/sample/PrintURLList1.html;http://mlreport.infraware.co.kr/mlreport_site/support/2.0/sample/PrintURLList2.html;http://mlreport.infraware.co.kr/mlreport_site/support/2.0/sample/PrintURLList3.html;";
	MyStr = "C:\\" + "download" + "\\";
	filePath = MyStr + "abc.pdf";
 	MLReportJS.Ready(null,function(version){
    MLReportJS.License = MLReportLicenseURL;
		MLReportJS.MakePDFAllwithPath(URLList,filePath);
 	});
}

/**
 * 엑셀로 내보내기
 * 엑셀로 변환 하고자 하는 table 속성에 ToExcel 이라 값을 부여 하여야함
 * 예) <table ToExcel>
 */
function ExcelProc() {
	this.pwp.License = URL;
	this.pwp.ToExcel (document);
}

/**
 * 워드로 내보내기
 */
function WordProc() {
	this.pwp.ToWord (document);
}

/**
 * 워드로 내보내기
 */
function WordProc2() {
	var Url = document.frmWord.sUrl.value;
	this.pwp.ToWordUrl (Url);
}
 
 
//ML 이미지
function namosw_exchange_src() {
 str = namosw_exchange_src.arguments[0];
 str = (navigator.appName == 'Netscape') ? 'document.' + str : 'document.all.' + str;
 img = eval(str);
 if (img) {
     if (img.ori_src == null) {
         img.ori_src = img.src;
         img.src     = namosw_exchange_src.arguments[1];
     } else {
         var temp    = img.src;
         img.src     = img.ori_src;
         img.ori_src = temp;
     }
 }
}

//
/***
var Xpos = 0;
var Ypos = 0;
var Ygravity = 0.80;
var scrollPos = 0;
var oldScrollPos = 0;
var diff_x = 0;
var table_width = 1024;


function FloatMenu() {
	docWidth = document.documentElement.clientWidth; // Update document width
	docHeight = document.documentElement.clientHeight; // Update document height
	oldScrollPos = scrollPos;
	scrollPos = document.documentElement.scrollTop; // Update scrollbar position

	diff_x = (docWidth - table_width) / 2;
	Xpos = 500 + diff_x;
	// diff_x는 퀵메뉴 레이어의 왼쪽 여백으로 가변 
	// Xpos 기본 레이어의 x  좌표값 
	// 922는  메인 레이아웃 테이블 크기+(레이어의 가로크기/2) 가장 자리에 맞게 뜬다. 
	
	if ( (idPrnMenu.offsetHeight + 10) > docHeight) {
		Yboundary = scrollPos;
		// 200과 180은 상단 y 좌표값 
	} else if ( (idPrnMenu.offsetHeight + 200) > docHeight) {
		Yboundary = ((scrollPos + docHeight) - idPrnMenu.offsetHeight) - 10;
	} else {
		Yboundary = scrollPos + 20;
	}//  y 좌표값 
	
	
	Ypos += (Yboundary - idPrnMenu.offsetTop) * 0.01
	Ypos *= Ygravity; // Slow object down

	if (idPrnMenu.offsetTop + idPrnMenu.offsetHeight + Ypos > document.documentElement.scrollHeight) {
		Ypos = document.documentElement.scrollHeight - (idPrnMenu.offsetTop + idPrnMenu.offsetHeight);
	}

	idPrnMenu.style.pixelLeft = Xpos;
	idPrnMenu.style.pixelTop += Ypos; // Make object bounce
}
$(document).ready(function() {
window.setInterval("FloatMenu()", 1);
});
**/