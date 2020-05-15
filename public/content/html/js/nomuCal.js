var todayDate;

if (typeof(headerfooter_time_year) != "undefined") {
    /* 오늘의 날짜를 서버 날짜로 설정 */
    todayDate = new Date(headerfooter_time_year, headerfooter_time_month - 1, headerfooter_time_day, headerfooter_time_hour, headerfooter_time_minute, headerfooter_time_second);
} else {
	todayDate = new Date();
}

function memorialDay(name, month, day, solarLunar, holiday, type) {
    this.name = name;
    this.month = month;
    this.day = day;
    this.solarLunar = solarLunar;
    this.holiday = holiday;    /* true : 빨간날 false : 안빨간날 */
    this.type = type;    /* true : real time setting */
    this.techneer = true;
}

var memorialDays = Array (
    new memorialDay("신정", 1, 1, 1, true),
    new memorialDay("", 12, 0, 2, true, true),    /* 실시간으로 정해짐 */
    new memorialDay("설날", 1, 1, 2, true),
    new memorialDay("", 1, 2, 2, true),
    new memorialDay("삼일절", 3, 1, 1, true),
    new memorialDay("식목일", 4, 5, 1, true),
    new memorialDay("석가탄신일", 4, 8, 2, true),
    new memorialDay("어린이날", 5, 5, 1, true),
    new memorialDay("현충일", 6, 6, 1, true),
    new memorialDay("광복절", 8, 15, 1, true),
    new memorialDay("", 8, 14, 2, true),
    new memorialDay("추석", 8, 15, 2, true),
    new memorialDay("", 8, 16, 2, true),
    new memorialDay("개천절", 10, 3, 1, true),
    new memorialDay("성탄절", 12, 25, 1, true),

    new memorialDay("정월대보름", 1, 15, 2, false),
    new memorialDay("단오", 5, 5, 2, false),
    new memorialDay("국군의날", 10, 1, 1, false),
    new memorialDay("한글날", 10, 9, 1, false),
    new memorialDay("625전쟁일", 6, 25, 1, false),
    new memorialDay("삼짇날", 3, 3, 2, false),
    new memorialDay("물의날", 3, 22, 1, false),
    new memorialDay("만우절", 4, 1, 1, false),
    new memorialDay("장애인의날", 4, 20, 1, false),
    new memorialDay("과학의날", 4, 21, 1 , false),
    new memorialDay("충무공탄신일", 4, 28, 1, false),
    new memorialDay("근로자의날·법의날", 5, 1, 1, false),
    new memorialDay("어버이날", 5, 8, 1, false),
    new memorialDay("스승의날", 5, 15, 1, false),
    new memorialDay("발명의날", 5, 19, 1, false),
    new memorialDay("바다의날", 5, 31, 1, false),
    new memorialDay("환경의날", 6, 5, 1, false),
    new memorialDay("유두", 6, 15, 2, false),
    new memorialDay("칠월칠석", 7, 7, 2, false),
    new memorialDay("중양절", 9, 9, 2, false),
    new memorialDay("철도의날", 9, 18, 1, false),
    new memorialDay("소방의날", 11, 9, 1, false)
);    

function myDate(year, month, day, leapMonth)
{
    this.year = year;
    this.month = month;
    this.day = day;
    this.leapMonth = leapMonth;
}

