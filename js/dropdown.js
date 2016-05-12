/*
opts:
-items: the items in the dropdown
-default: which item to select on page load (optional)
-intro: Non-selectedable default text, like "Choose a state"
*/

require("./Dropit/dropit");
var template = require("../templates/dropdown.html");

;(function($) {

	module.exports = function(parent, opts) {
		if (!opts.items) {
			console.log("You must supply an `items` property to the options to fill in the dropdown.");
			return;
		}

		if (!opts.intro) {
			opts.default = opts.default || opts.items[0];
			opts.intro = opts.default;
		}

		$(parent).addClass("timeUI");

		var menu = $(template(opts)).appendTo(parent);

		opts.items.forEach(function(item) {
			var li = $("<li />", {
				html: item
			}).appendTo("#" + opts.id + " li ul");
		});

		$(parent + ' .menu')
			.dropit({
				beforeShow: opts.beforeShow
			});

		var max_width = Math.max($(parent).innerWidth(), $(parent + " .selection").width(), $(parent + " .dropit-submenu").outerWidth());

		// make dropdown the size of the longest option
		$(parent + " .dropit-submenu").css("width", Math.min(400, max_width));
		$(parent + " .dropit-trigger").css("width", Math.min(400, max_width));

		// fire callback if a valid value is preselected
		if (opts.intro == opts.items[0]) {
			opts.callback && opts.callback($(parent + " .selection").text().trim(), "initial");
		}

		// replace value when selection changes
		$("body").on("click", "#" + opts.id + " li ul li", function() {
			$("#" + opts.id + " .value").html($(this).text());
			opts.callback && opts.callback($(this).text().trim(), "user");
		});

		return {
			items: opts.items,
			randomize: function() {
				var value = opts.items[Math.floor(Math.random()*opts.items.length)];
				$("#" + opts.id + " .value").html(value);
				opts.callback && opts.callback(value, "randomized");				
			},
			value: function() {
				return $("#" + opts.id + " .value").text();
			},
			set: function(value) {
				if (opts.items.indexOf(value) == -1) {
					console.log(value + " is not a valid value for this dropdown.");
					return;
				}
				$("#" + opts.id + " .value").html(value);
			}
		}
	}
})(jQuery);	