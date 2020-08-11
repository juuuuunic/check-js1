function ta_dataPicker() {
	
	(
		function(factory){
			if(typeof define==="function"&&define.amd){
				define(["../widgets/datepicker"],factory)
			}else{
				factory(jQuery.datepicker)}
			}
			(
				function(datepicker){
					datepicker.regional.ko={
						closeText:"닫기",
						prevText:"이전달",
						nextText:"다음달",
						currentText:"오늘",
						monthNames:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
						monthNamesShort:["1월","2월","3월","4월","5월","6월","7월","8월","9월","10월","11월","12월"],
						dayNames:["일요일","월요일","화요일","수요일","목요일","금요일","토요일"],
						dayNamesShort:["일","월","화","수","목","금","토"],
						dayNamesMin:["일","월","화","수","목","금","토"],
						weekHeader:"주",
						dateFormat:"yy-mm-dd",
						firstDay:0,
						isRTL:false,
						showMonthAfterYear:true,
						yearSuffix:"년"
					};
				datepicker.setDefaults(datepicker.regional.ko);
				return datepicker.regional.ko
				}
			)
	);
	
    if ($("._datepick").length !== 0) {
        $('._datepick' ).datepicker({
            changeMonth: true,
            changeYear: true
        });
        $('._datepick').next('img').click(function(){
            $(this).prev().datepicker('show');
        });
    }
}

function ta_tooltip(target) {
    $(document).tooltip({
        items: target,
        tooltipClass: 'ta-tooltip',
        position: {
            my: 'left bottom+15',
            at: "left bottom+15",
            track: false,
            using: function(position, feedback) {
                $(this).css(position);
            }
        }
    });
}

// 달력
function dateInputM(n){//달력범위 월
    $('._datefrom').val('');
    $('._dateto').val('');

    var a = moment();
    var b = moment();

    $('._datefrom').val(a.add(-n, 'month').format('YYYY-MM-DD'));
    $('._dateto').val(b.format('YYYY-MM-DD'));
    $('.ta-date').datepicker("setDate", $('._datefrom').val());
    $('.ta-date2').datepicker("setDate", $('._dateto').val());

    if($('._datedummy').length > 0){
        $('._datedummy').daterangepicker('setRange', {start: moment().add(-n, 'month').toDate(), end: moment().toDate()});
    }
}


function dateInputD(n){//달력범위 일
    $('._datefrom').val('');
    $('._dateto').val('');

    var a = moment();
    var b = moment();

    $('._datefrom').val(a.add(-n, 'day').format('YYYY-MM-DD'));
    $('._dateto').val(b.format('YYYY-MM-DD'));
    $('.ta-date').datepicker("setDate", $('._datefrom').val());
    $('.ta-date2').datepicker("setDate", $('._dateto').val());

    if($('._datedummy').length > 0){
        $('._datedummy').daterangepicker('setRange', {start: moment().add(-n, 'day').toDate(), end: moment().toDate()});
    }
}


function dateInputD2(n){//달력범위 월2
    $('._datefrom').val('');
    $('._dateto').val('');

    var a = moment();
    var b = moment();

    $('._datefrom').val(a.add(-n, 'day').format('YYYY-MM-DD'));
    $('._dateto').val(b.format('YYYY-MM-DD'));
    $('.ta-date').datepicker("setDate", $('._datefrom').val());
    $('.ta-date2').datepicker("setDate", $('._dateto').val());
}

function lpChangeTab() {
    var btn = $('.lp-ta-change').find('input');
    var content = $('.lp-ta-change-content');
    content.hide();
    content.eq(0).show();

    btn.each(function(index, el) {
        $(this).on('change',function(event) {
            content.hide().eq(index).show();
        });       
    });
}

// 금액 자릿수 콤마
function getNumber(obj){
    var rgx1 = /\D/g;
     var num01;
     var num02;
     num01 = obj.value;
     num02 = num01.replace(rgx1,"");
     num01 = setComma(num02);
     obj.value =  num01;
}

function setComma(inNum){
     var rgx2 = /(\d+)(\d{3})/; 
     var outNum;
     outNum = inNum; 
     while (rgx2.test(outNum)) {
          outNum = outNum.replace(rgx2, '$1' + ',' + '$2');
      }
     return outNum;
}

function HalfDonutGraph() {
    $('.halfDonut-canvas').each(function (index, canvas) {
        var ctx = canvas.getContext('2d'),
            total = $(canvas).prev(),
            radius = $(canvas).width() / 2,
            min = $('.halfDonut-min'),
            max = $('.halfDonut-max'),
            thickness = 50,
            values = {
                min: Number($(canvas).attr('data-min')),
                max: Number($(canvas).attr('data-max')),
                baseline: Number($(canvas).attr('data-baseline')),
                actual: Number($(canvas).attr('data-actual')),
                target: Number($(canvas).attr('data-target'))
            },
            donut;
        
        ctx.translate(radius, radius); // make 0,0 center                  
        ctx.save();
        
        donut = HalfDonut(ctx, radius, thickness, values);
        ctx.restore();
        
        min.find('em').text(comma($(this).data('min')));
        max.find('em').text(comma($(this).data('max')));
    });
}

