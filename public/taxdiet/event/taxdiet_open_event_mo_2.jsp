<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import url="/WEB-INF/view/nm/NM_TOP.jsp" />
	<link rel="stylesheet" type="text/css" href="/css/mobile/event/openEvent.css">
	
	<div class="pop-layer">
		<div class="popup-contnet"> <a class="modal-close closePop" href="#none"></a>
			<div class="header"> <img src="/images/mobile/event/img-b-title.png" alt="오픈이벤트"> </div>
			<div class="event-info"> 위에 있는 초성을 확인하시고<br/>
					정답을 맞혀주세요!<br/>
					카카오 채널 친구 추가 후 1:1 채팅 화면에<br/>
					퀴즈 정답과 응원 메시지를 남겨주시면<br/>
					추첨을 통해 다양한 선물을 드립니다. </div>
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
				퀴즈를 확인하시고 정답과 응원메세지를<br/>
				택스다이어트 카카오 채널에 남겨주세요!</div>
			<img src="/images/mobile/event/img-b-step.png" alt="">
		</div>
		<div class="btn-area2">
			<div id="addKakaofrd"></div>
		</div>
		<div class="popup_bottom"> <a href="#none" id="noMoreToday">오늘 하루 보지 않기</a> <a href="#none" class="closePop">닫기</a> </div>
	</div>

	

	<script type="text/javascript" src="<c:url value='/js/mobile/libs/jquery.cookie.js' />"></script>
	<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
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
	</script>
	<script type='text/javascript'>
	  //<![CDATA[
	    // 사용할 앱의 JavaScript 키를 설정해 주세요.
	    Kakao.init('114e254b4f153b1a001fafcc832b36b9');
	    // 카카오톡 채널 추가 버튼을 생성합니다.
	    Kakao.Channel.createAddChannelButton({
	      container: '#addKakaofrd',
	      channelPublicId: '_LePtj' // 채널 홈 URL에 명시된 id로 설정합니다.
	    });
	  //]]>
	</script>
