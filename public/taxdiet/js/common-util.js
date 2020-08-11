var DevMode = false;

var KeyCode = {
    ALT            : 18,
    BACKSPACE      : 8,
    CAPS_LOCK      : 20,
    COMMA          : 188,
    COMMAND        : 91,
    COMMAND_LEFT   : 91,
    COMMAND_RIGHT  : 93,
    CONTROL        : 17,
    DELETE         : 46,
    DOWN           : 40,
    END            : 35,
    ENTER          : 13,
    ESCAPE         : 27,
    HOME           : 36,
    INSERT         : 45,
    LEFT           : 37,
    MENU           : 93,
    NUMPAD_ADD     : 107,
    NUMPAD_DECIMAL : 110,
    NUMPAD_DIVIDE  : 111,
    NUMPAD_ENTER   : 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN      : 34,
    PAGE_UP        : 33,
    PERIOD         : 190,
    RIGHT          : 39,
    SHIFT          : 16,
    SPACE          : 32,
    TAB            : 9,
    UP             : 38,
    WINDOWS        : 91
};

/**
 * 숫자만 가져 오기
 * @return string
 */
String.prototype.num = function() {
    return (this.trim().replace(/[^0-9]/g, ""));
};

/**
 * 문자 값 존재 여부 검사
 * @return boolean
 */
String.prototype.isEmpty = function() {
    return (this.trim() == '') ? true : false;
};

/**
 * 문자열의 값이 null이면 '' 반환 또는 문자 값 반환
 * @return string
 */
String.prototype.nvlString = function() {
    return this.isEmpty() ? '' : this;
};

/**
 * \ubb38\uc790\uc5f4 \uc88c\uce21 \uacf5\ubc31 \uc81c\uac70
 * @return string
 */
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
};

/**
 * \ubb38\uc790\uc5f4 \uc6b0\uce21 \uacf5\ubc31 \uc81c\uac70
 * @return string
 */
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
};

/**
 * \ubb38\uc790\uc5f4 \uc88c\uc6b0\uce21 \uacf5\ubc31\uc81c\uac70
 * @return string
 */
String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
};

String.prototype.replaceAll = function(targetStr,replaceStr){
   thisStr = this.toString();
   var idx = thisStr.indexOf( targetStr );
   while ( idx > -1 ) {
       thisStr = thisStr.replace( targetStr, replaceStr );
       idx = thisStr.indexOf( targetStr );
   }
   return thisStr;
}

/**
 * \ubb38\uc790\uc5f4\uc758 \uc88c\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @param  length
 * @param  padString
 * @return string
 */
String.prototype.lpad = function(length, padString) {
    var str = this;
    if (str.isEmpty()) {
        return '';
    }
    padString = (padString == null || typeof padString == 'undefined') ? ' ' : padString;
    str = str.substring(0, length);
    var str_length= this.length;
    var dummy = '';
    for (var i = str_length; i < length ; i++) {
        dummy += padString;
    }

    return dummy + str;
};

/**
 * \ubb38\uc790\uc5f4\uc758 \uc6b0\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
 * @param  length
 * @param  padString
 * @return string
 */
String.prototype.rpad = function(length, padString) {
    var str = this;
    if (str.isEmpty()) {
        return '';
    }
    padString = (padString == null || typeof padString == 'undefined') ? ' ' : padString;
    str = str.substring(0, length);
    var str_length= this.length;
    var dummy = '';
    for (var i = str_length; i < length ; i++) {
        str += padString;
    }
    return str;
};

/**
 * \ubb38\uc790\uc5f4 byte length
 * @return byte length
 */
String.prototype.getBytes = function() {
    var len = 0;
    if (!this.isEmpty()) {
        for (var i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) > 128) {
                len += (StringUtil.charset == 'UTF8' ? 3 : 2);
            } else if (this.charCodeAt(i) == 10) {
                len += 2; // enter key
            } else {
                len += 1;
            }
        }
    }
    return len;
};

/**
 * \ubb38\uc790\uc5f4 byte\uc5d0 substring
 * @return string
 */
String.prototype.subStringByBytes = function(subLength) {
    var len = 0;
    if (!this.isEmpty()) {
        for (var i = 0; i < this.length; i++) {
            if (this.charCodeAt(i) > 128) {
                len += (StringUtil.charset == 'UTF8' ? 3 : 2);
            } else if (this.charCodeAt(i) == 10) {
                len += 2; // enter key
            } else {
                len += 1;
            }
            
            if (len > subLength) {
            	return this.substring(0, i);
            } 
        }
    }
    return this;
};

/**
 * \uc601\ubb38\ub9cc \uc785\ub825 \ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4.
 * @return boolean
 */
String.prototype.isEng = function() {
    return (/^[a-zA-Z]+$/).test(this);
};

/**
 * 영문,숫자만 입력 되었는지 확인한다.
 * @return boolean
 */
String.prototype.isEngNum = function() {
    return (/^[a-zA-Z0-9]+$/).test(this);
};
String.prototype.isNumEng = function() {
    return (/^[a-zA-Z0-9]+$/).test(this);
};

/**
 * 한글만 입력 되었는지 확인한다.
 */
String.prototype.isKor = function() {
    return (/^[\u3131-\u314e|\u314f-\u3163|\uac00-\ud79d]+$/).test(this);
};

/**
 * 문자열에서 영문 포함 여부 확인
 * @return boolean
 */
String.prototype.isExistEng = function() {
    return (/[a-zA-Z]/).test(this);
};

/**
 * 문자열에서 숫자 포함 여부 확인
 * @return boolean
 */
String.prototype.isExistNum = function() {
    return (/[0-9]/).test(this);
};

/**
 * 문자열에서 한글 포함 여부 확인
 */
String.prototype.isExistKor = function() {
    return (/[\u3131-\u314e|\u314f-\u3163|\uac00-\ud79d]/).test(this);
};

/**
 * \ubb38\uc790\uc5f4\uc5d0 \uc804\ud654\ubc88\ud638\uc5d0\uc11c \uc0ac\uc6a9\uac00\ub2a5\ud55c \ubc88\ud638\uc778\uc9c0 \ud655\uc778
 * ()/,#*-0123456789\uacf5\ubc31 + 
 */
