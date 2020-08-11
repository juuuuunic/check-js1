<%@page import="java.util.Enumeration"%>
<%@ page contentType='text/html; charset=euc-kr' %>
<%
request.setCharacterEncoding("euc-kr");
String admiCd		= request.getParameter("admi_cd");
String admiNm		= request.getParameter("admi_nm");
String upjong3Cd	= request.getParameter("upjong3_cd");
String upjong3Nm	= request.getParameter("upjong3_nm");
String extYn		= request.getParameter("ext_yn");

System.out.println("== Header Information ====================================================");
Enumeration<String> em = request.getHeaderNames();

while (em.hasMoreElements()) {
	String name = em.nextElement();
	String val = request.getHeader(name);

	System.out.println(name + " : " + val);
}


System.out.println("== Request Server Information ====================================================");
System.out.println("authType	: " +	request.getAuthType());
System.out.println("characterEncoding : " +	request.getCharacterEncoding());
System.out.println("contentLength : " +	request.getContentLength());
System.out.println("contentType : " +	request.getContentType());
System.out.println("contextPath : " +	request.getContextPath());
System.out.println("localAddr : " +	request.getLocalAddr());
System.out.println("localName : " +	request.getLocalName());
System.out.println("localPort : " +	request.getLocalPort());
System.out.println("method : " +	request.getMethod());
System.out.println("pathInfo : " +	request.getPathInfo());
System.out.println("pathTranslated : " +	request.getPathTranslated());
System.out.println("protocol : " +	request.getProtocol());
System.out.println("queryString : " +	request.getQueryString());
System.out.println("remoteAddr : " +	request.getRemoteAddr());
System.out.println("remoteHost : " +	request.getRemoteHost());
System.out.println("remotePort : " +	request.getRemotePort());
System.out.println("remoteUser : " +	request.getRemoteUser());
System.out.println("requestedSessionId : " +	request.getRequestedSessionId());
System.out.println("requestURI : " +	request.getRequestURI());
System.out.println("requestURL.toString : " +	request.getRequestURL().toString());
System.out.println("scheme : " +	request.getScheme());
System.out.println("serverName : " +	request.getServerName());
System.out.println("serverPort : " +	request.getServerPort());
System.out.println("servletPath : " +	request.getServletPath());


System.out.println("== Request Parameters ====================================================");
Enumeration<String> eParam = request.getParameterNames();

while (eParam.hasMoreElements()) {
	String pName = (String) eParam.nextElement();
	String pValue = request.getParameter(pName);

	
	System.out.println(pName + " : " + pValue);
}

System.out.println("===========================================================================");

%>
<html>
<meta http-equiv="content-type" content="text/html; charset=euc-kr" />
<head>
<script type="text/javascript">
	opener.document.form.admiCd.value		= "<%=admiCd%>";
	opener.document.form.admiNm.value		= "<%=admiNm%>";
	opener.document.form.upjong3Cd.value	= "<%=upjong3Cd%>";
	opener.document.form.upjong3Nm.value	= "<%=upjong3Nm%>";
	opener.document.form.extYn.value		= "<%=extYn%>";
	self.close();
</script>
</head>
</html>
