
/* 
// jQuery ajax통신
function cityInit(){
	$.ajax({
		type: "get",
		url: "json/city.json",
		dataType: "json",
		success: function (res) {
			console.log(res);
		}
	});
} */
//변수의 속성에 함수를 넣음.


//전역변수
var ajax =new XMLHttpRequest();

//main - 도시정보 가져오기.
cityInit();
function cityInit(){
		var ajax = new XMLHttpRequest();
		ajax.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var cities	= JSON.parse(this.responseText).cities;		
		//  id로 DOM 접근하기 - jQuery  배열로나옴.순번을 찾으면 자바스크립트 객체로 나옴.(자바와 jQuery는 변환이 쉽다.)
		var $citySelect = $("#cities");

		//  id로 DOM 접근하기 - ES5 id로 들어가서 접근. 자바스크립트
		var citySelect5 = document.getElementById("cities");

		//  id로 DOM 접근하기 - ES6 
		var citySelect = document.querySelector("#cities");
			console.log($citySelect[0], citySelect5, citySelect );
			              //찾는명령을 주면 자바스크립트로 $를 주면 jQuery로 변환이 된다.
			 //상태가 변화되면 실행  


			 //jQuery: select#cities에 도시를 option으로 추가하기    
			/* //<option value="181122">서울</option>    
		 	for(var i in cities){
				$citySelect.append('<option value="'+cities[i].id+'">'+cities[i].name+'</option> ')
			} */

			 //ES5: select#cities에 도시를 option으로 추가하기 
			 for(var i in cities){
			/*②*/	var html = '<option value="'+cities[i].id+'">'+cities[i].name+'</option>';
			// ① document.getElementById("cities").innerHTML += '<option value="'+cities[i].id+'">'+cities[i].name+'</option>';
																									//붙이고 더해서 속성을 추가함.
			/* 	document.getElementById("cities").innerHTML  = document.getElementById("cities").innerHTML + html;
				↕  동일함.*/
				document.getElementById("cities").innerHTML += html;
				//cities를 가지고 있는 속성(변수) innerhtml을 가져옴.       (변수) ex) var a = 5 var html = a;
				console.log(document.getElementById("cities").innerHTML);
			 }
			}
		};
		ajax.open("GET", "json/city.json", true);
		//명령을 확인해서 
		ajax.send();//통신을 보내주세요
	}


/* 
var html =document.getElementById("cities").innerHTML ;

document.getElementById("cities").innerHTML =document.getElementById("cities").innerHTML+'<추가내용>'
↕ 동일함.
document.getElementById("cities").innerHTML +='<추가내용>'


html	기존값을 덮어씌움.
append 기존값은 그대로 그 다음 내용을 추가함.


 */