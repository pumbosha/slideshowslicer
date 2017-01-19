function generate(goToFirst) {

	//remove styles from previous slider
	$("head").find("style").each(function() {
		if ($(this).text().indexOf("sliderG") != -1) {
			$(this).remove();
		}
	});

	var imgRatio = 0.5;
	var sliderWidth =  $(".container").width();
	if (sliderWidth > 922) {
		sliderWidth = 0.5*sliderWidth; 
		var sliderHeight = sliderWidth*imgRatio;
		$("#sliderShowSettings").css("height", sliderHeight + "px");
		$("#formBottom").css("bottom", "0");
		$("#sliderShowSettings .tab-content").each(function() {
			$(this).height(sliderHeight - $("#formBottom").height() - $("#sliderShowSettings ul").height());
		});
	}
	
	var sliderHeight = sliderWidth*imgRatio;
	var nrOfSlides = 3;

	$("#sliderG .velocity-animating").each(function() {
		$(this).velocity("stop").velocity("stop");
	});

	var sliderContent = "" +
		"<div id=\"sliderG\">" +
			"<div>" +
				"<img src=\"img/p1_.jpg\"></img>" +
				"<div class=\"desc\">Example description of slide; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>" +
			"</div>" +
			"<div>" +
				"<img src=\"img/p2_.jpg\"></img>" +
				"<div class=\"desc\">Example description of slide; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>" +
			"</div>" +
			"<div>" +
				"<img src=\"img/p3.jpg\"></img>" +
				"<div class=\"desc\">Example description of slide; Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>" +
			"</div>" +
		"</div>";

		$("#sliderShow").empty().append(sliderContent);
	
	var animationOpts = {
		animationType: $("#animationType").val(),
		animationOrder: $("#animationOrder").val(),
		animationDuration: $("#animationDuration").slider( "option", "value" ),
		sliceAnimationDelayPercent: $("#sliceAnimationDelayPercent").slider( "option", "value" ),
		animationDirection: $("#animationDirection").val(),
		sliceAnimationDirection: $("#sliceAnimationDirection").val(),
		nrOfSlices: $("#nrOfSlices").slider( "option", "value" ),
	};

	if ($("#rotateTransformation").prop('checked') == true) {
		animationOpts['sliceRotate'] = $("#css3RotateValue").slider( "option", "value" );
		animationOpts['sliceRotateAxis'] = $("#css3RotateAxis").val();
	}

	if ($("#skewTransformation").prop('checked') == true) {
		animationOpts['sliceSkew'] = $("#css3SkewValue").slider( "option", "value" );
		animationOpts['sliceSkewAxis'] = $("#css3SkewAxis").val();
	}

	if ($("#scaleTransformation").prop('checked') == true) {
		animationOpts['sliceScale'] = $("#css3ScaleValue").slider( "option", "value" );
		animationOpts['sliceScaleAxis'] = $("#css3ScaleAxis").val();
	}
	
	var descOpts = null;

	if ($("#isDescPresent").prop('checked') == true) {
		descOpts = {};
		descOpts['sizePercent'] = $("#descSizePercent").slider( "option", "value" );
		descOpts['position'] = $("#descPosition").val();
		descOpts['animationDuration'] = $("#descAnimationDuration").slider( "option", "value" );
		descOpts['animationType'] = $("#descAnimationType").val();
		descOpts['bgColor'] = $("#descBackgroundColor").val();
		descOpts['bgOpacity'] = $("#descBackgroundOpacity").slider( "option", "value" )/100;
	}

	var navOpts = {
		custLeftArrowDivId: "larrow",
		custRightArrowDivId: "rarrow",
		showSlideChecker: $("#slideCheckerPresenceMode").val(),
		showArrows: $("#arrowsPresenceMode").val(),
		slideCheckerPercentWidth: $("#slideCheckerWidth").slider( "option", "value" ),
		slideCheckerTop: $("#slideCheckerTop").slider( "option", "value" ),
		progressBarPosition: $("#progressBarPosition").val(),
		progressBarColor: $("#progressBarColor").val(),
		stopOnMouseEnter: $("#stopOnMouseEnter").prop('checked'),
		slideCheckerBgColor: $("#slideCheckerBackgroundColor").val(),
		slideCheckerPointerColor: $("#slideCheckerPointerColor").val()
	}

	
	if ($("#showProgressBar").prop('checked') != true) {
		navOpts['progressBarOpacity'] = "0";
	}
	else {
		navOpts['progressBarOpacity'] = "1";
	}

	$("#sliderG img").hide();
	$("#sliderG .desc").hide();
	setTimeout(function() {

		var sliderG = new Slider({
			sliderId: "sliderG",
			nrOfSlides: nrOfSlides,
			slideHeight: sliderHeight,
			slideWidth: sliderWidth,
			stopDuration: $("#stopDuration").slider( "option", "value" ),
			isImageMovable:$("#isImageMovable").prop('checked')
		},
		[animationOpts], descOpts, navOpts);

		$("#sliderG #navigation img").css("height", Math.ceil(sliderHeight/11) + "px");
	    $("#sliderG #navigation img").css("width", Math.ceil(sliderHeight/37) + "px");

		$("#sliderG img").show();
		$("#sliderG .desc").show();

		if (goToFirst != undefined) {
			sliderG.goToSlide(2);
		}

	}, 500);
}

