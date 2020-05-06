$(document).ready(function() {
    $(".slides").append(	$(".slide").eq(0).clone()	);
});
/* Slide 만드는 함수 */
// function slideMaker($obj, isClone) {
//     if(isClone) $(".slides").append(	$(".slide").eq(0).clone()	);
// }

//slide01
(function(){
    
	var $stage = $("#stage");
    var $slides =  $stage.find(".slides");
    var interval;
	var speed = 500;
	var delay = 1500;
	var n = 0;
    var last, $slide;

    $slide = $slides.find(".slide");
    last = $slide.length;
    
    /* 이벤트선언 */
	var interval = setInterval(intervalSlide, delay);
    
    function ani() {
        $slides.stop().animate({"left": -n*100+"%"}, speed);
	}
    function intervalSlide() {
		if(n == last - 1) {
			n = 0;
			$slides.css({"left": 0});
		}
		n++;
        ani();
        console.log($stage)
	}
})();