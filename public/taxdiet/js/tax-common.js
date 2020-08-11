/*
 * 전자세금계산서 Script Lib
 */

/**
 * 인증서 유효기간 체크
 * 
 * @param expiredYYYYMMDD
 * @param slipYmd
 * @param inputFlag
 * @returns {Boolean}
 */
function isDTIExpired(expiredYYYYMMDD, slipYmd) {
	// 인증서 유효기간 체크
	// 전달의계산서이고 오늘이 10일 이전이면 이달 16일까지 남았는지 검사
	// 전달의 계산서이고 오늘이 10일 이후이면 6일이후 까지 남았는지 검사
	// 이달의 계산서이면 다음달 16일까지 남았는지 검사
	// 보름전부터는 즉시전송하며 일주일 남았으면 발행 못하게 한다.
	var _nowDateTime = new Date();
	var _nowDateTimeString = "";
	var _nowYear = _nowDateTime.getFullYear();
	var _nowMonth = _nowDateTime.getMonth() + 1;
	if (_nowMonth < 10) {
		_nowMonth = "0" + "" + _nowMonth;
	}
	var _nowDay = _nowDateTime.getDate();
	if (_nowDay < 10) {
		_nowDay = "0" + "" + _nowDay;
	}
	_nowDateTimeString = _nowYear + '' + _nowMonth + '' + _nowDay;

	// 전달 계산서 여부
	// alert(_nowDateTimeString);

	var _privYYYYMM = getPrivMonthDay(_nowDateTimeString, '1');
	// alert(f.slipYmd.value.substring(0, 6));
	// alert(_privYYYYMM.substring(0, 6));
//	alert(expiredYYYYMMDD);
//	alert(removeDashValue(expiredYYYYMMDD));
//	alert(_nowDateTimeString);
	if(removeDashValue(expiredYYYYMMDD)<_nowDateTimeString){
		alert('인증서의 유효기간이 만료되었습니다.' + '(유효기간 : ' + expiredYYYYMMDD
				+ '까지)');
		return false;
	}else{
		return true;
	}
//	if (slipYmd.substring(0, 6) <= _privYYYYMM.substring(0, 6)) {
//		var expireDate = '';
//		if (_nowDay < 10) {
//			expireDate = _nowYear + '' + _nowMonth + '16';
//			if (removeDashValue(expiredYYYYMMDD) < expireDate) {
//				expireDate = getNeededDay(_nowDateTimeString, 6);
//				if (removeDashValue(expiredYYYYMMDD) < expireDate) {
//					alert('인증서의 유효기간이 만료되었습니다.' + expireDate
//							+ '까지 유효기간이 남아있어야 합니다.(유효기간 : ' + expiredYYYYMMDD
//							+ '까지)');
//					return false;
//				}
//			}
//		} else {
//			expireDate = getNeededDay(_nowDateTimeString, 6);
//			if (removeDashValue(expiredYYYYMMDD) < expireDate) {
//				alert('인증서의 유효기간이 만료되었습니다.' + expireDate
//						+ '까지 유효기간이 남아있어야 합니다.(유효기간 : ' + expiredYYYYMMDD
//						+ '까지)');
//				return false;
//			}
//		}
//	} else {
//		var expireDate = getNextMonthDay(_nowDateTimeString, '16');
//		// 금월 계산서는 익월 16일까지 인증서의 유효기간이 남아있어야 한다.
//		if (removeDashValue(expiredYYYYMMDD) < expireDate) {
//			// 6일 안남은 경우 발행 못하게 하고 6일 이상 남은경우 즉시전송하게 한다.
//			/**
//			 * @param inputDate
//			 * @returns {Boolean}
//			 */
//			/**
//			 * @param inputDate
//			 * @returns {Boolean}
//			 */
//			expireDate = getNeededDay(_nowDateTimeString, 6);
//			if (removeDashValue(expiredYYYYMMDD) < expireDate) {
//				alert('인증서의 유효기간이 만료되었습니다.' + expireDate
//						+ '까지 유효기간이 남아있어야 합니다.(유효기간 : ' + expiredYYYYMMDD
//						+ '까지)');
//				return false;
//			}
//		}
//	}
//	return true;
}