function generateCode() {
	var code = "/* variable contains animation settings */\n";
	var css3code = "";

	if ($("#rotateTransformation").prop('checked') == true) {
		css3code += ",\n&#09;sliceRotate: '" + $("#css3RotateValue").slider( "option", "value" ) + 
					"',\n&#09;sliceRotateAxis: '" + $("#css3RotateAxis").val() + "'";
	}

	if ($("#skewTransformation").prop('checked') == true) {
		css3code += ",\n&#09;sliceSkew: '" + $("#css3SkewValue").slider( "option", "value" ) + 
					"',\n&#09;sliceSkewAxis: '" + $("#css3SkewAxis").val() + "'";
	}

	if ($("#scaleTransformation").prop('checked') == true) {
		css3code += ",\n&#09;sliceScale: '" + $("#css3ScaleValue").slider( "option", "value" ) + 
					"',\n&#09;sliceScaleAxis: '" + $("#css3ScaleAxis").val() + "'";
	}
	
	code += "var animationOpts = {\n" +
		"&#09;animationType: '" + $("#animationType").val() + "',\n" +
		"&#09;animationOrder: '" + $("#animationOrder").val() + "',\n" +
		"&#09;animationDuration: " + $("#animationDuration").slider( "option", "value" ) + ",\n" +
		"&#09;sliceAnimationDelayPercent: " + $("#sliceAnimationDelayPercent").slider( "option", "value" ) + ",\n" +
		"&#09;animationDirection: " + $("#animationDirection").val() + ",\n" +
		"&#09;sliceAnimationDirection: " + $("#sliceAnimationDirection").val() + ",\n" +
		"&#09;nrOfSlices: " + $("#nrOfSlices").slider( "option", "value" ) + 
		css3code +
	"\n};\n\n";

	code += "/* variable contains description settings */\n";

	if ($("#isDescPresent").prop('checked') == true) {
		code += "descOpts = {\n" +
			"&#09;sizePercent: " + $("#descSizePercent").slider( "option", "value" ) + ",\n" +
			"&#09;position: '" + $("#descPosition").val() + "',\n" +
			"&#09;animationDuration: " + $("#descAnimationDuration").slider( "option", "value" ) + ",\n" +
			"&#09;animationType: '" + $("#descAnimationType").val() + "',\n" +
			"&#09;bgColor: '" + $("#descBackgroundColor").val() + "',\n" +
			"&#09;bgOpacity: " + $("#descBackgroundOpacity").slider( "option", "value" )/100 + "\n" +
		"};\n\n";
	}
	else {
		code += "descOpts = {}\n\n";
	}

	code += "/* variable contains navigation settings */\n";

	showProgressBarCode = "";
	if ($("#showProgressBar").prop('checked') != true) {
		showProgressBarCode = ",\n&#09;progressBarOpacity: 0";
	}
	else {
		showProgressBarCode = ",\n&#09;progressBarOpacity: 1";
	}

	code += "var navOpts = {\n" +
		"&#09;custLeftArrowDivId: " + "'leftArrow'" + ",\n" +
		"&#09;custRightArrowDivId: " + "'rightArrow'" + ",\n" +
		"&#09;showSlideChecker: " + $("#slideCheckerPresenceMode").val() + ",\n" +
		"&#09;showArrows: " + $("#arrowsPresenceMode").val() + ",\n" +
		"&#09;slideCheckerPercentWidth: " + $("#slideCheckerWidth").slider( "option", "value" ) + ",\n" +
		"&#09;slideCheckerTop: " + $("#slideCheckerTop").slider( "option", "value" ) + ",\n" +
		"&#09;progressBarPosition: '" + $("#progressBarPosition").val() + "',\n" +
		"&#09;progressBarColor: '" + $("#progressBarColor").val() + "',\n" +
		"&#09;stopOnMouseEnter: " + $("#stopOnMouseEnter").prop('checked') + ",\n" +
		"&#09;slideCheckerBgColor: '" + $("#slideCheckerBackgroundColor").val() + "',\n" +
		"&#09;slideCheckerPointerColor: '" + $("#slideCheckerPointerColor").val() + "'" +
		showProgressBarCode +
	"\n};\n\n";

	code += "/* Let's generate slider */\n";

	code += "var SliderName = new Slider({\n" +
		"&#09;sliderId: 'yourSliderName',\n" +
		"&#09;nrOfSlides: number_of_slides_present_in_slider,\n" +
		"&#09;slideHeight: slider_height,\n" +
		"&#09;slideWidth: slider_width,\n" +
		"&#09;stopDuration: " + $("#stopDuration").slider( "option", "value" ) + ",\n" +
		"&#09;isImageMovable: " + $("#isImageMovable").prop('checked') + ",\n" +
	"}, [animationOpts], descOpts, navOpts);"

	return code;
}

