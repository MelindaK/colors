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
	initialize: function(){
		this.set('hex', '#FFFFFF');
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