jQuery(function(a) {
    a.datepicker.regional.ko = {
        closeText : '\ub2eb\uae30',
        prevText : '\uc774\uc804\ub2ec',
        nextText : '\ub2e4\uc74c\ub2ec',
        currentText : '\uc624\ub298',
        monthNames : ['1\uc6d4(JAN)','2\uc6d4(FEB)','3\uc6d4(MAR)','4\uc6d4(APR)','5\uc6d4(MAY)','6\uc6d4(JUN)','7\uc6d4(JUL)','8\uc6d4(AUG)','9\uc6d4(SEP)','10\uc6d4(OCT)','11\uc6d4(NOV)','12\uc6d4(DEC)'],
        monthNamesShort : ['1\uc6d4','2\uc6d4','3\uc6d4','4\uc6d4','5\uc6d4','6\uc6d4','7\uc6d4','8\uc6d4','9\uc6d4','10\uc6d4','11\uc6d4','12\uc6d4'],
        dayNames : ['\uc77c\uc694\uc77c','\uc6d4\uc694\uc77c','\ud654\uc694\uc77c','\uc218\uc694\uc77c','\ubaa9\uc694\uc77c','\uae08\uc694\uc77c','\ud1a0\uc694\uc77c'],
        dayNamesShort : ['\uc77c','\uc6d4','\ud654','\uc218','\ubaa9','\uae08','\ud1a0'],
        dayNamesMin : ['\uc77c','\uc6d4','\ud654','\uc218','\ubaa9','\uae08','\ud1a0'],
        dateFormat : 'yy-mm-dd',
        firstDay : 0,
        isRTL : false
    };
    a.datepicker.setDefaults(a.datepicker.regional.ko);

    a.datepicker.nicedata = {
        showOn : 'button',
        buttonImage : '../images/tax/icon_cal.gif',
        buttonImageOnly : true,
        buttonText : '\ub2ec\ub825',
        changeYear : true,
        changeMonth : true,
        showOtherMonths : true,
        showMonthAfterYear : true
    };
    a.datepicker.setDefaults(a.datepicker.nicedata);
});