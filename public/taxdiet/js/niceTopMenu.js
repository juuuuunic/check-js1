
var GnbFunc = {
    /**
     * global navigation static menu bar
     */
    staticGnbMenu : function() {
        if ($('#gnb .menu_on').size() != 2) {
            return false;
        }
        $('#submenuBar').show();
        var $menuDepth1 = $('#gnb li#menuDepth1.menu_on');
        var $menuDepth2 = $('#gnb li#menuDepth2.menu_on');
        NdsCommFunc.imgOver($menuDepth1.find('img').first());   // 1depth imgae
        NdsCommFunc.imgOver($menuDepth2.find('img').first());   // 2depth imgae
        $menuDepth2.closest('ul').show();
    }
};

/**
 * global navigation menu bar - subMapBox Height array
 */
var $depthHeightArray = new Array();
$('.subMapBox').each( function () {
    $(this).closest('ul').show();
    $depthHeightArray[$(this).attr('id')] = $(this).height();
    $(this).closest('ul').hide();
});
/**
 * global navigation menu bar - 1depth mouse hover event : 2depth show/hide
 */
$('#gnb > ul > li').each(function() {
    /* remove end bar */
    $(this).find('li:last').addClass('endMenu').end().find('dd').each(function() {
        $(this).find('span:last').removeClass('sm');
    });
}).hover( function () {
    /* sliding effect add */
    $('#submenuBar').show();
    $('#gnb li#menuDepth2.menu_on').closest('ul').hide();
    $(this).find('ul').show();
    NdsCommFunc.imgOver($(this).find('img').first());
}, function () {
    $('#submenuBar').hide();
    $(this).find('ul').hide();
    NdsCommFunc.imgOut($(this).find('img').first());
    $('#subMapBox_bg').hide();
    GnbFunc.staticGnbMenu();
});
/**
 * global navigation menu bar - 2depth mouse hover event : 3depth show/hide
 */
$('#gnb > ul > li li').hover(function() {
    var depth3Height = 0;
    if (!isNaN(Number($depthHeightArray[$(this).find('.subMapBox').attr('id')]))) {
        depth3Height = $depthHeightArray[$(this).find('.subMapBox').attr('id')] + 50;
    }
    $('#subMapBox_bg').height(depth3Height).show();
    $(this).find('div').show();
    //$(this).find('div').height(0).show().animate({'height': depth3Height}, 200);
    NdsCommFunc.imgOver($(this).find('img').first());
}, function () {
    $(this).find('div').hide();
    //$(this).find('div').stop().hide();
    NdsCommFunc.imgOut($(this).find('img').first());
});
GnbFunc.staticGnbMenu();
/**
 * global navigation menu bar - hyper link add ProgressDialog open Event
 */
$('#gnb a:not(#specialMenuPop)').bind('click.progress', function() {
	// 상품몰 - 인쇄서비스는 메뉴에서 바로 SSO로 새창 이동해야하므로 msgDialog가 나타나지 않게 처리한다.
	if ($(this).attr("href") != "/cm/printSsoProc.do") {
	    $.msgDialog.progress();
	} 
});

// Main Page Move
$('#mainPage').click(function(){
    $.msgDialog.progress();
    location.href = $(this).attr('href');
    return false;
});

// LogOut
$('#logout').click(function() {
    if (!confirm('로그아웃 하시겠습니까?')) {
        return false;
    }
    $.msgDialog.progress();
    location.href = $(this).attr('href');
    return false;
});