String.prototype.isPhoneNumber = function() {
	//return (/^[\(\)\/\#\*\+\'\.0-9\s-]+$/).test(this);
	return (/01([016789])[-]?\d{3,4}[-]?\d{4}\b/).test(this);
};

 
 
 
var StringUtil = {

    charset : 'UTF8',

    /**
     * \ubb38\uc790 \uac12\uc774 \uc874\uc7ac \uc5ec\ubd80 \uac80\uc0ac
     * @return boolean
     */
    isEmpty : function(str) {
        if (typeof str == 'undefined' || str == null || str.trim() == '') {
            return true;
        }
        return false;
    },

    /**
     * \ubb38\uc790\uc5f4\uc758 \uac12\uc774 null\uc774\uba74 '' \ubc18\ud658 \ub610\ub294 (\uc124\uc815)\ubb38\uc790 \uac12 \ubc18\ud658
     * @param  string
     * @return string
     */
    nvlString : function(str) {
        if (str.isEmpty()) {
            return (arguments.length > 1) ? arguments[1] : '';
        } else {
            return str;
        }
    },

    /**
     * \ubb38\uc790\uc5f4 \uc88c\uce21 \uacf5\ubc31 \uc81c\uac70
     * @param  string
     * @return string
     */
    ltrim : function(str) {
        return str.replace(/^\s+/,"");
    },

    /**
     * \ubb38\uc790\uc5f4 \uc6b0\uce21 \uacf5\ubc31 \uc81c\uac70
     * @param  string
     * @return string
     */
    rtrim : function(str) {
        return str.replace(/\s+$/,"");
    },

    /**
     * \ubb38\uc790\uc5f4 \uc88c\uc6b0\uce21 \uacf5\ubc31\uc81c\uac70
     * @param  string
     * @return string
     */
    trim : function(str) {
        return str.replace(/^\s+|\s+$/g,"");
    },

    /**
     * \ubb38\uc790\uc5f4\uc758 \uc88c\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
     * @param  string
     * @param  length
     * @param  padString
     * @return string
     */
    lpad : function(str, length, padString) {
        if (this.isEmpty(str)) {
            return str;
        }
        padString = (padString == null || typeof padString == 'undefined') ? ' ' : padString;
        str = str.substring(0, length);
        var str_length= str.length;
        var dummy = '';
        for (var i = str_length; i < length ; i++) {
            dummy += padString;
        }

        return dummy + str;
    },

    /**
     * \ubb38\uc790\uc5f4\uc758 \uc6b0\uce21\uc744 \ud2b9\uc815\ubb38\uc790\ub85c \ucc44\uc6cc \ud2b9\uc815 \uae38\uc774\uc758 \ubb38\uc790\uc5f4\uc744 \ub9cc\ub4e0\ub2e4.
     * @param  string
     * @param  length
     * @param  padString
     * @return string
     */
    rpad : function(str, length, padString) {
        if (this.isEmpty(str)) {
            return str;
        }
        padString = (padString == null || typeof padString == 'undefined') ? ' ' : padString;
        str = str.substring(0, length);
        var str_length= str.length;
        var dummy = '';
        for (var i = str_length; i < length ; i++) {
            str += padString;
        }
        return str;
    },

    /**
     * \ubb38\uc790\uc5f4 byte length
     * @param  string
     * @return byte length
     */
    getBytes : function(str) {
        var len = 0;
        if (!this.isEmpty(str)) {
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 128) {
                    len += (this.charset == 'UTF8' ? 3 : 2);
                } else if (str.charCodeAt(i) == 10) {
                    len += 2; // enter key
                } else {
                    len += 1;
                }
            }
        }
        return len;
    },

    /**
     * \uc601\ubb38\ub9cc \uc785\ub825 \ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4.
     * @param  string
     * @return boolean
     */
    isEng : function(str) {
        return (/^[a-zA-Z]+$/).test(str);
    },

    /**
     * \uc601\ubb38,\uc22b\uc790\ub9cc \uc785\ub825 \ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4.
     * @param  string
     * @return boolean
     */
    isEngNum : function(str) {
        return (/^[a-zA-Z0-9]+$/).test(str);
    },
    isNumEng : function(str) {
        return (/^[a-zA-Z0-9]+$/).test(str);
    },

    /**
     * \ud55c\uae00\ub9cc \uc785\ub825 \ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4.
     * @param  string
     * @return boolean
     */
    isKor : function(str) {
        return (/^[\u3131-\u314e|\u314f-\u3163|\uac00-\ud79d]+$/).test(str);
    },

    /**
     * \ubb38\uc790\uc5f4\uc5d0\uc11c \uc601\ubb38 \ud3ec\ud568 \uc5ec\ubd80 \ud655\uc778
     * @param  string
     * @return boolean
     */
    isExistEng : function(str) {
        return (/[a-zA-Z]/).test(str);
    },

    /**
     * \ubb38\uc790\uc5f4\uc5d0\uc11c \uc22b\uc790 \ud3ec\ud568 \uc5ec\ubd80 \ud655\uc778
     * @param  string
     * @return boolean
     */
    isExistNum : function(str) {
        return (/[0-9]/).test(str);
    },

    /**
     * \ubb38\uc790\uc5f4\uc5d0\uc11c \ud55c\uae00 \ud3ec\ud568 \uc5ec\ubd80 \ud655\uc778
     * @param  string
     * @return boolean
     */
    isExistKor : function(str) {
        return (/[\u3131-\u314e|\u314f-\u3163|\uac00-\ud79d]/).test(str);
    },   
    
        /**
     * \ud2b9\uc218\ubb38\uc790\ub9cc \uc784\ub825 \ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4.
     * @param string
     * @return boolean
     */
    isSpecialCha : function(str) {
        return (/[~!@#$_]+/g).test(str);
    },
    
    
    /**
     * \ud55c\uae00/\uc601\ubb38\ub9cc \uc785\ub825 \ub418\uc5c8\ub294\uc9c0 \ud655\uc778\ud55c\ub2e4.
     * @param  string  
     * @return boolean
     */
    isKorEng : function(str) {
        return (/^[\uac00-\ud79d|a-zA-Z]+$/).test(str);
    } 
};

/**
 * \ubb38\uc790\uc5f4\uc774 \uc22b\uc790\ub85c\ub9cc \uc774\ub8e8\uc5b4\uc838 \uc788\ub294\uc9c0 \ud655\uc778 (\uc74c\uc218, \uc18c\uc218\uc810 \ud5c8\uc6a9)
 * @return boolean
 */
String.prototype.isNumber = function() {
    return (/^[\+-]?\d+[.]?\d*$/).test(this);
};

/**
 * \ubb38\uc790\uc5f4\uc774 \uc815\uc218 \uc22b\uc790\ub85c \uc774\ub8e8\uc5b4\uc838 \uc788\ub294\uc9c0 \ud655\uc778
 * @return boolean
 */
String.prototype.isInteger = function() {
    return (/^[\+-]?[\d]+$/).test(this);
};

/*
 * \ubb38\uc790\uc5f4\uc774 \uc2e4\uc218\ub85c \uc774\ub8e8\uc5b4\uc838 \uc788\ub294\uc9c0 \ud655\uc778
 * @return boolean
 */
String.prototype.isFloat = function() {
    return (/^[\+-]?[0-9]*[.]?[0-9]*[0-9]$/).test(this);
};

/**
 * \uc22b\uc790 \ud615\uc2dd\uc73c\ub85c \ucf64\ub9c8 \ucd94\uac00
 * @returns {String}
 */
String.prototype.addComma = function() {
    //return Number(this).toLocaleString().split(".")[0];
    x = this.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

var NumberUtil = {

    /**
     * \ubb38\uc790\uc5f4\uc774 \uc22b\uc790\ub85c\ub9cc \uc774\ub8e8\uc5b4\uc838 \uc788\ub294\uc9c0 \ud655\uc778 (\uc74c\uc218, \uc18c\uc218\uc810 \ud5c8\uc6a9)
     * @param  string
     * @return boolean
     */
    isNumber : function(str) {
        return (/^[\+-]?\d+[.]?\d*$/).test(str);
    },

    /**
     * \ubb38\uc790\uc5f4\uc774 \uc815\uc218 \uc22b\uc790\ub85c \uc774\ub8e8\uc5b4\uc838 \uc788\ub294\uc9c0 \ud655\uc778
     * @param  string
     * @return boolean
     */
    isInteger : function(str) {
        return (/^[\+-]?[\d]+$/).test(str);
    },

    /*
     * \ubb38\uc790\uc5f4\uc774 \uc2e4\uc218\ub85c \uc774\ub8e8\uc5b4\uc838 \uc788\ub294\uc9c0 \ud655\uc778
     * @param  string
     * @return boolean
     */
    isFloat : function(str) {
        return (/^[\+-]?[0-9]*[.]?[0-9]*[0-9]$/).test(str);
    }
};

/**
 * \ub0a0\uc9dc, \uc2dc\uac04 \uad6c\ubd84\uc790 \uc81c\uac70\ud558\uc5ec \ubc18\ud658
 * @return date string
 */
String.prototype.removeDelim = function() {
    var delimDate = ((typeof DateUtil != 'undefined' && typeof DateUtil.delimDate != 'undefined') ? DateUtil.delimDate : '-');
    var delimHour = ((typeof DateUtil != 'undefined' && typeof DateUtil.delimHour != 'undefined') ? DateUtil.delimHour : ':');
    return this.replace(eval('/' + delimDate + '/g'), '').replace(eval('/' + delimHour + '/g'), '').replace(/\s/g, '');
};

/**
 * \ub0a0\uc9dc, \uc2dc\uac04 \uad6c\ubd84\uc790 \ucd94\uac00\ud558\uc5ec \ubc18\ud658
 * @return date string
 */
String.prototype.addDelim = function() {
    var delimDate = ((typeof DateUtil != 'undefined' && typeof DateUtil.delimDate != 'undefined') ? DateUtil.delimDate : '-');
    var delimHour = ((typeof DateUtil != 'undefined' && typeof DateUtil.delimHour != 'undefined') ? DateUtil.delimHour : ':');

    var date = this.removeDelim();
    var hour = '';
    switch (date.length) {
        case 14 : {
            hour = delimHour + date.substring(12, 14);
        }
        case 12 : {
            hour = ' ' + date.substring(8, 10) + delimHour + date.substring(10, 12) + hour;
        }
        case 8 : {
            date = date.substring(0, 4) + delimDate + date.substring(4, 6) + delimDate + date.substring(6, 8) + hour;
        }
    }
    return date;
};

/**
 * \uc6d4 \ub9c8\uc9c0\ub9c9 \uc77c \uac00\uc838\uc624\uae30
 * @return date string
 */
String.prototype.getMonthLastDay = function() {
    var date = this.removeDelim();
    var dateObj = new Date(date.substring(0, 4), date.substring(4, 6), 0);
    return dateObj.getDate();
};

/**
 * \uc6d4 \ub9c8\uc9c0\ub9c9 \ub0a0\uc9dc \uac00\uc838\uc624\uae30
 * @return date string
 */
String.prototype.getMonthLastDate = function() {
    var delimDate = ((typeof DateUtil != 'undefined' && typeof DateUtil.delimDate != 'undefined') ? DateUtil.delimDate : '-');
    var delimHour = ((typeof DateUtil != 'undefined' && typeof DateUtil.delimHour != 'undefined') ? DateUtil.delimHour : ':');

    var date = this.removeDelim();
    var year  = date.substring(0, 4);
    var month = date.substring(4, 6);
    var day   = 0;

    var dateObj = new Date(year, month, day);
    year  = dateObj.getFullYear();
    month = dateObj.getMonth() + 1;
    date  = dateObj.getDate();
    return year + delimDate + (month < 10 ? '0' : '') + month + delimDate + (date < 10 ? '0' : '') + date;
};

/**
 * \ub0a0\uc9dc \uc720\ud6a8\uc131 \ud655\uc778
 * @return boolean
 */
String.prototype.isValidDate = function() {
    var date = this.removeDelim();

    if (date.length < 8) {
        return false;
    }

    var year  = date.substring(0, 4);
    var month = date.substring(4, 6);
    var date  = date.substring(6, 8);

    var dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (year % 1000 != 0 && year % 4 == 0) {
        dateList[1] = 29; // \uc724\ub144
    }
    return (0 < year && 0 < month && month <= 12 && 0 < date && date <= dateList[month - 1]);
};

Date.prototype.format = function(format) {
    if (!this.valueOf()) {
        return ' ';
    }

    if (format == null) {
        format = 'yyyy-MM-dd';
    }

    var dateObj = this;
    var weekKorName = ['\uc77c', '\uc6d4', '\ud654', '\uc218', '\ubaa9', '\uae08', '\ud1a0'];
    var weekKorFullName = ['\uc77c\uc694\uc77c', '\uc6d4\uc694\uc77c', '\ud654\uc694\uc77c', '\uc218\uc694\uc77c', '\ubaa9\uc694\uc77c', '\uae08\uc694\uc77c', '\ud1a0\uc694\uc77c'];

    return format.replace(/(yyyy|yy|MM|dd|e|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return dateObj.getFullYear();
            case "yy": return (dateObj.getFullYear() % 1000).toString().lpad(2, '0');
            case "MM": return (dateObj.getMonth() + 1).toString().lpad(2, '0');
            case "dd": return dateObj.getDate().toString().lpad(2, '0');
            case 'e' : return weekKorName[dateObj.getDay()];
            case "E": return weekKorFullName[dateObj.getDay()];
            case "HH": return dateObj.getHours().toString().lpad(2, '0');
            case "hh": return ((h = dateObj.getHours() % 12) ? h : 12).toString().lpad(2, '0');
            case "mm": return dateObj.getMinutes().toString().lpad(2, '0');
            case "ss": return dateObj.getSeconds().toString().lpad(2, '0');
            case "a/p": return dateObj.getHours() < 12 ? "\uc624\uc804" : "\uc624\ud6c4";
            default: return $1;
        }
    });
};

var DateUtil = {

    delimDate : '-',
    delimHour : ':',

    format : {
        'default'  : 'yyyy-MM-dd',
	    'time'     : 'HH:mm:ss',
	    'dateTime' : 'yyyy-MM-dd"T"HH:mm:ss'
    },

    weekKorName : ['\uc77c', '\uc6d4', '\ud654', '\uc218', '\ubaa9', '\uae08', '\ud1a0'],
    weekKorFullName : ['\uc77c\uc694\uc77c', '\uc6d4\uc694\uc77c', '\ud654\uc694\uc77c', '\uc218\uc694\uc77c', '\ubaa9\uc694\uc77c', '\uae08\uc694\uc77c', '\ud1a0\uc694\uc77c'],

    /**
     * \ub0a0\uc9dc, \uc2dc\uac04 \uad6c\ubd84\uc790 \uc81c\uac70\ud558\uc5ec \ubc18\ud658
     * @param date string
     * @return date
     */
    removeDelim : function(date) {
        return date.replace(eval('/' + this.delimDate + '/g'), '').replace(eval('/' + this.delimHour + '/g'), '').replace(/\s/g, '');
    },

    /**
     * \ub0a0\uc9dc, \uc2dc\uac04 \uad6c\ubd84\uc790 \ucd94\uac00\ud558\uc5ec \ubc18\ud658
     * @param date string
     * @return date
     */
    addDelim : function(date) {
        date = this.removeDelim(date);
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
    },

    /**
     * @param date string
     * @param day number
     * @return date
     */
    addDays : function(date, day) {
        if (!this.isValidDate(date) || !NumberUtil.isNumber(day)) {
            return '1900' + this.delimDate + '01' + this.delimDate + '01';
        }
        date = this.removeDelim(date);

        var year  = date.substring(0, 4);
        var month = date.substring(4, 6);
        var date  = date.substring(6, 8);

        var dateObj = new Date(year, Number(month) - 1, Number(date) + Number(day));
        year  = dateObj.getFullYear();
        month = dateObj.getMonth() + 1;
        date  = dateObj.getDate();

        return year + this.delimDate + (month < 10 ? '0' : '') + month + this.delimDate + (date < 10 ? '0' : '') + date;
    },

    /**
     * \uc624\ub298 \ub0a0\uc9dc \uac00\uc838\uc624\uae30
     * @return \uc624\ub298 \ub0a0\uc9dc
     */
    getToday : function(format) {
        var dateObj = new Date();
        if (arguments.length == 0) {
            return dateObj.format(this.format.defalut);
        } else {
        	return dateObj.format(format);
        }
    },

    /**
     * \uc6d4 \ub9c8\uc9c0\ub9c9 \uc77c \uac00\uc838\uc624\uae30
     * @param date string
     * @return \ub9c8\uc9c0\ub9c9 \uc77c
     */
    getMonthLastDay : function(date) {
        date = (typeof date == 'undefined' ? this.removeDelim(this.getToday()) : this.removeDelim(date));

        var dateObj = new Date(date.substring(0, 4), date.substring(4, 6), 0);
        return dateObj.getDate();
    },

    /**
     * \uc6d4 \ub9c8\uc9c0\ub9c9 \ub0a0\uc9dc \uac00\uc838\uc624\uae30
     * @param date string
     * @return \ub9c8\uc9c0\ub9c9 \ub0a0\uc9dc
     */
    getMonthLastDate : function(date) {
        date = (typeof date == 'undefined' ? this.removeDelim(this.getToday()) : this.removeDelim(date));

        var year  = date.substring(0, 4);
        var month = date.substring(4, 6);
        var date  = 0;

        var dateObj = new Date(year, month, date);
        year  = dateObj.getFullYear();
        month = dateObj.getMonth() + 1;
        date  = dateObj.getDate();
        return year + this.delimDate + (month < 10 ? '0' : '') + month + this.delimDate + (date < 10 ? '0' : '') + date;
    },

    /**
     * \ub0a0\uc9dc \uc720\ud6a8\uc131 \ud655\uc778
     * @param date string
     * @return boolean
     */
     isValidDate : function(date) {
        if (typeof date == 'undefined') {
            return false;
        }
        date = this.removeDelim(date);

        if (date.length < 8 || !NumberUtil.isInteger(date)) {
            return false;
        }

        var year  = date.substring(0, 4);
        var month = date.substring(4, 6);
        var date  = date.substring(6, 8);

        var dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 1000 != 0 && year % 4 == 0) {
            dateList[1] = 29; // \uc724\ub144
        }
        return (0 < year && 0 < month && month <= 12 && 0 < date && date <= dateList[month - 1]);
    },

    /**
     * \uc785\ub825\uac00\ub2a5 \ucd5c\uc18c \ub0a0\uc9dc \uc720\ud6a8\uc131 \ud655\uc778
     * @param date string
     * @param minDate string
     * @return boolean
     */
    isMinDate : function(date, minDate) {
        if (!this.isValidDate(date) || !this.isValidDate(minDate)) {
            return false;
        }
        date    = this.removeDelim(date);
        minDate = this.removeDelim(minDate);

        return (minDate <= date);
    },

    /**
     * \uc785\ub825\uac00\ub2a5 \ub450 \ub0a0\uc9dc \uc0ac\uc774 \ud3ec\ud568 \uc5ec\ubd80 \ud655\uc778
     * @param date string
     * @param minDate string
     * @param maxDate string
     * @return boolean
     */
    isRangeDate : function(date, minDate, maxDate) {
        if (!this.isValidDate(date) || !this.isValidDate(minDate) || !this.isValidDate(maxDate)) {
            return false;
        }
        date    = this.removeDelim(date);
        minDate = this.removeDelim(minDate);
        maxDate = this.removeDelim(maxDate);

        return (minDate <= date && date <= maxDate);
    },

    /**
     * \uc724\ub144 \uc5ec\ubd80 \ud655\uc778
     * @param date string
     * @return boolean
     */
    isLeapYear : function(date) {
        if (typeof date == 'undefined') {
            return false;
        }
        date = this.removeDelim(date);

        if (date.length < 4 || !NumberUtil.isInteger(date)) {
            return false;
        }

        var year  = date.substring(0, 4);
        return (year % 1000 != 0 && year % 4 == 0);
     },

     /**
      * \uc785\ub825 \ubc1b\uc740 \ub450 \ub0a0\uc9dc \uac04\uaca9 \uc77c \uc218
      * @param dateA \ube44\uad50\ub300\uc0c1 \ub0a0\uc9dc
      * @param dateB \ube44\uad50\ub300\uc0c1 \ub0a0\uc9dc
      * @return \ub450 \ub0a0\uc9dc \uac04\uaca9 \uc77c \uc218
      */
     getBetweenDates : function(dateA, dateB) {
        if (arguments.length != 2) {
            return false;
        }
        dateA = this.removeDelim(dateA);
        dateB = this.removeDelim(dateB);

        if (dateA.length < 8 || !NumberUtil.isInteger(dateA) || dateB.length < 8 || !NumberUtil.isInteger(dateB)) {
            return false;
        }

        dateA = new Date(dateA.substring(0, 4), dateA.substring(4, 6) - 1, dateA.substring(6, 8));
        dateB = new Date(dateB.substring(0, 4), dateB.substring(4, 6) - 1, dateB.substring(6, 8));

        return Math.round((dateB - dateA) / (1000 * 60 * 60 * 24));
     },

     /**
      * \uc785\ub825 \ubc1b\uc740 \ub450 \ub0a0\uc9dc \uac04\uaca9 \uc6d4 \uc218
      * @param dateA \ube44\uad50\ub300\uc0c1 \ub0a0\uc9dc
      * @param dateB \ube44\uad50\ub300\uc0c1 \ub0a0\uc9dc
      * @param dateApplyYn \ud55c \ub2ec \ubbf8\ub9cc \uc77c \ubc18\uc601 \uc5ec\ubd80
      * @return \ub450 \ub0a0\uc9dc \uac04\uaca9 \uc6d4 \uc218
      */
     getBetweenMonths : function(dateA, dateB, dateApplyYn) {
        switch (arguments.length) {
            case 0:
            case 1:
                return false;
                break;
            case 2:
                dateApplyYn = true;
                break;
        }
        dateA = this.removeDelim(dateA);
        dateB = this.removeDelim(dateB);

        if (dateA.length < 8 || !NumberUtil.isInteger(dateA) || dateB.length < 8 || !NumberUtil.isInteger(dateB)) {
            return false;
        }

        dateA = new Date(dateA.substring(0, 4), dateA.substring(4, 6) - 1, dateA.substring(6, 8));
        dateB = new Date(dateB.substring(0, 4), dateB.substring(4, 6) - 1, dateB.substring(6, 8));

        var yy = dateB.getFullYear() - dateA.getFullYear();
        var mm = dateB.getMonth() - dateA.getMonth();
        var dd = dateB.getDate() - dateA.getDate();

        return (yy * 12 + mm + (dd >=0 || !dateApplyYn ? 0 : -1));
     }
};