function comma(num){
   var len, point, str;

   num = num + "";
   point = num.length % 3 ;
   len = num.length;

   str = num.substring(0, point);
   while (point < len) {
      if (str != "") str += ",";
      str += num.substring(point, point + 3);
      point += 3;
   }

   return str;
}
function HalfDonut (ctx, radius, thickness, values) {

    var minLessThanMax = values.min < values.max,
        oldRange = { min: values.min,  max: values.max  },
        newRange = minLessThanMax ? { min: 1 * Math.PI, max: 2 * Math.PI } : { min: 2 * Math.PI, max: 1 * Math.PI },
        bar      = getBarDetails(values.baseline, values.actual),
        barStart = translateValue(bar.start, oldRange, newRange),
        barEnd   = translateValue(bar.end, oldRange, newRange),
        baseline = translateValue(values.baseline, oldRange, newRange),
        target   = translateValue(values.target, oldRange, newRange);
    
    drawSlice(newRange.min, barStart, '#b4b4b4');
    drawSlice(barStart, barEnd, bar.color);
    drawSlice(barEnd, newRange.max, '#b4b4b4');
    drawMarker(baseline, 2, 2, '#fff');
    drawMarker(target, 2, 1, '#fff');
    
    function drawSlice (startRadians, endRadians, color) {
        ctx.beginPath();
        ctx.arc(0, 0, radius - (thickness / 2), startRadians, endRadians, false);
        ctx.lineWidth = thickness;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    
    function drawMarker (radians, length, width, color) {
        ctx.beginPath();
        ctx.moveTo((radius - thickness - length) * Math.cos(radians), (radius - thickness - length) * Math.sin(radians));
        ctx.lineTo((radius + length) * Math.cos(radians), (radius + length) * Math.sin(radians));
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.stroke();
    }
    
    function translateValue (value, oldRange, newRange) {
        return newRange.min + (newRange.max - newRange.min) * (value - oldRange.min) / (oldRange.max - oldRange.min);
    }
    
    function getBarDetails (baseline, actual) {
        if (actual < baseline) {
            return { start: actual, end: baseline, color: minLessThanMax ? '#ca3c34' : '#ff6d00' };
        } else {
            return { start: baseline, end: actual, color: minLessThanMax ? '#ff6d00' : '#ca3c34' };
        }
    }
    
    return {
        getBarDetails: getBarDetails,
        translateValue: translateValue,
        drawSlice: drawSlice,
        drawMarker: drawMarker
    };
}

function TwoDateSelectLayer(StartDate,EndDate){
   
    var ifrTwoDate = $('#iframeTwoDate');
    var divTwoDate = $('#hiddenDivTwoDate');
    var pop_cal_wrap = $('#pop_cal_wrap');
   
    // 새로운 디폴트 날짜 적용을 위해 옵션 없애기
    $( ".ta-date" ).datepicker( "destroy" );
    $( ".ta-date2" ).datepicker( "destroy" );
   
    $('.ta-date').each(function(i,e){
       var $d = $(this);
       $d.datepicker({
           altField: "#StartDate", // div태그에 지정한 input에 값 설정
           dateFormat: 'yy-mm-dd', // 날짜 표시 형식
           changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시
           changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시
           monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
           defaultDate: StartDate, // 인자로 받아온 값으로 달력 로딩시 세팅
           showMonthAfterYear:true,
           showOtherMonths: true, // 다음달 날짜도 표시
           selectOtherMonths: true, // 다음달 날짜도 선택 가능
           beforeShowDay: nationalDays, // 토, 일 색 변경 이벤트
           beforeShow: nationalMonth,
            onSelect: function(date) {
                $('.ta-date2').datepicker('option', 'minDate', $('.ta-date').datepicker("getDate"));
            },
            beforeShowDay: function(date) {
                var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#StartDate").val());
                var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#EndDate").val());
                return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
            },
       });
    });
    $('.ta-date2').each(function(i,e){
       var $d = $(this);
       $d.datepicker({
           altField: "#EndDate", // div태그에 지정한 input에 값 설정
           dateFormat: 'yy-mm-dd', // 날짜 표시 형식
           changeMonth: true, // 월을 바꿀수 있는 셀렉트 박스를 표시
           changeYear: true, // 년을 바꿀 수 있는 셀렉트 박스를 표시
           monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
           defaultDate: EndDate,
           minDate: $('.ta-date').datepicker("getDate"),
           showMonthAfterYear:true,
           showOtherMonths: true, // 다음달 날짜도 표시
           selectOtherMonths: true, // 다음달 날짜도 선택 가능
           beforeShowDay: nationalDays, // 토, 일 색 변경 이벤트
           beforeShow: nationalMonth,
            beforeShowDay: function(date) {
                var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#StartDate").val());
                var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#EndDate").val());
                return [true, date1 && ((date.getTime() == date1.getTime()) || (date2 && date >= date1 && date <= date2)) ? "dp-highlight" : ""];
            },
       })
    });
    if (!divTwoDate.hasClass('hiddenDivTwoDate-active')) {
        divTwoDate.addClass('hiddenDivTwoDate-active');
        divTwoDate.show();
    } else {
        divTwoDate.removeClass('hiddenDivTwoDate-active');
        divTwoDate.hide();
    }
}
 
// 토요일 , 일요일 색상 지정 이벤트
function nationalMonth() {
    clearTimeout(nationalMonth.timer);
    if ($('#ui-datepicker-div .ui-datepicker-calendar').is(':visible')) {
        $('.ui-datepicker-week-end:last-child').addClass('saturday');
    } else {
        nationalMonth.timer = setTimeout(nationalMonth, 100);
    }
}
function nationalDays(date) {
    if(date.getDay() == 6){
        return [true, 'saturday'];
    } else {
        return [true];
    }
 
}
// 날짜 선택 팝업 확인 버튼 클릭 이벤트
function TwoDateSelect(){
   
    var ifrTwoDate = $('#iframeTwoDate');
    var divTwoDate = $('#hiddenDivTwoDate');
    var pop_cal_wrap = $('#pop_cal_wrap');
   
    divTwoDate.hide();
    divTwoDate.removeClass('hiddenDivTwoDate-active');
 
}

//달력 종류 선택
function calendarSelect() {
    var type = $('[name=ta-search-period]');
    var block = $('.ta-search-calendar');
    block.hide();
    block.eq(0).show();

    type.each(function(index, el) {
        $(this).on('click', function(event) {
            block.hide().eq(index).show();
            if (!$(this).hasClass('ta-period-day')) {
                $('#hiddenDivTwoDate').hide();
            }
        });
    });
}

// FAQ
function taFaq() {
    var btn = $('.ta-faq').find('dt');
    var content = $('.ta-faq').find('dd');

    btn.each(function(index, el) {
        $(this).on('click', function(event) {
            event.preventDefault();
            if (!$(this).parent('dl').hasClass('is-open')) {
                $(this).parent('dl').addClass('is-open');
                $(this).siblings('dd').slideDown(300,'easeInOutSine');
            } else {
                $(this).parent('dl').removeClass('is-open');
                $(this).siblings('dd').slideUp(300,'easeInOutSine');
            }
        });
    });
}

// 부가가치세 신고 왜 필요하죠?
function f_call_30211_pop2(returnUtl) {
	fancybox_open_width("/vt/VT_30211_POP2.do", '700px', returnUtl, 'yes', true, "auto");
}

// 종합소득세 신고 왜 필요하죠?
function f_call_30211_pop1(returnUtl) {
	fancybox_open_width("/sd/SD_30211_POP1.do", '700px', returnUtl, 'yes');
}

// 종이세금계산서/종이계산서등록
function f_call_bill_reg(pUrl, returnUtl) {
	fancybox_open_width(pUrl, "480px", returnUtl, "yes");
}

$(document).ready(function($) {
    lpChangeTab();
    ta_dataPicker();
    HalfDonutGraph();
    taFaq();
    calendarSelect()
    $("#date_select, ._datepick-dual").click(function(){
        var StartDate = $("#StartDate").val();
        var EndDate = $("#EndDate").val();
        TwoDateSelectLayer(StartDate,EndDate);
    });
    $("#dateOK").click(function(event){ 
        TwoDateSelect();
        event.preventDefault();
    });
    $("#dateCancel").click(function(){ 
        TwoDateSelect();
        event.preventDefault();
    });
    $('[name=lp-ta-group1]').on('change', function(event) {
        if ($(this).hasClass('lp-ta-diselect')) {
            $('.lp-ta-surtax').addClass('input-disabled').attr('disabled', 'true');
        } else {
            $('.lp-ta-surtax').removeClass('input-disabled').removeAttr('disabled');
        }
    });
    $('[name=lp-ta-total-group1]').on('change', function(event) {
        if ($(this).hasClass('lp-ta-diselect')) {
            $('.lp-ta-total-sh').show();
        } else {
            $('.lp-ta-total-sh').hide();
        }
    });
    $('.ta-credit-select').on('change', function(event) {
        if ($(this).find('option:selected').val() !== 'ta-deduction') {
            $('.ta-credit-input').show().val('');
        }else {
            $('.ta-credit-input').hide().val('');
        }
    });
    // 데이터 테이블
    if ($('#ta-datatable').length !== 0) {
        $('#ta-datatable').DataTable({
            info: false,
            "ordering": false,
            "searching": false,
            "lengthChange": false
        });
    }

});