$(document).ready(function(){
  company_logo_slider();
  map_slider();
  HeightAuto();
  aNumber_set();
  login_tab();
  chart_tab();
  date_popup();
  lp_common();
  family_select();
  si_process_tab_ui();
  to_do_list();
  lp_toggle();
  $(".table-tooltip").tooltipOnOverflow();
});

// Height Auto
  function HeightAuto(){
    if ($(".HeightAuto").length !== 0) {
      $('.HeightAuto').css('height' ,  $(window).height() );
      $(window).resize(function() {
        $('.HeightAuto').css('height' ,  $(window).height() );
      });
    }
  }

// login tab
function login_tab(){
  if ($(".login_tab_cont").length !== 0) {
    $(".login_tab_cont").hide();
    $(".login_tab_cont").eq(0).show();
    $(".login_tab li").each(function(i){
      $(this).click(function(){
        $(".login_tab li").removeClass("active");
        $(this).addClass("active");
        $(".login_tab_cont").hide();
        $(".login_tab_cont").eq(i).show();
      });
    });
  }
}

// chart tab
function chart_tab(){
  if ($(".chart_tab_cont").length !== 0) {
    $(".chart_tab_cont").hide();
    $(".chart_tab_cont").eq(0).show();
    $(".chart_tab li").each(function(i){
      $(this).click(function(){
        $(".chart_tab li").removeClass("active");
        $(this).addClass("active");
        $(".chart_tab_cont").hide();
        $(".chart_tab_cont").eq(i).show();
      });
    });
  }
}

// date_popup
function date_popup(){
  if ($(".date_inner").length !== 0) {
    $('.date_inner > .date').click(function(){
      $('.date_popup').toggle();
    });
    $('.date_close_btn').click(function(){
      $('.date_popup').hide();
    });
  }
}

// company logo slider
function company_logo_slider(){
  if ($(".company_slider").length !== 0) {
    $('.company_slider').bxSlider({
      auto: true,
      autoControls: false,
      pager: false,
      slideWidth: 200,
      minSlides: 8,
      maxSlides: 8
    });
  }
}

// map slider
function map_slider(){
  if ($(".map_wrap").length !== 0) {
    $('.map_wrap').tabslet({
      mouseevent: 'hover',
      autorotate: true,
      delay: 3000
    });
  }
}


function aNumber_set(){
  if ($(".aNumber1").length !== 0) {
    var csn_step = $.animateNumber.numberStepFactories.separator(',')
    $('.aNumber1').animateNumber(
      {
        number: 948154467,
        numberStep: csn_step
      },
      800
    );
    $('.aNumber2').animateNumber(
      {
        number: 4511548,
        easing: 'easeInQuad',
        numberStep: csn_step
      },
      800
    );
  }
}


// layerpopup
function lp_common(){
  if ($(".cct_btn_wrap").length !== 0) {
    $(".cct_btn_wrap").fancybox({
      toolbar  : false,
      smallBtn : true,
      clickSlide : false,
      clickOutside : false,
      iframe : {
        css : {
          width : '790px'
        }
      }
    });
  }
  if ($(".user_menu").length !== 0) {
    $(".user_menu").fancybox({
      toolbar  : false,
      smallBtn : true,
      clickSlide : false,
      clickOutside : false,
      iframe : {
        css : {
          width : '410px'
        }
      }
    });
  }
  if ($(".rt_monitoring").length !== 0) {
    $(".rt_monitoring").fancybox({
      toolbar  : false,
      smallBtn : true,
      clickSlide : false,
      clickOutside : false,
      iframe : {
        css : {
          width : '600px'
        }
      }
    });
  }
  if ($(".parent_frm").length !== 0) {
    $(".parent_frm").fancybox({
      toolbar  : false,
      smallBtn : true,
      clickSlide : false,
      clickOutside : false,
      iframe : {
        css : {
          width : '600px'
        }
      }
    });
  }
  if ($(".zero_lp").length !== 0) {
    $(".zero_lp").fancybox({
      toolbar  : false,
      smallBtn : true,
      clickSlide : false,
      clickOutside : false,
      iframe : {
        css : {
          width : '650px'
        }
      }
    });
  }
}

// process tab
function si_process_tab_ui(){
  if ($(".si-process-contents").length !== 0) {
    $(".si-process-contents").hide();
    $(".si-process-contents").eq(0).show();
    $(".si-process-tab li").each(function(i){
      $(this).click(function(){
        $(".si-process-tab li").removeClass("active");
        $(this).addClass("active");
        $(".si-process-contents").hide();
        $(".si-process-contents").eq(i).show();
      });
    });
  }
}

// family select
function family_select(){
  if ($(".family_site_wrap").length !== 0) {
    $( ".fss_btn" ).click(function() {
      if ($('.fss_btn').hasClass('active')){
          $(this).removeClass('active');
          $(this).next().toggle();
        }
        else {
          $(this).addClass('active');
          $(this).next().toggle();
        }
    });
  }
}

// TO DO LIST
function to_do_list(){
  if ($(".to-do-list").length !== 0) {
    $('.todo_top_close').click(function(){
      $('.quick-top').hide();
    });
    $('.todo_bottom_close').click(function(){
      $('.quick-bottom').hide();
    });

    var showStaticMenuBar = false;
    $(window).scroll(function () {
      if (showStaticMenuBar == false) {
        if ($(window).scrollTop() >= 120) {
          $('.to-do-list').addClass('fixed');
          showStaticMenuBar = true;
        }
      }
      else {
        if ($(window).scrollTop() < 120) {
          $('.to-do-list').removeClass('fixed');
          showStaticMenuBar = false;
        }
      }
    });
  }
}

$.fn.tooltipOnOverflow = function(options) {
  $(this).on("mouseenter", function() {
    if (this.offsetWidth < this.scrollWidth) {
      options = options || { placement: "auto"}
      options.title = $(this).text();
      $(this).tooltip(options);
      $(this).tooltip("show");
    } else {
      if ($(this).data("bs.tooltip")) {
        $tooltip.tooltip("show");
        $tooltip.removeData("bs.tooltip");
      }
    }
  });
};

$('.mightOverflow').tooltipOnOverflow();


function lp_toggle(){
  if ($(".verify-con-block .title").length !== 0) {
    $('.verify-con-block .title span').click(function(){
      $(this).closest('.title').toggleClass('active');
      $(this).closest('.title').next().slideToggle();
    });
  }
}