var ElementUtil = {
    /**
     * Select Element Option 생성
     * @param selectElement Select Element
     * @param json JSON Data
     * @param itemLabel option text
     * @param itemValue option value
     * @param defaultLabel option 최상단에 보여질 text
     * @param defaultValue option 최상단에 보여질 text 해당하는 값     * @param selectedValue selected value
     */
    createOptions : function(selectElement, json, itemLabel, itemValue, defaultLabel, defaultValue, selectedValue) {
        if (arguments.length < 4) {
            alert('\uc798 \ubabb\ub41c \ud638\ucd9c\uc785\ub2c8\ub2e4.');
            return false;
        }
        var index = 0, option_value = '';
        selectElement.options.length = 0; // \ucd08\uae30\ud654
        switch (arguments.length) {
            case 5 :
                selectElement.options[index++] = new Option(defaultLabel, '');
                break;
            case 6 :
                selectElement.options[index++] = new Option(defaultLabel, defaultValue);
                break;
            case 7 :
                if (defaultLabel == null || defaultLabel == '') {
                    break;
                }
                if (defaultValue == null || defaultValue == '') {
                    selectElement.options[index++] = new Option(defaultLabel, '');
                } else {
                    selectElement.options[index++] = new Option(defaultLabel, defaultValue);
                }
                break;
        }
        if (arguments.length == 7) {
            for (var i = 0; i < json.length; i++) {
                option_value = eval('json[' + i + '].' + itemValue);
                selectElement.options[index++] = new Option(eval('json[' + i + '].' + itemLabel), option_value, option_value == selectedValue || '', option_value == selectedValue || '');
            }
        } else {
           for (var i = 0; i < json.length; i++) {
                selectElement.options[index++] = new Option(eval('json[' + i + '].' + itemLabel), eval('json[' + i + '].' + itemValue));
            }
        }
    },

    /**
     * \uc0ac\uc6a9\uc790\uc785\ub825 keyCode \uac12\uc5d0 \ub530\ub77c ElementFocus \uc870\uc815\ud55c\ub2e4. (hidden, readonly, disabled \uc18d\uc131\uc744 \uac00\uc9c4 Element \uc81c\uc678)<br>
     * &nbsp; keyCode Enter : Next Elemenet \uc774\ub3d9<br>
     * &nbsp; keyCode Up/Down : \uac19\uc740 Name\uc744 \uac00\uc9c4 Element \uc774\ub3d9
     * @param evt window event Object
     * @param element HTML Object
     */
    moveFocus : function(evt, element) {
        var keyCode = (window.event) ? window.event.keyCode : evt.which;
        if (keyCode == KeyCode.ENTER) {
            ElementUtil.nextFocus(element);
        } else if (keyCode == KeyCode.UP || keyCode == KeyCode.DOWN) {
            if (element.type == 'select-one' || element.type == 'select-multiple') {
                // selet box focus move skip!
                return true;
            } else if (typeof element.name == 'undefined' || element.name == '') {
                return true;
            }
            var elements = document.getElementsByName(element.name);
            if (elements.length <= 1) {
                return true;
            }
            var index = -1;
            for (var idx = 0; idx < elements.length; idx++) {
                if (element == elements[idx]) {
                    index = idx;
                    break;
                }
            }
            while (true) {
                if (keyCode == KeyCode.UP && index > 0) {
                    index--;
                } else if (keyCode == KeyCode.DOWN && index < elements.length - 1) {
                    index++;
                } else {
                    break;
                }
                var move_element = elements[index];
                if (move_element.type == 'hidden'
                        || move_element.readOnly || move_element.disabled
                        || move_element.style.display == 'none' || move_element.style.visibility == 'hidden') {
                    continue;
                }
                move_element.focus();
                break;
            }
        }
        return true;
    },

    /**
     * \ud604\uc7ac Element\uc5d0\uc11c \ub2e4\uc74c Element\ub85c Focus\ub97c \uc870\uc815\ud55c\ub2e4. (hidden, readonly, disabled \uc18d\uc131\uc744 \uac00\uc9c4 Element \uc81c\uc678)
     * @param element HTML Object
     */
    nextFocus : function(element) {
        var elements = [], dummy = document.getElementsByTagName('*');
        for (var idx = 0; idx < dummy.length; idx++) {
            if (/input|select|textarea|button/i.test(dummy[idx].nodeName)) {
                elements.push(dummy[idx]);
            }
        }
        var index = -1;
        for (var idx = 0; idx < elements.length; idx++) {
            if (element == elements[idx]) {
                index = idx;
                break;
            }
        }
        if (index == -1 || (index + 1 == elements.length)) {
            return true;
        }
        for (var index = index + 1; index < elements.length; index++) {
            var move_element = elements[index];
            if (move_element.type == 'hidden'
                    || move_element.readOnly || move_element.disabled
                    || move_element.style.display == 'none' || move_element.style.visibility == 'hidden') {
                continue;
            }
            move_element.focus();
            break;
        }
        return true;
    }
};

