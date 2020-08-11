<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import url="/WEB-INF/view/nm/NM_TOP.jsp" />
	<link rel="stylesheet" type="text/css" href="/css/mobile/event/openEvent_win_mo.css">
	
	<div class="popWrap">
		<div class="pop-layer" id="popup-a">
			<div class="header"> 
                <a class="modal-close " href="#none;" id="closePop"></a> 
                <img src="../images/mobile/event/openEvent_win_tit_mo.png" alt="오픈이벤트 당첨자 안내"> 
                <div class="event-date">
					<ul>
						<li>이벤트 기간</li>
						<li>2020.02.01(토)~2020.02.29(토)</li>
					</ul>
				</div>
            </div>
			<div class="popup_contnet">
				
				<div>
                   <!-- 이벤트 당첨자 -->
                    <ol>
                        <!-- 1등 -->
                        <li>
                           <h1 class="win_tit"><span>1등</span>Marshall Acton2</h1> 
                           <ul class="win_list">
                               <li>배*현</li>
                           </ul>
                        </li>

                        <!-- 2등 -->
                        <li>
                            <h1 class="win_tit"><span>2등</span>정관장 홍삼정 밸런스핏</h1> 
                            <ul class="win_list">
                                 <li>Hy***n</li>  
                                <li>장*정</li>
                            </ul>
                         </li>

                        <!-- 3등 -->
                        <li>
                           <h1 class="win_tit"><span>3등</span>CGV 영화관람권 </h1> 
                           <ul class="win_list clearfix">
                                <li>박*수 (썬)</li>  
                                <li>R**</li>
                                <li>정*운</li>  
                                <li>이*제</li>
                                <li>백**든</li>  
                                <li>최*서</li>
                                <li>채*훈</li> 
                                <li>똘**결</li>  
                                <li>🏚해동**공사🏠</li>  
                                <li>z**-)</li>  
                           </ul>
                        </li>

                        <!-- 4등 -->
                        <li>
                            <h1 class="win_tit"><span>4등</span> STARBUCKS 커피교환권</h1> 
                            <ul class="win_list clearfix">
                                 <li>김*섭</li>  
                                 <li>빼**혜♥.♥</li>
                                 <li>김*근</li>  
                                 <li>Th***er</li>
                                 <li>엠제**업</li>  
                                 <li>오*현</li>
                                 <li>j**n</li>  
                                 <li>김*홍</li>
                                 <li>조*근</li> 
                                 <li>안*민</li> 
                                 <!---->
                                 <li>최*규</li>  
                                 <li>진*연</li>
                                 <li>ch******_juna</li>  
                                 <li>이*제</li>  
                                 <li>이*훈</li>
                                 <li>김*리</li>  
                                 <li>현*♡</li>
                                 <li>이*운</li> 
                                 <li>한*길</li> 
                                 <li>태*** *병태</li> 
                                 <!----> 
                                 <li>서*수</li>
                                 <li>피*********** maiim</li>  
                                 <li>김선**************감사합니</li>
                                 <li>택**</li>  
                                 <li>김*</li>
                                 <li>이*영</li>  
                                 <li>J**e</li>
                                 <li>김*진</li> 
                                 <li>무*</li> 
                                 <li>이*식</li> 
                            </ul>
                         </li>
                    </ol>
                    
                </div>
				<div class="event-txt">
					이벤트에 참여해주신 모든 분들께 대단히 감사드리며,<br />당첨되신 회원님들 축하드립니다.<br />
                    경품 지급과 관련해서는 응모해주신 카카오 채널 1:1채팅으로<br />개별 안내해드리겠습니다.  

				</div>
			</div>
			<div class="popup_bottom"> <a href="#none" id="noMoreToday">오늘 하루 보지 않기</a> <a href="#none" class="closePop">닫기</a> </div>
		</div>
	</div>
	
	<script type="text/javascript" src="<c:url value='/js/mobile/libs/jquery.cookie.js' />"></script>
	<script type="text/javascript">
	
		$('#noMoreToday').click(function() {
			var cookieName = "openeventwin";
			$.cookie(cookieName, null);
			$.cookie(cookieName, cookieName, {expires: 1, path : '/'});
			fancybox_close();
		});
		
		$('.closePop').click(function() {
			fancybox_close();
		});
		
		$('#closePop').click(function() {
			fancybox_close();
		});
		
	</script>