/*
opts:
-default: default number (optional)
-length: max number of digits. Defaults to two.
*/
;(function($) {

	module.exports = function(parent, opts) {
		$(parent).addClass("timeUI");

		var container = $("<div />", { id: opts.id }).addClass("control-group").appendTo(parent);

		if (opts.title) {
			$("<div />", {
				html: opts.title
			}).appendTo(container);
		}

		$("<input />", {
			maxlength: opts.length || 2,
			pattern: "\\d*"
		}).addClass("numeric").appendTo(container);

		if (opts.default) {
			$("#" + opts.id + " input").attr("value", opts.default);
		}

		// only allow digits in age entry
		$("#" + opts.id + " input").on('keydown', function(e) {
		    var key = e.keyCode ? e.keyCode : e.which;

		    if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
		         (key == 65 && ( e.ctrlKey || e.metaKey  ) ) || 
		         (key >= 35 && key <= 40) ||
		         (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
		         (key >= 96 && key <= 105)
		    ))
		    e.preventDefault();

		});

		$("#" + opts.id + " input").on('keyup', function(e) {
			opts.callback && opts.callback(parseFloat($("#" + opts.id + " input").val()));
		});
	}	
})(jQuery);