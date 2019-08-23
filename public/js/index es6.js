// 전역변수
var key = '02efdd64bdc14b279bc91d9247db4722';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
//https://api.openweathermap.org/data/2.5/weather(파일명)?(변수를 줌 - get방식)
//https://api.openweathermap.org/data/2.5/weather?id=1835848&appid=02efdd64bdc14b279bc91d9247db4722&units=metric
var cityURL = "../json/city.json";
var dailyURL = dailyAPI + '?appid=' + key + '&units=' + units;
var weeklyURL = weeklyAPI + '?appid=' + key + '&units=' + units;

//프로그램 시작
init();

function init() {
	wrapChg("M");
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = cityFn;
	ajax.open('GET', cityURL, true); //동기&비동기 통신(일단 비동기로 진행) open과 send한 set
	ajax.send();
}

//네비게이션 이벤트 처리
//document.querySelectorAll(".navi > li")
for (var v of document.querySelectorAll(".navi>li")) {
	v.addEventListener("click", (e) => {
		switch (e.target.outerText) {
			case "DAILY":
				wrapChg("D");
				break;
			case "WEEKLY":
				wrapChg("W");
				break;
			default:
				init();
				break;
		}
		//	console.log(e.target);
		//이벤트 대상-> window e->target으로 찾아야함.
	});
}



//wrapChage - 화면 SHOW/HIDE
/* function wrapChg(type){
	switch(type){
//변수를 던짐.
//
case "D":
		document.querySelector(".wrap-daily").style.display =="block"
		document.querySelector(".wrap-weekly").style.display =="none"
		document.querySelector(".wrap-main").style.display =="none"
	break;
case "W":
		document.querySelector(".wrap-daily").style.display =="none"
		document.querySelector(".wrap-weekly").style.display =="block"
		document.querySelector(".wrap-main").style.display =="none"
	 break;
	default:
			document.querySelector(".wrap-daily").style.display =="none"
			document.querySelector(".wrap-weekly").style.display =="none"
			document.querySelector(".wrap-main").style.display =="block"
		break;
	}
} */
//function navClear(_obj) {
	//_obj.querySelectorAll("navi")

	// _obj.forEach((v,i) => {
	//	1번돌림
	// v.querySelectorAll("li").forEach((v2, i2)=>{
	// 	//2번 돌림배열을 배열로 돌림. (2번 돌음)-순수배열 of도 가능
	// 	v2.classList.remove("navi-sel");
	// });
	// });
//}

function wrapChg(type) {
	const _daily = document.querySelector(".wrap-daily");
	const _weekly = document.querySelector(".wrap-weekly");
	const _main = document.querySelector(".wrap-main");
	const _nav = document.querySelectorAll(".navi")
	//                                 ->모든 navi를 찾아줌.(배열형태)
	console.log(_nav);
	//결과 ->NodeList(2) [ul.navi.d-flex, ul.navi.d-flex]

	switch (type) {
		case "D":
			//document.querySelector(".wrap-daily").classList.replace("d-block","b-none");
			//navClear(_nav);
			//$(".navi").eq(0).find("li").eq(1).addClass("navi-sel");표현
			//	_nav[0].children[1].classList.add("navi-sel");
			//	.childNodes->주어진 요소의 모든자식 노드 모음( collection )을 반환합니다
			//  .children -> 어떤 요소의 자식 요소를 선택합니다.(배열)
			_daily.classList.add("d-block");
			_daily.classList.remove("d-none");
			_weekly.classList.add("d-none");
			_weekly.classList.remove("d-block");
			_main.classList.add("d-none");
			_main.classList.remove("d-block");
			break;
		case "W":
			//	_nav[1].children[2].classList.add("navi-sel");
			_daily.classList.add("d-none");
			_daily.classList.remove("d-block");
			_weekly.classList.add("d-block");
			_weekly.classList.remove("d-none");
			_main.classList.add("d-none");
			_main.classList.remove("d-block");
			break;
		default:
			_daily.classList.add("d-none");
			_daily.classList.remove("d-block");
			_weekly.classList.add("d-none");
			_weekly.classList.remove("d-block");
			_main.classList.add("d-block");
			_main.classList.remove("d-none");
			break;
	}
}

