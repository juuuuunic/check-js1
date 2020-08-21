$(document).ready(function() {
    HeightAuto();
});

function HeightAuto(){
	if($('.HeightAuto').length !== 0) {
		$('.HeightAuto').css('height' ,  $(window).innerHeight() );
		$(document).resize(function() {
            $('.HeightAuto').css('height' ,  $(window).innerHeight() );
		});
	}
}