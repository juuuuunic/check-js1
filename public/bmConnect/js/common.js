$(document).ready(function() {

});
  


function ajaxLink(href,type,idx){//a:주소, b:type, c:넘길 값
	$.ajax({
		type: type,
		url: href,
		data : idx,
		success : function(data) {
			$('body').find('._pop-ajax').remove().end().append(data).find('._pop-ajax').fadeIn(150);
			$('body').addClass('fixed');
		}
	});

}

function ajaxClose(a){
	$(a).fadeOut(150,function(){$(this).remove()});
	$('body').removeClass('fixed');
}
