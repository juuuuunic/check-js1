$(document).ready(function(){
    /**
     * image swapping effect add
     */
    $('.swap_img').hover(function() {
        var src = $(this).attr('src');
        var ext = src.lastIndexOf('.') > 0 ? src.substring(src.lastIndexOf('.')) : '';
        $(this).attr('src', $(this).attr('src').replace(ext, '_on' + ext));
    }, function() {
        var src = $(this).attr('src');
        var ext = src.lastIndexOf('.') > 0 ? src.substring(src.lastIndexOf('.')) : '';
        $(this).attr('src', $(this).attr('src').replace('_on' + ext, ext));
    });
});