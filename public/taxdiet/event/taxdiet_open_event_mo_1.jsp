<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import url="/WEB-INF/view/nm/NM_TOP.jsp" />
	<link rel="stylesheet" type="text/css" href="/css/mobile/event/openEvent.css">
	
	<div class="pop-layer">
		<div class="bg-paper" style="background: url('/images/mobile/event/bg-paper.png') center top"></div>
		<div class="popup-contnet"> <a class="modal-close closePop" href="#none"></a>
			<div class="header"> <img src="/images/mobile/event/img-a-title.png" alt="오픈이벤트"> </div>
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
		</div>
		<div class="gift-area">
			<div class="gift"> <img src="/images/mobile/event/img-gift-01.jpg" alt="">
				<div class="gift-title-win">
					<li>고객을 부르는 스피커</li>
					<li>마샬 액톤2</li>
					<li>블루투스 스피커40만원 상당</li>
				</div>
			</div>
				<div class="gift">
					<div class="badge" style="background-image: url(/images/mobile/event/ic-badge.png)">2등</div>
					<img src="/images/mobile/event/img-gift-02.jpg" alt="">
					<div class="gift-title">
						<li>정관장 홍삼정</li>
						<li>애브리타임 밸런스핏<br />5만원 상당<br />(2명)</li>
					</div>
				</div>
				<div class="gift">
					<div class="badge" style="background-image: url(/images/mobile/event/ic-badge.png)">3등</div>
					<img src="/images/mobile/event/img-gift-03.jpg" alt="">
					<div class="gift-title">
						<li>CGV<br />영화관람권 2매<br />(10명)</li>
					</div>
				</div>
				<div class="gift">
					<div class="badge" style="background-image: url(/images/mobile/event/ic-badge.png)">4등</div>
					<img src="/images/mobile/event/img-gift-04.jpg" alt="">
					<div class="gift-title">
						<li>스타벅스<br />커피 교환권<br />(30명)</li>
					</div>
				</div>
		</div>
		<div class="btn-area">
			<div class="guide">1등 경품 지급 시 발생하는 제세공과금(상품 금액의 22%)은 당첨자 본인이 부담합니다.</div>
			<button type="button" id="goEvent">이벤트 참여하기</button>
		</div>
		<div class="popup_bottom"> <a href="#none" id="noMoreToday">오늘 하루 보지 않기</a> <a href="#none" class="closePop">닫기</a> </div>
	</div>
	
	<script type="text/javascript" src="<c:url value='/js/mobile/libs/jquery.cookie.js' />"></script>
	<script type="text/javascript">
	
		$('#noMoreToday').click(function() {
			var cookieName = "openevent";
			$.cookie(cookieName, null);
			$.cookie(cookieName, cookieName, {expires: 1, path : '/'});
			fancybox_close();
		});
		
		$('.closePop').click(function() {
			fancybox_close();
		});
		
		$('#goEvent').click(function() {
			parent.location.href = '/nm/NM_23011.do';
		});
	
	</script>