//도시정보 가져오기
function cityFn() {
	if (this.readyState == 4 && this.status == 200) {
		var _city = document.querySelector("#cities");
		var res = JSON.parse(this.responseText).cities;
		/* var ajax = new XMLHttpRequest(); //위랑 범위가 다름..다른 변수임. */
		//객체지향으로 하게 되면 한 곳에서 간편하게 작업할 수 있다.;;;;맞나...??
		_city.innerHTML ='<option value ="" selected>도시를 선택해 주세요!</option>';
		for (var v of res) _city.innerHTML += `<option value ="${v.id}">${v.name}</option>`;

	/* 	var _city = document.querySelector("#cities"); //_로 시작한 변수는 DOM객체
		var _elem = document.createElement('option');
		var title = document.createTextNode('도시를 선택해 주세요!');
		_elem.appendChild(title);
		_elem.setAttribute('value',"");
		_elem.setAttribute('selected',"selected");
		document.querySelector("#cities").innerHTML = "";
		document.querySelector("#cities").appendChild(_elem);
		//<option value ="" selected>도시를 선택해 주세요!</option>
		for(var i in res){
			_elem = document.createElement('option');
			title = document.createTextNode(res[i].name);//도시명
			_elem.setAttribute ('value', res[i].id); //id
			_elem.appendChild(title);
			// document.querySelector("#cities").appendChild(elem);
			_city.appendChild(_elem);
		}
	*/
	_city.addEventListener("change", function (e) {
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = dailyFn;
		ajax.open('GET', dailyURL + "&id=" + e.target.value, true);
		ajax.send();
		var ajax2 = new XMLHttpRequest();
		ajax2.onreadystatechange = weeklyFn;
		ajax2.open('GET', weeklyURL + "&id=" + e.target.value, true);
		ajax2.send();
	});
}
}


//데일리정보 가져오기
function dailyFn() {
	if (this.readyState == 4 && this.status == 200) {
		let res = JSON.parse(this.responseText);
		//고정값
		let iconSrc = `../img/icon/${res.weather[0].icon}.png`;
		let temp = `현재온도 <b>${res.main.temp}</b> ℃`;
		let desc = `현재날씨 ${res.weather[0].main}`;
		//↓ DOM
		let _wrap = document.querySelector(".wrap-daily").querySelector(".conts");
		let _title = document.createElement("div");
		let _img = document.createElement("div");
		let _temp = document.createElement("div");
		let _desc = document.createElement("div");
		_title.innerHTML = '오늘의 날씨';
		_img.innerHTML = `<img src="${iconSrc}" class="w-100 daily-img">`;
		// 문자열 안에  넣을 시 ${}로 넣어서 변수를 넣을 수 있다. enter를 해도 상관없이 적용된다.
		_temp.innerHTML = temp;
		_desc.innerHTML = desc;
		_title.setAttribute("class", "text-center py-3 fa-3x");
		_img.setAttribute("class", "text-center py-3");
		_temp.setAttribute("class", "text-center py-3 fa-2x");
		_desc.setAttribute("class", "text-center py- fa-2x");
		_wrap.innerHTML = '';
		_wrap.appendChild(_title);
		_wrap.appendChild(_img);
		_wrap.appendChild(_temp);
		_wrap.appendChild(_desc);
		wrapChg("D");
	}
}

//위클리 정보 가져오기
function weeklyFn() {
	if (this.readyState == 4 && this.status == 200) {
		let res = JSON.parse(this.responseText);
		var kts;
		var html = '';
		var _conts = document.querySelector(".wrap-weekly > .conts");
		_conts.innerHTML = "";
		for (var v of res.list) {
			kts = new Date(new Date(v.dt_txt).getTime() + (9 * 60 * 60 * 1000));
			html = `
		<li class="w-item">
		<div>
			<img src="../img/icon/${v.weather[0].icon}.png" class="w-100">
		</div>
		<ul>
			<li class="w-temp">
				<span>${v.main.temp}</span>℃
			</li>
			<li class="w-desc">
				<span>${v.weather[0].main}</span>
				<span>${v.weather[0].description}</span>
			</li>
			<li class="w-date">${dspDate(kts, 2)} 예보</li>
		</ul>
	</li>`;
			_conts.innerHTML += html;
		}
	}
}
/* var ax = new XMLHttpRequest();
ajax.onreadystatechange = cityfn;
ajax.open('GET', cityURL , true);
if(this.readystatechange == 4 && this.status == 200) 
↕
	$.ajax({
		type: "get",
		url: cityURL,
		dataType: "json",
		success: cityFn 
		//	success: function(res) 
	})*/

