
function Color() {
	this._color = '#FFFFFF';
}

Color.prototype = {
	setHex: function(hexValue) {
		this._color = hexValue;
	},
	getHex: function() {
		return this._color
	},
	_componentToHex: function(rgbValue) {
		var hexString = rgbValue.toString(16);
		if (hexString.length === 1){
			return '0' + hexString;
		} else {
			return hexString; 
			}
	},
	setRGB: function(red, green, blue){
		var redValue = this._componentToHex(Math.round(red));
		var greenValue = this._componentToHex(Math.round(green));
		var blueValue = this._componentToHex(Math.round(blue));
		this._color = '#' + redValue + greenValue + blueValue;
		},
		
	getRGB: function() {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this._color);
			return result ? {
				red: parseInt(result[1], 16),
				green: parseInt(result[2], 16),
			 	blue: parseInt(result[3], 16)
			} : null;
	}
}


var createColor1 = function(){
	// console.log('hello');
	var redColor1 = parseInt(document.querySelector('#redInput').value, 10);  //.value, parseInt
	var greenColor1 = parseInt(document.querySelector('#greenInput').value, 10);
	var blueColor1 = parseInt(document.querySelector('#blueInput').value, 10);
	var colorDiv = document.querySelector('.color')

	var newColor = new Color()

	newColor.setRGB(redColor1, greenColor1, blueColor1);

	var color1 = newColor.getHex();

	colorDiv.style.backgroundColor=color1;
};


// Add Event Listenter to button
var button = document.querySelector('button');
button.addEventListener('click', createColor1);



// var redColor1 = document.querySelector("#redInput")  //.value, parseInt
// var greenColor1 = document.querySelector("#greenInput")
// var blueColor1 = document.querySelector("#blueInput")
// var colorDiv = document.querySelector(".color")



