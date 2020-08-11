<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"		uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="ko">
<head>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/soho_default.css' />">
<link rel="stylesheet" type="text/css" href="<c:url value='/css/event_nplus.css' />">
<script src="<c:url value='/js/libs/jquery-1.11.1.min.js' />"></script>
<script type="text/javascript" src="<c:url value='/js/mobile/libs/jquery.cookie.js' />"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#noMoreToday').click(function() {
			var cookieName = "npluspaneljoineventpc";
			$.cookie(cookieName, null);
			$.cookie(cookieName, cookieName, {expires: 1, path : '/'});
			parent.fancybox_close();
		});
		
		$('#closePop').click(function() {
			parent.fancybox_close();
		});
		
		$('#goEvent').click(function() {
			window.open("https://www.npluspanel.co.kr");
		});
		
	});
</script>
</head>
<body>
	<header>
		<a class="modal-close " href="#none;" id="closePop"></a> 
		<div class="lp_slogon">
			<img src="../images/event/nplus_event_slogan.png" class="img" alt="nplus 이벤트"> 
		</div>
	</header>

	<section>
		<ul class="event_date">
			<li class="clearfix">
				<p>이벤트 기간</p>
				<p>2020.03.23(월)~2020.04.17(금)</p>
			</li>
			<li class="clearfix">
				<p>당첨자 발표</p>
				<p>2020.04.24(금)</p>
				
			</li>
			<li class="clearfix">
				<p>참여방법</p>
				<p>Taxdiet 가입 회원 대상으로 <strong>NPLUS panel에 가입 하시면</strong> 경품에 자동 응모 됩니다.</p>
			</li>
		</ul>

		<ul class="event_gift clearfix">
			<li>
				<p class="event_rank">1등</p>
				<div class="gift_box">
					<img src="../images/event/nplus_gift01.png" alt="에어팟2">
					<p>
						에어팟2
						<span>(무선충전 모델)</span>
						1명
					</p>
				</div>
			</li>
			<li>
				<p class="event_rank">2등</p>
				<div class="gift_box">
					<img src="../images/event/nplus_gift02.png" alt="신세계 상품권 10만원">
					<p>
						신세계 상품권 10만원
						<span>(모바일 상품권)</span>
						2명
					</p>
				</div>
			</li>
			<li>
				<p class="event_rank">3등</p>
				<div class="gift_box">
					<img src="../images/event/nplus_gift03.png" alt="문화상품권 3만원">
					<p>
						문화상품권 3만원
						<span>(모바일 상품권)</span>
						5명
					</p>
				</div>
			</li>
			<li>
				<p class="event_rank">4등</p>
				<div class="gift_box">
					<img src="../images/event/nplus_gift04.png" alt="스타벅스 커피 교환권">
					<p>
						스타벅스 커피 <br />교환권
						<span></span>
						30명
					</p>
				</div>
			</li>
		</ul>

		<p class="event_etc">※경품에 대한 제세공과금은 당사 부담입니다.</p>
		<input type="button" id="goEvent" value="이벤트 참여하기">
	</section>
	<footer>
		<a id="noMoreToday" href="#none;">오늘 하루 보지 않기</a>
	</footer>
</body>
</html>