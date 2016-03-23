/*
opts:
-items: the items in the dropdown
-default: which item to select on page load (optional)
*/

var template = require("../templates/radio.html");
;(function($) {

	module.exports = function(parent, opts) {
		if (!opts.items) {
			console.error("You must supply an `items` property to the options to fill in the radio buttons.");
			return;
		}

		$(parent).addClass("timeUI");
		var container = $("<div />", { id: opts.id }).addClass("control-group").appendTo(parent);

		opts.items.forEach(function(item) {
			$(template({ group: opts.id, label: item })).appendTo(container);
		});

		if (opts.default) {
			$(parent + " input[data-value='" + opts.default + "']").attr("checked", "checked");
		}

		function get_selected() {
			return $(parent + " input:checked").data("value");
		}

		$(parent + " input").change(function() {
			opts.callback && opts.callback(get_selected());
		});

		return {
			value: get_selected,
			set: function(value) {
				// to do
			}
		}
	}
})(jQuery);	