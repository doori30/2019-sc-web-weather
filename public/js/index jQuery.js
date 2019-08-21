// 전역변수
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

//프로그램시작
init();
function init(){
	wrapChg("M")
	$.ajax({
		type: "get",
		url: cityURL,
		dataType: "json",
		success: cityFn 
		//	success: function(res) 
	});
}

//화면 SHOW/HIDE
function wrapChg(type){
	if(type == 'D'){
		$(".wrap-daily").show();    // 영역이 겹쳐있어져야 한다.
		$(".wrap-weekly").hide();    
		$(".wrap-main").hide();    
	}
	else if(type == 'W'){
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

//도시정보 가져오기
function cityFn(res){
	var cities = res.cities;
	$("#cities").empty();
	$("#cities").append('<option class="text-center" value="" selected>도시를 선택해 주세요!</option>');
	for(var i in cities){
			$("#cities").append('<option value="'+cities[i].id+'">'+cities[i].name+'</option>');
		}
		$("#cities").change(function(){
			$.ajax({
				type: "get",
				url: dailyURL + "&id=" + $(this).val(),
				data: "data",
				dataType: "json",
				success: dailyFn 
			});
		})
}
//데일리정보 가져오기
function dailyFn(res){
console.log(res);
var $w =$(".wrap-daily");
$w.empty();

/* $w.append(res.base+'<br>');
$w.append(res.clouds.all+'<br>');
$w.append(res.code+'<br>');
$w.append(res.coord.lon+'<br>');
$w.append(res.code.lat+'<br>');
$w.append(res.main.temp+'<br>');
$w.append(res.main.pressure+'<br>');
$w.append(res.main.humidity+'<br>');
$w.append(res.weather[0].description+'<br>');
$w.append(res.weather[0].icon+'<br>');
$w.append(res.weather[0].main+'<br>'); */

$w.append('<div class="text-center fx-3">오늘의 날씨</div>');
$w.append('<div class="text-center"><img src="../img/icon/'+res.weather[0].icon+'.png" class="w-50"></div>');
$w.append('<div class="text-center fa-2x py-3">현재온도:<b>'+res.main.temp+'</b>℃ </div>');
$w.append('<div class="text-center fa-2x py-3">현재날씨:<b>'+res.weather[0].main+'</b></div>');
wrapChg("D");
}

