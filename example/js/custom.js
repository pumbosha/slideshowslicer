//Let's create 2 different animations:
var animationOpts1 = {
    animationType: 'width',
    animationOrder: 'simultanously',
    animationDuration: 2000,
    animationDirection: 1,
    sliceAnimationDirection: 1,
    nrOfSlices: 10
};

var animationOpts2 = {
    animationType: 'height',
    animationOrder: 'mixedOrdered',
    animationDuration: 2000,
    sliceAnimationDelayPercent: 8,
    animationDirection: -1,
    sliceAnimationDirection: 1,
    nrOfSlices: 10,
	sliceScale: 5,
    sliceScaleAxis: 'Y'
};

//and collect them into one animation's array:
var animations = [animationOpts1, animationOpts2];

//Assume that we want to use descriptions on slider:
descOpts = {
    sizePercent: 30,
    position: 'bottom',
    animationDuration: 500,
    animationType: 'opacity',
    bgColor: '#ffd900',
    bgOpacity: 0.5
}

//Else we can leave this variable empty:
//descOpts = {}

//Finally let's prepare variable responsible for navigation options:
var navOpts = {
	custLeftArrowDivId: "larrow",
    custRightArrowDivId: "rarrow",
    showSlideChecker: -1,
    showArrows: 0,
    progressBarPosition: 'top',
    progressBarColor: '#0000ff',
    stopOnMouseEnter: true,
    progressBarOpacity: 0.5
};

//and add all variables to main slider object
var slider = new Slider({
        sliderId: 'yourSliderName',
        nrOfSlides: 3,
        slideHeight: 250,
        slideWidth: 500,
        stopDuration: 4000,
        isImageMovable:false
    }, 
	animations, 
	descOpts, 
	navOpts);