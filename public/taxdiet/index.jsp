<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<spring:eval var="SYSTEM_TYPE" expression="@propertyConfigurer.getProperty('system.type')" />
<spring:eval var="DOMAIN" expression="@propertyConfigurer.getProperty('renewal.web')" />
<spring:eval var="DOMAIN_MOBILE" expression="@propertyConfigurer.getProperty('renewal.mobile')" />
<%@ page import="nds.util.DateUtil"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>사업자지원서비스</title>
<script type="text/javascript">
	var conUrl = "<%=javax.servlet.http.HttpUtils.getRequestURL(request)%>";
	
    // 모바일 접속
	if (navigator.userAgent.match(/iPad/) == null && navigator.userAgent.match(/iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS/) != null
		|| conUrl.indexOf('<c:out value="${DOMAIN_MOBILE}"/>') > -1 ) {
		location.href = '<c:url value="${DOMAIN_MOBILE}/nm/NM_20001.do" />';
	}	// PC접속
	else {
		
		call_uri = '<c:url value="${DOMAIN}/cm/main.do" />';
		location.href = call_uri;
	}
</script>
</head>
</html>
