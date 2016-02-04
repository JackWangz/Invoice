/*
*	2016/02/01
*	Invoice.js
*	By JackWang 
*/

function Invoice(){
	var prizes = [];

	this.getAllPrizeNumber = getAllPrizeNumber;
	this.getSpecialPrize = getSpecialPrize;
	this.getTopPrize = getTopPrize;
	this.getFirstPrize = getFirstPrize;
	this.getAdditionalPrize = getAdditionalPrize;
	this.checkInputNumber = checkInputNumber;

	//Get all numbers refer to each prizes
	function getAllPrizeNumber(){
		var appElement = document.querySelector('[ng-app=Parser]');
		var appScope = angular.element(appElement).scope();
		var controllerScope = appScope.$$childHead;
		var prizeFromScope = controllerScope.prizes;

		for (var i = 0; i < prizeFromScope.length; i++) {
			if(prizeFromScope[i].Title == '特別獎'){
				prizes["特別獎"] = prizeFromScope[i].Number;
			}
			else if(prizeFromScope[i].Title == '特獎'){
				prizes["特獎"] = prizeFromScope[i].Number;
			}
			else if(prizeFromScope[i].Title == '頭獎'){
				prizes["頭獎"] = prizeFromScope[i].Number;
			}
			else if(prizeFromScope[i].Title == '增開六獎'){
				prizes["增開六獎"] = prizeFromScope[i].Number;
			}
		}
	}

	//Check the input number
	function checkInputNumber(input){
		var result = null;

		if(input.length == 3){
			if(result = isSixthPrize(input)){
			}else{result = isAdditionalPrize(input);}
		}else if(input.length == 4){
			result = isFifthPrize(input);
		}else if(input.length == 5){
			result = isForthPrize(input);
		}else if(input.length == 6){
			result = isThirdPrize(input);
		}else if(input.length == 7){
			result = isSecondPrize(input);	
		}else if(input.length == 8){
			if(result = isSpecialPrize(input)){
			}else if (result = isTopPrize(input, 8)){
			}else { result = isFirstPrize(input, 8);}
		}else{
			console.log('Numbers of input error!');
		}

		//not get it
		if(result == null){
			return null
		//if get it
		}else{
			return result;
		}
	}

	//is...
	function isSpecialPrize(n, i){
		
		if(n == prizes['特別獎']){
			return '特別獎';
		}else
			return null;
	}

	function isTopPrize(n, i){
		if(n == prizes['特獎']){
			return '特獎';
		}else
			return null;
	}

	function isFirstPrize(n){
		var firstprize = prizes['頭獎'].split('、');

		for (var i = 0; i < firstprize.length; i++) {
			if(n == firstprize[i])
				return '頭獎';
		}
		return null;
	}

	function isSecondPrize(n){
		var firstprize = prizes['頭獎'].split('、');

		for (var i = 0; i < firstprize.length; i++) {
			if(n == firstprize[i].substring(1, 8))
				return '二獎';
		}
		return null;	
	}

	function isThirdPrize(n){
		var firstprize = prizes['頭獎'].split('、');

		for (var i = 0; i < firstprize.length; i++) {
			if(n == firstprize[i].substring(2, 8))
				return '三獎';
		}
		return null;		
	}

	function isForthPrize(n){
		var firstprize = prizes['頭獎'].split('、');

		for (var i = 0; i < firstprize.length; i++) {
			if(n == firstprize[i].substring(3, 8))
				return '四獎';
		}
		return null;		
	}

	function isFifthPrize(n){
		var firstprize = prizes['頭獎'].split('、');

		for (var i = 0; i < firstprize.length; i++) {
			if(n == firstprize[i].substring(4, 8))
				return '五獎';
		}
		return null;		
	}

	function isSixthPrize(n){
		var firstprize = prizes['頭獎'].split('、');

		for (var i = 0; i < firstprize.length; i++) {
			if(n == firstprize[i].substring(5, 8))
				return '六獎';
		}
		return null;		
	}

	function isAdditionalPrize(n){
		var addprize = prizes['增開六獎'].split('、');

		for (var i = 0; i < addprize.length; i++) {
			if(n == addprize[i])
				return '增開六獎';
		}
		return null;		
	}

	//Get methods
	function getSpecialPrize(){
		return prizes["特別獎"];
	}

	function getTopPrize(){
		return prizes["特獎"];
	}

	function getFirstPrize(){
		return prizes["頭獎"];
	}

	function getAdditionalPrize(){
		return prizes["增開六獎"];
	}
}