// 음력 데이터 (평달 - 작은달 :1,  큰달:2 )
// (윤달이 있는 달 - 평달이 작고 윤달도 작으면 :3 , 평달이 작고 윤달이 크면 : 4)
// (윤달이 있는 달 - 평달이 크고 윤달이 작으면 :5,  평달과 윤달이 모두 크면 : 6)
var lunarMonthTable = [
[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],   /* 1901 */
[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
[1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
[2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
[1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
[2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
[1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
[2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2],   /* 1911 */
[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
[2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
[2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
[2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 5, 2, 2, 1, 2, 2],
[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],   /* 1921 */
[2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
[2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
[1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
[1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
[2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],   /* 1931 */
[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
[1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
[1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
[2, 1, 4, 1, 2, 1, 2, 1, 2, 2, 2, 1],
[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
[2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
[2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1],   /* 1941 */
[2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
[1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
[1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
[2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
[2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],   /* 1951 */
[1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
[1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
[1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
[2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
[2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
[1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
[2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
[2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],   /* 1961 */
[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
[2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
[1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
[1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
[2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
[1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
[1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
[2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
[1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2],   /* 1971 */
[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
[2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
[2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
[2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
[2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],   /* 1981 */
[2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
[2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
[2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
[1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
[1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
[2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
[2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
[1, 2, 1, 1, 5, 1, 2, 1, 2, 2, 2, 2],
[1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],   /* 1991 */
[1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
[1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
[2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
[1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
[1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
[1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
[2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
[2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
[2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2],   /* 2001 */
[2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
[2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
[1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
[1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 1],
[2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
[1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
[2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
[2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
[2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],   /* 2011 */
[2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
[2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
[1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
[2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
[2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
[1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
[2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
[2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
[1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],   /* 2021 */
[2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
[1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
[2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
[2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
[1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
[1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
[2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
[1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
[2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1],   /* 2031 */
[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
[1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
[2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
[2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
[2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
[2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
[2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
[2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
[2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],   /* 2041 */
[1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
[1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2]];

/* 양력 <-> 음력 변환 함수
* type : 1 - 양력 -> 음력
*        2 - 음력 -> 양력
* leapmonth : 0 - 평달
*             1 - 윤달 (type = 2 일때만 유효)
*/ 
function lunarCalc(year, month, day, type, leapmonth)
{
    var solYear, solMonth, solDay;
    var lunYear, lunMonth, lunDay;
    var lunLeapMonth, lunMonthDay;    
    var i, lunIndex;

    var solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    /* range check */
    if (year < 1900 || year > 2040) {
        alert('1900년부터 2040년까지만 지원합니다');
        return;
    }

    /* 속도 개선을 위해 기준 일자를 여러개로 한다 */
    if (year >= 2000) {
        /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
        solYear = 2000;
        solMonth = 1;
        solDay = 1;
        lunYear = 1999;
        lunMonth = 11;
        lunDay = 25;
        lunLeapMonth = 0;

        solMonthDay[1] = 29;    /* 2000 년 2월 28일 */
        lunMonthDay = 30;    /* 1999년 11월 */
    } else if (year >= 1970) {
        /* 기준일자 양력 1970년 1월 1일 (음력 1969년 11월 24일) */
        solYear = 1970;
        solMonth = 1;
        solDay = 1;
        lunYear = 1969;
        lunMonth = 11;
        lunDay = 24;
        lunLeapMonth = 0;

        solMonthDay[1] = 28;    /* 1970 년 2월 28일 */
        lunMonthDay = 30;    /* 1969년 11월 */
    } else if (year >= 1940) {
        /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
        solYear = 1940;
        solMonth = 1;
        solDay = 1;
        lunYear = 1939;
        lunMonth = 11;
        lunDay = 22;
        lunLeapMonth = 0;

        solMonthDay[1] = 29;    /* 1940 년 2월 28일 */
        lunMonthDay = 29;    /* 1939년 11월 */
    } else {
        /* 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일) */
        solYear = 1900;
        solMonth = 1;
        solDay = 1;
        lunYear = 1899;
        lunMonth = 12;
        lunDay = 1;
        lunLeapMonth = 0;

        solMonthDay[1] = 28;    /* 1900 년 2월 28일 */
        lunMonthDay = 30;    /* 1899년 12월 */
    }

    lunIndex = lunYear - 1899;

    while (true)
    {
        if (type == 1 && year == solYear && month == solMonth && day == solDay) {
            return new myDate(lunYear, lunMonth, lunDay, lunLeapMonth);
        } else if (type == 2 && year == lunYear && month == lunMonth && day == lunDay && leapmonth == lunLeapMonth) {
            return new myDate(solYear, solMonth, solDay, 0);
        }

        /* add a day of solar calendar */
        if (solMonth == 12 && solDay == 31) {
            solYear++;
            solMonth = 1;
            solDay = 1;

            /* set monthDay of Feb */
            if (solYear % 400 == 0)
                solMonthDay[1] = 29;
            else if (solYear % 100 == 0)
                solMonthDay[1] = 28;
            else if (solYear % 4 == 0)
                solMonthDay[1] = 29;
            else
                solMonthDay[1] = 28;

        } else if (solMonthDay[solMonth - 1] == solDay) {
            solMonth++;
            solDay = 1;    
        } else {
            solDay++;
		}


        /* add a day of lunar calendar */
        if (lunMonth == 12 && ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) || (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30))) {
            lunYear++;
            lunMonth = 1;
            lunDay = 1;

            lunIndex = lunYear - 1899;

            if (lunarMonthTable[lunIndex][lunMonth - 1] == 1)
                lunMonthDay = 29;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2)
                lunMonthDay = 30;
        } else if (lunDay == lunMonthDay) {
            if (lunarMonthTable[lunIndex][lunMonth - 1] >= 3 && lunLeapMonth == 0) {
                lunDay = 1;
                lunLeapMonth = 1;
            } else {
                lunMonth++;
                lunDay = 1;
                lunLeapMonth = 0;
            }

            if (lunarMonthTable[lunIndex][lunMonth - 1] == 1)
                lunMonthDay = 29;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2)
                lunMonthDay = 30;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 3)
                lunMonthDay = 29;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
                    lunLeapMonth == 0)
                lunMonthDay = 29;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 4 &&
                    lunLeapMonth == 1)
                lunMonthDay = 30;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
                    lunLeapMonth == 0)
                lunMonthDay = 30;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 5 &&
                    lunLeapMonth == 1)
                    lunMonthDay = 29;
            else if (lunarMonthTable[lunIndex][lunMonth - 1] == 6)
                lunMonthDay = 30;
        }
        else
            lunDay++;
    }
}

function getWeekday(year, month, day)
{
    var weekday = Array("일", "월", "화", "수", "목", "금", "토");
    var date = new Date(year, month - 1, day);

    if (date)
        return weekday[date.getDay()];
}

function getPassDay(year, month, day)
{
    var date = new Date(year, month - 1, day);
    var interval = Math.floor((todayDate - date) / (1000 * 60 * 60 * 24) + 1);
    return interval;
}

function getDDay(year, month, day)
{
    var date = new Date(year, month - 1, day);
    var interval = Math.floor((date - todayDate) / (1000 * 60 * 60 * 24) + 1);
    return interval;
}

function getDateSpecificInterval(year, month, day, interval)
{
    var date = new Date(year, month - 1, parseInt(day) + parseInt(interval) - 1);
    return date;
}

function memorialDayCheck(solarDate, lunarDate)
{
    var i;
    var memorial;


    for (i = 0; i < memorialDays.length; i++)
    {
        if (memorialDays[i].month == solarDate.month &&
            memorialDays[i].day == solarDate.day &&
            memorialDays[i].solarLunar == 1)
            return memorialDays[i];

        if (memorialDays[i].month == lunarDate.month &&
            memorialDays[i].day == lunarDate.day &&
            memorialDays[i].solarLunar == 2 &&
            !memorialDays[i].leapMonth)
            return memorialDays[i];
    }

    return null;
}

function clickMonth(year, month)
{
	month = month < 10 ? "0"+month : ""+month;
	//alert(year+month);
	viewMonthDetail(year+month);
}

function clickDay(year, month, day)
{
	month = month < 10 ? "0"+month : ""+month;
	day = day < 10 ? "0"+day : ""+day;
	//alert(year+month+day);
	viewDayDetail(year+"-"+month+"-"+day);
}

function goMove(mode)
{
	var year = eval(document.getElementById('dispYear').value);
	var month = eval(document.getElementById('dispMonth').value);
	var py, pm, ny, nm;

	//alert(year+"--"+month);
	
	if(month==1) {
		py = year-1;
		pm = 12;
		ny = year;
		nm = 2;
	} else if(month==12) {
		py = year;		
		pm = 11;
		ny = year+1;
		nm = 1;
	} else {
		py = year;
		pm = month-1;
		ny = year;
		nm = month+1;
	}

	if(mode=='P') {
		//setCalendar(py, pm);
		initCalendar('calendar_view', py, pm);
		clickMonth(py, pm);
	} else if(mode=='N') {
		//setCalendar(ny, nm);
		initCalendar('calendar_view', ny, nm);
		clickMonth(ny, nm);
	}
}

function setCalendar(year, month)
{
	
	var cNow = new Date();
	var cWeek = new Array('일', '월', '화', '수', '목', '금', '토');

    var i;

    if (!year)
    {
		year = cNow.getFullYear() + "";
		month = cNow.getMonth()+1;
    }
	month = month < 10 ? "0"+month : ""+month;
    

	document.getElementById('dispYear').value = year;
	document.getElementById('dispMonth').value = month;
	$('#selyear').html(year);
	$('#selmonth').html(month);

    var monthDay = Array(31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

    /* set monthDay of Feb */
    if (year % 400 == 0)
        monthDay[1] = 29;
    else if (year % 100 == 0)
        monthDay[1] = 28;
    else if (year % 4 == 0)
        monthDay[1] = 29;
    else
        monthDay[1] = 28;

    
    /* set the day before 설날 */
    if (lunarMonthTable[year - 1 - 1899][11] == 1)
        memorialDays[1].day = 29;
    else if (lunarMonthTable[year - 1 - 1899][11] == 2)
        memorialDays[1].day = 30;


    var date = new Date(year, month - 1, 1);
    var startWeekday = date.getDay();

    /* clean all day cell */
    for (i = 0; i < 42; i++)
    {
        $('#dayCell'+i).html("");
    }

    /* fill day cell */        
    for (i = 0; i < monthDay[month - 1]; i ++)
    {
        var index = startWeekday + i;
        var dayHTML;
        var memoHTML;

        var solarDate = new myDate(year, month, i + 1);
        var lunarDate = lunarCalc(year, month, i + 1, 1);

        /* memorial day */
        var memorial = memorialDayCheck(solarDate, lunarDate);

        /* 쉬지않는 기념일 */
        var memorialDay = false;
        if (memorial && memorial.holiday == false)
            memorialDay = true;

        /* day print */
        dayHTML = "<span onClick=\"clickDay("+year+", "+month+", "+(i+1)+")\" title="+year+"/"+month+"/"+(i+1)+" id='D"+(i+1)+"' style='text-decoration:none;' class=\"pointer\"><font color='COLOR' title='TITLE'>HIGHLIGHT_START" + (i+1) +"HIGHLIGHT_END</font></span>";

        /* decoration */
        if ((memorial && memorial.holiday) || index % 7 == 0)
            dayHTML = dayHTML.replace("COLOR", "#ff0000");
        else if (index % 7 == 6)
            dayHTML = dayHTML.replace("COLOR", "#0000ff");

        if (memorial)
            dayHTML = dayHTML.replace("TITLE", memorial.name);

        if (todayDate.getFullYear() == year &&
            todayDate.getMonth() + 1 == month &&
            todayDate.getDate() == i + 1)
        {
            dayHTML = dayHTML.replace("HIGHLIGHT_START", "<b>");
            dayHTML = dayHTML.replace("HIGHLIGHT_END", "</b>");
        }

        dayHTML = dayHTML.replace("TITLE", "");    
        dayHTML = dayHTML.replace("COLOR", "");
        dayHTML = dayHTML.replace("HIGHLIGHT_START", "");
        dayHTML = dayHTML.replace("HIGHLIGHT_END", "");

        $('#dayCell' + index).html(dayHTML);
        

    }
}

var dyear = todayDate.getFullYear(), dmonth = todayDate.getMonth() + 1;

function initCalendar(objid, iyear, imonth)
{
	var iyear,imonth;
	var html="";
	var	cNow = new Date();
	var cWeek = new Array('일', '월', '화', '수', '목', '금', '토');
	
	year = cNow.getFullYear();
	mt = cNow.getMonth()+1;
	mt = mt < 10 ? "0"+mt : ""+mt;
	//dt = cNow.getDate()+1;
	dt = cNow.getDate();
	dt = dt < 10 ? "0"+dt : ""+dt;
	wk = cWeek[cNow.getDay()];

	//년도가 설정되지 않은경우는 해당월을 지정한다.
	if(!iyear){
		iyear = dyear;
		imonth = dmonth;
	}
	html += "<h3 class=\"topm\"><img src=\"/images/txt/h3_login_calendar.gif\" alt=\"노무비calendar\"></h3>";
	html += "<div class=\"mainCalForm\">";
	html += "	<div class=\"blank10\"></div>";
	html += "<form name=frm1 id=frm1>";
	html += "<input type='hidden' name='dispYear' id='dispYear' value=''>";
	html += "<input type='hidden' name='dispMonth' id='dispMonth' value=''>";
	html += "	<table cellpadding=\"0\" cellspacing=\"0\" border=\"1\" class=\"mainCalTable ml_10\" summary=\"메인달력\">";
	html += "		<caption>메인달력</caption>";
	html += "		<colgroup><col width=\"225\"><col width=\"5\"><col width=\"239\"><colgroup>";
	html += "		<thead>";
	html += "			<tr><th scope=\"col\" colspan=\"3\">"+year+"년 "+mt+"월 "+dt+"일 "+wk+"요일</th></tr>";
	html += "		</thead>";
	html += "		<tbody>";
	html += "			<tr>";
	html += "				<td>";

	html += "					<table class=\"calendar_title\" width=\"100%\" border=\"1\" cellpadding=\"0\" cellspacing=\"1\">";
	html += "						<caption>달력</caption>";
	html += "						<colgroup><col width=\"30%\"><col width=\"40%\"><col width=\"30%\"><colgroup>";
	html += "						<tbody>";
	html += "							<tr>";
	html += "								<td class=\"ftl ml_5\"><img class=\"pointer mt_5\" src=\"/images/cal/btn_left.gif\" alt=\"이전달\"  onclick=\"goMove('P');\"></td>";
	html += "								<td class=\"a_center pointer\" onclick=\"clickMonth("+iyear+", "+imonth+");\"> <span id=\"selyear\"></span>년   <span id=\"selmonth\"></span>월 </td>";
	html += "								<td class=\"ftr mr_5\"><img class=\"pointer mt_5\" src=\"/images/cal/btn_right.gif\" alt=\"다음달\" onclick=\"goMove('N');\"></td>";
	html += "							</tr>";
	html += "						</tbody>";
	html += "					</table>";

	html += "					<table class=\"calendar_view\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\">";
	html += "						<caption>전체발주내역</caption>";
	html += "						<colgroup><col width=\"15%\"><col width=\"14%\"><col width=\"14%\"><col width=\"14%\"><col width=\"14%\"><col width=\"14%\"><col width=\"15%\"><colgroup>";
	html += "						<tbody>";
	html += "							<tr>";
	html += "								<td class=\"a_center\" style='color:red;'>일</td>";
	html += "								<td class=\"a_center\">월</td>";
	html += "								<td class=\"a_center\">화</td>";
	html += "								<td class=\"a_center\">수</td>";
	html += "								<td class=\"a_center\">목</td>";
	html += "								<td class=\"a_center\">금</td>";
	html += "								<td class=\"a_center\" style='color:blue;'>토</td>";
	html += "							</tr>";


    for (i = 0; i < 6; i++)
    {
        html += "<tr>";
        for (j = 0; j < 7; j++) {
            html += "<td align=center id='dayCell"+(i*7+j)+"'></td>";
        }
        html += "</tr>";
    }

    /////////////////////////////////////////////////////////////////////////// by Choi, Sungjoon

    if (typeof(rege_0_1) != "undefined" && 1900 <= rege_0_1 && rege_0_1 <= 2030)
    {
        iyear = rege_0_1;
        imonth = 1;
    }

    if (typeof(rege_0_2) != "undefined" && 1 <= rege_0_2 && rege_0_2 <= 12)
        imonth = rege_0_2;

    ///////////////////////////////////////////////////////////////////////////
    html += "						</tbody>";
	html += "					</table>";		
	html += "				</td>";
	html += "				<td></td>";
	html += "				<td><iframe name=\"calendar_detail\"  src=\"\" frameborder=\"0\" width=\"239\" height=\"166\" scrolling=\"auto\"></iframe></td>";
	html += "			</tr>";
	html += "		</tbody>";
	html += "	</table>";
	html += "	</form>";
	html += "</div>";

	$('#'+objid).html(html);
	
	//alert(iyear +"/"+ imonth);
	setCalendar(iyear, imonth);
}