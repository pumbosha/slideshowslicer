var imgRatio = 0.5;
var width = $(".container").width();
var sliderWidth =  width;
var sliderHeight = sliderWidth*imgRatio;
var nrOfSlides = $("#slider > div > img").length;
var sizePercent = 20;
if (sliderWidth<500) {
    sizePercent = 30;
}

function init() {

    var slider = new Slider({
        sliderId: "slider",
        nrOfSlides: nrOfSlides,
        slideHeight: sliderHeight,
        slideWidth: sliderWidth,
        stopDuration: 4000,
        isImageMovable:false
    },
    [
    {
        animationType: "width",
        animationOrder: "mixedOrdered",
        animationDuration: 2200,
        sliceAnimationDelayPercent: 10,
        animationDirection: -1,
        sliceAnimationDirection: 1,
        nrOfSlices: 20,
        sliceScaleAxis: "y",
        sliceScale: 3
        //sliceRotateAxis: "y",
        //sliceRotate: 360
    },
    {
        animationType: "height",
        animationOrder: "mixedOrdered",
        animationDuration: 2600,
        sliceAnimationDelayPercent: 10,
        animationDirection: 1,
        sliceAnimationDirection: 0,
        nrOfSlices: 20
    }, 
    {
        animationType: "opacity",
        animationOrder: "mixedOrdered",
        animationDuration: 2000,
        sliceAnimationDelayPercent: 10,
        animationDirection:1,
        sliceAnimationDirection: 1,
        nrOfSlices: 20,
        //sliceSkewAxis: "x",
        //sliceSkew: 45
    }], {
        sizePercent: sizePercent,
        position: "bottom",
        animationDuration: 1000,
        animationType: "opacity",
        bgColor: "black",
        bgOpacity: "0.5"
    }, 
    {
        custLeftArrowDivId: "larrow",
        custRightArrowDivId: "rarrow",
        showSlideChecker: -1,
        showArrows: 0,
        slideCheckerPercentWidth: 20,
        slideCheckerTop: 90,
        slideCheckerOpacity: "1",
        progressBarPosition: "top",
        progressBarOpacity: 1,
        progressBarColor: "yellow",
        stopOnMouseEnter: true
    });

    $("#slider").css("left", "50%");
    $("#slider").css("margin-left", -(sliderWidth/2) + "px");
    //$("#mainHeader .container").css("width", sliderWidth + "px");
    var descFontSize = Math.ceil(sliderWidth/50);
    if (descFontSize<10) {
        descFontSize = 10;
    }
    $(".desc").css("font-size", descFontSize + "px");

    $("#slider #navigation img").css("height", Math.ceil(sliderHeight/11) + "px");
    $("#slider #navigation img").css("width", Math.ceil(sliderHeight/37) + "px");

    $(document).scroll(function() {
        if ($(this).scrollTop()!=0) {
            $("#logo").velocity("stop").velocity("stop");
            $("#logo").velocity({"opacity":"0"}, {duration:500});
        }
        else if ($(this).scrollTop()==0) {
            $("#logo").velocity("stop").velocity("stop");
            $("#logo").velocity({"opacity":"1"}, {duration:500});
        }
    });
    
    //generator form controls
    //first tab
    $("#stopDuration").slider({
        min: 1000,
        max: 10000,
        value: 5000,
        step: 100,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#stopDurationLabel").html("Stop Duration: " + $(this).slider( "option", "value" ) + " ms."); 
    });

    $("#animationDuration").slider({
        min: 1000,
        max: 10000,
        step: 100,
        value: 2000,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#animationDurationLabel").html("Animation Duration: " + $(this).slider( "option", "value" ) + " ms.");   
    });

    //second tab
    $("#nrOfSlices").slider({
        min: 1,
        max: 100,
        value: 10,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#nrOfSlicesLabel").html("Number of slices: " + $(this).slider( "option", "value" )); 
    });

    $("#sliceAnimationDelayPercent").slider({
        min: 1,
        max: 100,
        value: 5,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#sliceAnimationDelayPercentLabel").html("Slice animation delay percent: " + $(this).slider( "option", "value" ));    
    });

    $("#animationOrder").change(function() {
        if ($(this).val().indexOf("mixed") != -1) {
            $("#sliceAnimationDelayDiv").show("slow");
        }
        else {
            $("#sliceAnimationDelayDiv").hide("slow");
        }
    });

    $("#css3ScaleValue").slider({
        min: 0,
        max: 10,
        value: 1.5,
        step: 0.1,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#css3ScaleValueLabel").html("Value of transformation: x" + $(this).slider( "option", "value" )); 
    });

    $("#css3RotateValue").slider({
        min: 0,
        max: 720,
        value: 90,
        step: 1,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#css3RotateValueLabel").html("Value of transformation: " + $(this).slider( "option", "value" ) + " degrees");    
    });

    $("#css3SkewValue").slider({
        min: 0,
        max: 360,
        value: 90,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#css3SkewValueLabel").html("Value of transformation: " + $(this).slider( "option", "value" ) + " degrees");  
    });
    
    $("#rotateTransformation").change(function() {
        if ($(this).prop('checked') == true) {
            $("#rotateTransformationColumn .showable").show("slow");
            scrollToBottomOfGeneratorSettings();
        }
        else {
            $("#rotateTransformationColumn .showable").hide("slow");
        }
    });

    $("#scaleTransformation").change(function() {
        if ($(this).prop('checked') == true) {
            $("#scaleTransformationColumn .showable").show("slow");
            scrollToBottomOfGeneratorSettings();
        }
        else {
            $("#scaleTransformationColumn .showable").hide("slow");
        }
    });

    $("#skewTransformation").change(function() {
        if ($(this).prop('checked') == true) {
            $("#skewTransformationColumn .showable").show("slow");
            scrollToBottomOfGeneratorSettings();
        }
        else {
            $("#skewTransformationColumn .showable").hide("slow");
        }
    });

    $("#rotateTransformation").prop('checked', false);
    $("#scaleTransformation").prop('checked', false);
    $("#skewTransformation").prop('checked', false);
    $("#animationOrder").val("simultanously");

    //third tab
    $("#descAnimationDuration").slider({
        min: 100,
        max: 5000,
        value: 500,
        step: 100,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#descAnimationDurationLabel").html("Animation duration: " + $(this).slider( "option", "value" ) + " ms.");   
    });

    $("#descSizePercent").slider({
        min: 1,
        max: 100,
        value: 30,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#descSizePercentLabel").html("Description size: " + $(this).slider( "option", "value" ) + " %"); 
    });

    $("#descBackgroundOpacity").slider({
        min: 1,
        max: 100,
        value: 50,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#descBackgroundOpacityLabel").html("Description background opacity: " + $(this).slider( "option", "value" ) + " %"); 
    });

    $.minicolors.defaults.theme = 'bootstrap';
    $("#descBackgroundColor").minicolors();
    $("#descBackgroundColor").click(function() {
        scrollToBottomOfGeneratorSettings();
    });

    $("#isDescPresent").change(function() {
        if ($(this).prop('checked') == true) {
            $("#descOpts").show("slow");
            scrollToBottomOfGeneratorSettings();
        }
        else {
            $("#descOpts").hide("slow");
        }
    });

    $("#isDescPresent").prop('checked', false);

    //fourth tab
    $("#progressBarColor").minicolors();
    $("#slideCheckerBackgroundColor").minicolors();
    $("#slideCheckerBackgroundColor").click(function() {
        scrollToBottomOfGeneratorSettings();
    });
    $("#slideCheckerPointerColor").minicolors();
    $("#slideCheckerPointerColor").click(function() {
        scrollToBottomOfGeneratorSettings();
    });

    $("#showProgressBar").change(function() {
        if ($(this).prop('checked') == true) {
            $("#progressBarColorDiv").show("slow");
            scrollToBottomOfGeneratorSettings();
        }
        else {
            $("#progressBarColorDiv").hide("slow");
        }
    });

    $("#showProgressBar").prop('checked', true);
    $("#stopOnMouseEnter").prop('checked', true);

    $("#slideCheckerWidth").slider({
        min: 1,
        max: 100,
        value: 10,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#slideCheckerWidthLabel").html("Slide checker width in percent: " + $(this).slider( "option", "value" ) + " %"); 
    });

    $("#slideCheckerPresenceMode").val("-1");

    $("#slideCheckerPresenceMode").change(function() {
        if ($(this).val() == "-1") {
            $("#slideCheckerOpts").hide("slow");
        }
        else {
            $("#slideCheckerOpts").show("slow");
            scrollToBottomOfGeneratorSettings();
        }
    });

    $("#slideCheckerTop").slider({
        min: 1,
        max: 100,
        value: 90,
        animate: "slow"
    }).on( "slidechange", function( event, ui ) {
        $("#slideCheckerTopLabel").html("Slide checker's distance from top of slider in percent of its height: " + $(this).slider( "option", "value" ) + " %"); 
    });
    
};