var WindowUtil = {
    /**
     * \ucc3d \uc5f4\uae30
     */
    open : function(options) {
        var settings = {
            centerBrowser:1, // center window over browser window? {1 (YES) or 0 (NO)}. overrides top and left
            centerScreen:0,  // center window over entire screen? {1 (YES) or 0 (NO)}. overrides top and left
            height:500,      // sets the height in pixels of the window.
            left:0,          // left position when the window appears.
            location:0,      // determines whether the address bar is displayed {1 (YES) or 0 (NO)}.
            menubar:0,       // determines whether the menu bar is displayed {1 (YES) or 0 (NO)}.
            resizable:1,     // whether the window can be resized {1 (YES) or 0 (NO)}. Can also be overloaded using resizable.
            scrollbars:0,    // determines whether scrollbars appear on the window {1 (YES) or 0 (NO)}.
            status:0,        // whether a status line appears at the bottom of the window {1 (YES) or 0 (NO)}.
            width:500,       // sets the width in pixels of the window.
            windowName:null, // name of window set from the name attribute of the element that invokes the click
            windowURL:null,  // url used for the popup
            top:0,           // top position when the window appears.
            toolbar:0        // determines whether a toolbar (includes the forward and back buttons) is displayed {1 (YES) or 0 (NO)}.
        };

        for (var i in options) {
            settings[i] = options[i];
        }

        var windowFeatures = 'height=' + settings.height +
                             ',width=' + settings.width +
                             ',toolbar=' + settings.toolbar +
                             ',scrollbars=' + settings.scrollbars +
                             ',status=' + settings.status +
                             ',resizable=' + settings.resizable +
                             ',location=' + settings.location +
                             ',menuBar=' + settings.menubar;

        settings.windowName = this.name || settings.windowName;
        settings.windowURL = this.href || settings.windowURL;

        var centeredY, centeredX;
        var win = "";
        if (settings.centerBrowser) {
            var useragent = navigator.userAgent;
            if (useragent.indexOf('MSIE') > 0) { //hacked together for IE browsers
                centeredY = (window.screenTop - 120) + (((document.documentElement.clientHeight + 120)/2) - (settings.height/2));
                centeredX = window.screenLeft + (((document.body.offsetWidth + 20)/2) - (settings.width/2));
            } else {
                centeredY = window.screenY + (((window.outerHeight/2) - (settings.height/2)));
                centeredX = window.screenX + (((window.outerWidth/2) - (settings.width/2)));
            }
            win = window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY);
        } else if (settings.centerScreen) {
            centeredY = (screen.height - settings.height)/2;
            centeredX = (screen.width - settings.width)/2;
            win = window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + centeredX +',top=' + centeredY);
        } else {
        	win = window.open(settings.windowURL, settings.windowName, windowFeatures+',left=' + settings.left +',top=' + settings.top);
        }
        
        if(win != null){ win.focus(); }
        return true;
    },

    /**
     * \ucc3d \ub2eb\uae30
     */
    close : function() {
        setTimeout(function() { top.window.opener = top; top.window.open('','_parent',''); top.window.close(); } );
    }
};