$("#examplesGen p a").click(function() {
	
	var anim = $(this).attr("href");

	setDefaultSettings();

	switch(anim) {
		case "#lagazetta":
			lagazettaEffect();
			break;
		case "#rain":
			rainEffect();
			break;
		case "#gradient":
			gradientEffect();
			break;
		case "#height":
			heightEffect();
			break;
		case "#width":
			widthEffect();
			break;
		case "#crazy":
			crazyEffect();
			break;
		case "#crt":
			crtEffect();
			break;
		case "#screwy":
			screwyEffect();
			break;
		case "#appearing":
			appearingEffect();
			break;
		case "#slipping":
			slippingEffect();
			break;
	}

	generate(true);
});

function setDefaultSettings() {

	//turn off desc
	$("#isDescPresent").prop('checked', false);
	
	//basic settings
	$("#animationDuration").slider( "option", "value", 2000);
	$("#stopDuration").slider( "option", "value", 6000);
	$("#isImageMovable").prop('checked', false);

	//navigation settings
	$("#showProgressBar").prop('checked', true);
	$("#stopOnMouseEnter").prop('checked', true);
	$("#progressBarColor").val("#ffd900");
	$("#progressBarPosition").val("top");
	$("#arrowsPresenceMode").val("1");
	$("#slideCheckerPresenceMode").val("-1");

	//animation settings
	$("#nrOfSlices").slider( "option", "value", 10);
	$("#animationType").val("width");
	$("#animationOrder").val("simultanously");
	$("#animationDirection").val("1");
	$("#sliceAnimationDirection").val("1");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 5);

	$("#rotateTransformation").prop('checked', false);
	$("#css3RotateValue").slider( "option", "value", 90);
	$("#css3RotateAxis").val("X");

	$("#scaleTransformation").prop('checked', false);
	$("#css3ScaleValue").slider( "option", "value", 1);
	$("#css3ScaleAxis").val("X");

	$("#skewTransformation").prop('checked', false);
	$("#css3SkewValue").slider( "option", "value", 90);
	$("#css3SkewAxis").val("X");

	$("#rotateTransformationColumn .showable").hide("slow");
	$("#scaleTransformationColumn .showable").hide("slow");
	$("#skewTransformationColumn .showable").hide("slow");
	$("#sliceAnimationDelayDiv").hide("slow");


}