//handle "generate click" button
$("button#generate").click(function() {
    $("#sliderG").velocity({opacity:0}, {duration:500, complete:function() {
        generate(true);
        $("#sliderG").css("opacity", 0);
    }});
    setTimeout(function() {
        $("#sliderG").velocity({opacity:1}, {duration:500});
    }, 1000);
});

//handle "export code" button
$(".exportCode").click(function() {
    $("#code").modal("show");

    $("#jsExportCode").html("");
    $("#jsExportCode").append("<div class=\"codeExportTitle\"><h4>Java Script</h4></div>");
    $("#jsExportCode").append("<pre class=\"brush: js; gutter: false;\">" +
        generateCode() +
    "</pre>");
    SyntaxHighlighter.highlight();

});

//handle contact form actions
$("#sendMsg").click(function() {
    $(".contactErr").removeClass("in");

    if ($("#emailSender").val() == "" || $("#message").val() == "") {
        $("#fieldsReqErr").addClass("in");
    } 
    else if(!isEmail($("#emailSender").val())) {
        $("#emailErr").addClass("in");
    }
    else {

         $.ajax({
            url: 'sendMsg.php',
            data: {
                json: JSON.stringify($("#contactForm").serializeObject())
            },
            type: 'post',
            success: function(data) {
                $("#msgSent").addClass("in");
            },
            error: function(data) {
                $("#generalErr").addClass("in");
            }
        });
    }
});

