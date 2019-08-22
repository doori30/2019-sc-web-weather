// 전역변수
var cityId ;
var key = 'a6c692ea762f08aebb214349fd9fa75f';
var units = 'metric';
var dailyAPI = 'https://api.openweathermap.org/data/2.5/weather';
var weeklyAPI = 'https://api.openweathermap.org/data/2.5/forecast';
//https://api.openweathermap.org/data/2.5/weather(파일명)?(변수를 줌 - get방식)&(추가)
//https://api.openweathermap.org/data/2.5/weather?id=a6c692ea762f08aebb214349fd9fa75f&units=metric&id=1835848
//https://api.openweathermap.org/data/2.5/forecast?id=a6c692ea762f08aebb214349fd9fa75f&units=metric
var cityURL ="../json/city.json";
var dailyURL = dailyAPI + '?appid=' + key + '&units=' + units ;
var weeklyURL = weeklyAPI + '?appid=' + key + '&units=' + units ;

// 프로그램 시작
init();
function init() {
	wrapChg("M");
	$.ajax({
		type: "get",
		url: cityURL,
		dataType: "json",
		success: cityFn
	});
}
$(".navi > li").click(function(){
	if($(this).index() == 0) init();
	else if($(this).index() == 1) wrapChg("D");
	else wrapChg("W");
});

// 화면 Show/Hide
function wrapChg(type) {
	if(type == 'D') {
		$(".navi > li").removeClass("navi-sel");
		$(".navi").eq(0).find("li").eq(1).addClass("navi-sel");
		$(".wrap-daily").show();
		$(".wrap-weekly").hide();
		$(".wrap-main").hide();
	}
	else if(type == 'W') {
		$(".navi > li").removeClass("navi-sel");
		$(".navi").eq(1).find("li").eq(2).addClass("navi-sel");
		$(".wrap-daily").hide();
		$(".wrap-weekly").show();
		$(".wrap-main").hide();
	}
	else {
		$(".wrap-daily").hide();
		$(".wrap-weekly").hide();
		$(".wrap-main").show();
	}
}


// 도시정보 가져오기
function cityFn(res) {
	var cities = res.cities;
	$("#cities").empty();
	$("#cities").append('<option value="" selected>도시를 선택해 주세요.</option>');
	for(var i in cities) {
		$("#cities").append('<option value="'+cities[i].id+'">'+cities[i].name+'</option>');
	}
	$("#cities").change(function(){
		cityId = $(this).val();
		$.ajax({
			type: "get",
			url: dailyURL + "&id=" + cityId,
			dataType: "json",
			success: dailyFn
		});
		$.ajax({
			type: "get",
			url: weeklyURL + "&id=" + cityId,
			dataType: "json",
			success: weeklyFn
		});
	});
}

// 데일리정보 가져오기
function dailyFn(res) {
	//console.log(res);
	var $d = $(".wrap-daily > .conts");
	$d.empty();
	/*
	$d.append(res.base+'<br>');
	$d.append(res.clouds.all+'<br>');
	$d.append(res.code+'<br>');
	$d.append(res.coord.lon+'<br>');
	$d.append(res.coord.lat+'<br>');
	$d.append(res.main.temp+'<br>');
	$d.append(res.main.pressure+'<br>');
	$d.append(res.main.humidity+'<br>');
	$d.append(res.weather[0].description+'<br>');
	$d.append(res.weather[0].icon+'<br>');
	$d.append(res.weather[0].main+'<br>');
	*/
	$d.append('<div class="text-center fa-3x py-3">오늘의 날씨</div>');
	$d.append('<div class="text-center py-3"><img src="../img/icon/'+res.weather[0].icon+'.png" class="w-50"></div>');
	$d.append('<div class="text-center fa-2x py-3">현재온도: <b>'+res.main.temp+'</b>℃</div>');
	$d.append('<div class="text-center fa-2x py-3">현재날씨: <b>'+res.weather[0].main+'</b></div>');
	wrapChg("D");
}

// weekly정보 가져오기
//프로그램의 모든 시간대는 영국-그리니치천문대를 기준으로 움직인다.
//한국은 영국 시간의 +9시간
//Thu Aug 22 2019 14:38:14 GMT+0900 (한국 표준시)(시간-상대적)
//dt: 1566453600->time stamp
//->
function weeklyFn(res) {
	console.log(new Date());
	console.log(res);
	var html = '';
	var $w = $(".wrap-weekly > .conts");
	$w.empty();
	for(var v of res.list){
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
			<li class="w-date">${v.dt_txt}</li>
		</ul>
	</li>`;
	$w.append(html);
	}
}