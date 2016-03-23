;(function($) {
	require("./styles.less");
	var templates = {
		radio: require("./radio.html"),
		checkbox: require("./checkbox.html")
	};

	module.exports = function(parent, opts) {
		if (!opts.items) {
			console.error("You must supply an `items` property to the options to fill in the dropdown.");
			return;
		}

		if (!opts.id) {
			console.error("You must give Dropit options an `id`")
			return;
		}

		opts.type = opts.type || "radio";

		var container = $("<div />", { id: opts.id }).addClass("control-group").appendTo(parent);

		opts.items.forEach(function(item) {
			$(templates[opts.type]({ group: opts.id, label: item })).appendTo(container);
		});

		if (opts.default) {
			if (opts.type == "radio") {
				$(parent + " input[data-value='" + opts.default + "']").attr("checked", "checked");
			} else {
				opts.default.forEach(function(def) {
					$(parent + " input[data-value='" + def + "']").attr("checked", "checked");
				});
			}
		}

		$(parent + " input").change(function() {
			var selected = [];
			$(parent + " input:checked").each(function(i, v) {
				selected.push($(v).data("value"));
			});
			if (opts.type == "checkbox") {
				opts.callback && opts.callback(selected);
			} else {
				opts.callback && opts.callback(selected[0]);
			}
		});
	}

})(jQuery);