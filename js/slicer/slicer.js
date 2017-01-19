var sliceClass = "slice";
var sliceIdPrefix = "slice";
var slideClass = "slide";
var slideIdPrefix = "slide";
var slideCheckerClass = "slideChecker";
var progressBarClass = "progressBar";

/**
 * 
 * @author twilk
 *
 */
 
 /**
  * Main constructor method
  */
function Slider(setupOpts, animationOpts, descOpts, navOpts) {
	
	/**
	 * set up animation options
	 */
	this.setAnimationOptions = function() {
		var animationOpts = this.animationOpts[this.slideAnimationIndex];
		this.animationDuration = animationOpts.animationDuration;
		this.animationType = animationOpts.animationType;
		this.animationOrder = animationOpts.animationOrder;
		this.sliceAnimationDelayPercent = animationOpts.sliceAnimationDelayPercent;
		this.animationDirection = 1;
		this.sliceAnimationDirection = 1;
		this.nrOfSlices = animationOpts.nrOfSlices;
		this.sliceWidth = Math.ceil(this.slideWidth/this.nrOfSlices);

		//css transforms
		this.sliceRotate = animationOpts.sliceRotate;
		this.sliceSkew = animationOpts.sliceSkew;
		this.sliceScale = animationOpts.sliceScale;
		this.sliceRotateAxis = "X";
		this.sliceScaleAxis = "X";
		this.sliceSkewAxis = "X";

		if (animationOpts.sliceRotateAxis != undefined) {
			this.sliceRotateAxis = animationOpts.sliceRotateAxis.toUpperCase();
		}

		if (animationOpts.sliceSkewAxis != undefined) {
			this.sliceSkewAxis = animationOpts.sliceSkewAxis.toUpperCase();
		}

		if (animationOpts.sliceScaleAxis != undefined) {
			this.sliceScaleAxis = animationOpts.sliceScaleAxis.toUpperCase();
		}

		if (animationOpts.animationDirection != undefined) {
			this.animationDirection = animationOpts.animationDirection;
		}

		if (animationOpts.sliceAnimationDirection != undefined) {
			this.sliceAnimationDirection = animationOpts.sliceAnimationDirection;
		}

		//only if animationOptsLength == 1
		if (this.animationDirection==0) {
			this.animationDirection = -1;
			this.animationDirectionMixedMode = true;
		}
	}
	
	/**
	 * set up navigation options
	 */
	this.setNavigationOptions = function(navOpts) {
		//default values
		var leftArrow = "prev";
		var rightArrow = "next";
		this.showArrows = 0;
		var showSlideChecker = 0;
		var slideCheckerPercentWidth = 10;
		var slideCheckerBgColor = "black";
		var slideCheckerPointerColor = "#46128d";
		var slideCheckerTop = 90;
		var slideCheckerOpacity = 0.5;
		var progressBarWidth = 5;
		var progressBarColor = "yellow";
		var progressBarOpacity = 1;
		var progressBarPosition = "top";
		this.stopOnMouseEnter = false;
		
		//add slide checker to slider
		this.sliderElem.prepend("<div class=\"navElem\" id=\"navigation\">" +
			"<div id=\"prevSlide\"></div>" +
			"<div id=\"nextSlide\"></div>" +
		"</div>" +
		"<div class=\"" + slideCheckerClass + "\"></div>");
		
		//adding progressBar to slider
		this.sliderElem.prepend("<div class=\"navElem " + progressBarClass + "\" ></div>");
		
		//global variables for nav elems
		this.slideCheckerElem = $(this.slideCheckerSelector);
		this.progressBarElem = $(this.progressBarSelector);
		
		this.showSlideChecker = true;
		
		if (showSlideChecker == -1) {
			this.showSlideChecker = false;
		}
		
		if (navOpts.stopOnMouseEnter != undefined) {
			this.stopOnMouseEnter = navOpts.stopOnMouseEnter;
		}
		
		if (navOpts.progressBarPosition != undefined) {
			progressBarPosition = navOpts.progressBarPosition;
		}
		
		if (navOpts.progressBarWidth != undefined) {
			progressBarWidth = navOpts.progressBarWidth;
		}
		
		if (navOpts.progressBarColor != undefined) {
			progressBarColor = navOpts.progressBarColor;
		}
		
		if (navOpts.progressBarOpacity != undefined) {
			progressBarOpacity = navOpts.progressBarOpacity;
		}
		
		if (navOpts.slideCheckerOpacity != undefined) {
			slideCheckerOpacity = navOpts.slideCheckerOpacity;
		}
		
		if (navOpts.slideCheckerTop != undefined) {
			slideCheckerTop = navOpts.slideCheckerTop;
		}
		
		if (navOpts.slideCheckerPercentWidth != undefined) {
			showSlideChecker = navOpts.showSlideChecker;
		}
		
		if (navOpts.slideCheckerBgColor != undefined) {
			slideCheckerBgColor = navOpts.slideCheckerBgColor;
		}
		
		if (navOpts.slideCheckerPointerColor != undefined) {
			slideCheckerPointerColor = navOpts.slideCheckerPointerColor;
		}
		
		if (navOpts.showArrows != undefined) {
			this.showArrows = navOpts.showArrows;
		}
		
		if (navOpts.showSlideChecker != undefined) {
			showSlideChecker = navOpts.showSlideChecker;
		}
		
		if (navOpts.custLeftArrowDivId != undefined) {
			leftArrow = $("#" + navOpts.custLeftArrowDivId).html();
		}
		if (navOpts.custRightArrowDivId != undefined) {
			rightArrow = $("#" + navOpts.custRightArrowDivId).html();
		}
		
		var top = 0;
		if (progressBarPosition == "bottom") {
			var top = this.slideHeight - progressBarWidth;
		}
		
		this.progressBarStyles = 
		this.progressBarSelector + "{" +
			"position: absolute;" +
			"width: " + "0px;" +
			"height: " + progressBarWidth + "px;" +
			"background-color: " + progressBarColor + ";" +
			"opacity: " + progressBarOpacity + ";" +
			"z-index: 10;" +
			"top: " + top + "px;" +
		"}";
		
		//cutomization of arrows
		$("#" + this.sliderId + " #prevSlide").html(leftArrow);
		$("#" + this.sliderId + " #nextSlide").html(rightArrow);
		
		var params = this;
		
		//view Options
		if (this.showArrows == 1) {
			$("#" + this.sliderId + " #prevSlide").show();
			$("#" + this.sliderId + " #nextSlide").show();
		}

		if (showSlideChecker == 1) {
			this.slideCheckerElem.show();
		}
		
		//handle mouse events on slider object
		this.sliderElem.mouseenter(function() {
			if (params.showArrows == 0) {
				$("#" + params.sliderId + " #prevSlide").show();
				$("#" + params.sliderId + " #nextSlide").show();
			}
			if (showSlideChecker == 0) {
				params.slideCheckerElem.show();
			}
			if (params.stopOnMouseEnter == true) {
				params.sliderStop();
			}
		});
		this.sliderElem.mouseleave(function() {
			if (params.showArrows == 0) {
				$("#" + params.sliderId + " #prevSlide").hide();
				$("#" + params.sliderId + " #nextSlide").hide();
			}
			if (showSlideChecker == 0) {
				params.slideCheckerElem.hide();
			}
			if (params.stopOnMouseEnter == true) {
				params.sliderResume();
			}
		});
		
		//slide checker options
		var slideCheckerWidth = Math.ceil(this.slideWidth * navOpts.slideCheckerPercentWidth/100);
		this.slideCheckerElem.css("width", slideCheckerWidth + "px");
		for (var i = 1;i<=this.nrOfSlides;i++) {
			this.slideCheckerElem.append("<div id=\"check_" + i + "\"></div>");
		}
		
		this.slideCheckerElem.append("<div id=\"pointer\"></div>");
		
		this.slideCheckerStyles = "" +
		this.slideCheckerSelector + "{" +
			"opacity: " + slideCheckerOpacity + ";" +
			"position: " + "absolute;" +
			"left: 50%;" +
			"top: " + navOpts.slideCheckerTop + "%;" +
			"margin-left: " + -Math.ceil(slideCheckerWidth/2) + "px;" +
		"}" +
		this.slideCheckerSelector + " #pointer {" +
			"background-color: " + slideCheckerPointerColor + ";" +
		"}" +
		this.slideCheckerSelector + " div {" +
			"background-color: " + slideCheckerBgColor + ";" +
		"}";
		
		var checkDivSize = slideCheckerWidth/this.nrOfSlides;
		$(this.slideCheckerSelector + " div").each(function() {
			$(this).css("width", checkDivSize + "px");
			$(this).css("height", checkDivSize + "px");
		});
		
		this.slideCheckerElem.css("height", checkDivSize + "px");
		
		$(this.slideCheckerSelector + " div").mouseenter(function() {
			$(this).css("opacity", "0.7");
		});
		$(this.slideCheckerSelector + " div").mouseleave(function() {
			$(this).css("opacity", 1);
		});
		
		this.checkDivSize = checkDivSize;
	}
	
	/**
	 * Method called when slide is changed
	 */
	this.changeSlide = function(prevSlideIndex, nextSlideIndex) {
		
		//calculate next slide if there are more than one animation definied [this.animationOptsLength != 1]
		if (nextSlideIndex == undefined) {
			this.currSlideIndex = (this.currSlideIndex % this.nrOfSlides) + 1;
		}
		else {
			this.currSlideIndex = nextSlideIndex;
		}
		
		var currSlide = $("#" + this.slideIdPrefix + this.currSlideIndex);
		
		var prevIndex = this.currSlideIndex-1;
		if (prevSlideIndex != undefined) {
			prevIndex = prevSlideIndex;
		}
		
		if (prevIndex==0) {
			prevIndex = this.nrOfSlides;
		}
		
		var prevSlide = $("#" + this.slideIdPrefix + prevIndex);
		
		//seting layers
		$("#" + this.sliderId + " ." + slideClass).css("z-index", "1");
		prevSlide.css("z-index", "2");
		currSlide.css("z-index", "3");
		
		//hide current slide to see the slices
		currSlide.css("opacity", "0");

		this.currSliceAnimationDirection = this.sliceAnimationDirection;
		if (this.sliceAnimationDirection == 0) {
			this.currSliceAnimationDirection = 1;
		}
		
		//initial css values for styles which are animated
		var initialStylesForSlice = 
			"height: " + this.initialSliceHeight + "px; " + 
			"width: " + this.initialSliceWidth + "px; " + 
			"opacity: " + this.initialSliceOpacity + ";";
		
		//rest of slices
		for (var i = 0; i<this.nrOfSlices; i++) {
		
			var initialSliceLeft = this.initialSliceLeft;
			var initialSliceTop = this.initialSliceTop;

			if (this.currSliceAnimationDirection == -1) {
				if (this.animationType == "width") {
					initialSliceLeft = this.sliceWidth;
				}
				else if (this.animationType == "height") {
					initialSliceTop = this.slideHeight;
				}
			}

			var initialStylesForSlice2 =
				"margin-left: " + initialSliceLeft + "px;" +
				"margin-top: " + initialSliceTop + "px;";

			var top = (this.nrOfSlides + i) * this.slideHeight + this.nrOfDescs * this.slideHeight;
			var left = i * this.sliceWidth;
			var sliceIndex = i + 1;
			this.sliderElem.append(
				"<div class='" + sliceClass + "' id='" + this.sliceIdPrefix + sliceIndex + "' " +
						"style='" + initialStylesForSlice + initialStylesForSlice2 + " " +
							//"top:-" + top + "px; " +
							"left:" + left + "px;' " +
					">" + 
						currSlide.html().replace(/<(div|DIV)(.*\s*)*/g, "") + 
				"</div>"
			);
			$("#" + this.sliceIdPrefix + sliceIndex + " img").css("left", "-" + left + "px");
			if (this.sliceAnimationDirection == 0) {
				this.currSliceAnimationDirection *= (-1);
			}
		}
		
		//show slices
		$("#" + this.sliderId + " ." + sliceClass).show();
		
		//animation direction mixed (only if there is one animation)
		if (this.animationDirectionMixedMode==true && this.animationOptsLength==1) {
			this.animationDirection = this.animationDirection * (-1);
		}
		
		var sequence = this.prepareAnimation(this, currSlide, this.animationDirection);
	
		//hide arrows during animation
		$("#" + this.sliderId + " #nextSlide").hide();
		$("#" + this.sliderId + " #prevSlide").hide();

		this.animationNotInProgress = false;

		$.Velocity.RunSequence(sequence);
		
		var ml = (this.currSlideIndex - 1)*this.checkDivSize;
		$(this.slideCheckerSelector + " #pointer").velocity({ "margin-left": ml + "px" });

	};
	

	/**
	 * Method responsible for prepare next transition animation
	 */
	this.prepareAnimation = function(opts, currSlide, direction) {
		//setting descriptions
		$("#" + this.slideIdPrefix + this.currSlideIndex + " .desc").css("opacity", 0);
		
		//animate slices
		var anims = [];
		
		var sliceIndexes = [];
		for (var i = 1;i<opts.nrOfSlices;i++) {
			var j = i;
			if (direction==-1) {
				j = i+1;
			}
			sliceIndexes.push(j);
		}
		
		//if animation is mixed
		if (opts.animationOrder=="inRandomSequence" || opts.animationOrder=="mixedRandom") {
			sliceIndexes.sort(function() {
				return (Math.round(Math.random())-0.5);
			});
		}
			
		if (direction==1) {
			for (var i = 1;i<opts.nrOfSlices;i++) {
				var j = sliceIndexes[i-1];
				anims.push({
					e: $("#" + opts.sliderId + " #" + opts.sliceIdPrefix + (j + "")), 
					p: opts.animationElems, 
					o: opts.animationOrderMode
				});
			}
			anims.push({
				e: $("#" + opts.sliderId + " #" + opts.sliceIdPrefix + (opts.nrOfSlices + "")), 
				p: opts.animationElems, 
				o: {duration:opts.animationDuration, sequenceQueue: opts.lastSliceQueue, delay: opts.sliceAnimationDelay, complete: function() {
					opts.completeAnimation(currSlide, opts);
				}}
			});
		}
		else if (direction==-1) {
			for (var i = opts.nrOfSlices;i>1;i--) {
				var j = sliceIndexes[i-2];
				anims.push({
					e: $("#" + opts.sliderId + " #" + opts.sliceIdPrefix + (j + "")), 
					p: opts.animationElems, 
					o: opts.animationOrderMode
				});
			}
			anims.push({
				e: $("#" + opts.sliderId + " #" + opts.sliceIdPrefix + "1"), 
				p: opts.animationElems, 
				o: {duration:opts.animationDuration, sequenceQueue: opts.lastSliceQueue, delay: opts.sliceAnimationDelay, complete: function() {
					opts.completeAnimation(currSlide, opts);
				}}
			});
		}
		
		return anims;
	}
	

	/*
	 * Method responsible for viewing description in slides
	 */
	this.showDescription = function(slideIndex) {
		if (this.descOpts == null) {
			return;
		}
		//there is no description in current slide
		var slideId = this.slideIdPrefix + slideIndex;
		$slideDesc = $("#" + slideId + " .desc");
		
		if ($slideDesc.length==0) {
			return;
		}
		
		var animation = {};
		var finalVal = "1";
		var additionalOpts = "";
		
		var bgColor = this.descOpts.bgColor;
		var elem = this.descOpts.animationType;
		var bgOpacity = this.descOpts.bgOpacity;
		var position = this.descOpts.position;
		var sizePercent = this.descOpts.sizePercent;
		var animationDuration = this.descOpts.animationDuration;
		var descHeight = 0;
		var descWidth = 0;
		
		var classList = $("#" + slideId + " .descContent").attr('class').split(/\s+/);
		
		//check if user set description bg color or opacity using html class
		$.each(classList, function(index, item) {
			if (item.startsWith('bgcolor_')) {
				bgColor = item.substring(8);
			}
			if (item.startsWith('bgopacity_')) {
				bgOpacity = "0." + item.substring(10);
			}
			if (item.startsWith('sizepercent_')) {
				sizePercent = item.substring(12);
			}
		});
		
		//check if user set position of description using html class
		if ($("#" + slideId + " .descContent").hasClass("top")) {
			position = "top";
		}
		else if ($("#" + slideId + " .descContent").hasClass("left")) {
			position = "left";
		}
		else if ($("#" + slideId + " .descContent").hasClass("right")) {
			position = "right";
		}
		else if ($("#" + slideId + " .descContent").hasClass("bottom")) {
			position = "bottom";
		}
		
		//check if user set custom size percent of description using html class
		if (position=="top" || position=="bottom") {
			descHeight = Math.ceil(this.slideHeight * sizePercent / 100);
			descWidth = this.slideWidth;
		}
		else if (position=="left" || position=="right") {
			descHeight = this.slideHeight;
			descWidth = Math.ceil(this.slideWidth * sizePercent / 100);
		}
		
		//check if user set animation type of description using html class
		if ($("#" + slideId + " .descContent").hasClass("slip")) {
			elem = "slip";
		}
		else if ($("#" + slideId + " .descContent").hasClass("opacity")) {
			elem = "opacity";
		}
		
		//set size of description
		$("#" + slideId + " .descContent").each(function() {
			$(this).css("height", descHeight + "px");
			$(this).css("width", descWidth + "px");
			$(this).prev().css("height", descHeight + "px");
			$(this).prev().css("width", descWidth + "px");
		});

		$slideDesc.css("top", "0px");
		
		$("#" + slideId + " .desc:first-child").css("background-color", bgColor);
		
		if (elem == "opacity") {
			var finalVal = bgOpacity;
			var additionalOpts = ":first-child";

			switch(position) {
				case "top":
					$slideDesc.css("top", "0px");
					break;
				case "right":
					$slideDesc.css("left", Math.ceil(this.slideWidth * (100 - sizePercent)/100)+"px");
					break;
				case "left":
					$slideDesc.css("left", "0px");
					break;
				case "bottom":
					$slideDesc.css("top", Math.ceil(this.slideHeight * (100 - sizePercent)/100) +"px");
					break;
			}
			
			$("#" + slideId + " .desc:nth-child(2)").velocity({
				"opacity": 1
			}, {
				duration: animationDuration
			});
		}
		else if (elem == "slip") {
			$("#" + slideId + " .desc:first-child").css("opacity", bgOpacity);
			$("#" + slideId + " .desc:nth-child(2)").css("opacity", 1);
			
			switch(position) {
				case "top":
					$slideDesc.css("top", (-descHeight)+"px");
					finalVal = "0px";
					elem = "top";
					break;
				case "right":
					$slideDesc.css("left", (this.slideWidth)+"px");
					finalVal = Math.ceil(this.slideWidth * (100 - sizePercent)/100);
					elem = "left";
					break;
				case "left":
					$slideDesc.css("left", (-descWidth)+"px");
					finalVal = "0px";
					elem = "left";
					break;
				case "bottom":
					$slideDesc.css("top", this.slideHeight + "px");
					finalVal = this.slideHeight - Math.ceil(this.slideHeight * sizePercent/100);
					elem = "top";
					break;
			}

		}
		
		animation[elem] = finalVal;

		//trigger event to handle when desc is appearing
		$("#" + slideId + " .desc:first-child").trigger( "nextSlide", [slideId]);
		
		$("#" + slideId + " .desc" + additionalOpts).velocity(animation, {
			duration: animationDuration, complete:function() {
				this.animationNotInProgress = true;
			}
		});
	}
	

	/**
	 * Actions which must be done after simple animation
	 */
	this.completeAnimation = function(currSlide, params) {

		//show arrows during animation
		$("#" + this.sliderId + " #nextSlide").show();
		$("#" + this.sliderId + " #prevSlide").show();
		
		//show next slide
		currSlide.css("opacity", "1"); 
	
		//hide (remove) slices
		$("#" + this.sliderId + " .slice").remove();	
		
		//show description
		this.showDescription(this.currSlideIndex);
		
		if (this.animationOptsLength != 1) {
			this.slideAnimationIndex++;
			
			if (this.animationOptsLength <= this.slideAnimationIndex) {
				this.slideAnimationIndex = 0;
			}
			this.initSlider();
		}

		this.clearBeforeMoveingImage();

		//turn on animation to next slide
		this.stopped = true;
		
		/*ie8 hover doesn't working */
		this.sliderElem.hover(function() {
			$(this).toggleClass('hover')
		});
		if (!this.sliderElem.hasClass("hover") || this.stopOnMouseEnter == false) {

			if (this.showArrows == 0) {
				$("#" + this.sliderId + " #prevSlide").hide();
				$("#" + this.sliderId + " #nextSlide").hide();
			}
			this.moveImage();
			this.progressBarElem.velocity({"width": this.slideWidth + "px"}, {complete: function() {
				params.changeSlide();
				params.progressBarElem.css("width", "0px");
			}, duration:params.stopDuration, easing: "linear"});
			this.stopped = false;
		}

		this.animationNotInProgress = true;
			
	}

	
	/**
	 * Method which clear up after image in slide is animated (if isMovable eq true)
	 */
	this.clearBeforeMoveingImage = function() {
		if (this.isImageMovable == true) {
			$("#" + this.sliderId + " > div > img").each(function() {
				$(this).css("margin-top", "0px");
				$(this).css("margin-left", "0px");
				$(this).velocity({"scale": "1"}, {duration:1000});
			});
		}
	}


	/**
	 * Method responsible for moving image in slide (if isMovable eq true)
	 */
	this.moveImage = function(remainDuration) {

		if (this.isImageMovable == false) {
			return;
		}
		var duration = this.stopDuration;
		if (remainDuration != undefined) {
			duration = remainDuration;
		}
		var $img = $("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img");
		var w = $img.width();
		var h = $img.height();
		var x = Math.ceil(w/h*100)/100;
		if (this.ratio > x) {
			var mt = this.slideHeight - h;
			$img.velocity({"margin-top" : mt + "px"}, {duration:duration});
		}
		else if (this.ratio < x) {
			var ml = this.slideWidth - w;
			$img.velocity({"margin-left" : ml + "px"}, {duration:duration});
		}
		else {
			$img.velocity({"scale": "1.3"}, {duration:duration});
		}
	}
	

	/**
	 * Navigation methods
	 */
	this.nextSlide = function() {
		if (!this.animationNotInProgress) {
			return;
		}
		this.animationNotInProgress = false;
		this.progressBarElem.velocity("stop");
		$("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img").velocity("stop");
		this.changeSlide();
		this.progressBarElem.velocity("stop");
		$("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img").velocity("stop");
		this.progressBarElem.css("width", "0px");
	}
	
	this.prevSlide = function() {
		if (!this.animationNotInProgress) {
			return;
		}
		this.animationNotInProgress = false;
		this.progressBarElem.velocity("stop");
		$("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img").velocity("stop");
		var prevSlideIndex = this.currSlideIndex;
		var currSlideIndex = this.currSlideIndex-1;
		if (currSlideIndex < 1) {
			currSlideIndex = this.nrOfSlides;
		}
		this.changeSlide(prevSlideIndex, currSlideIndex);
		this.progressBarElem.velocity("stop");
		$("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img").velocity("stop");
		this.progressBarElem.css("width", "0px");
	}
	
	this.goToSlide = function(slideIndex) {
		if (!this.animationNotInProgress) {
			return;
			//this.completeAnimation($("#" + this.slideIdPrefix + this.currSlideIndex), this);
		}
		this.animationNotInProgress = false;
		this.progressBarElem.velocity("stop");
		$("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img").velocity("stop");
		var prevSlideIndex = this.currSlideIndex;
		this.changeSlide(prevSlideIndex, slideIndex);
		this.progressBarElem.velocity("stop");
		$("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img").velocity("stop");
		this.progressBarElem.css("width", "0px");
	}
	

	/**
	 * Call this for stop animation
	 */
	this.sliderStop = function() {
		if (this.stopped || !this.animationNotInProgress) {
			return;
		}
		this.progressBarElem.velocity("stop").velocity("stop");
		$("#" + this.sliderId + "_" + slideIdPrefix + this.currSlideIndex + " > img").velocity("stop").velocity("stop");
		this.stopped = true;
	}
	

	/**
	 * Call this for resume stopped animation
	 */
	this.sliderResume = function() {
		if (!this.stopped || !this.animationNotInProgress) {
			return;
		}
		var remainDuration = this.stopDuration - (Math.ceil(this.progressBarElem.width()/this.slideWidth*this.stopDuration));
		this.moveImage(remainDuration);
		//launch sliding
		var params = this;
		this.progressBarElem.velocity({"width": this.slideWidth + "px"}, {complete: function() {
			params.changeSlide();
			params.progressBarElem.css("width", "0px");
		}, duration:remainDuration, easing: "linear"});
		this.stopped = false;
	}
	

	/**
	 * Method which initialize sliding
	 */
	this.slide = function() {
		//current slide should be in first layer (before others)
		$("#" + this.slideIdPrefix + "1").css("z-index", this.nrOfSlides);
		
		this.showDescription(1);	
		this.initSlider();
		this.clearBeforeMoveingImage();
		this.moveImage();

		//launch sliding
		var params = this;
		this.progressBarElem.velocity({"width": this.slideWidth + "px"}, {complete: function() {
			params.changeSlide();
			params.progressBarElem.css("width", "0px");
		}, duration:params.stopDuration, easing: "linear"});
	}
	
	this.initSlider = function() {
		this.setAnimationOptions();
		
		//setting animation type
		this.initialSliceHeight = this.slideHeight;
		this.finalSliceHeight = this.slideHeight;
		
		this.initialSliceOpacity = 1;
		this.finalSliceOpacity = 1;
		
		this.initialSliceWidth = this.sliceWidth;
		this.finalSliceWidth = this.sliceWidth;

		this.initialSliceLeft = 0;
		this.initialSliceTop = 0;

		switch (this.animationType) {
			case "width":
				this.initialSliceWidth = 0;
				this.finalSliceWidth = this.sliceWidth;
						
				this.animationElems = {
					"width":this.finalSliceWidth + "px",
					"margin-left": "0px"
				}
				break;
			case "opacity":
				this.initialSliceOpacity = 0;
				this.finalSliceOpacity = 1;
				
				this.animationElems = {
					"opacity":this.finalSliceOpacity
				}
				break;
			case "height":
				this.initialSliceHeight = 0;
				this.finalSliceHeight = this.slideHeight;		
				this.animationElems = {
					"height":this.finalSliceHeight + "px",
					"margin-top":"0px"
				}
				break;
		}

		//Special css transforms animations
		var cssTransform = false;
		if (this.sliceRotate != undefined) {
			this.animationElems["rotate" + this.sliceRotateAxis] = ["0deg", this.sliceRotate + "deg"];
			cssTransform = true;
		}

		if (this.sliceSkew != undefined) {
			this.animationElems["skew" + this.sliceSkewAxis] = ["0deg", this.sliceSkew + "deg"];
			cssTransform = true;
		}

		if (this.sliceScale != undefined) {
			this.animationElems["scale" + this.sliceScaleAxis] = ["1", this.sliceScale];
			cssTransform = true;
		}

		//remove gaps between slices
		if (cssTransform == true) {
			this.animationElems["width"] = this.sliceWidth * 1.2;
		}
			
		//setting animation order
		if (this.animationOrder=="simultanously") {
			this.animationOrderMode = {duration:this.animationDuration, sequenceQueue: false};
			this.lastSliceQueue = false;
			this.sliceAnimationDelay = 0;
		}
		else if (this.animationOrder=="inOrderedSequence" || this.animationOrder=="inRandomSequence") {
			this.animationDuration = this.animationDuration/this.nrOfSlices;
			this.animationOrderMode = {duration:this.animationDuration, sequenceQueue: true};
			this.lastSliceQueue = true;
			this.sliceAnimationDelay = 0;
		}
		else if (this.animationOrder=="mixedOrdered" || this.animationOrder=="mixedRandom") {
			this.animationDuration = this.animationDuration/(1 + ((this.nrOfSlices - 1) * this.sliceAnimationDelayPercent/100));
			this.sliceAnimationDelay = this.animationDuration * this.sliceAnimationDelayPercent/100;
			
			this.animationOrderMode = {duration:this.animationDuration, sequenceQueue: false, delay: this.sliceAnimationDelay};
			this.lastSliceQueue = false;
		}
	}

	//for IE anf smartphone compatibility
	if (!String.prototype.startsWith) {
 		String.prototype.startsWith = function(searchString, position) {
    		position = position || 0;
    		return this.indexOf(searchString, position) === position;
  		};
	}
	
	//control variables
	this.animationNotInProgress = true;
	if ($("#" + this.sliderId + "_" + slideClass + "1 desc").length != 0) {
		this.animationNotInProgress = false;
	}
	this.currSlideIndex = 1;
	this.stopped = false;
	this.slideAnimationIndex = 0;
	this.isImageMovable = false;
	if (setupOpts.isImageMovable != undefined) {
		this.isImageMovable = setupOpts.isImageMovable;
	}
	
	//Slider params variables
	this.sliderId = setupOpts.sliderId;
	this.nrOfSlides = setupOpts.nrOfSlides;
	this.slideHeight = setupOpts.slideHeight;
	this.slideWidth = setupOpts.slideWidth;
	var descStopDuration = 0;
	if (descOpts != null && descOpts != undefined) {
		descStopDuration = descOpts.animationDuration;
		$("#" + this.sliderId + " .desc").wrap("<div class=\"descParent\"></div>");
		$("#" + this.sliderId + " .descParent").prepend("<div class='desc descBg'></div>");
	}
	else {
		$("#" + this.sliderId + " .desc").hide();
	}
	this.stopDuration = setupOpts.stopDuration + descStopDuration;
	
	this.sliderElem = $("#" + this.sliderId);
	this.slideIdPrefix = this.sliderId + "_" + slideIdPrefix;
	this.sliceIdPrefix = this.sliderId + "_" + sliceIdPrefix;
	
	this.nrOfDescs = Math.ceil($("#" + this.sliderId + " .desc").length/2);
	this.animationRunning = false;
	
	//organize descriptions div
	$("#" + this.sliderId + " .desc").each(function() {
		$(this).addClass("descContent");
	});

	//make *opts variables global
	this.descOpts = descOpts;
	this.animationOpts = animationOpts;
	
	this.animationOptsLength = this.animationOpts.length;
	
	//setting div classes and id's
	var ind = 1;
	var paramSlideIdPrefix = this.slideIdPrefix;
	this.sliderElem.children('div:not(.navElem)').each(function () {
		$(this).addClass(slideClass);
		$(this).attr('id', paramSlideIdPrefix + ((ind++) + ""));
	});
	
	//setting navigation options
	this.slideCheckerSelector = "#" + this.sliderId + " ." + slideCheckerClass;
	this.progressBarSelector = "#" + this.sliderId + " ." + progressBarClass;

	var params = this;
	this.setNavigationOptions(navOpts);
	
	$("#" + this.sliderId + " #nextSlide").click(function() {
		params.nextSlide();
	});
	$("#" + this.sliderId + " #prevSlide").click(function() {
		params.prevSlide();
	});
	$(this.slideCheckerSelector + " div:not(#pointer)").each(function() {
		var slideId = $(this).attr("id").substring(6);
		$(this).click(function() {
			params.goToSlide(slideId);
		});
	});

	//set sizes of image in particular slides
	this.ratio = this.slideWidth/this.slideHeight;

	for (var i=1;i<=this.nrOfSlides;i++) {
		var $img = $("#" + this.sliderId + "_" + slideIdPrefix + i + " > img");
		var w = $img.width();
		var h = $img.height();
		var x = w/h;
		if (this.ratio >= x) {
			w = this.slideWidth;
			h = this.slideWidth/x
		}
		else {
			h = this.slideHeight;
			w = this.slideHeight * x;
		}

		$img.width(Math.ceil(w));
		$img.height(Math.ceil(h));
	}
	
	this.sliderElem.show();
	
	//add styles
	var css = 
		"#" + this.sliderId + " {" +
			"overflow: hidden; " +
			"width:" + this.slideWidth + "px;" +
			"height:" + this.slideHeight + "px;" +
			"position: relative;" +
		"}" +
		"#" + this.sliderId + " .desc {" +
			"opacity: 0;" +
		"}" +
		"#" + this.sliderId + " .descParent {" +
			"height: " + this.slideHeight + "px;" +
		"}" +
		"#" + this.sliderId + " #navigation {" +
			"width: " + this.slideWidth + "px;" +
		"}" +
		this.progressBarStyles +
		this.slideCheckerStyles;

	$("head").append("<style>" + css + "</style>");

	this.slide();
};