$(document).ready(function(){
    family_select();
  });
  
  //family select
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