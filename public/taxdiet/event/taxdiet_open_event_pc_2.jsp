<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/soho_default.css' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/openEvent.css' />">
<script src="<c:url value='/js/libs/jquery-1.11.1.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/mobile/libs/jquery.cookie.js' />"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			$('#noMoreToday').click(function() {
				var cookieName = "openeventpc";
				$.cookie(cookieName, null);
				$.cookie(cookieName, cookieName, {expires: 1, path : '/'});
				parent.fancybox_close();
			});
			
			$('#closePop').click(function() {
				parent.fancybox_close();
			});
		});
	</script>
</head>
<body>
	<div class="popWrap">
		<div class="pop-layer" id="popup-b">
			<div class="header"> <a class="modal-close " href="#none;" id="closePop"></a><img src="/images/event/img-b-title.jpg" alt="오픈이벤트"> </div>
			<div class="popup-contnet">
				<div class="event-info"> 위에 있는 초성을 확인하시고 정답을 맞혀주세요! 카카오 채널 친구 추가 후 1:1 채팅 화면에<br>
					퀴즈 정답과 응원 메시지를 남겨주시면 추첨을 통해 다양한 선물을 드립니다. </div>
				<div class="event-date">
					<ul>
						<li>이벤트 기간</li>
						<li>2020.02.01(토)~2020.02.29(토)</li>
					</ul>
				</div>
			</div>
			<div class="step-area bg-wh">
				<div class="step-info text-dark-blue">
					<div class="text-blue">정답과 응원 메시지는 여기에 !</div>
					퀴즈를 확인하시고 정답과 응원메세지를 택스다이어트 카카오 채널에 남겨주세요!<br>
					QR코드를 활용하시면 편하게 등록하실 수 있습니다. </div>
				<img src="/images/event/img-b-step.png" alt=""> </div>
			<div class="popup_bottom"> <a class="f-right" href="#none;" id="noMoreToday">오늘 하루 보지 않기</a></div>
		</div>
	</div>
</body>
</html>