<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="nds.common.util.NDSBizUtil" %>
<%@ page import="java.io.File" %>
<%
String blbdKind = "00"; 
if ( session.getAttribute("blbdKind")!=null && !session.getAttribute("blbdKind").equals("") ) {
	blbdKind = String.valueOf(session.getAttribute("blbdKind"));
}

String SAVE_DIR = NDSBizUtil.getRmCheditorSaveDir(blbdKind);

// 디렉토리 없을 경우 생성
File tmp = new File(SAVE_DIR);
if(!tmp.exists()){
	tmp.mkdirs();
}

//String SAVE_URL = NDSBizUtil.getRmCheditorSaveUrl(SAVE_DIR);

String SAVE_URL = "http://" + request.getServerName() + request.getContextPath() + SAVE_DIR.substring( SAVE_DIR.indexOf("/cheditor/") );
%>