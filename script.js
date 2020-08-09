var DOMURL = self.URL || self.webkitURL || self;

var img = new Image();
img.src = "test";

var colourSelected = "rgb(93, 173, 226)"

$(document).on("click", ".colourBox", function(event){
	colourSelected = $(event.target).css("background-color");
});

function findOverarchingGroup(e){
	if ( e.parent().is("g") ) {
		selectedCountry = e.parent();
	} else {
		selectedCountry = e;
	};
}

function changeCountryColour(e){
	findOverarchingGroup(e);
	findOverarchingGroup(selectedCountry);
	countryCode = selectedCountry.attr("id");
	setup(countryCode);
};

$(document).on("click", "g", function(event){changeCountryColour($(event.target))});
$(document).on("click", "path", function(event){changeCountryColour($(event.target))});

function setup(country) {
	$('.' + country).css("fill", colourSelected);
	var svgString = new XMLSerializer().serializeToString(document.querySelector('svg'));
	var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
	var url = DOMURL.createObjectURL(svg);
	img.src = url;
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
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0);
	var png = canvas.toDataURL("image/png");
	DOMURL.revokeObjectURL(png);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	window.open(png);
};
