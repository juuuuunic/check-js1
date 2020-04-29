$(document).ready(function() {
    $('.slides').append( $('.slides > li').eq(0).clone() );
});


//slide01
(function(){
    var  interval = setInterval(slide01, 3000) ;
    var n = 1;
   
    function ani() {
        $(".slides").stop().animate({"left":(-n*100)+"%"},500);
	}
    function slide01() {
        if(n == $('.slides > li').length -1) {
            n = 0; 
            $(".slides").css({"left": 0});
        }
        n++;
        ani();
    };
})();