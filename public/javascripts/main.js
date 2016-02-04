var app = angular.module('Parser', ['ngResource', 'ngRoute']);
var invoice = new Invoice();
app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'pages/index.html',
			controller: 'ParseCtrl'
		})
		.otherwise({
            redirectTo: '/'
        });
}]);

app.controller('ParseCtrl',['$scope', '$resource',
	function($scope, $resource){
		// var prize = $resource('/api/parser');

		// var prizes = prize.query(function(){
		// 	$scope.prizes = prizes;
		// 	// $scope.date = prizes[0].date;
		// });
		var prize = [
		{
		Title: "特別獎",
		Number: "91605081",
		Des: "同期統一發票收執聯8位數號碼與上列號碼相同者獎金1,000 萬元 "
		},
		{
		Title: "特獎",
		Number: "38187237",
		Des: "同期統一發票收執聯8位數號碼與上列號碼相同者獎金200 萬元"
		},
		{
		Title: "頭獎",
		Number: "93749881、29592686、68783835",
		Des: "同期統一發票收執聯8位數號碼與上列號碼相同者獎金20 萬元"
		},
		{
		Title: "二獎",
		Number: "",
		Des: "同期統一發票收執聯末7 位數號碼與頭獎中獎號碼末7 位相同者各得獎金4 萬元"
		},
		{
		Title: "三獎",
		Number: "",
		Des: "同期統一發票收執聯末6 位數號碼與頭獎中獎號碼末6 位相同者各得獎金1 萬元"
		},
		{
		Title: "四獎",
		Number: "",
		Des: "同期統一發票收執聯末5 位數號碼與頭獎中獎號碼末5 位相同者各得獎金4 千元"
		},
		{
		Title: "五獎",
		Number: "",
		Des: "同期統一發票收執聯末4 位數號碼與頭獎中獎號碼末4 位相同者各得獎金1 千元"
		},
		{
		Title: "六獎",
		Number: "",
		Des: "同期統一發票收執聯末3 位數號碼與頭獎中獎號碼末3 位相同者各得獎金2 百元	"
		},
		{
		Title: "增開六獎",
		Number: "076、313、056",
		Des: "同期統一發票收執聯末3 位數號碼與上列號碼相同者各得獎金2 百元"
		}];
		
		$scope.prizes = prize;
		invoice.getAllPrizeNumber();
	}]);

document.addEventListener('keydown', function(event) {
	var key = event.keyCode;
	var x = document.getElementById('inputNumber');

    if (key >= 48 && key <= 57 || key >= 96 && key <= 105)
    {
    	//Clear text
    	if(x.innerText.length >= 8)
    		x.innerText = "";
    	//Set the input number
    	x.innerText = String.fromCharCode((key >= 96 && key <= 105) ? key - 48 : key) + x.innerText;

    	//Pass when length of input numbers >= 3
    	if(x.innerText.length >= 3){
	    	//Get result
	    	var result = invoice.checkInputNumber(x.innerText);
	    	if(result == null){
	    		//call reset
	    		//Clear text
	    		x.innerText = "";
	    	}else{
	    		//call congrats
	    		alert(result);
	    	}
    	}
    }else if(key == 13){
    	x.innerText = "";
    }

});

app.filter('myFilter', function() {
  return function(prizes, numbers, searchText) {
  	console.log(prizes);
  	console.log(numbers);
  	if(typeof prizes !== 'undefined'){

  		
  		return prizes;
  	}
  }
});


// app.factory('User', function($resource){
// 	var User = $resource('/api/parser',
// 		{},
// 		{
// 			delete_user:{
// 				method: 'DELETE',
// 				params: {}
// 			}
// 		});
// 	return User;
// });

// app.controller('ParseCtrl',	function($scope, User){
// 		User.get({}, function(user){
// 			$scope.prizes = user;
// 			user.$delete_user(function(){
// 				console.log('XD');
// 			});
// 		});

// 	});