function lagazettaEffect() {

	$("#animationDuration").slider( "option", "value", 3000);

	$("#nrOfSlices").slider( "option", "value", 1);
	$("#animationType").val("opacity");
	
	$("#rotateTransformation").prop('checked', true);
	$("#css3RotateValue").slider( "option", "value", 4000);
	$("#css3RotateAxis").val("Z");

	$("#scaleTransformation").prop('checked', true);
	$("#css3ScaleValue").slider( "option", "value", 0);
	$("#css3ScaleAxis").val("X");

	$("#rotateTransformationColumn .showable").show("slow");
	$("#scaleTransformationColumn .showable").show("slow");

}

function rainEffect() {

	$("#nrOfSlices").slider( "option", "value", 40);
	$("#animationType").val("height");
	$("#animationOrder").val("mixedRandom");
	$("#animationDirection").val("1");
	$("#sliceAnimationDirection").val("1");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 8);

	$("#sliceAnimationDelayDiv").show("slow");

}

/*function gradientEffect() {

	$("#nrOfSlices").slider( "option", "value", 40);
	$("#animationType").val("height");
	$("#animationOrder").val("mixedRandom");
	$("#animationDirection").val("1");
	$("#sliceAnimationDirection").val("1");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 8);



}*/

function gradientEffect() {
	
	$("#animationType").val("opacity");
	$("#nrOfSlices").slider( "option", "value", 25);
	$("#animationOrder").val("mixedOrdered");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 5);

	$("#sliceAnimationDelayDiv").show("slow");
}

function heightEffect() {
	
	$("#nrOfSlices").slider( "option", "value", 15);
	$("#animationOrder").val("mixedOrdered");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 10);
	$("#animationType").val("height");
	$("#sliceAnimationDirection").val("0");

	$("#scaleTransformation").prop('checked', true);
	$("#css3ScaleValue").slider( "option", "value", 0);
	$("#css3ScaleAxis").val("X");

	$("#sliceAnimationDelayDiv").show("slow");
	$("#scaleTransformationColumn .showable").show("slow");
}

function widthEffect() {

	$("#nrOfSlices").slider( "option", "value", 15);
	$("#animationOrder").val("mixedOrdered");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 10);

	$("#sliceAnimationDelayDiv").show("slow");
}

function crazyEffect() {
	
	$("#nrOfSlices").slider( "option", "value", 35);
	$("#animationOrder").val("mixedRandom");

	$("#rotateTransformation").prop('checked', true);
	$("#css3RotateValue").slider( "option", "value", 180);
	$("#css3RotateAxis").val("X");

	$("#scaleTransformation").prop('checked', true);
	$("#css3ScaleValue").slider( "option", "value", 0);
	$("#css3ScaleAxis").val("Y");

	$("#sliceAnimationDelayDiv").show("slow");
	$("#rotateTransformationColumn .showable").show("slow");
	$("#scaleTransformationColumn .showable").show("slow");
}

function crtEffect() {
	
	$("#nrOfSlices").slider( "option", "value", 200);
	$("#animationType").val("opacity");
	$("#animationOrder").val("mixedRandom");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 5);

	$("#sliceAnimationDelayDiv").show("slow");
}


function screwyEffect() {
	
	$("#nrOfSlices").slider( "option", "value", 50);
	$("#animationType").val("height");
	$("#animationOrder").val("mixedOrdered");
	$("#sliceAnimationDirection").val("-1");
	$("#sliceAnimationDelayPercent").slider( "option", "value", 5);

	$("#rotateTransformation").prop('checked', true);
	$("#css3RotateValue").slider( "option", "value", 400);
	$("#css3RotateAxis").val("Z");

	$("#sliceAnimationDelayDiv").show("slow");
	$("#rotateTransformationColumn .showable").show("slow");
}

function appearingEffect() {
	
	$("#nrOfSlices").slider( "option", "value", 1);
	$("#animationType").val("opacity");
}

function slippingEffect() {
	$("#nrOfSlices").slider( "option", "value", 1);
	$("#animationType").val("width");
}