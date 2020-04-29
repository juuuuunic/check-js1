$OBJ = {
	'win' : $(window),
	'doc' : $(document),
	'html' : $('html')
}

function winW(){//창 너비
	return $OBJ.win.width();
}

function winH(){// 창 높이
	return $OBJ.win.height();
}

function winSh(){// 스크롤 값
	return $OBJ.win.scrollTop();
}

function mathceil(num){// 소수 점 올림
	return Math.ceil(num);
}

function mathfloor(num){// 소수 점 절사
	return Math.floor(num);
}

function mChk(){// 모바일 체크
	return $('#mchk').is(':visible');
}

function selGoing(a){
	$(a).next('a').attr('href',$(a).val());
}


function printEvt(a){
	$(a).print();
}

function popOpen(a){
	$(a).fadeIn(300);
}

function popClose(a){
	$(a).fadeOut(300);
}

function pad(n, width) {
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function restTab(a){
	$('.__rest .info .area').eq(a).addClass('active').siblings().removeClass('active');
}

function ajaxLink(href,type,idx){//a:주소, b:type, c:넘길 값
	$.ajax({
		type: type,
		url: href,
		data : idx,
		success : function(data) {
			$('body').find('._pop-ajax').remove().end().append(data).find('._pop-ajax').fadeIn(500);
		}
	});
}

function ajaxClose(a){
	$(a).fadeOut(500,function(){$(this).remove()});
}

function mChk(){// 모바일 체크
	return $('#header .gnb').is(':hidden');
}

var head = {
	init : function(){
		this.action();
	},
	action : function(){
		var a = $('#header');
		var gnb = a.find('.gnb');
		var lang = a.find('.lang');
		var mnu = a.find('.menu');
		var nav = $('#nav');
		var close =  nav.find('.close');
		var navGnb = nav.find('.gnb > li > a');

		gnb.on('mouseenter',function(){
			$OBJ.html.addClass('menu-on');
		});

		gnb.on('mouseleave',function(){
			$OBJ.html.removeClass('menu-on');
		});

		gnb.children('li').on('mouseenter',function(){
			$(this).addClass('on').siblings().removeClass('on');
		});

		gnb.find('.gnb1 .float .wrap > ul > li > a').on('click',function(){
			if(mChk()==false){
				$(this).closest('li').toggleClass('on').siblings().removeClass('on');
				return false;
			}
		});

		lang.on({
			'mouseenter' : function(){
				$OBJ.html.addClass('lang-on');
				gnb.children('li').removeClass('on');
			},
			'mouseleave' : function(){
				$OBJ.html.removeClass('lang-on');
			}
		});

		mnu.on('click',function(){
			$OBJ.html.toggleClass('nav-on');
		});

		close.on('click',function(){
			$OBJ.html.removeClass('nav-on');
		});

		navGnb.on('click',function(){
			if(mChk()==true){
				$(this).closest('li').toggleClass('on').siblings().removeClass('on');
				return false;
			}
		});

		function headFix(){
			if(winSh() > 50){
				$OBJ.html.addClass('head-fix');
			}else{
				$OBJ.html.removeClass('head-fix');
			}
		}

		$OBJ.win.on('load resizeEnd scroll',function(){
			headFix();
		});

	}
};


var vis = {
	init : function(){
		this.action();
	},
	action : function(){
		var a = $('#vis');
		var roll = a.find('.roll');
		var play = a.find('.play');
		var cont = a.find('.control');
		var page = cont.find('.paging strong');
		var max = roll.find('.vis').length;
		var prev = cont.find('.prev');
		var next = cont.find('.next');
		var bar = cont.find('.bar');

		cont.find('.paging span').text(pad(max,2));

		function visActive(num){
			bar.removeClass('active').html('<span></span>');
			page.text(pad(num+1,2));
			roll.find('.slick-slide').eq(num).find('.vis').addClass('active');
			roll.find('.slick-slide').eq(num).siblings().find('.vis').removeClass('active');
			setTimeout(function(){
				bar.addClass('active');
			},100);
		}

		roll.on('init', function(event, slick){
			visActive(0);
		});

		roll.slick({
			dots: false,
			speed: 2000,
			arrows: false,
			fade: true,
			autoplay: true,
			pauseOnDotsHover: false,
			pauseOnFocus: false,
			pauseOnHover: false,
			autoplaySpeed: 9000
		});

		roll.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			visActive(nextSlide);
		});

		prev.on('click',function(){
			roll.slick('slickPrev');
			return false;
		});

		next.on('click',function(){
			roll.slick('slickNext');
			return false;
		});


	}
}


