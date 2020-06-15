/**
 * smartPop
 *
 * Copyright (c) 2011 Cho Yong Gu (@inidu2)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * 레이어로 팝업 띄우기 - html or url
 *
 * 특징
 * 1. 브라우저 호환
 * 2. 깔끔한 스크롤바 처리
 * 3. 브라우저 크기 변경시 레이어 팝업 자동 중앙 정렬
 * 4. url 페이지를 띄울 경우 프레임 크기 자동 조절
 * 
 * 목적
 * 내용에 상관없이 깔끔한 스크롤바 처리하기
 * 브라우저 크기에 상관없이 중앙에 띄우기
 * 
 * 제한사항
 * 가로 최대 1300, 세로 5000 - 더 크게할 경우 css 수정
 * 
 * 사용법
 * 1. html 내용 보여주기
 *      $.smartPop.open({title: '스마트팝', width: 500, height: 500, html: '<h1>smartPop</h1> 여기에 보여줄 내용' });
 * 2. url 페이지 띄우기
 *      $.smartPop.open({title: '스마트팝', width: 500, height: 500, url: 'smartPop.html 여기에 보여줄 페이지' });
 *      세로 크기는 불러오는 페이지 크기에 맞게 자동으로 저절됨
 * 3. 높이값 확인 로그
 *      $.smartPop.open({title: '스마트팝', width: 500, height: 500, log: true, url: 'smartPop.html 여기에 보여줄 페이지' });
 *      log: true 설정
 *
 * 기본 옵션
 * $.smartPop.defaults = {
    position    : 'center',
    left        : 310,
    top         : 10,
    bodyClose   : true,
    padding     : 10,
    background  : '#fff',
    border      : 5,
    borderColor : '#39a3e5',
    closeMargin : 5,
    opacity     : .7,
    width       : 720,
    height      : 500,
    html        : '',
    url         : '',
    log         : false
 * };
 * 
 * 
 * 
 * @name $.smartPop
 * @author Pharos @inidu2
 */
    
