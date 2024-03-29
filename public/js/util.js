//'2019년 8월 11일 11시 11분 11초' 형식으로 보내주는 함수
function dspDate(d, type = 0) {
	// 기본 (parameter)값을 지정해 줄 수 있다.
	var monthArr = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", ];
	var year = d.getFullYear() + "년"; //2019
	var month = monthArr[d.getMonth()] + " "; //7 (0~11 배열)
	var day = d.getDate() + "일 "; //23 (1~31)
	var hour = d.getHours() + "시 "; //   (0~23배열)
	var min = d.getMinutes() + "분 "; //  (0~59배열)
	var sec = d.getSeconds() + "초 "; //  (0~59배열)
	var returnStr;

	/* 
	type 0: '2019년 8월 11일 11시 11분 11초'
	type 1: '2019년 8월 11일 11시 11분'
	type 2: '2019년 8월 11일 11시'
	type 3: '2019년 8월 11일 '
	type 4: 2019년 8월 11일'
	*/

	switch (type) {
		case 1:
			returnStr = year + month + day + hour + min;
		break;
		case 2:
			returnStr = year + month + day + hour;
		break;
		case 3:
		returnStr = year + month + day ;
			break;
		case 4:
		returnStr =month + day;
			break;
		default:
				returnStr = year + month + day +hour + min + sec ;
			break;
	}
	return returnStr;
}