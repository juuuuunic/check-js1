var progress = {
	
	// 초기화
	init		: function(){
		if($("body div.loading_wrap").length == 0){
			var html	= "";
			html += "<div class=\"loading_wrap HeightAuto\">";
			html += "	<div class=\"box_img\">";
			html += "		<p>Loading...</p>";
			html += "	</div>";
			html += "	<div class=\"loading_bg HeightAuto\"></div>";
			html += "</div>";
			
			$("body").prepend(html);
			
			progress.autoResize();
		}
	}	
	
	// 위치 중앙정렬
	, autoResize	: function(){
		$(".HeightAuto").css("height", $(window).height());
		$(window).resize(function() {
			$(".HeightAuto").css("height", $(window).height());
		});
	}
	
	// 로딩 중
	, start			: function(){
		$("div.loading_wrap").addClass("active");
	}
	
	// 로딩 끝
	, stop			: function(){
		$("div.loading_wrap").removeClass("active");
	}
};


$(function(){
	try{
		progress.init();
		
		$(".progress").click(function(){
			progress.start();
		});
	}catch(exception){
	}
});