/**
 * 이메일의 유효성을 체크
 * @param \uc774\uba54\uc77c
 * @return boolean
 */
String.prototype.isEmail = function() {
//    return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/).test(this.trim());
//    return (/^\w{4,15}@([\w-]+\.){1,4}([-.]\w+$/).test(this.trim());
    return (/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,3}$/).test(this.trim());

}

/**
 * 이메일의 유효성을 체크(세미콜론으로 구분된 다중이메일 체크)
 * @param \uc774\uba54\uc77c
 * @return boolean
 */
String.prototype.isEmail2 = function() {
	var email = this;
	if(email.indexOf(";") > 0) {
		var emailArr = email.split(";");
		for(var i = 0; i < emailArr.length; i++) {
			if(!emailArr[i].isEmail()){
				return false;
			}
		}
	} else {
		if(!this.isEmail()) {
			return false;
		}
	}
	return true;
}

/**
 * 마지막 세미콜론 제거
 */
var delLastSemi = function(obj) {
	var val = obj.val();
	// 제일 마지막 세미콜론은 제거해줌.
	if(val.length == val.lastIndexOf(";") + 1) {
		obj.val(val.substring(0,val.lastIndexOf(";")));
	}
	return obj.val();
}

/**
 * \uc804\ud654\ubc88\ud638 \uccb4\ud06c - arguments[0] : \uc804\ud654\ubc88\ud638 \uad6c\ubd84\uc790
 * @param \uc804\ud654\ubc88\ud638
 * @return boolean
 */
