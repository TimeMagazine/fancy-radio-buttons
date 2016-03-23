/*
opts:
-items: the items in the dropdown
-defaults: which item to select on page load (optional)
*/

var template = require("../templates/checkbox.html");

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

	if (opts.defaults) {
		opts.defaults.forEach(function(def) {
			$(parent + " input[data-value='" + def + "']").attr("checked", "checked");
		});
	}

	function get_selected() {
		var selected = [];
		$(parent + " input:checked").each(function(i, v) {
			selected.push($(v).data("value"));
		});
		return selected;		
	}

	$(parent + " input").change(function() {
		opts.callback && opts.callback(get_selected());
	});

	return {
		value: get_selected(),
		set: function(values) {
			// to do
		}
	}
}