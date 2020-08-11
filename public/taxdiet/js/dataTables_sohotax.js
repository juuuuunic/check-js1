(function($) {
	var dataTables = {};
	dataTables.defaults = {
	    gridId : "sohotaxGrid"  // 그리드 ID
	   ,height : 300     // 높이
	   ,len : 500        // 한 리스트의 데이터 건수
	   ,url : "about:blank;"         // 데이터 URL
	   ,columnName : []  // 컬럼명
	   ,columnHidden : [] // hidden 컬럼명
	   ,columnClass : []  // 각 컬럼의 class
	   ,columnRender : []
	   ,columnRenderType : []
	   ,columnFormatType : []
	   ,columnOrderable : []
	   ,columnSearchable : []
	   ,columnOrderData : [[]]	// multi-column sorting
	   ,ajaxYn : "Y"      // 그리드 데이터 호출방식
	   ,checkInitAfterSearchYn : "Y" // 결과내검색 후 체크 및 선택 없애는 기능 사용 여부
	   ,ajaxDataSrc : ""  // 데이터 Src
	   ,rowCallback : ""
	   ,drawCallback : "" // 그리드 최종 그리고 난 후 (필터 후에도 다시 그림)
	   ,completeCallback : "" // ajax 통신 완료 후
	   ,createdRow : ""
	   ,ordering : true      // 정렬 기능 사용 여부
	   ,order: [[ 0, 'asc' ]]	// 정렬 ex)[[ 0, 'asc' ], [ 1, 'asc' ]]
	   ,filter : true     // 결과내 검색 기능 사용 여부
	   ,formId : "form"
	   ,paging : true	// 페이징처리 여부 
	   ,rownum : false	// 목록 첫행에 row number 표시.columnSearchable : [false] 가 있어야함
	   ,processing : false	
       ,serverSide : false
	};
	
	var settings = dataTables.defaults;
	
	// ajax 방식으로 그리드 데이터를 가져온다
	dataTables.ajaxList = function(settings) {
            
		var height = settings.height;
		var url = settings.url;
		var len = settings.len;
		var paging = settings.paging;

		var columnName = settings.columnName;
		var columnsHidden = settings.columnHidden;
		var columnClass= settings.columnClass;
		var columnRender = settings.columnRender;
		var columnOrderable = settings.columnOrderable;
		var columnFormatType = settings.columnFormatType;
		var columnSearchable = settings.columnSearchable;
		var columnOrderData = settings.columnOrderData;

		var columnStr = "[";
		for (var i = 0; i < columnName.length; i++) {
			if (i > 0) {
				columnStr += ",";
			}
			columnStr += "{";
			columnStr += "'data' : '" + columnName[i] + "'"; 
			columnStr += "}";
		}
		columnStr += "]"; 
		var columns = eval("(" + columnStr + ")");
		
		var columnDefsStr = "[";
		for (var i = 0; i < columns.length; i++) {
			
			if (i > 0) {
				columnDefsStr += ",";
			}
			
			columnDefsStr += "{";
			columnDefsStr += "'targets' : " + i;
			
			if (columnClass[i] != null && columnClass[i] != "") {
				columnDefsStr += ",";
				columnDefsStr += "'className' : '" + columnClass[i] + "'";
			}
			
			for (var j = 0; j < columnsHidden.length; j++) {
				if (columns[i].data == columnsHidden[j]) {
					columnDefsStr += ",";
					columnDefsStr += "'visible' : false";
				}
			}
			
			if ((columnRender[i] != null && columnRender[i] != "") || columnFormatType[i] != null) {
				columnDefsStr += ",";
				columnDefsStr += "'render' : GridUtil.renderSetting";
			}
			
			if (columnOrderable[i] != null && columnOrderable[i] != "") {
				columnDefsStr += ",";
				columnDefsStr += "'orderable' : " + columnOrderable[i].toLowerCase() + "";
			}
			
			if (columnSearchable[i] != null && columnSearchable[i] != "") {
				columnDefsStr += ",";
				columnDefsStr += "'searchable' : " + columnSearchable[i].toLowerCase() + "";
			}

			if (columnOrderData[i] != null && columnOrderData[i] != "") {
				columnDefsStr += ",";
				columnDefsStr += "'orderData' : [" + columnOrderData[i] + "]";
			}
			
			columnDefsStr += "}";
		}
		columnDefsStr += "]";

		var columnsDefs = eval("(" + columnDefsStr + ")");
		
		if(settings.serverSide == true) {
			$("#" + settings.gridId).DataTable({
				
				  "scrollY"			: height			// grid height
				, "scrollX"			: true				// 가로 스크롤바
				, "lengthChange"	: false				// 상단 페이지 row 옵션 표시여부
				, "paging"          : paging			// 페이징처리 여부
				, "pagingType"		: "full_numbers"	// 페이징 타입
				, "searching"		: settings.filter	// bFilter,binfo 옵션이 false 로 놓아야 오른쪽 상단에 search 가 안나옴
				, "info"			: false
				, "displayStart"	: 0
				, "pageLength"		: len
				, "destroy"			: true				// 테이블 데이터 새로 불러올 때 필요
				, "deferRender"		: false
				, "ordering" 		: settings.ordering
				, "order" 			: settings.order
				, "processing"		: settings.processing
		        , "serverSide"		: settings.serverSide
				, "ajax"				: {
					  "url"				: url
					, "dataSrc"			: settings.ajaxDataSrc
					, "type"			: "POST"
					, "data"			: {"formData":function(d) {
												if($("#" + settings.formId).serialize() != ""){
													return JSON.stringify($("#form").serializeObject());
												}
											}
					}, "error"			: function(xhr, textStatus, errorThrown){
						//$.msgDialog.close();
						return;
					}
				} // end ajax
				// 페이징 언어설정
				, "language"		: {
					  "paginate"	: {
						  "next"		: "<span class='icon next'></span><span class='text'>다음</span>"
						, "last"		: "<span class='icon last'></span><span class='text'>마지막으로</span>"
						, "first"		: "<span class='icon first'></span><span class='text'>처음으로</span>"
						, "previous"	: "<span class='icon prev'></span><span class='text'>이전</span>"
					}
					, "search"		: "결과내검색"
					, "zeroRecords": "검색된 결과가 없습니다."
				}
				, "columns"			: columns
				, "columnDefs"		: columnsDefs
				, "rowCallback"		: function(row, data, dataIndex) {
					if (settings.rowCallback != null && settings.rowCallback != "") {
						eval(settings.rowCallback);
					}
				}
				, "createdRow"       : function(row, data, index) {
					if (settings.createdRow != null && settings.createdRow != "") {
						eval(settings.createdRow);
					}
				}
				, "drawCallback"	 : function(iSettings){
					if (settings.drawCallback != null && settings.drawCallback != "") {
						eval(settings.drawCallback);
					}
				}
			});
		} else {
			$("#" + settings.gridId).DataTable({
				
				"scrollY"			: height			// grid height
				, "scrollX"			: true				// 가로 스크롤바
				, "lengthChange"	: false				// 상단 페이지 row 옵션 표시여부
				, "paging"          : paging			// 페이징처리 여부
				, "pagingType"		: "full_numbers"	// 페이징 타입
					, "searching"		: settings.filter	// bFilter,binfo 옵션이 false 로 놓아야 오른쪽 상단에 search 가 안나옴
					, "info"			: false
					, "displayStart"	: 0
					, "pageLength"		: len
					, "destroy"			: true				// 테이블 데이터 새로 불러올 때 필요
					, "deferRender"		: false
					, "ordering" 		: settings.ordering
					, "order" 			: settings.order
					, "processing"		: settings.processing
					, "serverSide"		: settings.serverSide
					, "ajax"				: {
						"url"				: url
						, "dataSrc"			: settings.ajaxDataSrc
						, "type"			: "POST"
							, "data"			: function(d) {
								if($("#" + settings.formId).serialize() != ""){
									return $("#" + settings.formId).serialize();
								}
							}
			, "beforeSend"		: function(jqXHR, plainObject){
				progress.start();
			}
			, "complete"		: function(jqXHR, textStatus){
				
				//if (!ndsExceptionMsg(jqXHR.responseJSON)) {
				//return false;
				//} 
				
				
				// 결과내검색 초기화
				$(".dataTables_filter input").val("");
				$.dataTables.getTable().search("").draw();
				
				if (settings.completeCallback != null && settings.completeCallback != "") {
					eval(settings.completeCallback);
				}
				progress.stop();
			}
			, "error"			: function(xhr, textStatus, errorThrown){
				progress.stop();
				return;
			}
					} // end ajax
			// 페이징 언어설정
			, "language"		: {
				"paginate"	: {
					  "next"		: "<span class='icon next'></span><span class='text'>다음</span>"
					, "last"		: "<span class='icon last'></span><span class='text'>마지막으로</span>"
					, "first"		: "<span class='icon first'></span><span class='text'>처음으로</span>"
					, "previous"	: "<span class='icon prev'></span><span class='text'>이전</span>"
			}
			, "search"		: "결과내검색"
				, "zeroRecords": "검색된 결과가 없습니다."
			}
			, "columns"			: columns
			, "columnDefs"		: columnsDefs
			, "rowCallback"		: function(row, data, dataIndex) {
				if (settings.rowCallback != null && settings.rowCallback != "") {
					eval(settings.rowCallback);
				}
			}
			, "createdRow"       : function(row, data, index) {
				if (settings.createdRow != null && settings.createdRow != "") {
					eval(settings.createdRow);
				}
			}
			, "drawCallback"	 : function(iSettings){
				if (settings.drawCallback != null && settings.drawCallback != "") {
					eval(settings.drawCallback);
				}
			}
			});
			
		}
		
		// row number 표시
		if(settings.rownum) {
			$("#" + settings.gridId).DataTable().on( 'order.dt search.dt', function () {
				$("#" + settings.gridId).DataTable().column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
		            cell.innerHTML = i+1;
		        } );
		    } ).draw();
		}
		 
		$("div.dataTables_filter").html($("div.dataTables_filter").html() + "<button type='button' class='__btn10 type3' id='datatableSearch'>검색</button>");
		 
		// 결과내검색 엔터키 클릭시 작동되게 변경
		$(".dataTables_filter input").unbind().bind("keypress", function(e) { 
			if(e.keyCode == 13) {
				if (settings.checkInitAfterSearchYn == "Y"){
					$('#checkAll').prop("checked", false);
					$('#' + settings.gridId + ' tbody input[type="checkbox"]').attr("checked", false);
					$('#' + settings.gridId + ' tbody tr').removeClass("selected");
				}
				$.dataTables.getTable().search(this.value).draw();
			}
		});
		
		$("#datatableSearch").click(function() {
			if (settings.checkInitAfterSearchYn == "Y"){
				$('#checkAll').prop("checked", false);
				$('#' + settings.gridId + ' tbody input[type="checkbox"]').attr("checked", false);
				$('#' + settings.gridId + ' tbody tr').removeClass("selected");
			}
			$.dataTables.getTable().search($(".dataTables_filter input").val()).draw();
		});
		
	}; // end 
	
	// ajax 방식이 아닌 일반적인 리스트 방식으로 그리드 데이터를 가져온다
	dataTables.list = function(settings) {
            
		var height = settings.height;
		var url = settings.url;
		var len = settings.len;
		var paging = settings.paging;

		var columnName = settings.columnName;
		var columnsHidden = settings.columnHidden;
		var columnClass= settings.columnClass;
		var columnOrderable = settings.columnOrderable;
	
		var columnStr = "[";
		for (var i = 0; i < columnName.length; i++) {
			if (i > 0) {
				columnStr += ",";
			}
			columnStr += "{";
			columnStr += "'data' : '" + columnName[i] + "'"; 		
			columnStr += "}";
		}
		columnStr += "]";
		var columns = eval("(" + columnStr + ")");
		
		var columnDefsStr = "[";
		for (var i = 0; i < columns.length; i++) {
			
			if (i > 0) {
				columnDefsStr += ",";
			}
			
			columnDefsStr += "{";
			columnDefsStr += "'targets' : " + i;
			
			if (columnClass[i] != null && columnClass[i] != "") {
				columnDefsStr += ",";
				columnDefsStr += "'className' : '" + columnClass[i] + "'";
				
			}
			
			for (var j = 0; j < columnsHidden.length; j++) {
				if (columns[i].data == columnsHidden[j]) {
					columnDefsStr += ",";
					columnDefsStr += "'visible' : false";
				}
			}
			
			if (columnOrderable[i] != null && columnOrderable[i] != "") {
				columnDefsStr += ",";
				columnDefsStr += "'orderable' : " + columnOrderable[i].toLowerCase() + "";
			}
			
			columnDefsStr += "}";
		}
		columnDefsStr += "]";

		var columnsDefs = eval("(" + columnDefsStr + ")");
		
	    $("#" + settings.gridId).DataTable({
			 "scrollY"			: height      		// grid height
			,"scrollX"			: true     			// 가로 스크롤바
			,"bLengthChange"	: false  			// 상단 페이지 row 옵션 표시여부 
			,bFilter			: true           	// bFilter,binfo 옵션이 false 로 놓아야 오른쪽 상단에 search 가 안나옴
			,bInfo				: false
			,"paging"          	: paging			// 페이징처리 여부
			,"pagingType"		: "full_numbers"    // 페이징 타입
			,"iDisplayLength"	: len 
			,"bDestroy"			: true				// 테이블 데이터 새로 불러올 때 필요
			,"url" 				: url
			, "ordering" 		: settings.ordering
			, "order" 			: settings.order
			,"oLanguage": {
			    "oPaginate": {    // 페이징 언어설정
			    	  "sNext"		: "<span class='icon next'></span><span class='text'>다음</span>"
					, "sLast"		: "<span class='icon last'></span><span class='text'>마지막으로</span>"
					, "sFirst"		: "<span class='icon first'></span><span class='text'>처음으로</span>"
					, "sPrevious"	: "<span class='icon prev'></span><span class='text'>이전</span>"
				}
			   ,"sSearch" : "결과내검색"
	           ,"sEmptyTable" : "데이터가 존재하지 않습니다."
		       ,"sZeroRecords": "검색된 결과가 없습니다."
			}
			,"columnDefs" : columnsDefs
			,"initComplete" : function(setting, json) {
		        //$.msgDialog.close();
			}
			,"rowCallback" : function(row, data, dataIndex) {
				if (settings.rowCallback != null && settings.rowCallback != "") {
					eval(settings.rowCallback);
				}
			}
			, "createdRow"       : function(row, data, index) {
				if (settings.createdRow != null && settings.createdRow != "") {
					eval(settings.createdRow);
				}
			}
			, "drawCallback"	 : function(iSettings){
				if (settings.drawCallback != null && settings.drawCallback != "") {
					eval(settings.drawCallback);
				}
			}
	    });
	    
	};
	
	// ROW 클릭시 실행되는 이벤트 
	// funcNm : 이벤트 후 실행될 function 명을 받는다. 
	// 실행될 function은 rowData를 인자값으로 설정해야한다.
	dataTables.clickEvent = function(funcNm) {
		
		var table = $.dataTables.getTable();
	    // 선택한 항목 정보
		table.on( 'click', 'tr', function () {
			rowData = table.row(this).data();
			eval(funcNm + "(rowData)");
	    });
	};
	
	dataTables.hoverHiddenEvent = function(ClassNm,HoverNm,prefix,suffix){
		var table = $.dataTables.getTable();
		table.on('mouseover','tr td.'+ClassNm,function(e){
				$.map(table.rows($(this).closest("tr")).data(), function(item, idx) {
					data = item;
				});
				if (null != eval("data."+HoverNm)){
					$("."+ClassNm).attr("title",prefix+eval("data."+HoverNm)+suffix);
					ta_tooltip($('.' + ClassNm));
				}
		});
		table.on('mouseleave','tr td.'+ClassNm,function(e){
			$("."+ClassNm).removeAttr("title"); 
		});
	};
	
	// ROW 클릭시 체크박스 선택 이벤트 
	// 체크박스 name 값을 인자로 받는다.
	dataTables.checkBoxSel = function(checkBoxNm) {
		var table = $.dataTables.getTable();
		table.on('click', 'tbody tr', function(e) {
			var obj = $(this).find('input[name="' + checkBoxNm + '"]');
			var classNm = $(this).attr("class");
			
			// 체크박스를 직접 클릭했을 때 처리를 위하여 indexOf 로 class 확인 후 처리한다.
			if (obj.attr("checked")) {
				if (classNm.indexOf("selected") > 0) {
					obj.attr("checked", false);
					$(this).removeClass("selected");
				} else {
					$(this).addClass("selected");
				}
			} else {
				if (classNm.indexOf("selected") < 0) {
					obj.attr("checked", true);
					$(this).addClass("selected");
				} else {
					$(this).removeClass("selected");
				}
			}
		});
	};
	
	/**
	 * 체크박스 클릭 이벤트 (ROW클릭 제외 체크박스 단독)
	 * 인자값 : 이벤트를 발생시킬 체크박스의 class명, 이벤트 function 명 (클릭한 체크박스 객체 자동으로 인자로 가져간다.)
	 * 이벤트 function 에서 체크박스 정보는 체크박스객체.name, 체크박스객체.value로 받을 수 있다.
	 * 
	 * ex)
	 * 호출 : $.dataTables.checkBoxSelect("checkboxNm", "testEvent");
	 * 이벤트 객체
	 * function testEvent(obj) {
	 *     var name = obj.name
	 *     var value = obj.value
	 *     var checked = obj.checked
	 * }
	 */
	dataTables.checkBoxSelect = function(checkboxNm, funcNm) {
		var table = $.dataTables.getTable();

		table.on('click', 'tbody input[name="' + checkboxNm + '"]', function(e) {
			 eval(funcNm + "(this)");
		});
	};
	dataTables.checkBoxSelect = function(checkboxNm, funcNm, target) {
		var table = $("#" + target).DataTable();
		
		table.on('click', 'tbody input[name="' + checkboxNm + '"]', function(e) {
			eval(funcNm + "(this)");
		});
	};
	
	
	/**
	 * 클릭 이벤트
	 * - 클릭한 객체 (링크 등)가 속한 ROW의 데이터값을 인자로 funcNm 의 함수를 호출한다.
	 */
	dataTables.clickEventForObj = function(objNm, funcNm) {
		var table = $.dataTables.getTable();

		var data = null;
		table.on('click', 'tbody ' + objNm, function(e) { 
			$.map(table.rows($(this).closest("tr")).data(), function(item, idx) {
				data = item;
			});
			eval(funcNm + "(data)");
		});
	};

	// HEADER 의 체크박스 ALL 선택 이벤트
	// checkBoxAllNm : ALL선택 체크박스의 name, checkBoxNm : 선택할 체크박스 name
	dataTables.checkBoxAllSelect = function(checkBoxAllNm, checkBoxNm) {
		
		var table = $.dataTables.getTable();
		
		$('thead input[name="' + checkBoxAllNm + '"]', table.table().container()).on('click', function(e){
			
			if ($(this).attr("checked")) {
				$('#' + settings.gridId + ' tbody input[name="' + checkBoxNm + '"]:enabled').attr("checked", true);
				$('#' + settings.gridId + ' tbody input[name="' + checkBoxNm + '"]:enabled').closest('tr').addClass("selected");
				//$('#' + settings.gridId + ' tbody tr').addClass("selected");
			} else {
				$('#' + settings.gridId + ' tbody input[name="' + checkBoxNm + '"]:enabled').attr("checked", false);
				$('#' + settings.gridId + ' tbody input[name="' + checkBoxNm + '"]:enabled').closest('tr').removeClass("selected");
				//$('#' + settings.gridId + ' tbody tr').removeClass("selected");
			}
		});
	};

	// HEADER 의 체크박스 ALL 선택 이벤트
	// checkBoxAllNm : ALL선택 체크박스의 name, checkBoxNm : 선택할 체크박스 name, target : table id
	dataTables.checkBoxAllSelect = function(checkBoxAllNm, checkBoxNm, target) {
		
		var table = $("#" + target).DataTable();
		
		$('thead input[name="' + checkBoxAllNm + '"]', table.table().container()).on('click', function(e){
			
			if ($(this).prop("checked")) {
				$('#' + target + ' tbody input[name="' + checkBoxNm + '"]:enabled').prop("checked", true);
				$('#' + target + ' tbody input[name="' + checkBoxNm + '"]:enabled').closest('tr').addClass("selected");
				//$('#' + settings.gridId + ' tbody tr').addClass("selected");
			} else {
				$('#' + target + ' tbody input[name="' + checkBoxNm + '"]:enabled').prop("checked", false);
				$('#' + target + ' tbody input[name="' + checkBoxNm + '"]:enabled').closest('tr').removeClass("selected");
				//$('#' + settings.gridId + ' tbody tr').removeClass("selected");
			}
		});
	};
	

	// HEADER 의 체크박스 ALL 선택 이벤트 - 최대 선택 수가 제한된 처리
	// checkBoxAllNm : ALL선택 체크박스의 name, checkBoxNm : 선택할 체크박스 name
	dataTables.checkBoxAllLimitedSelect = function(checkBoxAllNm, checkBoxNm, limitCount) {
		
		var objTable = $.dataTables.getTable();
		
		$('thead input[name="' + checkBoxAllNm + '"]', objTable.table().container()).on('click', function(e){
			//먼저 지우고
			$('#' + settings.gridId + ' tbody input[name="' + checkBoxNm + '"]').attr("checked", false);
			$('#' + settings.gridId + ' tbody tr').removeClass("selected");
			
			var info	= objTable.page.info();
			if ($(this).attr("checked")) {
				// 체크하자
				var iCnt=0;
				$('#' + settings.gridId + ' tbody tr').each(function(){
					if ($(this).children()[0].innerHTML.indexOf('<') >= 0){
						iCnt++;
						if (iCnt > limitCount) return false;
						
						//$(this).children()[0].children.salesNoChk.checked = true;
						eval('$(this).children()[0].children.'+checkBoxNm).checked = true;
						$(this).addClass("selected");
					}
				});
				
				if(iCnt > limitCount){
					alert('최대 선택 건수 ' + limitCount + '건을 초과합니다.\n\r상위 ' + limitCount + '건만 선택합니다.');
				}
			}
		});
	};
	
	// 선택한 체크박스의 정보를 가져온다
	dataTables.checkData = function(checkBoxNm){
		
		var checkVal = [];
		
		$('#' + settings.gridId + ' tbody input[name="' + checkBoxNm + '"]:checked').each(function(idx) {
			checkVal[idx] = {  "id" : $(this).attr("id")
					         , "name" : $(this).attr("name")
					         , "class" : $(this).attr("class")
					         , "value" : $(this).val()
					        };
		});
		
		return checkVal;
	};
	
	// 선택한 체크박스의 정보를 가져온다
	dataTables.checkData = function(checkBoxNm, target){
		
		var checkVal = [];
		
		$('#' + target + ' tbody input[name="' + checkBoxNm + '"]:checked').each(function(idx) {
			checkVal[idx] = {  "id" : $(this).attr("id")
					, "name" : $(this).attr("name")
					, "class" : $(this).attr("class")
					, "value" : $(this).val()
			};
		});
		
		return checkVal;
	};
	
	// 선택한 ROW의 데이터를 가져온다 단, columnName 이 정의되지 않은경우 가져오지 않는다.
	// aJax 방식이 아닌 일반 리스트 방식
	dataTables.checkRowDataForList = function() {

		var table = $.dataTables.getTable();
        var dataStr = "[";
    	$.map(table.rows('.selected').data(), function (item, idx) {
    		if (idx > 0) {
    			dataStr += ",";
    		}
    		dataStr += "{";
    		$.each(item, function(n, value) {
    			if (settings.columnName[n] != "") {
        			dataStr += "\"" + settings.columnName[n] + "\" : \"" + value + "\"";
        			if (n < item.length - 1) {
            			dataStr += ",";
        			}
    			}
    		});
    		dataStr += "}";
        });

		dataStr += "]";
		
		return eval(dataStr); 
	};
	
	// 선택한 ROW의 데이터를 가져온다 단, columnName 이 정의되지 않은경우 가져오지 않는다.
	// AJAX방식
	dataTables.checkRowDataForAjax = function() {
		var table = $.dataTables.getTable();
        return table.rows('.selected').data();
	};
	
	// 선택한 ROW의 데이터를 가져온다 단, columnName 이 정의되지 않은경우 가져오지 않는다.
	// AJAX방식
	dataTables.checkRowDataForAjax = function(target) {
		var table = $("#" + target).DataTable();
		return table.rows('.selected').data();
	};
	
	
	// 검색이벤트
	dataTables.searchForAjax = function(url) {
		progress.start();
    	$.dataTables.getTable().ajax.url(url).load();
	};
	
	// 검색이벤트(target=table id)
	dataTables.searchForAjax = function(url, target) {
		progress.start();
		$("#" + target).DataTable().ajax.url(url).load();
	};
	
	// 그리드 객체를 가져온다.
	dataTables.getTable = function() {
		return $("#" + settings.gridId).DataTable();
	};
	
	// 페이징영역 position을 고정위치가 아닌 테이블 바로 아래 위치하게 한다.
	dataTables.setDynamicPagingStyle = function() {
		var isInitSet = false;
		var table = $.dataTables.getTable();
		table.on("draw.dt",function(){
			setPagingStyle();
			isInitSet = true;
		});
		
		if(!isInitSet) { // IE 초기 draw evnet 미적용 체크
			setPagingStyle();
		}
	};
	function setPagingStyle() {
		// head영역 table
		var headHeight = $("div.dataTables_scrollHeadInner table.dataTable").outerHeight();
		// body영역 table
		var bodyHeight = $("div.dataTables_scrollBody table.dataTable").outerHeight();
		var totalHeight = headHeight + bodyHeight;
		
		$(".dataTables_scrollBody").css("height", bodyHeight);
		$(".dataTables_scroll").css("height", totalHeight);
	}
	
	$.extend({
		dataTables : dataTables
	});
	
	$.fn.dataTables = function(instanceSettings) {
		return this.each(function() {

	        //$.msgDialog.progress();
	        
            settings = $.extend({}, dataTables.defaults, instanceSettings || {});
            settings.gridId = $(this).attr("id");
            
        	if (settings.ajaxYn == "Y") {
        		$.dataTables.ajaxList(settings);
        	} else {
        		$.dataTables.list(settings);
        	}
		});
	};
	
	
	GridUtil = {
		renderSetting : function(val, type, row, meta) {

			var data = null;
			if (settings.columnRenderType[meta.col] == "string" || settings.columnRenderType[meta.col] == "String") {
				data = new String(val);
			} else if (settings.columnRenderType[meta.col] == "number" || settings.columnRenderType[meta.col] == "Number") {
				data = new Number(val);
			} else {
				// Render  값이 없는 데이터만 formatting 적용한다.
				if (settings.columnFormatType[meta.col] != null) {
					data = GridUtil.formatSetting(settings.columnFormatType[meta.col], val, row);
				}
				return data;
			}
			
			return eval(settings.columnRender[meta.col]);
		}, 
		
		formatSetting : function(formatType, val, row) {
			
			// 사업자 번호 
			if (formatType.fmtType == "bizNo") {
				return GridUtil.bizNoFormat(val);
			} 
			
			// 숫자 쉼표
			if (formatType.fmtType == "numberComma") {
				return GridUtil.numberComma(val);
			}
			
			// 날짜 포멧
			if (formatType.fmtType == "dateFormat") {
				return GridUtil.addDelim(val);
			}
			
			if (formatType.fmtType == "input") {
				return GridUtil.inputFormat(formatType, val, row);
			}
			
			if (formatType.fmtType == "hrefLink") {
				return GridUtil.hrefFormat(formatType, val, row);
			}
		},
		
		// 링크 생성
		hrefFormat : function(formatType, val, row) {
			
			var hrefLink = "<a href='" + formatType.url + "' ";
			if (formatType.objClass != null && formatType.objClass != "") {
				hrefLink += "class='" + formatType.objClass + "' ";
			}
			hrefLink += ">";

			if (formatType.formatTypeVal != null && formatType.formatTypeVal != "") {
				if (formatType.formatTypeVal == "numberComma") {
					hrefLink += GridUtil.numberComma(val); 
				} else if (formatType.formatTypeVal == "bizNo") {
					hrefLink += GridUtil.bizNoFormat(val); 
				} else if (formatType.formatTypeVal == "dateFormat") {
					hrefLink += GridUtil.addDelim(val); 
				} else {
					hrefLink += val;
				}
			} else {
				hrefLink += val;
			}	
				
			hrefLink += "</a>";
			
			return hrefLink;
		},
		
		// input object 생성
		inputFormat : function(formatType, val, row) {
			
			var typHtml = "<input type='" + formatType.objType + "' name='" + formatType.objName + "' ";
			
			if (formatType.formatTypeVal != null && formatType.formatTypeVal != "") {
				if (formatType.formatTypeVal == "numberComma") {
					typHtml += "value='" + GridUtil.numberComma(val) + "' "; 
				} else if (formatType.formatTypeVal == "bizNo") {
					typHtml += "value='" + GridUtil.bizNoFormat(val) + "' "; 
				} else if (formatType.formatTypeVal == "dateFormat") {
					typHtml += "value='" + GridUtil.addDelim(val) + "' "; 
				} else {
					typHtml += "value='" + val + "' ";
				}
			} else {
				typHtml += "value='" + val + "' ";
			}
			
			if (formatType.objId != null && formatType.objId != "") {
				typHtml += "id='" + formatType.objId + row + "' ";
			}
			if (formatType.objClass != null && formatType.objClass != "") {
				typHtml += "class='" + formatType.objClass + "' ";
			}
			if (formatType.objStyle != null && formatType.objStyle != "") {
				typHtml += "style='" + formatType.objStyle + "' ";
			}
			
			typHtml += ">";
			
			return typHtml;
		},

		// 사업자번호 포멧 관리
		bizNoFormat : function(bizNo) {
			if (bizNo == null || bizNo == "" || bizNo == "null") {
				return "-";
			} else if (bizNo.length < 10) {
				return bizNo;
			} else {
				return bizNo.substring(0,3) + "-" + bizNo.substring(3,5) + "-" + bizNo.substring(5);
			}  
		},

		// 숫자 , 생성
		numberComma : function(val) {
		    while (/(\d+)(\d{3})/.test(val.toString())){
		        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
		      }
		      return val;
		},
		
		// 날짜 포멧 관리
		addDelim : function(date) {
	        date = date.replace(eval('/' + this.delimDate + '/g'), '').replace(eval('/' + this.delimHour + '/g'), '').replace(/\s/g, '');
	        var hour = '';
	        switch (date.length) {
	            case 14 : {
	                hour = this.delimHour + date.substring(12, 14);
	            }
	            case 12 : {
	                hour = ' ' + date.substring(8, 10) + this.delimHour + date.substring(10, 12) + hour;
	            }
	            case 8 : {
	                date = date.substring(0, 4) + this.delimDate + date.substring(4, 6) + this.delimDate + date.substring(6, 8) + hour;
	            }
	        }
	        return date;
	    }
	};
		
})(jQuery);

/*
 * SUM plug-in
 * EX) var table = $('#example').DataTable();
       table.column( 3 ).data().sum();
 */
jQuery.fn.dataTable.Api.register( 'sum()', function ( ) {
	return this.flatten().reduce( function ( a, b ) {
		if ( typeof a === 'string' ) {
			a = a.replace(/[^\d.-]/g, '') * 1;
		}
		if ( typeof b === 'string' ) {
			b = b.replace(/[^\d.-]/g, '') * 1;
		}

		return a + b;
	}, 0 );
} );

$.fn.serializeObject = function() {
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};