String.prototype.isPhone = function() {
    /*var arg = arguments[0] ? arguments[0].repalce(/-/gi, '') : "";    
    return eval("(/(02|0[3-9]{1}[0-9]{1})" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");*/
    //return (/^[\+-]?\d+[.]?\d*$/).test(this.replace(/-/gi, ''));
    return this.isPhoneNumber();
}

/**
 * \ud578\ub4dc\ud3f0\ubc88\ud638 \uccb4\ud06c - arguments[0] : \ud578\ub4dc\ud3f0 \uad6c\ubd84\uc790
 * @param \ud578\ub4dc\ud3f0\ubc88\ud638
 * @return boolean
 */
String.prototype.isMobile = function() {
    //var arg = arguments[0] ? arguments[0] : "";
    //return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");
    return this.isPhoneNumber();
}

/**
 * \uc8fc\ubbfc\ubc88\ud638 \uccb4\ud06c - arguments[0] : \uc8fc\ubbfc\ubc88\ud638
 * @param \uc8fc\ubbfc\ubc88\ud638
 * @return boolean
 */
String.prototype.isJumin = function() {
    var arg = arguments[0] ? arguments[0] : "";
    if(this.toString()  == "9999999999999"){
 	   return true;
    }
    var jumin = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[1234]{1}[0-9]{6}$/)");
    
    if(jumin == null) {
        return false;
    }
    else {
        jumin = jumin.toString().num().toString();
    }

    // \uc0dd\ub144\uc6d4\uc77c \uccb4\ud06c
    var birthYY = (parseInt(jumin.charAt(6)) == (1 ||2)) ? "19" : "20";
    birthYY += jumin.substr(0, 2);
    var birthMM = jumin.substr(2, 2) - 1;
    var birthDD = jumin.substr(4, 2);
    var birthDay = new Date(birthYY, birthMM, birthDD);
    if(birthDay.getYear() % 100 != jumin.substr(0,2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {
        return false;
    }

    var sum = 0;
    var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    var last = parseInt(jumin.charAt(12));
    for(var i = 0; i < 12; i++) {
        sum += parseInt(jumin.charAt(i)) * num[i];
    }
    return ((11 - sum % 11) % 10 == last) ? true : false;
}


/**
 * \uc8fc\ubbfc\ubc88\ud638 \uccb4\ud06c - arguments[0] : \uc8fc\ubbfc\ubc88\ud638
 * @param \uc8fc\ubbfc\ubc88\ud638
 * @return boolean
 */
String.prototype.isJumin2 = function() {
    var arg = arguments[0] ? arguments[0] : "";
    var jumin = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[1234]{1}[0-9]{6}$/)");
    if(jumin == null) {
        return false;
    }
    else {
        jumin = jumin.toString().num().toString();
    }
    
    // \uc0dd\ub144\uc6d4\uc77c \uccb4\ud06c
    var year = Number(jumin.charAt(6));
    var birthYY = (year==1||year==2||year==5||year==6) ? "19" : "20";
    birthYY += jumin.substr(0, 2);
    var birthMM = jumin.substr(2, 2) - 1;
    var birthDD = jumin.substr(4, 2);
    var birthDay = new Date(birthYY, birthMM, birthDD);
    if(birthDay.getYear() % 100 != jumin.substr(0,2) || birthDay.getMonth() != birthMM || birthDay.getDate() != birthDD) {
        return false;
    }

    var sum = 0;
    var num = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
    var last = parseInt(jumin.charAt(12));
    for(var i = 0; i < 12; i++) {
        sum += parseInt(jumin.charAt(i)) * num[i];
    }
    return ((11 - sum % 11) % 10 == last) ? true : false;
}

