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
		
		$('#goEvent').click(function() {
			parent.location.href = '/vr/VR_03007.do';
		});
	});
</script>
</head>
<body>
	<div class="popWrap">
		<div class="pop-layer" id="popup-a">
			<div class="header"> <a class="modal-close " href="#none;" id="closePop"></a> <img src="/images/event/img-a-title.jpg" alt="오픈이벤트"> </div>
			<div class="popup-contnet">
				<div class="event-date">
					<ul>
						<li>이벤트 기간</li>
						<li>2020.02.01(토)~2020.02.29(토)</li>
					</ul>
					<ul>
						<li>당첨자 발표</li>
						<li>2020.03.05(목)</li>
					</ul>
				</div>
				<div class="gift-area">
					<div class="gift">
						<div class="badge">1등</div>
						<img src="/images/event/img-gift-01.jpg" alt="">
						<div class="gift-title">
							<li>마샬 액톤2</li>
							<li>(블루투스 스피커40만원 상당)</li>
						</div>
						<div class="gift-num">1명</div>
					</div>
					<div class="gift">
						<div class="badge">2등</div>
						<img src="/images/event/img-gift-02.jpg" alt="">
						<div class="gift-title">
							<li>정관장 홍삼정</li>
							<li>(애브리타임 밸런스핏 5만원 상당)</li>
						</div>
						<div class="gift-num">2명</div>
					</div>
					<div class="gift">
						<div class="badge">3등</div>
						<img src="/images/event/img-gift-03.jpg" alt="">
						<div class="gift-title">
							<li>CGV 영화관람권 2매 </li>
						</div>
						<div class="gift-num">10명</div>
					</div>
					<div class="gift">
						<div class="badge">4등</div>
						<img src="/images/event/img-gift-04.jpg" alt="">
						<div class="gift-title">
							<li>스타벅스 커피 교환권</li>
						</div>
						<div class="gift-num">30명</div>
					</div>
				</div>
				<div class="step-area">
					<div class="step-info"> <span class="info-title">참여방법</span>로그인 후 퀴즈를 확인하시고 정답과 응원메세지를 남겨주세요! </div>
					<img src="/images/event/img-a-step.png" alt="">
					<div class="guide"> 1등 경품 지급 시 발생하는 제세공과금(상품 금액의 22%)은 당첨자 본인이 부담합니다. </div>
				</div>
				<div class="btn-area">
					<button type="button" id="goEvent">이벤트 참여하기</button>
				</div>
			</div>
			<div class="popup_bottom"> <a class="f-right" id="noMoreToday" href="#none;">오늘 하루 보지 않기</a></div>
		</div>
	</div>

</body>
</html>