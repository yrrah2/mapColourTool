
var serializer = new XMLSerializer();

var countryMenuOpen = false;

var DOMURL = self.URL || self.webkitURL || self;

var img = new Image();

img.src = "test";
img.addEventListener("load", function () {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	var png = canvas.toDataURL("image/png");
	DOMURL.revokeObjectURL(png);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	window.open(png);
});
var selectedColour = "#e74c3c"

$(document).on("click", ".colourBox", function(event){
	selectedColour = $(event.target).hexBGColour();
});

const findOverarchingGroup = (svgID) => {
	if ( svgID.parent().is("g") ) {
		selectedCountry = svgID.parent();
	} else {
		selectedCountry = svgID;
	};
	return selectedCountry;
}

function changeSVGColour(countryID){
	selectedCountry = countryID;
	selectedCountry = findOverarchingGroup(selectedCountry);
	selectedCountry = findOverarchingGroup(selectedCountry);
	selectedCountryID = selectedCountry.attr("id");
	$('#' + selectedCountryID + "-input").val(selectedColour);
	$('.' + selectedCountryID).css("fill", selectedColour);
};

const changeMenuColour = (buttonID) => {
	console.log("function called");
	var countryID = buttonID.attr("id").substring(0, 2);
	console.log(countryID);
	console.log($('.' + countryID));
	var colour = $("#" + countryID + "-input").val();
	console.log(colour);
	$('.' + countryID).css("fill", colour);
};

$(document).on("click", "g", function(event){changeSVGColour($(event.target))});
$(document).on("click", "path", function(event){changeSVGColour($(event.target))});
$(document).on("click", "#countryMenuOpener", function(){showCountryMenu()});
$(document).on("click", ".menuColourButton", function(event){changeMenuColour($(event.target))});

const showCountryMenu = () => {
	if (countryMenuOpen == true){
		countryMenuOpen = false;
		$("#countryMenuOpenerText").text("open country menu");
		$("#countryMenuOpenerArrow").text("\u25BE");
		$("#countryMenu").css("display", "none");
	} else {
		countryMenuOpen = true;
		$("#countryMenuOpenerText").text("close country menu");
		$("#countryMenuOpenerArrow").text("\u25B4");
		$("#countryMenu").css("display", "block");
	}
};

function changeSize(height) {
	var width = 2754 / 1398 * height;
	var canvas = document.getElementById("canvas");

	canvas.height = height;
	canvas.width = width;

	$("#worldmap").attr("height", height);
	$("#worldmap").attr("width", width);
};



function makePNG() {

	var svgString = serializer.serializeToString(document.querySelector('svg'));
	var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
	var url = DOMURL.createObjectURL(svg);
	img.src = url;

};

$.fn.hexBGColour = function() {
    var rgb = $(this).css('background-color');
    if (!rgb) {
        return '#FFFFFF'; //default color
    }
    var hex_rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
    function hex(x) {return ("0" + parseInt(x).toString(16)).slice(-2);}
    if (hex_rgb) {
        return "#" + hex(hex_rgb[1]) + hex(hex_rgb[2]) + hex(hex_rgb[3]);
    } else {
        return rgb; //ie8 returns background-color in hex format then it will make                 compatible, you can improve it checking if format is in hexadecimal
    }
}