/**
* IP\uc720\ud6a8\uc131 \ud655\uc778
* @return boolean
*/
String.prototype.isIP = function() {
	return (/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/).test(this);
}

/**
 * \uc0ac\uc5c5\uc790\ubc88\ud638 \uc720\ud6a8\uc131 \ud655\uc778
 * @return boolean
 */
String.prototype.isBizNum = function() {
    var bizNum = this.replace(/-/g, '');

    if (!(/^[\+-]?[\d]+$/).test(bizNum)) {
        return false;
    }

    if (typeof DevMode != 'undefined' && DevMode) {
        return true;
    }

    //\uc0ac\uc5c5\uc790\ubc88\ud638\uac00 10\uc790\ub9ac\uc774\uba74 \uc815\ud569\uc131\uccb4\ud06c\ud558\uc9c0 \uc54a\uace0 \uc815\uc0c1\uc73c\ub85c \ucc98\ub9ac 
    if ( bizNum.length != 10 ) {
    	return false;
    } else {
    	return true;
    }

    var sum = 0, cal_list = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    for (var i = 0; i < 9; i++) {
        sum += bizNum.charAt(i) * cal_list[i] % 10;
    }
    sum += Math.floor(bizNum.charAt(8) * 5 /10);
    sum += Number(bizNum.charAt(9));
    return (sum % 10 == 0);
};

