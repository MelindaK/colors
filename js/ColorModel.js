var ColorModel = Backbone.Model.extend({
	defaults: {
		hex: '#FFFFFF',
		rgb: {
			red: 255,
			green: 255,
			blue: 255,
		}
	},
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
	_setValue: function(name, value){
		if (name === 'hex') {
			// uses the Backbone.Model set method to set the hex value
			Backbone.Model.prototype.set.apply(this, [name, value]);
			var rgbValue = this._hexToRGB(value);
			Backbone.Model.prototype.set.apply(this, ['rgb', rgbValue]);
		} else if (name === 'rgb'){
			// uses the Backbone.Model set method to set the hex value
			Backbone.Model.prototype.set.apply(this, [name, value]);
		} else  {
			Backbone.Model.prototype.set.apply(this, [name, value]);
		}
	},
	// setHex: function(hexValue) {
	// 	this._color = hexValue;
	// },
	// getHex: function() {
	// 	return this._color
	// },
	// _componentToHex: function(rgbValue) {
	// 	var hexString = rgbValue.toString(16);
	// 	if (hexString.length === 1){
	// 		return '0' + hexString;
	// 	} else {
	// 		return hexString; 
	// 		}
	// },
	// setRGB: function(red, green, blue){
	// 	var redValue = this._componentToHex(Math.round(red));
	// 	var greenValue = this._componentToHex(Math.round(green));
	// 	var blueValue = this._componentToHex(Math.round(blue));
	// 	this._color = '#' + redValue + greenValue + blueValue;
	// 	},
		
	_hexToRGB: function(hexValue) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
			return result ? {
				red: parseInt(result[1], 16),
				green: parseInt(result[2], 16),
			 	blue: parseInt(result[3], 16)
			} : null;
	}
})