/**
 * 유효기간 확인
 */
function isExpireDTIDate(inputDate) {
	// 2011.5.30일자로 변경되어 과세기간과 상관없이 국세청 전송가능
	return true;
	var _nowDateTime = new Date();
	var _nowMMDDString = "";
	var _nowYYYYMMDDString = "";
	var _nowYear = _nowDateTime.getFullYear();
	var _nowMonth = _nowDateTime.getMonth() + 1;
	if (_nowMonth < 10) {
		_nowMonth = "0" + "" + _nowMonth;
	}
	var _nowDay = _nowDateTime.getDate();
	if (_nowDay < 10) {
		_nowDay = "0" + "" + _nowDay;
	}
	_nowMMDDString = _nowMonth + '' + _nowDay;
	_nowYYYYMMDDString = _nowYear + '' + _nowMonth + '' + _nowDay;

	var _slipMd = inputDate.substring(4);
	var _slipYear = inputDate.substring(0, 4);

	// 1~5월의 세금계산서일 경우 6월30일까지 발행
	if (_slipMd >= '0101' && _slipMd <= '0531') {
		if (_nowMMDDString > '0630') {
			alert("1~5월의 세금계산서일 경우 6월30일까지 발행 가능합니다.");
			return false;
		}
	}
	// 6월의 세금계산서일 경우 7월 10일까지 발행
	if (_slipMd >= '0601' && _slipMd <= '0630') {
		if (_nowMMDDString > '0710') {
			alert("6월의 세금계산서일 경우 7월10일까지 발행 가능합니다.");
			return false;
		}
	}
	// 7~11월의 세금계산서일 경우 12월 31일까지 발행
	if (_slipMd >= '0701' && _slipMd <= '1130') {
		if (_nowYear > _slipYear) {
			alert("7~11월의 세금계산서일 경우 12월31일까지 발행 가능합니다.");
			return false;
		}
	}
	// 12월의 세금계산서일 경우 1월 10일까지 발행
	if (_slipMd >= '1201' && _slipMd <= '1231') {
		if (_nowMMDDString > '0110' && _nowMMDDString < '1201') {
			alert("12월의 세금계산서일 경우1월10일까지 발행 가능합니다.");
			return false;
		}
	}
	return true;
}

/**
 * Dash 제거
 * 
 * @param value
 * @returns
 */
function removeDashValue(value) {
	return value.replace(/-/gi, "");
}

/**
 * 입력받은 yyyymmdd의 전달 day로 설정된 값을 return
 */
function getPrivMonthDay(yyyymmdd, day) {
	var _yyyy = yyyymmdd.substring(0, 4);
	var _mm = yyyymmdd.substring(4, 6);
	var _expireDateTime = new Date(_yyyy, _mm - 2, day);
	var _expireDateTimeString = _expireDateTime.getFullYear();
	var _expireMonth = _expireDateTime.getMonth() + 1;
	if (_expireMonth < 10) {
		_expireMonth = "0" + "" + _expireMonth;
	}
	var _expireDay = _expireDateTime.getDate();
	if (_expireDay < 10) {
		_expireDay = "0" + "" + _expireDay;
	}
	_expireDateTimeString = _expireDateTimeString + '' + _expireMonth + ''
			+ _expireDay;
	return _expireDateTimeString;
}

/**
 * 입력받은 yyyymmdd의 day 이후로 설정된 값을 return
 */