;(function($) {
    var ie     = $.browser.msie && ($.browser.version < 9);
    var innerH  = window.innerHeight;
    
    $.smartPop = {
        isInstall : false,
        opts : {},
        open : function(options) {
            this.opts = $.extend({}, $.smartPop.defaults, options);
            this.install();
            this.resize();

            $('html').css({ marginRight: '15px', display: 'block', overflow: 'hidden', overflowY: 'hidden' });
            $('#smartPop').show();
            if(this.opts.log) $('#smartPop_log').show();
        },
        resize : function() {
            this.log(this.opts.width + ' x ' + this.opts.height);
            this.log('background : ' + this.opts.background);
            this.log('padding : ' + this.opts.padding);
            this.log('border : ' + this.opts.border);
            this.log('borderColor : ' + this.opts.borderColor);
            this.log('closeMargin : ' + this.opts.closeMargin);
            this.log('opacity : ' + this.opts.opacity);
            this.log('');

            // 기본 설정
            $('#smartPop_container').css({ border: 'solid ' + this.opts.border + 'px ' + this.opts.borderColor });
            $('#smartPop_close').css({ top: this.opts.closeMargin + 'px', right: this.opts.closeMargin + 'px' });
            $('#smartPop_content').css({ padding: this.opts.padding + 'px' });
            $('#smartPop_container').width(this.opts.width);
            $('#smartPop_close_wrap').width(this.opts.width);
            this.resizeHeight(this.opts.height);
        },
        resizeHeight : function(h) {
            this.log('resizeHeight : ' + h);
            if(ie) {
                $('body').attr({ scroll: 'no' }); // ie7에서 overflow 적용안됨 
                innerH = document.documentElement.clientHeight;
            }

            // 위치설정
            if(this.opts.position == 'center') {
                var t;
                t = (h < innerH) ? (innerH - h) / 2 : 10;
                $('#smartPop_container').css({ marginLeft: 'auto', marginTop: t + 'px' });
            } else {
                $('#smartPop_container').css({ marginLeft: this.opts.left + 'px', marginTop: this.opts.top + 'px' });
            }

            // 높이설정
            $('#smartPop_container').height(h);
            if(this.opts.url == '') {
                $('#smartPop_content').html(this.opts.html).height(h).show();
                $('#smartPop_frame').hide();
            } else {
                $('#smartPop_content').hide();
                $('#smartPop_frame').css({ padding: this.opts.padding + 'px', width: (this.opts.width - this.opts.padding * 2) + 'px', height: (h - this.opts.padding * 2) + 'px' }).show();
            }
            $('#smartPop_loading').hide();
            this.log('');
        },
        install : function() {
            if(this.isInstall == false) {
                var body                    = $('body');
                var smartPop_overlay        = $('<div />').attr('id', 'smartPop_overlay').css({ opacity: this.opts.opacity, background: this.opts.background });
                var smartPop                = $('<div />').attr('id', 'smartPop');
                var smartPop_container      = $('<div />').attr('id', 'smartPop_container');
                var smartPop_close_wrap     = $('<div />').attr('id', 'smartPop_close_wrap');
                var smartPop_close          = $('<div />').attr('id', 'smartPop_close');
                var smartPop_loading        = $('<div />').attr('id', 'smartPop_loading');
                var smartPop_content        = $('<div />').attr('id', 'smartPop_content');
                var smartPop_frame          = $('<iframe />').attr({ id: 'smartPop_frame', frameBorder: 0, scrolling: 'no' });

                smartPop_close_wrap.append(smartPop_close).appendTo(smartPop_container);
                smartPop_container.append(smartPop_loading).append(smartPop_content).append(smartPop_frame).appendTo(smartPop);
                smartPop.append($('<div />').attr('id', 'smartPop_log'));
                body.append(smartPop_overlay).append(smartPop);
                this.isInstall = true;
            } else {
                $('#smartPop').show();
                $('#smartPop_overlay').show();
            }

            // 닫기 버튼 설정
            if(this.opts.closeImg != undefined) {
                $('#smartPop_close').css({ width:this.opts.closeImg.width + 'px', height:this.opts.closeImg.height + 'px', backgroundImage:'url(' + this.opts.closeImg.src + ')'});
            }
            
            //호출URL의 height를 자동조절
            if(this.opts.url != '') {
                $('#smartPop_frame').attr({ src : this.opts.url }).load(function () {
                	try {
                		var h = $(this).contents().height();
                		$.smartPop.resizeHeight(h);
                    } catch(e) { }
                });
            }

            if(this.opts.bodyClose) {
                $('body').bind('click', function(event) {
                    if (!event) event = window.event;
                    var target = (event.target) ? event.target : event.srcElement;
                    event.stopPropagation(); // 이벤트 버블링 전파를 막음
                    if(target.id == 'smartPop') { $.smartPop.close(); }	//레이어 외부 영역 클릭시 창 닫기
                });
            }
            

            $('#smartPop_close').click(function() {
                $.smartPop.close();
            });
        },
        close : function() {
            if(ie) {
                $('body').attr({ scroll: 'yes' });
            }
            $('html').css({ marginRight: 0, display: '', overflowY: 'scroll'});

            $('#smartPop_frame').attr('src', '').unbind();
            $('#smartPop').hide();
            $('#smartPop_overlay').hide();
        },
        log : function(msg) {
            var log = $('#smartPop_log').html();
            $('#smartPop_log').html(msg + '<br />' + log);
        }
    };
    
    $.smartPop.defaults = {
        position    : 'center',
        left        : 10,
        top         : 10,
        bodyClose   : true,
        padding     : 10,
        background  : '#62b0ff',
        border      : 3,
        borderColor : '#000000',
        closeMargin : 3,
        closeImg    : {width:25, height:25, src:'./images/pop/btn_popclose.gif'},
        opacity     : .7,
        width       : '',
        height      : '',
        html        : '',
        url         : '',
        log         : false
    };

    $.smartPop1 = {
        isInstall : false,
        opts : {},
        open : function(options) {
            this.opts = $.extend({}, $.smartPop1.defaults, options);
            this.install();
            this.resize();

            $('html').css({ marginRight: '15px', display: 'block', overflow: 'hidden', overflowY: 'hidden' });
            $('#smartPop1').show();
            if(this.opts.log) $('#smartPop1_log').show();
        },
        resize : function() {
            this.log(this.opts.width + ' x ' + this.opts.height);
            this.log('background : ' + this.opts.background);
            this.log('padding : ' + this.opts.padding);
            this.log('border : ' + this.opts.border);
            this.log('borderColor : ' + this.opts.borderColor);
            this.log('closeMargin : ' + this.opts.closeMargin);
            this.log('opacity : ' + this.opts.opacity);
            this.log('');

            // 기본 설정
            $('#smartPop1_container').css({ border: 'solid ' + this.opts.border + 'px ' + this.opts.borderColor });
            $('#smartPop1_close').css({ top: this.opts.closeMargin + 'px', right: this.opts.closeMargin + 'px' });
            $('#smartPop1_content').css({ padding: this.opts.padding + 'px' });
            $('#smartPop1_container').width(this.opts.width);
            $('#smartPop1_close_wrap').width(this.opts.width);
            this.resizeHeight(this.opts.height);
        },
        resizeHeight : function(h) {
            this.log('resizeHeight : ' + h);
            if(ie) {
                $('body').attr({ scroll: 'no' }); // ie7에서 overflow 적용안됨 
                innerH = document.documentElement.clientHeight;
            }

            // 위치설정
            if(this.opts.position == 'center') {
                var t;
                t = (h < innerH) ? (innerH - h) / 2 : 10;
                $('#smartPop1_container').css({ marginLeft: 'auto', marginTop: t + 'px' });
            } else {
                $('#smartPop1_container').css({ marginLeft: this.opts.left + 'px', marginTop: this.opts.top + 'px' });
            }

            // 높이설정
            $('#smartPop1_container').height(h);
            if(this.opts.url == '') {
                $('#smartPop1_content').html(this.opts.html).height(h).show();
                $('#smartPop1_frame').hide();
            } else {
                $('#smartPop1_content').hide();
                $('#smartPop1_frame').css({ padding: this.opts.padding + 'px', width: (this.opts.width - this.opts.padding * 2) + 'px', height: (h - this.opts.padding * 2) + 'px' }).show();
            }
            $('#smartPop1_loading').hide();
            this.log('');
        },
        install : function() {
            if(this.isInstall == false) {
                var body                    = $('body');
                var smartPop1_overlay        = $('<div />').attr('id', 'smartPop1_overlay').css({ opacity: this.opts.opacity, background: this.opts.background });
                var smartPop1                = $('<div />').attr('id', 'smartPop1');
                var smartPop1_container      = $('<div />').attr('id', 'smartPop1_container');
                var smartPop1_close_wrap     = $('<div />').attr('id', 'smartPop1_close_wrap');
                var smartPop1_close          = $('<div />').attr('id', 'smartPop1_close');
                var smartPop1_loading        = $('<div />').attr('id', 'smartPop1_loading');
                var smartPop1_content        = $('<div />').attr('id', 'smartPop1_content');
                var smartPop1_frame          = $('<iframe />').attr({ id: 'smartPop1_frame', frameBorder: 0, scrolling: 'no' });

                smartPop1_close_wrap.append(smartPop1_close).appendTo(smartPop1_container);
                smartPop1_container.append(smartPop1_loading).append(smartPop1_content).append(smartPop1_frame).appendTo(smartPop1);
                smartPop1.append($('<div />').attr('id', 'smartPop1_log'));
                body.append(smartPop1_overlay).append(smartPop1);
                this.isInstall = true;
            } else {
                $('#smartPop1').show();
                $('#smartPop1_overlay').show();
            }

            // 닫기 버튼 설정
            if(this.opts.closeImg != undefined) {
                $('#smartPop1_close').css({ width:this.opts.closeImg.width + 'px', height:this.opts.closeImg.height + 'px', backgroundImage:'url(' + this.opts.closeImg.src + ')'});
            }
            
            //호출URL의 height를 자동조절
            if(this.opts.url != '') {
                $('#smartPop1_frame').attr({ src : this.opts.url }).load(function () {
                    var h = $(this).contents().height();
                    $.smartPop1.resizeHeight(h);
                });
            }

            if(this.opts.bodyClose) {
                $('body').bind('click', function(event) {
                    if (!event) event = window.event;
                    var target = (event.target) ? event.target : event.srcElement;
                    event.stopPropagation(); // 이벤트 버블링 전파를 막음
                    if(target.id == 'smartPop1') { $.smartPop1.close(); }	//레이어 외부 영역 클릭시 창 닫기
                });
            }
            

            $('#smartPop1_close').click(function() {
                $.smartPop1.close();
            });
        },
        close : function() {
/*        
            if(ie) {
                $('body').attr({ scroll: 'yes' });
            }
            $('html').css({ marginRight: 0, display: '', overflowY: 'scroll'});
*/
            $('#smartPop1_frame').attr('src', '').unbind();
            $('#smartPop1').hide();
            $('#smartPop1_overlay').hide();
        },
        log : function(msg) {
            var log = $('#smartPop1_log').html();
            $('#smartPop1_log').html(msg + '<br />' + log);
        }
    };
    
    $.smartPop1.defaults = {
        position    : 'center',
        left        : 10,
        top         : 10,
        bodyClose   : true,
        padding     : 10,
        background  : '#62b0ff',
        border      : 3,
        borderColor : '#000000',
        closeMargin : 3,
        closeImg    : {width:25, height:25, src:'./images/pop/btn_popclose.gif'}, // {}
        opacity     : .7,
        width       : '',
        height      : '',
        html        : '',
        url         : '',
        log         : false
    };

    $.smartPop2 = {
        isInstall : false,
        opts : {},
        open : function(options) {
            this.opts = $.extend({}, $.smartPop2.defaults, options);
            this.install();
            this.resize();

            $('html').css({ marginRight: '15px', display: 'block', overflow: 'hidden', overflowY: 'hidden' });
            $('#smartPop2').show();
            if(this.opts.log) $('#smartPop2_log').show();
        },
        resize : function() {
            this.log(this.opts.width + ' x ' + this.opts.height);
            this.log('background : ' + this.opts.background);
            this.log('padding : ' + this.opts.padding);
            this.log('border : ' + this.opts.border);
            this.log('borderColor : ' + this.opts.borderColor);
            this.log('closeMargin : ' + this.opts.closeMargin);
            this.log('opacity : ' + this.opts.opacity);
            this.log('');

            // 기본 설정
            $('#smartPop2_container').css({ border: 'solid ' + this.opts.border + 'px ' + this.opts.borderColor });
            $('#smartPop2_close').css({ top: this.opts.closeMargin + 'px', right: this.opts.closeMargin + 'px' });
            $('#smartPop2_content').css({ padding: this.opts.padding + 'px' });
            $('#smartPop2_container').width(this.opts.width);
            $('#smartPop2_close_wrap').width(this.opts.width);
            this.resizeHeight(this.opts.height);
        },
        resizeHeight : function(h) {
            this.log('resizeHeight : ' + h);
            if(ie) {
                $('body').attr({ scroll: 'no' }); // ie7에서 overflow 적용안됨 
                innerH = document.documentElement.clientHeight;
            }

            // 위치설정
            if(this.opts.position == 'center') {
                var t;
                t = (h < innerH) ? (innerH - h) / 2 : 10;
                $('#smartPop2_container').css({ marginLeft: 'auto', marginTop: t + 'px' });
            } else {
                $('#smartPop2_container').css({ marginLeft: this.opts.left + 'px', marginTop: this.opts.top + 'px' });
            }

            // 높이설정
            $('#smartPop2_container').height(h);
            if(this.opts.url == '') {
                $('#smartPop2_content').html(this.opts.html).height(h).show();
                $('#smartPop2_frame').hide();
            } else {
                $('#smartPop2_content').hide();
                $('#smartPop2_frame').css({ padding: this.opts.padding + 'px', width: (this.opts.width - this.opts.padding * 2) + 'px', height: (h - this.opts.padding * 2) + 'px' }).show();
            }
            $('#smartPop2_loading').hide();
            this.log('');
        },
        install : function() {
            if(this.isInstall == false) {
                var body                    = $('body');
                var smartPop2_overlay        = $('<div />').attr('id', 'smartPop2_overlay').css({ opacity: this.opts.opacity, background: this.opts.background });
                var smartPop2                = $('<div />').attr('id', 'smartPop2');
                var smartPop2_container      = $('<div />').attr('id', 'smartPop2_container');
                var smartPop2_close_wrap     = $('<div />').attr('id', 'smartPop2_close_wrap');
                var smartPop2_close          = $('<div />').attr('id', 'smartPop2_close');
                var smartPop2_loading        = $('<div />').attr('id', 'smartPop2_loading');
                var smartPop2_content        = $('<div />').attr('id', 'smartPop2_content');
                var smartPop2_frame          = $('<iframe />').attr({ id: 'smartPop2_frame', frameBorder: 0, scrolling: 'no' });

                smartPop2_close_wrap.append(smartPop2_close).appendTo(smartPop2_container);
                smartPop2_container.append(smartPop2_loading).append(smartPop2_content).append(smartPop2_frame).appendTo(smartPop2);
                smartPop2.append($('<div />').attr('id', 'smartPop2_log'));
                body.append(smartPop2_overlay).append(smartPop2);
                this.isInstall = true;
            } else {
                $('#smartPop2').show();
                $('#smartPop2_overlay').show();
            }

            // 닫기 버튼 설정
            if(this.opts.closeImg != undefined) {
                $('#smartPop2_close').css({ width:this.opts.closeImg.width + 'px', height:this.opts.closeImg.height + 'px', backgroundImage:'url(' + this.opts.closeImg.src + ')'});
            }
            
            //호출URL의 height를 자동조절
            if(this.opts.url != '') {
                $('#smartPop2_frame').attr({ src : this.opts.url }).load(function () {
                    var h = $(this).contents().height();
                    $.smartPop2.resizeHeight(h);
                });
            }

            if(this.opts.bodyClose) {
                $('body').bind('click', function(event) {
                    if (!event) event = window.event;
                    var target = (event.target) ? event.target : event.srcElement;
                    event.stopPropagation(); // 이벤트 버블링 전파를 막음
                    if(target.id == 'smartPop2') { $.smartPop2.close(); }	//레이어 외부 영역 클릭시 창 닫기
                });
            }
            

            $('#smartPop2_close').click(function() {
                $.smartPop2.close();
            });
        },
        close : function() {
/*        
            if(ie) {
                $('body').attr({ scroll: 'yes' });
            }
            $('html').css({ marginRight: 0, display: '', overflowY: 'scroll'});
*/
            $('#smartPop2_frame').attr('src', '').unbind();
            $('#smartPop2').hide();
            $('#smartPop2_overlay').hide(); 
        },
        log : function(msg) {
            var log = $('#smartPop2_log').html();
            $('#smartPop2_log').html(msg + '<br />' + log);
        }
    };
    
    $.smartPop2.defaults = {
        position    : 'center',
        left        : 10,
        top         : 10,
        bodyClose   : true,
        padding     : 10,
        background  : '#62b0ff',
        border      : 3,
        borderColor : '#000000',
        closeMargin : 3,
        closeImg    : {width:25, height:25, src:'./images/pop/btn_popclose.gif'},
        opacity     : .7,
        width       : '',
        height      : '',
        html        : '',
        url         : '',
        log         : false
    };
})(jQuery);