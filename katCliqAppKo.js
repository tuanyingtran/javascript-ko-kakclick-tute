
"use strict";
/*
var cats = [
		{
			clickCount : 0,
            name : 'Alpha',
            imgSrc : 'img/Placeholder-female1.png',
			nickname: ['Zulu', 'Tango']
		},
		{
			clickCount : 0,
            name : 'Bravo',
            imgSrc : 'img/Placeholder-flwrs1.png',
			nickname: ['Yankee', 'Siera']
		},
		{
			clickCount : 0,
            name : 'Charlie',
            imgSrc : 'img/Placeholder-general1.png',
			nickname: ['Xray']
		},
		{
			clickCount : 0,
            name : 'Echo',
            imgSrc : 'img/Placeholder-location1.png',
			nickname: ['Whiskey']
		}
		
];
*/

var cats=[];
console.log("Starting...");
function readJsonFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            console.log(file);
            callback(rawFile.responseText);
           
        }
    };
    rawFile.send(null);
};

//usage:
readJsonFile("catlist.json", function(text){
    cats = JSON.parse(text);
    
    console.log(cats[0]);
});

var Cat = function(data){
	this.name = ko.observable(data.name);
	this.clickCount = ko.observable(data.clickCount);
	this.imgSrc = ko.observable(data.imgSrc);
	this.nickname = ko.observableArray(data.nickname);
	
	
	this.title = ko.computed(function(){
		var title;
		var clicks = this.clickCount();
		if(clicks<10) title = 'Newborn';
		else if(clicks<50) title = 'Infant';
		else if(clicks<100) title = 'Child';
		else if(clicks<200) title = 'Teen';
		else if(clicks<500) title = 'Adult';
		else title = 'Ninja';
		
		return title;
	}, this);
};

var ViewModel = function(){
	var self = this;
	this.catList = ko.observableArray([]);
	//for each cats push into catList
	cats.forEach(function(catItem){
		self.catList.push(new Cat(catItem))
	});
	//Set random cat at current when initial
	var randomInitCat = Math.floor(Math.random()*self.catList().length);
	this.currentCat = ko.observable(this.catList()[randomInitCat]);
	
	this.incrementCounter=function(){
		this.clickCount(this.clickCount()+1);
	}	
	
	this.setCurrentCat = function(clickedCat){
		self.currentCat(clickedCat);
		
	};
};

ko.applyBindings(new ViewModel());