function getNeededDay(yyyymmdd, day) {
	var _yyyy = yyyymmdd.substring(0, 4);
	var _mm = yyyymmdd.substring(4, 6);
	var _dd = yyyymmdd.substring(6, 8);
	var _expireDateTime = new Date(_yyyy, parseInt(_mm) - 1, parseInt(_dd)
			+ parseInt(day));
	var _expireDateTimeString = _expireDateTime.getFullYear();
	var _expireMonth = _expireDateTime.getMonth() + 1;
	if (_expireMonth < 10) {
		_expireMonth = "0" + "" + _expireMonth;
	}
	var _expireDay = _expireDateTime.getDate();
	if (_expireDay < 10) {
		_expireDay = "0" + "" + _expireDay;
	}
	_expireDateTimeString = _expireDateTimeString + '' + _expireMonth + ''
			+ _expireDay;
	return _expireDateTimeString;
}

/**
 * 입력받은 yyyymmdd의 다음달 day로 설정된 값을 return
 */
function getNextMonthDay(yyyymmdd, day) {
	var _yyyy = yyyymmdd.substring(0, 4);
	var _mm = yyyymmdd.substring(4, 6);
	var _expireDateTime = new Date(_yyyy, _mm, day);
	var _expireDateTimeString = _expireDateTime.getFullYear();
	var _expireMonth = _expireDateTime.getMonth() + 1;
	if (_expireMonth < 10) {
		_expireMonth = "0" + "" + _expireMonth;
	}
	var _expireDay = _expireDateTime.getDate();
	if (_expireDay < 10) {
		_expireDay = "0" + "" + _expireDay;
	}
	_expireDateTimeString = _expireDateTimeString + '' + _expireMonth + ''
			+ _expireDay;
	return _expireDateTimeString;
}

/**
 * 현재시간 조회
 * 
 * @returns {String}
 */
function getDateTime() {
	var _nowDateTime = new Date();
	var _nowYear = _nowDateTime.getFullYear();
	var _nowMonth = _nowDateTime.getMonth() + 1;
	if (_nowMonth < 10) {
		_nowMonth = "0" + "" + _nowMonth;
	}
	var _nowDay = _nowDateTime.getDate();
	if (_nowDay < 10) {
		_nowDay = "0" + "" + _nowDay;
	}
	var _nowHour = _nowDateTime.getHours();
	if (_nowHour < 10) {
		_nowHour = "0" + "" + _nowHour;
	}
	var _nowMin = _nowDateTime.getMinutes();
	if (_nowMin < 10) {
		_nowMin = "0" + "" + _nowMin;
	}
	return _nowDateTimeString = _nowYear + '' + _nowMonth + '' + _nowDay + ''
			+ _nowHour + '' + _nowMin;
}

/**
 * 사업자번호 유효 체크
 * 
 * @param vencod
 * @returns {Boolean}
 */
function isTaxNo(vencod) {
	if (vencod.length != 10)
		return false;
	else
		return true;
	
	var sum = 0;
	var getlist = new Array(10);
	var chkvalue = new Array("1", "3", "7", "1", "3", "7", "1", "3", "5");
	for ( var i = 0; i < 10; i++) {
		getlist[i] = vencod.substring(i, i + 1);
	}
	for ( var i = 0; i < 9; i++) {
		sum += getlist[i] * chkvalue[i];
	}
	sum = sum + parseInt((getlist[8] * 5) / 10);
	sidliy = sum % 10;
	sidchk = 0;
	if (sidliy != 0) {
		sidchk = 10 - sidliy;
	} else {
		sidchk = 0;
	}
	if (sidchk != getlist[9]) {
		return false;
	}
	return true;
}

/**
 * 주민등록번호 유효성 체크
 * 
 * @param v
 * @returns {Boolean}
 */
function isRegNo(v){

	// 외국인
	if(v == 9999999999999) return true;
	if( v.length != 13) return false;
	var IDtot = 0;
	var IDAdd = "234567892345";

	for (var i = 0; i < 12; i++) {
		  IDtot = IDtot + parseInt(v.substring(i, (i + 1))) * parseInt(IDAdd.substring(i, (i+1)));
	}// end for
	IDtot = 11 - (IDtot % 11);
	if (IDtot == 10) {
		IDtot = 0;
	} else if (IDtot == 11) {
		IDtot = 1;
	}// end if
	if(parseInt(v.substring(12, 13)) != IDtot) {
	     return false;
	}// end if
	return true;
}

