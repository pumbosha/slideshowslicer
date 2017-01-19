var imgRatio = 0.5;
var sliderWidth = screen.width-100;
var sliderHeight = sliderWidth*imgRatio;
var nrOfSlides = $("#slider > div > img").length;

var slider = new Slider({
		sliderId: "slider",
		nrOfSlides: nrOfSlides,
		slideHeight: sliderHeight,
		slideWidth: sliderWidth,
		stopDuration: 10000,
		isImageMovable:false
	},
	[{
		animationType: "height",
		animationOrder: "mixedOrdered",
		animationDuration: 3000,
		sliceAnimationDelayPercent: 7,
		animationDirection: 1,
		sliceAnimationDirection: 0,
		nrOfSlices: 20,
		//sliceScaleAxis: "x",
		//sliceScale: 0
		sliceSkewAxis: "y",
		sliceSkew: 50
	}, 
	{
		animationType: "width",
		animationOrder: "mixedOrdered",
		animationDuration: 3000,
		sliceAnimationDelayPercent: 5,
		animationDirection: -1,
		sliceAnimationDirection: 1,
		nrOfSlices: 20,
		sliceRotateAxis: "y",
		sliceRotate: 220
	},
	{
		animationType: "opacity",
		animationOrder: "mixedOrdered",
		animationDuration: 3000,
		sliceAnimationDelayPercent: 10,
		animationDirection:1,
		sliceAnimationDirection: 1,
		nrOfSlices: 20,
	}], {
		sizePercent: 20,
		position: "bottom",
		animationDuration: 500,
		animationType: "opacity",
		bgColor: "black",
		bgOpacity: "0.8"
	}, 
	{
		custLeftArrowDivId: "larrow",
		custRightArrowDivId: "rarrow",
		showSlideChecker: -1,
		showArrows: 1,
		slideCheckerPercentWidth: 20,
		slideCheckerTop: 90,
		slideCheckerOpacity: "1",
		progressBarPosition: "top",
		progressBarOpacity: 1,
		progressBarColor: "yellow",
		stopOnMouseEnter: true
	});
	

	
$(document).ready(function() {	
	slider.slide();

	$("#slider").css("position", "relative");
	$("#slider").css("left", "50%");
	$("#slider").css("margin-left", -(sliderWidth/2) + "px");
	$("#mainHeader .container").css("width", sliderWidth + "px");
	var descFontSize = Math.ceil(sliderWidth/50);
	if (descFontSize<10) {
		descFontSize = 10;
	}
	$(".desc").css("font-size", descFontSize + "px");

	$("#navigation img").css("height", Math.ceil(sliderHeight/11) + "px");
	$("#navigation img").css("width", Math.ceil(sliderHeight/37) + "px");
});