var foot = {
	init : function(){
		this.action();
	},
	action : function(){
		var a = $('#footer');
		var site = a.find('.site');
		var b = $('#header');
		var gnb = b.find('.gnb');

		site.on({
			'mouseenter' : function(){
				if(mChk()==false){
					$(this).addClass('active');
				}
			},
			'mouseleave' : function(){
				if(mChk()==false){
					$(this).removeClass('active');
				}
			}
		});

		site.children('a').on('click',function(){
			if(mChk()==true){
				site.toggleClass('active');
			}
			return false;
		});
	}
};


var o2o = {
	init : function(){
		this.action();
	},
	action : function(){
		var a = $('#o2o');
		var area = a.find('.area');
		var roll = a.find('.roll');
		

		roll.slick({
			dots: false,
			arrows: true,
			infinite: false,
			slidesToShow: 4,
			autoplay: false,
			responsive: [
				{
					breakpoint: 1000,
					settings: {
						slidesToShow: 2
					}
				}
			]
		});

		a.on('mouseenter','.slick-slide',function(){
			if(mChk()==false){
				var wid = area.width();

				$(this).addClass('hover').siblings().removeClass('hover');
				$(this).removeClass('leave').siblings().addClass('leave');

				$(this).css({'width':wid*0.31+'px'});
				$(this).siblings('.slick-slide').css({'width':wid*0.25+'px'});
				$(this).siblings('.slick-active').css({'width':wid*0.23+'px'});

			}
		});
		
		a.on('mouseleave','.area',function(){
			if(mChk()==false){
				var wid = area.width();
				a.find('.slick-slide').removeClass('hover leave');
				a.find('.slick-slide').css({'width':wid*0.25+'px'});
			}
		});

	}
}


var scr = {
	init : function(){
		if($('._scr').length > 0){
			this.action();
		}
	},
	action : function(){
		var main = $('._scr');
		var quick = $('#page');
		var quickA = quick.find('a');
		var win = $OBJ.win;
		var scrNum = 0;
		var solh = [];
		var aniNum = [];
		var sh = win.scrollTop();
		var spd = 1000;
		var visIng = 0;
		var wheelNum = 0;

		function visStart(){
			visIng = 0;
		}

		function navActive(a){
			quick.find('a').eq(a).addClass('active').siblings().removeClass('active');
			if(a==1||a==2||a==4){
				quick.addClass('dark');
			}else{
				quick.removeClass('dark');
			}
		}

		quickA.on('click',function(){
			var a = $(this).attr('href');
			$.scrollTo($(a),500,{offset:{top:-87}});
			return false;
		});

		function motionArea(){
			for (i=0;i<main.length;i++){
				if(sh >= solh[i]){
					scrNum = i;
					if(aniNum[i]==0){
						aniNum[i]=1;
					}
				}
			}
			navActive(scrNum);
			motion(scrNum);
		}

		function motion(i){
			main.eq(i).addClass('action');
		}

		main.each(function(i){
			aniNum[i] = 0;
		});

		win.on('load',function(){
			main.each(function(i){
				solh[i] = parseInt(main.eq(i).offset().top - (win.height() - win.height()/2));
			});
			sh = win.scrollTop();

			setTimeout(function(){
				motionArea();
				wheelNum = scrNum;
			},500);

			win.on({
				'scroll' : function(){
					sh = $(this).scrollTop();
					motionArea();
				}
			});
		});

	}
}