/**
 * 입력값에 특정 문자(chars)가 있는지 체크
 * 특정 문자를 허용하지 않으려 할 때 사용
 * ex) if (containsChars(form.name,"!,*&^%$#@~;")) {
 *         alert("이름 필드에는 특수 문자를 사용할 수 없습니다.");
 *     }
 */
function containsChars(input, chars) {
    for (var i = 0; i < input.value.length; i++) {
       if (chars.indexOf(input.value.charAt(i)) != -1) {
           return true;
	   }
    }
    return false;
}

/**
 * 입력값이 특정 문자F(chars)만으로 되어있는지 체크
 * 특정 문자만 허용하려 할 때 사용
 * ex) if (!containsCharsOnly(form.blood,"ABO")) {
 *         alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
 *     }
 */
function containsCharsOnly(input,chars) {
    for (var i = 0; i < input.value.length; i++) {
       if (chars.indexOf(input.value.charAt(i)) == -1) {
           return false;
	   }
    }
    return true;
}

/** 주어진값의 마스크처리
 * @param val
 * @param mask
 * @returns {String}
 */
function formatValue(val, mask) {
    var value = val.replace(/(\$|\^|\*|\(|\)|\+|\.|\?|\\|\{|\}|\||\[|\]|-| |:)/g, "");
    var result = "";

    for (var i = 0, j = 0; i < mask.length && j < value.length; i++) {
        if (mask.charAt(i) == "#") {
            result += value.charAt(j);
            j++;
        } else {
            result += mask.charAt(i);
        }
    }
	if( val != result) {
	    return result;
	}
}

function encryptStringMsg(msg, keyStr) {
	var encodeKey = keyStr;//"PrimeElectronicBookkeepingSystem";

	var suffleKey1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

	var suffleKey2 = "ZAnBglCost35GHIJ678wDpqrEWdefhijk2QSKL90XYabFNOPuvMVTmx4Ryz1Uc";

	var chars = msg.split("");

	
	var index;
	for (i = 0; i < chars.length; i++) {
		if ((index = suffleKey1.indexOf(chars[i])) != -1) {
			chars[i] = suffleKey2.charAt(index);
		}
	}

	var key = __stringToBytes(encodeKey);
	var bytes = __stringToBytes(chars.join(""));
	var resultString = "";
	for (i = 0; i < bytes.length; i++) {
		bytes[i] = (bytes[i] ^ key[i % key.length]);
		if (bytes[i].toString(16).length < 2) {
			resultString += "0" + bytes[i].toString(16);
		} else {
			resultString += bytes[i].toString(16);
		}
	}
	return resultString.toUpperCase();
}

var digitArray = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
function toHex(n){
    var result = ''
    var start = true;
    for (var i=32; i>0;){
        i-=4;
        var digit = (n>>i) & 0xf;
        if (!start || digit != 0){
            start = false;
            result += digitArray[digit];
        }
    }
    return (result==''?'0':result);
}

function pad(str, len, pad){
    var result = str;
    for (var i=str.length; i<len; i++){
        result = pad + result;
    }
    return result;
}

function encodeHex(str){
    var result = "";
    for (var i=0; i<str.length; i++){
        result += pad(toHex(str.charCodeAt(i)&0xff),2,'0');
    }
    return result;
}

function __stringToBytes(str) {
	var ch, st, re = [];
	for ( var i = 0; i < str.length; i++) {
		ch = str.charCodeAt(i); // get char
		st = []; // set up "stack"
		do {
			st.push(ch & 0xFF); // push byte to stack
			ch = ch >> 8; // shift value down by 1 byte
		} while (ch);
		// add stack contents to result
		// done because chars have "wrong" endianness
		re = re.concat(st.reverse());
	}
	// return an array of bytes 
	return re;
}