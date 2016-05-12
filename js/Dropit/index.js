require("./dropit.css");
require("./dropit.js");

/*
opts:
-items: the items in the dropdown
-default: which item to select on page load (optional)
-intro: Non-selectedable default text, like "Choose a state"
*/

;(function($) {
	var template = require("./template.html");

	module.exports = function(parent, opts) {
		if (!opts.items) {
			console.error("You must supply an `items` property to the options to fill in the dropdown.");
			return;
		}

		if (!opts.id) {
			console.error("You must give Dropit options an `id`")
			return;
		}

		if (!opts.intro) {
			opts.default = opts.default || opts.items[0];
			opts.intro = opts.default;
		}

		var menu = $(template(opts)).appendTo(parent);

		opts.items.forEach(function(item) {
			var li = $("<li />", {
				html: item
			}).appendTo("#" + opts.id + " li ul");
		});

		$('.menu').dropit();	

		// replace value when selection changes
		$("body").on("click", "#" + opts.id + " li ul li", function() {
			$("#" + opts.id + " .value").html($(this).text());
			opts.callback && opts.callback($(this).text());
		});

		return {
			value: function() {
				return $("#" + opts.id + " .value").text();
			},
			set: function(value) {
				if (opts.items.indexOf(value) == -1) {
					console.error(value + " is not a valid value for this dropdown.");
					return;
				}
				$("#" + opts.id + " .value").html(value);
			}
		}

	}

})(jQuery);