var wide = {
	init : function(){
		if($('.__wide').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('.__wide');

		function widSize(){
			if(winW() > 1240){
				var wid = (winW()-1202)/2*-1;
				a.css({'margin-left':wid,'margin-right':wid});
			}else{
				//a.removeAttr('style');
			}
		}

		widSize();

		$OBJ.win.on('load resizeEnd',function(){
			widSize();
		});
		
	}
};


var gotop = {
	init : function(){
		this.action();
	},
	action : function(){
		var set = {
			hb : $('html,body'),
			win : $(window),
			btn : $('#gotop'),
		};
		var spd = 300;

		set.btn.on({
			'click' : function(){
				$.scrollTo($('#wrap'),spd);
			}
		});


	}
}



var fam = {
	init : function(){
		this.action();
	},
	action : function(){
		var a = $('#footer .fam');
		var btn = a.find('span');

		btn.on('click',function(){
			a.toggleClass('active');
		});

		a.on({
			'mouseenter' : function(){
				if(mChk()==false){
					a.addClass('active');
				}
			},
			'mouseleave' : function(){
				if(mChk()==false){
					a.removeClass('active');
				}
			}
		});
	}
}


var mbusi = {
	init : function(){
		this.action();
	},
	action : function(){
		var a = $('#main .business');
		var tab = a.find('.tab button');
		var box = a.find('.item');

		tab.on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			box.eq($(this).index()).addClass('active').siblings().removeClass('active');
		});
	}
}


var snb = {
	init : function(){
		if($('#snb').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('#snb');
		var btn = a.find('.ov');

		btn.on('click','> span',function(){
			if(mChk()==true){
				$(this).closest('li').toggleClass('active').siblings().removeClass('active');
			}
		});

		btn.on({
			'mouseenter' : function(){
				if(mChk()==false){
					$(this).closest('li').addClass('active');
				}
			},
			'mouseleave' : function(){
				if(mChk()==false){
					$(this).closest('li').removeClass('active');
				}
			}
		});
	}
}


var tab = {
	init : function(){
		if($('._tab').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('._tab');
		var box = $('._tabbox');

		a.on('click','a, button',function(){
			if($(this).parent('li').length == 0){
				var i = $(this).index();
				$(this).addClass('active').siblings().removeClass('active');
			}else{
				var i = $(this).closest('li').index();
				$(this).addClass('active');
				$(this).closest('li').siblings().find('> *').removeClass('active');
			}
			box.eq(i).addClass('active').siblings().removeClass('active');
			return false;
		});

	}
}


var wide2 = {
	init : function(){
		if($('.__wide2').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('.__wide2').children('.inner');

		function aWid(){
			a.outerWidth(winW());
		}
		aWid();

		$OBJ.win.on('load resize',function(){
			aWid();
		});
	}
}

var link = {
	init : function(){
		this.action();
	},
	action : function(){
		var main = $('#main');

		function mH(){
			return main.offset().top;
		}

		$OBJ.win.on('scroll',function(){
			if(winSh() > mH() - 87){
				$OBJ.html.addClass('link-fix');
			}else{
				$OBJ.html.removeClass('link-fix');
			}
		});
	}
}

var navi = {
	init : function(){
		if($('#snb').length > 0){
			this.action();
		}
	},
	action : function(){
		var a = $('#snb');
		var naviLi = a.find('.ov').children('span');

		naviLi.on('click',function(){
			var par = $(this).closest('li');
			par.toggleClass('active').siblings().removeClass('active');
		});
	}
}


$(document).ready(function(){
	$('img[usemap]').rwdImageMaps();
	$('a[data-rel^=lightcase]').lightcase();

	AOS.init();
	$OBJ.win.on('load',function(){
		AOS.init({
			duration:1000,
			offset: 20
		});
	});

	head.init();
	foot.init();
	gotop.init();
	wide.init();
	wide2.init();
	fam.init();
	tab.init();
	navi.init();

	tab_action();

	$('._row').matchHeight();
});


function tab_action(){
	if($(".common_tab").length !== 0) {
		$(".tab_cont").hide();
		$(".tab_cont").eq(0).show();
		$(".common_tab .tab").each(function(i){
			$(this).click(function(){
				$(".common_tab .tab").removeClass("active");
				$(this).addClass("active");
				$(".tab_cont").hide();
				$(".tab_cont").eq(i).show();
			});
		});
	}
}