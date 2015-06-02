'use strict';
/**
 * A model that takes Hex and RGB colors and can convert 
 * those colors to either hex or rgb format.
 */
var ColorModel = Backbone.Model.extend({
	defaults: {
		/**
	 	 * The hex value representing this color.
	 	 * @type {string}
	 	 */	
		hex: null,

		/**
	 	 * The rgb value representing this color.
	 	 * @type {Object}
	 	 */	
		rgb: null
	},

	/**
	 * Creates a new ColorModel instance.
	 */
	initialize: function(attrs){
		if (!attrs) {
			this.set('hex', '#FFFFFF');
		}
	},

	/**
	 * Takes a hex or rgb key and value and sets the hex and rgb 
	 * values of the color.
	 * 
	 * @type {string, Object}
	 * @type {string, Object}
	 */
	set: function(name, value){
		if (name instanceof Object) {
			var colorKeys = Object.keys(name);
			for (var i  = 0; i < colorKeys.length; i++){
				var colorKey = colorKeys[i];
				var colorValue = name[colorKey];
				this._setValue(colorKey, colorValue);
			} 
		} else {
			this._setValue(name, value);
		}
	},

	/**
	 * Checks if name input is rgb or hex. Sets both rgb and hex color values.
	 * 
	 * @type {string} 'hex' or 'rgb'.
	 * @type {string, Object} hex value string or rgb object.
	 */
	_setValue: function(name, value){
		if (!value){
			return
		}

		// Check that hex value is correct number of characters
		// Check that rgb is a value between 0 and 255
		// Logic for 3 character Hex
		// 
		
		if (name === 'hex') {
			// Uses the Backbone.Model set method to set the hex value.
			Backbone.Model.prototype.set.apply(this, [name, value]);
			var rgbValue = this._hexToRGB(value);
			Backbone.Model.prototype.set.apply(this, ['rgb', rgbValue]);
		} else if (name === 'rgb'){
			// Uses the Backbone.Model set method to set the rgb value.
			Backbone.Model.prototype.set.apply(this, [name, value]);
			var hexValue = this._rgbToHex(value);
			Backbone.Model.prototype.set.apply(this, ['hex', hexValue]);
		} else  {
			Backbone.Model.prototype.set.apply(this, [name, value]);
		}
	},

	/**
	 * Takes a compondent (red, green, blue) of an rgb value and returns the
	 * corresponding portion of a hex string.
	 * 
	 * @type {number}
	 * @return {string}
	 */
	_componentToHex: function(rgbValue) {
		var hexString = rgbValue.toString(16);
		if (hexString.length === 1){
			return '0' + hexString;
		} else {
			return hexString; 
			}
	},
	
	/**
	 * Takes a hex string and returns an rgb Object.
	 * 
	 * @type  {string}
	 * @return {Object}
	 */
	_hexToRGB: function(hexValue) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
			return result ? {
				red: parseInt(result[1], 16),
				green: parseInt(result[2], 16),
			 	blue: parseInt(result[3], 16)
			} : null;
	},

	/**
	 * Takes an rgb Object and returns a hex string.
	 * 
	 * @param  {Object}
	 * @return {string}
	 */
	_rgbToHex: function(rgbObject){
		var redValue = this._componentToHex(Math.round(rgbObject.red));
		var greenValue = this._componentToHex(Math.round(rgbObject.green));
		var blueValue = this._componentToHex(Math.round(rgbObject.blue));
		return '#' + redValue + greenValue + blueValue;
	}
})


// var color1 = new ColorModel();
// var color2 = new ColorModel();

// color1.set('hex', '#A55DE8');
// color2.set('hex', '#5D9EE8');

var getAverageColor = function(color1, color2){
	var rgb1 = color1.get('rgb');
	var rgb2 = color2.get('rgb');

	var midRGB = {
		red: (rgb1.red + rgb2.red)/2,
		green: (rgb1.green + rgb2.green)/2,
		blue: (rgb1.blue + rgb2.blue)/2
	};

	var averageColor = new ColorModel();
	averageColor.set('rgb', midRGB);

	return averageColor;
}


// var createColors = function(){
// 	// alert('i work!');
// 	var firstColor = document.querySelector('#color1-input').value;
// 	var secondColor = document.querySelector('#color2-input').value;

// 	var color1 = new ColorModel();
// 	var color2 = new ColorModel();

// 	color1.set('hex', firstColor);
// 	color2.set('hex', secondColor)

// 	var color3 = getAverageColor(color1,color2);

// 	var gradient1 = document.querySelector('#color1');
// 	var gradient2 = document.querySelector('#color2');
// 	var gradient3 = document.querySelector('#color3');

// 	gradient1.style.backgroundColor=color1.get('hex');
// 	gradient2.style.backgroundColor=color2.get('hex');
// 	gradient3.style.backgroundColor=color3.get('hex');
// }

// var submit = document.querySelector('button');
// submit.addEventListener('click', createColors);


