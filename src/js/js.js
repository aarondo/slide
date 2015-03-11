jQuery(document).ready(function($) {


	var BrandSlider = function(el){

		var self = this;
		var orientation = 'vertical';
		var timer = true;
		var continuous = true;
		var slide_speed = 3000;
		var slidesPerPage = 4;
		var activeslide = 1;
		var position = 0;

		var brandSlider = $(el);
		var nextSliderClick = brandSlider.find('.nextSliderClick');
		var prevSliderClick = brandSlider.find('.prevSliderClick');
		var brandwindow = $(window);


		this.init = function(){
			
			self.events();
			self.setSliderClass();
			self.setSlider();
			self.setArrows();
			self.setTimer();
			self.setActive(1);
			prevSliderClick.hide();


		};

		this.setArrows = function(){
			if (self.isHorizontal()) {
				nextSliderClick.html('&#10095;');
				prevSliderClick.html('&#10094;');
			} else {
				nextSliderClick.html('&#x25B2;');
				prevSliderClick.html('&#x25BC;');
			}
		};

		this.setTimer = function(){
			if (!timer) return;
			setInterval(function(){ 
				self.nextSlide();
			}, slide_speed);
		};

		this.setSliderClass = function(){
				brandSlider.addClass(orientation);
		};

		this.isHorizontal = function(){
			if (orientation == 'horizontal') return true;
		};

		this.countItems = function(){
				return brandSlider.find('li').length;
		};

		this.setImgWidth = function(){

			if (self.isHorizontal()) {
				brandSlider.find('ul').find('li').css({'width':self.getSliderWidth() / slidesPerPage+'px'});
			} else {
				brandSlider.find('ul').find('li').css({'height':self.getSliderParentHeight() / slidesPerPage+'px'});
				brandSlider.find('ul').find('li').css({'width':self.getSliderParentHeight() / slidesPerPage+'px'});
			}
			
		};

		this.getImgWidth = function(){
			var width = brandSlider.find('img').css('width');
			return width.replace('px', '');
		};


		this.getSliderWidth = function(){
			return brandSlider.width();
		};

		this.getSliderParentHeight = function(){
			return brandSlider.parent().height();
		};

		this.setSlider = function(){
			self.setImgWidth();
			self.setSliderSize(self.getImgWidth());
			self.setUlSize();
		};

		this.setSliderSize = function(height){
			if (self.isHorizontal()) {
				brandSlider.css({'height':height+'px'});
			} else {
				brandSlider.css({'height':self.getSliderParentHeight()+'px'});
				brandSlider.css({'width':self.getSliderParentHeight() / slidesPerPage+'px'});
			}
		};

		this.setUlSize = function(){

			if (self.isHorizontal()) {
				brandSlider.find('ul').css({'width':self.getSliderWidth() * self.countItems()+'px'});
			} else {
				brandSlider.find('ul').css({'height':self.getSliderWidth() * self.countItems()+'px'});
				brandSlider.find('ul').css({'width':self.getSliderParentHeight() / slidesPerPage+'px'});
			}
		};


		this.setActive = function(the_activeslide){
			activeslide = the_activeslide;
			brandSlider.find('ul').find('li').removeClass('active');
			brandSlider.find('ul').find('li:nth-child('+activeslide+')').addClass('active');
		};

		this.getActive = function(){
			return brandSlider.find('ul').find('li.active').index();
		};


		this.setSliderPosition = function(position){
			brandSlider.find('ul').css({'margin-left':position+'px'});
		};

		this.nextSlide = function(){
			if (self.checkifLast()){ 
				self.rewind();
				return;
			}

			prevSliderClick.show();
			position = position - Number(self.getImgWidth());
			activeslide = activeslide + 1;
			self.setActive(activeslide);
			self.positionSlider();
			
		};

		this.prevSlide = function(){
			if (self.checkifFirst())return;
			position = position + Number(self.getImgWidth());
			nextSliderClick.show();
			prevSliderClick.show();
			brandSlider.find('ul').css({'margin-left':position+'px'});
			activeslide = activeslide - 1;
			self.setActive(activeslide);
		};

		this.rewind = function(){
			position = 0;
			self.positionSlider();
			self.setActive(1);
		};

		this.positionSlider = function(){

			if (self.isHorizontal()) {
				brandSlider.find('ul').css({'margin-left':Math.round(position)+'px'});
			} else {
				brandSlider.find('ul').css({'margin-top':Math.round(position)+'px'});
			}
		};

		this.checkifLast = function(){
			var lastslide = (self.countItems() - slidesPerPage);
			if (self.getActive() == lastslide)return true;
		};

		this.checkifFirst = function(){
			if (self.getActive() === 0) {
				prevSliderClick.hide();
				return true;
			}
		};

		this.resize = function(){
			var equivPos = position / self.getImgWidth();			
			self.setSlider();
			position = equivPos * self.getImgWidth();
			self.positionSlider();
		};

		this.events = function(){

			brandwindow.resize(function() {				
						self.resize();
			});

			nextSliderClick.on('click', function(e) {
				e.preventDefault();
				self.nextSlide();
			});

			prevSliderClick.on('click', function(e) {
				e.preventDefault();
				self.prevSlide();
			});

		};

		self.init();

	};

	BrandSlider('#brandSlider');
	
});