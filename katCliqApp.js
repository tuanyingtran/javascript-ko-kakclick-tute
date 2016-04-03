/* ***Model*** */
//TODO: load data in from Json
var model = {
	currentCat: null,
	cats: [
		{
			clickCount : 0,
            name : 'Alpha',
            imgSrc : 'img/Placeholder-female1.png'
		},
		{
			clickCount : 0,
            name : 'Bravo',
            imgSrc : 'img/Placeholder-flwrs1.png'
		},
		{
			clickCount : 0,
            name : 'Charlie',
            imgSrc : 'img/Placeholder-general1.png'
		},
		{
			clickCount : 0,
            name : 'Echo',
            imgSrc : 'img/Placeholder-location1.png'
		}
		
	]
}//model

/* ***Octopus*** */
var octopus = {
	init: function(){
		//random number to set our current cat in the list.
		randomCat = Math.floor(Math.random()* model.cats.length);
		model.currentCat = model.cats[randomCat];
		
		// Call catListView and catView to initilize
		catListView.init(); 
		catView.init();		
	},
	
	getCats: function(){
		return model.cats;
	},
	
	getCurrentCat: function(){
		//Set to 1st cat if current cat is null
		if(!model.currentCat) model.currentCat=model.cats[0];
		
		return model.currentCat;
	},
	
	setCurrentCat: function(cat){
		model.currentCat = cat;
	},
	
	incrementCounter: function(){
		model.currentCat.clickCount++;
		catView.render();
	}
}//octopus

/* ***View*** */
var catListView = {
	init:function(){
		//get DOM element point for easy access
		this.catListElement = document.getElementById('cat-list');
	this.render();	
	},
	render: function(){
		var cats = octopus.getCats();
		var cat, elem, i;
		
		//Empty the list
		this.catListElement.innerHTML='';
		
		//loops through cat list
		for(i=0; i<cats.length;i++){
			cat = cats[i];
			//make new cat item and set its name
			elem = document.createElement('li');
			elem.textContent = cat.name;
			
			// on click, setCurrentCat and render the catView
            // this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function
			elem.addEventListener('click',(function(catClick){
				return function(){
					octopus.setCurrentCat(catClick);
					catView.render();
				};
			})(cat));
			
			//Add element to the list
			this.catListElement.appendChild(elem);
		}//for loop
	}//render
};//catListView

var catView = {
	init:function(){
		//store DOM to pointers to access later
		this.catElement = document.getElementById('cat');
		this.catNameElement = document.getElementById('cat-name');
		this.clickCountElement = document.getElementById('click-count');
		this.catImgElement = document.getElementById('cat-img');
		
		//on click, add counter
		this.catImgElement.addEventListener('click',function(){
			octopus.incrementCounter();
		});
		//render view
		this.render();
	},
	render: function(){
		//Update DOM elements;
		var currentCat = octopus.getCurrentCat();
		
		this.catNameElement.textContent = currentCat.name;
		this.clickCountElement.textContent = currentCat.clickCount;
		this.catImgElement.src=currentCat.imgSrc;
		
		
	}
}//catView

//Fire it up
octopus.init();
