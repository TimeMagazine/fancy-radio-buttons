/*
opts:
-id: id of input element (required)
-parent: selector to which to append element
*/

require("./styles/timeUI.less");

;(function($) {
	module.exports = function(type, parent, opts) {
		var types = {
			dropdown: require("./js/dropdown.js"),
			radio: require("./js/radio.js"),
			numeric: require("./js/numeric.js"),
			checkboxes: require("./js/checkboxes.js")
		};

		if (!types[type]) {
			console.log("timeUI error:", type, "is not a valid timeUI type. Options are:", Object.keys(types).join(", "));
			return;
		}

		if (!opts.id || !parent) {
			console.log("timeUI error: You must give time input buttons options an `id` and a `parent` (which should be a valid jquery selector)")
			return;
		}

		return types[type](parent, opts);

	}
})(window.jQuery);