$(".closeContactError").click(function() {
    $(this).parent().removeClass("in");
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};




$("#tutorialLink").click(function() {
    $("#code").modal("hide");
});

$(document).scroll(function() {
    if ($(this).scrollTop()!=0) {
        $("#logo").velocity({"opacity":"0"}, {duration:500});
    }
    else if ($(this).scrollTop()==0) {
        $("#logo").css("opacity", "1");
    }

    /* features fade in */
    $('#features dt, #features dd').each( function(i){
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        if( bottom_of_window > bottom_of_object ){        
            $(this).animate({'opacity':'1', 'margin-top':'20px'},1000);  
        }    
    });
});

function scrollToBottomOfGeneratorSettings() {

    $("#sliderShowSettings .tab-content").animate({
        scrollTop: $("#sliderShowSettings").height()
    });

}

$('ul#mainMenu li a, .goToSectionLink').click(function() {
    var href = $(this).attr("href");
    $('html, body').animate({
        scrollTop: $(href).offset().top - 50
    }, 1000);
    return false;
});


$(".linkToParamDesc").click(function() {
    var href = $(this).attr("href");

    if (href.indexOf("General")!=-1) {
        $("#generalOptsDocTab a").trigger("click");
    }
    else if (href.indexOf("Anim")!=-1) {
        $("#animOptsDocTab a").trigger("click");
    }   
    else if (href.indexOf("Desc")!=-1) {
        $("#descOptsDocTab a").trigger("click");
    }    
    else if (href.indexOf("Nav")!=-1) {
        $("#navOptsDocTab a").trigger("click");
    }

    setTimeout(function() {
        $('html, body').animate({
            scrollTop: $(href).offset().top-50
        }, 1000);
    }, 500);
    return false;
});

var questionResponse = [
    {q: '2 + 2', r: 'four'},
    {q: '10 / 2', r: 'five'},
    {q: '2 * 2', r: 'four'},
    {q: '2 - 2', r: 'zero'},
    {q: '3 + 5', r: 'eight'},
    {q: '7 - 6', r: 'one'},
    {q: '3 * 2', r: 'six'},
    {q: '8 / 4', r: 'two'},
    {q: '1 + 8', r: 'nine'},
    {q: '3 - 2', r: 'one'},
    {q: '1 * 7', r: 'seven'},
    {q: '6 / 2', r: 'three'},
    {q: '5 + 5', r: 'ten'},
    {q: '9 - 2', r: 'seven'},
    {q: '3 * 3', r: 'nine'},
    {q: '9 / 3', r: 'three'},
    {q: '4 + 4', r: 'eight'},
    {q: '8 - 4', r: 'four'},
    {q: '4 * 2', r: 'eight'},
    {q: '8 / 2', r: 'four'},
    {q: '7 + 2', r: 'nine'},
    {q: '9 - 2', r: 'seven'},
    {q: '1 * 3', r: 'three'},
    {q: '3 / 1', r: 'three'},
    {q: '5 + 4', r: 'nine'},
    {q: '9 - 4', r: 'five'},
    {q: '2 * 3', r: 'six'},
    {q: '6 / 3', r: 'two'},
    {q: '3 + 3', r: 'six'},
    {q: '6 - 3', r: 'three'},
    {q: '2 * 5', r: 'ten'},
    {q: '10 / 5', r: 'two'},
    {q: '10 + 1', r: 'eleven'},
    {q: '11 - 1', r: 'ten'},
    {q: '3 * 4', r: 'twelve'},
    {q: '12 / 4', r: 'three'},
    {q: '7 + 5', r: 'twelve'},
    {q: '12 - 7', r: 'five'},
    {q: '4 * 3', r: 'twelve'},
    {q: '12 / 3', r: 'four'},
    {q: '3 + 8', r: 'eleven'},
    {q: '11 - 8', r: 'three'},
    {q: '11 - 3', r: 'eight'},
    {q: '8 + 2', r: 'ten'},
    {q: '8 - 2', r: 'six'},
    {q: '6 * 2', r: 'twelve'},
    {q: '2 * 6', r: 'twelve'},
    {q: '12 / 2', r: 'six'},
    {q: '12 / 6', r: 'two'},
    {q: '7 / 1', r: 'seven'},
    {q: '7 / 7', r: 'one'},
    {q: '11 - 10', r: 'one'},
    {q: '7 - 5', r: 'two'},
    {q: '8 - 6', r: 'two'},
    {q: '4 + 7', r: 'eleven'},
]

$(document).ready(function(){
    
    $('[data-toggle="tooltip"]').tooltip({placement:"bottom"});   
    setTimeout(function() {
        $("#preloader").velocity({"opacity":"0"}, {duration:100, complete:function() {
            init();
            setDefaultSettings();
            generate();
            $("nav, #mainContent").velocity({"opacity":"1"}, {duration:1000});
            $("body").css("overflow-y", "auto");
            $("#preloader").hide();

            /*texttiliate to animate texts in main slider */
            $(".descText").textillate({
                minDisplayTime: 1000,
                loop: false,
                in: {
                    effect: 'fadeInRight',
                    delayScale: 1.5,
                    delay: 100,
                    sync: false,
                    shuffle: false,
                    reverse: false,
                    callback: function () {}
                },
                reverse: false,
                type: 'word'
            });

            $(".descText").textillate("stop");

            $(".desc").on("nextSlide", function(ev, slideId) {
                $("#" + slideId + " .descText").textillate("in");
            });
        }});
    }, 1000);

    var qrIndex = Math.floor(Math.random() * questionResponse.length); 

    $("#question").html("How much is: <strong>" + questionResponse[qrIndex]['q'] + "</strong> ?");

    $("#response").on("keyup", function() {
        if (($(this).val())==questionResponse[qrIndex]['r']) {
            $("#contactSubmitButton").show('fast');
        }
        else {
            $("#contactSubmitButton").hide('fast');
        }
    });

    $('form#contactForm').submit(function (evt) {
        if ($("#response").val()!=questionResponse[qrIndex]['r']) {
            evt.preventDefault();
        }
    });
    
});