/**
 * \uc0ac\uc5c5\uc790\ubc88\ud638 \uc720\ud6a8\uc131 \ud655\uc778
 * @return boolean
 */
String.prototype.isBizNum2 = function() {
	var bizNum = this.replace(/-/g, '');
	
	if (!(/^[\+-]?[\d]+$/).test(bizNum)) {
		return false;
	}
	
	if (typeof DevMode != 'undefined' && DevMode) {
		return true;
	}
	
	//\uc0ac\uc5c5\uc790\ubc88\ud638\uac00 10\uc790\ub9ac\uc774\uba74 \uc815\ud569\uc131\uccb4\ud06c\ud558\uc9c0 \uc54a\uace0 \uc815\uc0c1\uc73c\ub85c \ucc98\ub9ac 
	if ( bizNum.length != 10 ) {
		return false;
	}
	
	var sum = 0, cal_list = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	for (var i = 0; i < 9; i++) {
		sum += bizNum.charAt(i) * cal_list[i] % 10;
	}
	sum += Math.floor(bizNum.charAt(8) * 5 /10);
	sum += Number(bizNum.charAt(9));
	return (sum % 10 == 0);
};

var FormatUtil = {
    /**
     * \uc0ac\uc5c5\uc790\ubc88\ud638 \uc720\ud6a8\uc131 \ud655\uc778
     * @param \uc0ac\uc5c5\uc790\ubc88\ud638
     * @return boolean
     */
    isBizNum : function(bizNum) {
        bizNum = bizNum.replace(/-/g, '');

        if (!(/^[\+-]?[\d]+$/).test(bizNum)) {
            return false;
        }

        if (typeof DevMode != 'undefined' && DevMode) {
            return true;
        }
        
        //\uc0ac\uc5c5\uc790\ubc88\ud638\uac00 10\uc790\ub9ac\uc774\uba74 \uc815\ud569\uc131\uccb4\ud06c\ud558\uc9c0 \uc54a\uace0 \uc815\uc0c1\uc73c\ub85c \ucc98\ub9ac 
        if ( bizNum.length != 10 ) {
        	return false;
        } else {
        	return true;
        }

        var sum = 0, cal_list = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
        for (var i = 0; i < 9; i++) {
            sum += bizNum.charAt(i) * cal_list[i] % 10;
        }
        sum += Math.floor(bizNum.charAt(8) * 5 /10);
        sum += Number(bizNum.charAt(9));
        return (sum % 10 == 0);
    }
};

/*
 * RadioGetValue
 * radio\ubc84\ud2bc\uc758 \uc120\ud0dd\ud55c \uac12\uc744 \ubc18\ud658\ud55c\ub2e4.
 *
 * @param objRadio - Radio\ubc84\ud2bc\uac1d\uccb4
 * @return val     - Radio\ubc84\ud2bc\uac1d\uccb4\uc758 value
 */
var iobject     = new Object();     /* 8. \ucee8\ud2b8\ub864 \uac1d\uccb4           */

iobject.RadioGetValue = function(objRadio)
{
    var val = "";
    if (objRadio.length)
    {
        for (var i=0; i<objRadio.length; i++)
        {
            if (objRadio[i].checked == true)
            {
                val = objRadio[i].value;
                break;
            }
        }
    }
    else
    {
        if (objRadio.checked)
        {
            val = objRadio.value;
        }
    }
    return  val;
}

/**
 * \ub9cc\ub098\uc774\uacc4\uc0b0
 * @param \uc8fc\ubbfc\ubc88\ud638
 * @return Number
 */
String.prototype.isAge = function() {
    var arg = arguments[0] ? arguments[0] : "";
    var jumin = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[12345678]{1}[0-9]{6}$/)");
    if(jumin == null) {
        return 0;
    }
    else {
        jumin = jumin.toString().num().toString();
    }
    
    var year = Number(jumin.charAt(6));
    var birthYY = (year==1||year==2||year==5||year==6) ? "19" : "20";
    birthYY += jumin.substr(0, 2);
    var birthMM = jumin.substr(2, 2) - 1;
    var birthDD = jumin.substr(4, 2);
    var birthDay = new Date(birthYY, birthMM, birthDD);
    
    var today = new Date();
    var result = 0;
    
	var subYear 	= (today.getYear() - birthYY)+1900;
	var subMonth	= today.getMonth() - birthMM;
	var subDay		= today.getDate() - birthDD;

	if(subYear > 0) {
		result = subYear + 1;		// 한국형나이로 만들기

		if (subMonth > 0) {
			result = result - 1;
		} else if (subMonth == 0 && subDay >= 0) {
			result = result - 1;
		} else {
			result = result - 2;
		}

	}
	
	return result;
}

/**
 * sex
 * @param 주민번호
 * @return string
 */
String.prototype.isSex = function() {
	var arg = arguments[0] ? arguments[0] : "";
	var jumin = eval("this.match(/[0-9]{2}[01]{1}[0-9]{1}[0123]{1}[0-9]{1}" + arg + "[1234]{1}[0-9]{6}$/)");
	if(jumin == null) {
		return null;
	}
	else {
		jumin = jumin.toString().num().toString();
	}
	
	var jNum = jumin.substr(6, 1);
	
	if(jNum == "1" || jNum == "3" || jNum == "5") {
		return "M";
	} else if(jNum == "2" || jNum == "4" || jNum == "7" ) {
		return "F";
	}
	
}
