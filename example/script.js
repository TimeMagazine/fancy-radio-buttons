(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var timeUI = require("time-input-buttons");

//Radio buttons
var my_friends = timeUI("radio", "#radio_container", {
	id: "my_gender",
	items: [ "woman", "man" ],
	callback: function(value) {
		console.log(value);
	}
});

//Radio buttons with default selected
var my_friends_default = timeUI("radio", "#radio_container_default", {
	id: "my_favorite_coder",
	items: [ "Chris", "Dave", "Pratheek" ],
	default: "Dave",
	callback: function(values) {
		console.log(values);
	}
});

//checkboxes
var my_languages = timeUI("checkboxes", "#checkboxes_container", {
	id: "my_languages",
	items: [ "Javascript", "Node.js", "Python", "Fortran" ],
	callback: function(values) {
		console.log(values);
	}
});

//checkboxes with default
var my_languages_defaults = timeUI("checkboxes", "#checkboxes_container_defaults", {
	id: "my_languages_default",
	items: [ "Javascript", "Node.js", "Python", "Fortran" ],
	defaults: ["Javascript", "Node.js"],
	callback: function(values) {
		console.log(values);
	}
});

//checkboxes with default
var my_numeric = timeUI("numeric", "#numeric_container", {
	id: "numeric",
	callback: function(values) {
		console.log(values);
	}
});

// dropdown
var my_dropdown = timeUI("dropdown", "#dropdown_container", {
	id: "my_dropdown",
	intro: "your state",
	items: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District  Columbia', 'Federated States  Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
	callback: function(value) {
		console.log(value);
	}
});
},{"time-input-buttons":2}],2:[function(require,module,exports){
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
})(jQuery);
},{"./js/checkboxes.js":5,"./js/dropdown.js":6,"./js/numeric.js":7,"./js/radio.js":8,"./styles/timeUI.less":9}],3:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; var style = document.createElement('style'); style.type = 'text/css';var css = ".dropit{list-style:none;padding:0;margin:0}.dropit .dropit-trigger{position:relative}.dropit .dropit-submenu{position:absolute;top:100%;left:0;z-index:1000;display:none;min-width:150px;list-style:none;padding:0;margin:0}.dropit .dropit-open .dropit-submenu{display:block}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],4:[function(require,module,exports){
/*
 * Dropit v1.1.0
 * http://dev7studios.com/dropit
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

;(function($) {

    $.fn.dropit = function(method) {

        var methods = {

            init : function(options) {
                this.dropit.settings = $.extend({}, this.dropit.defaults, options);
                return this.each(function() {
                    var $el = $(this),
                         el = this,
                         settings = $.fn.dropit.settings;

                    // Hide initial submenus
                    $el.addClass('dropit')
                    .find('>'+ settings.triggerParentEl +':has('+ settings.submenuEl +')').addClass('dropit-trigger')
                    .find(settings.submenuEl).addClass('dropit-submenu').hide();

                    // Open on click
                    $el.off(settings.action).on(settings.action, settings.triggerParentEl +':has('+ settings.submenuEl +') > '+ settings.triggerEl +'', function(){
                        // Close click menu's if clicked again
                        if(settings.action == 'click' && $(this).parents(settings.triggerParentEl).hasClass('dropit-open')){
                            settings.beforeHide.call(this);
                            $(this).parents(settings.triggerParentEl).removeClass('dropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                            return false;
                        }

                        // Hide open menus
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);

                        // Open this menu
                        settings.beforeShow.call(this);
                        $(this).parents(settings.triggerParentEl).addClass('dropit-open').find(settings.submenuEl).show();
                        settings.afterShow.call(this);

                        return false;
                    });

                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);
                    });

                    // If hover
                    if(settings.action == 'mouseenter'){
                        $el.on('mouseleave', '.dropit-open', function(){
                            settings.beforeHide.call(this);
                            $(this).removeClass('dropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                        });
                    }

                    settings.afterLoad.call(this);
                });
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in dropit plugin!');
        }

    };

    $.fn.dropit.defaults = {
        action: 'click', // The open action for the trigger
        submenuEl: 'ul', // The submenu element
        triggerEl: 'a', // The trigger element
        triggerParentEl: 'li', // The trigger parent element
        afterLoad: function(){}, // Triggers when plugin has loaded
        beforeShow: function(){}, // Triggers before submenu is shown
        afterShow: function(){}, // Triggers after submenu is shown
        beforeHide: function(){}, // Triggers before submenu is hidden
        afterHide: function(){} // Triggers before submenu is hidden
    };

    $.fn.dropit.settings = {};

})(jQuery);

},{}],5:[function(require,module,exports){
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
},{"../templates/checkbox.html":10}],6:[function(require,module,exports){
/*
opts:
-items: the items in the dropdown
-default: which item to select on page load (optional)
-intro: Non-selectedable default text, like "Choose a state"
*/

require("./Dropit/dropit.css");
require("./Dropit/dropit.js");
var template = require("../templates/dropdown.html");

module.exports = function(parent, opts) {
	if (!opts.items) {
		console.error("You must supply an `items` property to the options to fill in the dropdown.");
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
},{"../templates/dropdown.html":11,"./Dropit/dropit.css":3,"./Dropit/dropit.js":4}],7:[function(require,module,exports){
/*
opts:
-default: default number (optional)
-length: max number of digits. Defaults to two.
*/

module.exports = function(parent, opts) {
	$(parent).addClass("timeUI");

	$("<input />", {
		id: opts.id,
		maxlength: opts.length || 2
	}).addClass("numeric").appendTo(parent);

	if (opts.default) {
		$("#" + opts.id).attr("value", opts.default);
	}

	// only allow digits in age entry
	$("#" + opts.id).on('keydown', function(e) {
	    var key = e.keyCode ? e.keyCode : e.which;

	    if (!( [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
	         (key == 65 && ( e.ctrlKey || e.metaKey  ) ) || 
	         (key >= 35 && key <= 40) ||
	         (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) ||
	         (key >= 96 && key <= 105)
	    ))
	    e.preventDefault();

	});

	$("#" + opts.id).on('keyup', function(e) {
		opts.callback && opts.callback($("#" + opts.id).val());
	});
}	

},{}],8:[function(require,module,exports){
/*
opts:
-items: the items in the dropdown
-default: which item to select on page load (optional)
*/

var template = require("../templates/radio.html");

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
},{"../templates/radio.html":12}],9:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; var style = document.createElement('style'); style.type = 'text/css';var css = ".timeUI{font-family:\"franklin-gothic-urw\",Helvetica,Arial,sans-serif}.menu{width:auto !important;display:inline-block;font-weight:100;margin:0 2px !important}.menu a{text-decoration:none}.menu .selection{background-color:#e6e6e6;text-align:center;color:#262626;display:inline-block;padding:10px}.menu ul{display:none}.menu ul.dropit-submenu{background-color:#FFF;border-top:1px dashed #262626;color:#262626;border:1px solid #262626}.menu ul.dropit-submenu li{display:block;line-height:25px;color:#262626;padding:5px 18px;border-bottom:1px dashed #262626;cursor:pointer}.menu ul.dropit-submenu li:hover{background:#C00;color:#fff;text-decoration:none}.arrow-down{width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent;border-top:5px solid #C00;display:inline-block;float:right;margin-top:8px;margin-left:8px}.numeric{display:inline-block;width:40px;border:none;border-radius:0;border-bottom:2px solid black;font-size:16px;outline:none;text-align:center}.control-group{display:inline-block;text-align:left;vertical-align:top;background:#fff}.control{font-size:18px;position:relative;display:inline-block;margin-bottom:15px;margin-right:20px;padding-left:30px;cursor:pointer}.control input{position:absolute;z-index:-1;opacity:0}.control__indicator{position:absolute;top:2px;left:0;width:20px;height:20px;background:#e6e6e6}.control--radio .control__indicator{border-radius:50%}.control:hover input~.control__indicator,.control input:focus~.control__indicator{background:#ccc}.control input:checked~.control__indicator{background:#C00}.control input:disabled~.control__indicator{pointer-events:none;opacity:.6;background:#e6e6e6}.control__indicator:after{position:absolute;display:none;content:''}.control input:checked~.control__indicator:after{display:block}.control--checkbox .control__indicator:after{top:4px;left:8px;width:3px;height:8px;transform:rotate(45deg);border:solid #fff;border-width:0 2px 2px 0}.control--checkbox input:disabled~.control__indicator:after{border-color:#7b7b7b}.control--radio .control__indicator:after{top:7px;left:7px;width:6px;height:6px;border-radius:50%;background:#fff}.control--radio input:disabled~.control__indicator:after{background:#7b7b7b}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],10:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\t<label class="control control--checkbox">'+
((__t=( label ))==null?'':__t)+
'\n\t\t<input type="checkbox" data-value="'+
((__t=( label ))==null?'':__t)+
'" />\n\t\t<div class="control__indicator"></div>\n\t</label>\n';
}
return __p;
};

},{}],11:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\t<ul id="'+
((__t=( id ))==null?'':__t)+
'" class="menu">\n\t    <li>\n\t        <a href="#" class="selection"><span class="value">'+
((__t=( intro ))==null?'':__t)+
'</span> <div class="arrow-down"></div></a>\n\t        <ul></ul>\n\t    </li>\n\t</ul>';
}
return __p;
};

},{}],12:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='\t<label class="control control--radio">'+
((__t=( label ))==null?'':__t)+
'\n\t\t<input type="radio" name="'+
((__t=( group ))==null?'':__t)+
'" data-value="'+
((__t=( label ))==null?'':__t)+
'" />\n\t\t<div class="control__indicator"></div>\n\t</label>\n';
}
return __p;
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImRlYnVnLmpzIiwiLi4vaW5kZXguanMiLCIuLi9qcy9Ecm9waXQvZHJvcGl0LmNzcyIsIi4uL2pzL0Ryb3BpdC9kcm9waXQuanMiLCIuLi9qcy9jaGVja2JveGVzLmpzIiwiLi4vanMvZHJvcGRvd24uanMiLCIuLi9qcy9udW1lcmljLmpzIiwiLi4vanMvcmFkaW8uanMiLCIuLi9zdHlsZXMvdGltZVVJLmxlc3MiLCIuLi90ZW1wbGF0ZXMvY2hlY2tib3guaHRtbCIsIi4uL3RlbXBsYXRlcy9kcm9wZG93bi5odG1sIiwiLi4vdGVtcGxhdGVzL3JhZGlvLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB0aW1lVUkgPSByZXF1aXJlKFwidGltZS1pbnB1dC1idXR0b25zXCIpO1xuXG4vL1JhZGlvIGJ1dHRvbnNcbnZhciBteV9mcmllbmRzID0gdGltZVVJKFwicmFkaW9cIiwgXCIjcmFkaW9fY29udGFpbmVyXCIsIHtcblx0aWQ6IFwibXlfZ2VuZGVyXCIsXG5cdGl0ZW1zOiBbIFwid29tYW5cIiwgXCJtYW5cIiBdLFxuXHRjYWxsYmFjazogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZyh2YWx1ZSk7XG5cdH1cbn0pO1xuXG4vL1JhZGlvIGJ1dHRvbnMgd2l0aCBkZWZhdWx0IHNlbGVjdGVkXG52YXIgbXlfZnJpZW5kc19kZWZhdWx0ID0gdGltZVVJKFwicmFkaW9cIiwgXCIjcmFkaW9fY29udGFpbmVyX2RlZmF1bHRcIiwge1xuXHRpZDogXCJteV9mYXZvcml0ZV9jb2RlclwiLFxuXHRpdGVtczogWyBcIkNocmlzXCIsIFwiRGF2ZVwiLCBcIlByYXRoZWVrXCIgXSxcblx0ZGVmYXVsdDogXCJEYXZlXCIsXG5cdGNhbGxiYWNrOiBmdW5jdGlvbih2YWx1ZXMpIHtcblx0XHRjb25zb2xlLmxvZyh2YWx1ZXMpO1xuXHR9XG59KTtcblxuLy9jaGVja2JveGVzXG52YXIgbXlfbGFuZ3VhZ2VzID0gdGltZVVJKFwiY2hlY2tib3hlc1wiLCBcIiNjaGVja2JveGVzX2NvbnRhaW5lclwiLCB7XG5cdGlkOiBcIm15X2xhbmd1YWdlc1wiLFxuXHRpdGVtczogWyBcIkphdmFzY3JpcHRcIiwgXCJOb2RlLmpzXCIsIFwiUHl0aG9uXCIsIFwiRm9ydHJhblwiIF0sXG5cdGNhbGxiYWNrOiBmdW5jdGlvbih2YWx1ZXMpIHtcblx0XHRjb25zb2xlLmxvZyh2YWx1ZXMpO1xuXHR9XG59KTtcblxuLy9jaGVja2JveGVzIHdpdGggZGVmYXVsdFxudmFyIG15X2xhbmd1YWdlc19kZWZhdWx0cyA9IHRpbWVVSShcImNoZWNrYm94ZXNcIiwgXCIjY2hlY2tib3hlc19jb250YWluZXJfZGVmYXVsdHNcIiwge1xuXHRpZDogXCJteV9sYW5ndWFnZXNfZGVmYXVsdFwiLFxuXHRpdGVtczogWyBcIkphdmFzY3JpcHRcIiwgXCJOb2RlLmpzXCIsIFwiUHl0aG9uXCIsIFwiRm9ydHJhblwiIF0sXG5cdGRlZmF1bHRzOiBbXCJKYXZhc2NyaXB0XCIsIFwiTm9kZS5qc1wiXSxcblx0Y2FsbGJhY2s6IGZ1bmN0aW9uKHZhbHVlcykge1xuXHRcdGNvbnNvbGUubG9nKHZhbHVlcyk7XG5cdH1cbn0pO1xuXG4vL2NoZWNrYm94ZXMgd2l0aCBkZWZhdWx0XG52YXIgbXlfbnVtZXJpYyA9IHRpbWVVSShcIm51bWVyaWNcIiwgXCIjbnVtZXJpY19jb250YWluZXJcIiwge1xuXHRpZDogXCJudW1lcmljXCIsXG5cdGNhbGxiYWNrOiBmdW5jdGlvbih2YWx1ZXMpIHtcblx0XHRjb25zb2xlLmxvZyh2YWx1ZXMpO1xuXHR9XG59KTtcblxuLy8gZHJvcGRvd25cbnZhciBteV9kcm9wZG93biA9IHRpbWVVSShcImRyb3Bkb3duXCIsIFwiI2Ryb3Bkb3duX2NvbnRhaW5lclwiLCB7XG5cdGlkOiBcIm15X2Ryb3Bkb3duXCIsXG5cdGludHJvOiBcInlvdXIgc3RhdGVcIixcblx0aXRlbXM6IFsnQWxhYmFtYScsICdBbGFza2EnLCAnQW1lcmljYW4gU2Ftb2EnLCAnQXJpem9uYScsICdBcmthbnNhcycsICdDYWxpZm9ybmlhJywgJ0NvbG9yYWRvJywgJ0Nvbm5lY3RpY3V0JywgJ0RlbGF3YXJlJywgJ0Rpc3RyaWN0ICBDb2x1bWJpYScsICdGZWRlcmF0ZWQgU3RhdGVzICBNaWNyb25lc2lhJywgJ0Zsb3JpZGEnLCAnR2VvcmdpYScsICdHdWFtJywgJ0hhd2FpaScsICdJZGFobycsICdJbGxpbm9pcycsICdJbmRpYW5hJywgJ0lvd2EnLCAnS2Fuc2FzJywgJ0tlbnR1Y2t5JywgJ0xvdWlzaWFuYScsICdNYWluZScsICdNYXJzaGFsbCBJc2xhbmRzJywgJ01hcnlsYW5kJywgJ01hc3NhY2h1c2V0dHMnLCAnTWljaGlnYW4nLCAnTWlubmVzb3RhJywgJ01pc3Npc3NpcHBpJywgJ01pc3NvdXJpJywgJ01vbnRhbmEnLCAnTmVicmFza2EnLCAnTmV2YWRhJywgJ05ldyBIYW1wc2hpcmUnLCAnTmV3IEplcnNleScsICdOZXcgTWV4aWNvJywgJ05ldyBZb3JrJywgJ05vcnRoIENhcm9saW5hJywgJ05vcnRoIERha290YScsICdOb3J0aGVybiBNYXJpYW5hIElzbGFuZHMnLCAnT2hpbycsICdPa2xhaG9tYScsICdPcmVnb24nLCAnUGFsYXUnLCAnUGVubnN5bHZhbmlhJywgJ1B1ZXJ0byBSaWNvJywgJ1Job2RlIElzbGFuZCcsICdTb3V0aCBDYXJvbGluYScsICdTb3V0aCBEYWtvdGEnLCAnVGVubmVzc2VlJywgJ1RleGFzJywgJ1V0YWgnLCAnVmVybW9udCcsICdWaXJnaW4gSXNsYW5kcycsICdWaXJnaW5pYScsICdXYXNoaW5ndG9uJywgJ1dlc3QgVmlyZ2luaWEnLCAnV2lzY29uc2luJywgJ1d5b21pbmcnXSxcblx0Y2FsbGJhY2s6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0Y29uc29sZS5sb2codmFsdWUpO1xuXHR9XG59KTsiLCIvKlxub3B0czpcbi1pZDogaWQgb2YgaW5wdXQgZWxlbWVudCAocmVxdWlyZWQpXG4tcGFyZW50OiBzZWxlY3RvciB0byB3aGljaCB0byBhcHBlbmQgZWxlbWVudFxuKi9cblxucmVxdWlyZShcIi4vc3R5bGVzL3RpbWVVSS5sZXNzXCIpO1xuXG47KGZ1bmN0aW9uKCQpIHtcblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih0eXBlLCBwYXJlbnQsIG9wdHMpIHtcblx0XHR2YXIgdHlwZXMgPSB7XG5cdFx0XHRkcm9wZG93bjogcmVxdWlyZShcIi4vanMvZHJvcGRvd24uanNcIiksXG5cdFx0XHRyYWRpbzogcmVxdWlyZShcIi4vanMvcmFkaW8uanNcIiksXG5cdFx0XHRudW1lcmljOiByZXF1aXJlKFwiLi9qcy9udW1lcmljLmpzXCIpLFxuXHRcdFx0Y2hlY2tib3hlczogcmVxdWlyZShcIi4vanMvY2hlY2tib3hlcy5qc1wiKVxuXHRcdH07XG5cblx0XHRpZiAoIXR5cGVzW3R5cGVdKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcInRpbWVVSSBlcnJvcjpcIiwgdHlwZSwgXCJpcyBub3QgYSB2YWxpZCB0aW1lVUkgdHlwZS4gT3B0aW9ucyBhcmU6XCIsIE9iamVjdC5rZXlzKHR5cGVzKS5qb2luKFwiLCBcIikpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghb3B0cy5pZCB8fCAhcGFyZW50KSB7XG5cdFx0XHRjb25zb2xlLmxvZyhcInRpbWVVSSBlcnJvcjogWW91IG11c3QgZ2l2ZSB0aW1lIGlucHV0IGJ1dHRvbnMgb3B0aW9ucyBhbiBgaWRgIGFuZCBhIGBwYXJlbnRgICh3aGljaCBzaG91bGQgYmUgYSB2YWxpZCBqcXVlcnkgc2VsZWN0b3IpXCIpXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHR5cGVzW3R5cGVdKHBhcmVudCwgb3B0cyk7XG5cblx0fVxufSkoalF1ZXJ5KTsiLCIoZnVuY3Rpb24oKSB7IHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXTsgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTsgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7dmFyIGNzcyA9IFwiLmRyb3BpdHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZzowO21hcmdpbjowfS5kcm9waXQgLmRyb3BpdC10cmlnZ2Vye3Bvc2l0aW9uOnJlbGF0aXZlfS5kcm9waXQgLmRyb3BpdC1zdWJtZW51e3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6MDt6LWluZGV4OjEwMDA7ZGlzcGxheTpub25lO21pbi13aWR0aDoxNTBweDtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZzowO21hcmdpbjowfS5kcm9waXQgLmRyb3BpdC1vcGVuIC5kcm9waXQtc3VibWVudXtkaXNwbGF5OmJsb2NrfVwiO2lmIChzdHlsZS5zdHlsZVNoZWV0KXsgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzOyB9IGVsc2UgeyBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTsgfSBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTt9KCkpIiwiLypcbiAqIERyb3BpdCB2MS4xLjBcbiAqIGh0dHA6Ly9kZXY3c3R1ZGlvcy5jb20vZHJvcGl0XG4gKlxuICogQ29weXJpZ2h0IDIwMTIsIERldjdzdHVkaW9zXG4gKiBGcmVlIHRvIHVzZSBhbmQgYWJ1c2UgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAqL1xuXG47KGZ1bmN0aW9uKCQpIHtcblxuICAgICQuZm4uZHJvcGl0ID0gZnVuY3Rpb24obWV0aG9kKSB7XG5cbiAgICAgICAgdmFyIG1ldGhvZHMgPSB7XG5cbiAgICAgICAgICAgIGluaXQgOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcm9waXQuc2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgdGhpcy5kcm9waXQuZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciAkZWwgPSAkKHRoaXMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgIGVsID0gdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9ICQuZm4uZHJvcGl0LnNldHRpbmdzO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEhpZGUgaW5pdGlhbCBzdWJtZW51c1xuICAgICAgICAgICAgICAgICAgICAkZWwuYWRkQ2xhc3MoJ2Ryb3BpdCcpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCc+Jysgc2V0dGluZ3MudHJpZ2dlclBhcmVudEVsICsnOmhhcygnKyBzZXR0aW5ncy5zdWJtZW51RWwgKycpJykuYWRkQ2xhc3MoJ2Ryb3BpdC10cmlnZ2VyJylcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoc2V0dGluZ3Muc3VibWVudUVsKS5hZGRDbGFzcygnZHJvcGl0LXN1Ym1lbnUnKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gT3BlbiBvbiBjbGlja1xuICAgICAgICAgICAgICAgICAgICAkZWwub2ZmKHNldHRpbmdzLmFjdGlvbikub24oc2V0dGluZ3MuYWN0aW9uLCBzZXR0aW5ncy50cmlnZ2VyUGFyZW50RWwgKyc6aGFzKCcrIHNldHRpbmdzLnN1Ym1lbnVFbCArJykgPiAnKyBzZXR0aW5ncy50cmlnZ2VyRWwgKycnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xvc2UgY2xpY2sgbWVudSdzIGlmIGNsaWNrZWQgYWdhaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmFjdGlvbiA9PSAnY2xpY2snICYmICQodGhpcykucGFyZW50cyhzZXR0aW5ncy50cmlnZ2VyUGFyZW50RWwpLmhhc0NsYXNzKCdkcm9waXQtb3BlbicpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5iZWZvcmVIaWRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKHNldHRpbmdzLnRyaWdnZXJQYXJlbnRFbCkucmVtb3ZlQ2xhc3MoJ2Ryb3BpdC1vcGVuJykuZmluZChzZXR0aW5ncy5zdWJtZW51RWwpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hZnRlckhpZGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEhpZGUgb3BlbiBtZW51c1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYmVmb3JlSGlkZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRyb3BpdC1vcGVuJykucmVtb3ZlQ2xhc3MoJ2Ryb3BpdC1vcGVuJykuZmluZCgnLmRyb3BpdC1zdWJtZW51JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJIaWRlLmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9wZW4gdGhpcyBtZW51XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5iZWZvcmVTaG93LmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudHMoc2V0dGluZ3MudHJpZ2dlclBhcmVudEVsKS5hZGRDbGFzcygnZHJvcGl0LW9wZW4nKS5maW5kKHNldHRpbmdzLnN1Ym1lbnVFbCkuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJTaG93LmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gQ2xvc2UgaWYgb3V0c2lkZSBjbGlja1xuICAgICAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYmVmb3JlSGlkZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmRyb3BpdC1vcGVuJykucmVtb3ZlQ2xhc3MoJ2Ryb3BpdC1vcGVuJykuZmluZCgnLmRyb3BpdC1zdWJtZW51JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJIaWRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIElmIGhvdmVyXG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmFjdGlvbiA9PSAnbW91c2VlbnRlcicpe1xuICAgICAgICAgICAgICAgICAgICAgICAgJGVsLm9uKCdtb3VzZWxlYXZlJywgJy5kcm9waXQtb3BlbicsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYmVmb3JlSGlkZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Ryb3BpdC1vcGVuJykuZmluZChzZXR0aW5ncy5zdWJtZW51RWwpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncy5hZnRlckhpZGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJMb2FkLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAobWV0aG9kc1ttZXRob2RdKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kc1ttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdvYmplY3QnIHx8ICFtZXRob2QpIHtcbiAgICAgICAgICAgIHJldHVybiBtZXRob2RzLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQuZXJyb3IoICdNZXRob2QgXCInICsgIG1ldGhvZCArICdcIiBkb2VzIG5vdCBleGlzdCBpbiBkcm9waXQgcGx1Z2luIScpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJC5mbi5kcm9waXQuZGVmYXVsdHMgPSB7XG4gICAgICAgIGFjdGlvbjogJ2NsaWNrJywgLy8gVGhlIG9wZW4gYWN0aW9uIGZvciB0aGUgdHJpZ2dlclxuICAgICAgICBzdWJtZW51RWw6ICd1bCcsIC8vIFRoZSBzdWJtZW51IGVsZW1lbnRcbiAgICAgICAgdHJpZ2dlckVsOiAnYScsIC8vIFRoZSB0cmlnZ2VyIGVsZW1lbnRcbiAgICAgICAgdHJpZ2dlclBhcmVudEVsOiAnbGknLCAvLyBUaGUgdHJpZ2dlciBwYXJlbnQgZWxlbWVudFxuICAgICAgICBhZnRlckxvYWQ6IGZ1bmN0aW9uKCl7fSwgLy8gVHJpZ2dlcnMgd2hlbiBwbHVnaW4gaGFzIGxvYWRlZFxuICAgICAgICBiZWZvcmVTaG93OiBmdW5jdGlvbigpe30sIC8vIFRyaWdnZXJzIGJlZm9yZSBzdWJtZW51IGlzIHNob3duXG4gICAgICAgIGFmdGVyU2hvdzogZnVuY3Rpb24oKXt9LCAvLyBUcmlnZ2VycyBhZnRlciBzdWJtZW51IGlzIHNob3duXG4gICAgICAgIGJlZm9yZUhpZGU6IGZ1bmN0aW9uKCl7fSwgLy8gVHJpZ2dlcnMgYmVmb3JlIHN1Ym1lbnUgaXMgaGlkZGVuXG4gICAgICAgIGFmdGVySGlkZTogZnVuY3Rpb24oKXt9IC8vIFRyaWdnZXJzIGJlZm9yZSBzdWJtZW51IGlzIGhpZGRlblxuICAgIH07XG5cbiAgICAkLmZuLmRyb3BpdC5zZXR0aW5ncyA9IHt9O1xuXG59KShqUXVlcnkpO1xuIiwiLypcbm9wdHM6XG4taXRlbXM6IHRoZSBpdGVtcyBpbiB0aGUgZHJvcGRvd25cbi1kZWZhdWx0czogd2hpY2ggaXRlbSB0byBzZWxlY3Qgb24gcGFnZSBsb2FkIChvcHRpb25hbClcbiovXG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi90ZW1wbGF0ZXMvY2hlY2tib3guaHRtbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXJlbnQsIG9wdHMpIHtcblx0aWYgKCFvcHRzLml0ZW1zKSB7XG5cdFx0Y29uc29sZS5lcnJvcihcIllvdSBtdXN0IHN1cHBseSBhbiBgaXRlbXNgIHByb3BlcnR5IHRvIHRoZSBvcHRpb25zIHRvIGZpbGwgaW4gdGhlIHJhZGlvIGJ1dHRvbnMuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdCQocGFyZW50KS5hZGRDbGFzcyhcInRpbWVVSVwiKTtcblxuXHR2YXIgY29udGFpbmVyID0gJChcIjxkaXYgLz5cIiwgeyBpZDogb3B0cy5pZCB9KS5hZGRDbGFzcyhcImNvbnRyb2wtZ3JvdXBcIikuYXBwZW5kVG8ocGFyZW50KTtcblxuXHRvcHRzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdCQodGVtcGxhdGUoeyBncm91cDogb3B0cy5pZCwgbGFiZWw6IGl0ZW0gfSkpLmFwcGVuZFRvKGNvbnRhaW5lcik7XG5cdH0pO1xuXG5cdGlmIChvcHRzLmRlZmF1bHRzKSB7XG5cdFx0b3B0cy5kZWZhdWx0cy5mb3JFYWNoKGZ1bmN0aW9uKGRlZikge1xuXHRcdFx0JChwYXJlbnQgKyBcIiBpbnB1dFtkYXRhLXZhbHVlPSdcIiArIGRlZiArIFwiJ11cIikuYXR0cihcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIpO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0X3NlbGVjdGVkKCkge1xuXHRcdHZhciBzZWxlY3RlZCA9IFtdO1xuXHRcdCQocGFyZW50ICsgXCIgaW5wdXQ6Y2hlY2tlZFwiKS5lYWNoKGZ1bmN0aW9uKGksIHYpIHtcblx0XHRcdHNlbGVjdGVkLnB1c2goJCh2KS5kYXRhKFwidmFsdWVcIikpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBzZWxlY3RlZDtcdFx0XG5cdH1cblxuXHQkKHBhcmVudCArIFwiIGlucHV0XCIpLmNoYW5nZShmdW5jdGlvbigpIHtcblx0XHRvcHRzLmNhbGxiYWNrICYmIG9wdHMuY2FsbGJhY2soZ2V0X3NlbGVjdGVkKCkpO1xuXHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdHZhbHVlOiBnZXRfc2VsZWN0ZWQoKSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlcykge1xuXHRcdFx0Ly8gdG8gZG9cblx0XHR9XG5cdH1cbn0iLCIvKlxub3B0czpcbi1pdGVtczogdGhlIGl0ZW1zIGluIHRoZSBkcm9wZG93blxuLWRlZmF1bHQ6IHdoaWNoIGl0ZW0gdG8gc2VsZWN0IG9uIHBhZ2UgbG9hZCAob3B0aW9uYWwpXG4taW50cm86IE5vbi1zZWxlY3RlZGFibGUgZGVmYXVsdCB0ZXh0LCBsaWtlIFwiQ2hvb3NlIGEgc3RhdGVcIlxuKi9cblxucmVxdWlyZShcIi4vRHJvcGl0L2Ryb3BpdC5jc3NcIik7XG5yZXF1aXJlKFwiLi9Ecm9waXQvZHJvcGl0LmpzXCIpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZShcIi4uL3RlbXBsYXRlcy9kcm9wZG93bi5odG1sXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBhcmVudCwgb3B0cykge1xuXHRpZiAoIW9wdHMuaXRlbXMpIHtcblx0XHRjb25zb2xlLmVycm9yKFwiWW91IG11c3Qgc3VwcGx5IGFuIGBpdGVtc2AgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgdG8gZmlsbCBpbiB0aGUgZHJvcGRvd24uXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICghb3B0cy5pbnRybykge1xuXHRcdG9wdHMuZGVmYXVsdCA9IG9wdHMuZGVmYXVsdCB8fCBvcHRzLml0ZW1zWzBdO1xuXHRcdG9wdHMuaW50cm8gPSBvcHRzLmRlZmF1bHQ7XG5cdH1cblxuXHQkKHBhcmVudCkuYWRkQ2xhc3MoXCJ0aW1lVUlcIik7XG5cblx0dmFyIG1lbnUgPSAkKHRlbXBsYXRlKG9wdHMpKS5hcHBlbmRUbyhwYXJlbnQpO1xuXG5cdG9wdHMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0dmFyIGxpID0gJChcIjxsaSAvPlwiLCB7XG5cdFx0XHRodG1sOiBpdGVtXG5cdFx0fSkuYXBwZW5kVG8oXCIjXCIgKyBvcHRzLmlkICsgXCIgbGkgdWxcIik7XG5cdH0pO1xuXG5cdCQoJy5tZW51JykuZHJvcGl0KCk7XHRcblxuXHQvLyByZXBsYWNlIHZhbHVlIHdoZW4gc2VsZWN0aW9uIGNoYW5nZXNcblx0JChcImJvZHlcIikub24oXCJjbGlja1wiLCBcIiNcIiArIG9wdHMuaWQgKyBcIiBsaSB1bCBsaVwiLCBmdW5jdGlvbigpIHtcblx0XHQkKFwiI1wiICsgb3B0cy5pZCArIFwiIC52YWx1ZVwiKS5odG1sKCQodGhpcykudGV4dCgpKTtcblx0XHRvcHRzLmNhbGxiYWNrICYmIG9wdHMuY2FsbGJhY2soJCh0aGlzKS50ZXh0KCkpO1xuXHR9KTtcblxuXHRyZXR1cm4ge1xuXHRcdHZhbHVlOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiAkKFwiI1wiICsgb3B0cy5pZCArIFwiIC52YWx1ZVwiKS50ZXh0KCk7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRpZiAob3B0cy5pdGVtcy5pbmRleE9mKHZhbHVlKSA9PSAtMSkge1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKHZhbHVlICsgXCIgaXMgbm90IGEgdmFsaWQgdmFsdWUgZm9yIHRoaXMgZHJvcGRvd24uXCIpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHQkKFwiI1wiICsgb3B0cy5pZCArIFwiIC52YWx1ZVwiKS5odG1sKHZhbHVlKTtcblx0XHR9XG5cdH1cblxufSIsIi8qXG5vcHRzOlxuLWRlZmF1bHQ6IGRlZmF1bHQgbnVtYmVyIChvcHRpb25hbClcbi1sZW5ndGg6IG1heCBudW1iZXIgb2YgZGlnaXRzLiBEZWZhdWx0cyB0byB0d28uXG4qL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBhcmVudCwgb3B0cykge1xuXHQkKHBhcmVudCkuYWRkQ2xhc3MoXCJ0aW1lVUlcIik7XG5cblx0JChcIjxpbnB1dCAvPlwiLCB7XG5cdFx0aWQ6IG9wdHMuaWQsXG5cdFx0bWF4bGVuZ3RoOiBvcHRzLmxlbmd0aCB8fCAyXG5cdH0pLmFkZENsYXNzKFwibnVtZXJpY1wiKS5hcHBlbmRUbyhwYXJlbnQpO1xuXG5cdGlmIChvcHRzLmRlZmF1bHQpIHtcblx0XHQkKFwiI1wiICsgb3B0cy5pZCkuYXR0cihcInZhbHVlXCIsIG9wdHMuZGVmYXVsdCk7XG5cdH1cblxuXHQvLyBvbmx5IGFsbG93IGRpZ2l0cyBpbiBhZ2UgZW50cnlcblx0JChcIiNcIiArIG9wdHMuaWQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXHQgICAgdmFyIGtleSA9IGUua2V5Q29kZSA/IGUua2V5Q29kZSA6IGUud2hpY2g7XG5cblx0ICAgIGlmICghKCBbOCwgOSwgMTMsIDI3LCA0NiwgMTEwLCAxOTBdLmluZGV4T2Yoa2V5KSAhPT0gLTEgfHxcblx0ICAgICAgICAgKGtleSA9PSA2NSAmJiAoIGUuY3RybEtleSB8fCBlLm1ldGFLZXkgICkgKSB8fCBcblx0ICAgICAgICAgKGtleSA+PSAzNSAmJiBrZXkgPD0gNDApIHx8XG5cdCAgICAgICAgIChrZXkgPj0gNDggJiYga2V5IDw9IDU3ICYmICEoZS5zaGlmdEtleSB8fCBlLmFsdEtleSkpIHx8XG5cdCAgICAgICAgIChrZXkgPj0gOTYgJiYga2V5IDw9IDEwNSlcblx0ICAgICkpXG5cdCAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cblx0fSk7XG5cblx0JChcIiNcIiArIG9wdHMuaWQpLm9uKCdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcblx0XHRvcHRzLmNhbGxiYWNrICYmIG9wdHMuY2FsbGJhY2soJChcIiNcIiArIG9wdHMuaWQpLnZhbCgpKTtcblx0fSk7XG59XHRcbiIsIi8qXG5vcHRzOlxuLWl0ZW1zOiB0aGUgaXRlbXMgaW4gdGhlIGRyb3Bkb3duXG4tZGVmYXVsdDogd2hpY2ggaXRlbSB0byBzZWxlY3Qgb24gcGFnZSBsb2FkIChvcHRpb25hbClcbiovXG5cbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi90ZW1wbGF0ZXMvcmFkaW8uaHRtbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXJlbnQsIG9wdHMpIHtcblx0aWYgKCFvcHRzLml0ZW1zKSB7XG5cdFx0Y29uc29sZS5lcnJvcihcIllvdSBtdXN0IHN1cHBseSBhbiBgaXRlbXNgIHByb3BlcnR5IHRvIHRoZSBvcHRpb25zIHRvIGZpbGwgaW4gdGhlIHJhZGlvIGJ1dHRvbnMuXCIpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdCQocGFyZW50KS5hZGRDbGFzcyhcInRpbWVVSVwiKTtcblx0dmFyIGNvbnRhaW5lciA9ICQoXCI8ZGl2IC8+XCIsIHsgaWQ6IG9wdHMuaWQgfSkuYWRkQ2xhc3MoXCJjb250cm9sLWdyb3VwXCIpLmFwcGVuZFRvKHBhcmVudCk7XG5cblx0b3B0cy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHQkKHRlbXBsYXRlKHsgZ3JvdXA6IG9wdHMuaWQsIGxhYmVsOiBpdGVtIH0pKS5hcHBlbmRUbyhjb250YWluZXIpO1xuXHR9KTtcblxuXHRpZiAob3B0cy5kZWZhdWx0KSB7XG5cdFx0JChwYXJlbnQgKyBcIiBpbnB1dFtkYXRhLXZhbHVlPSdcIiArIG9wdHMuZGVmYXVsdCArIFwiJ11cIikuYXR0cihcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0X3NlbGVjdGVkKCkge1xuXHRcdHJldHVybiAkKHBhcmVudCArIFwiIGlucHV0OmNoZWNrZWRcIikuZGF0YShcInZhbHVlXCIpO1xuXHR9XG5cblx0JChwYXJlbnQgKyBcIiBpbnB1dFwiKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG5cdFx0b3B0cy5jYWxsYmFjayAmJiBvcHRzLmNhbGxiYWNrKGdldF9zZWxlY3RlZCgpKTtcblx0fSk7XG5cblx0cmV0dXJuIHtcblx0XHR2YWx1ZTogZ2V0X3NlbGVjdGVkLFxuXHRcdHNldDogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRcdC8vIHRvIGRvXG5cdFx0fVxuXHR9XG59IiwiKGZ1bmN0aW9uKCkgeyB2YXIgaGVhZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07IHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7IHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO3ZhciBjc3MgPSBcIi50aW1lVUl7Zm9udC1mYW1pbHk6XFxcImZyYW5rbGluLWdvdGhpYy11cndcXFwiLEhlbHZldGljYSxBcmlhbCxzYW5zLXNlcmlmfS5tZW51e3dpZHRoOmF1dG8gIWltcG9ydGFudDtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXdlaWdodDoxMDA7bWFyZ2luOjAgMnB4ICFpbXBvcnRhbnR9Lm1lbnUgYXt0ZXh0LWRlY29yYXRpb246bm9uZX0ubWVudSAuc2VsZWN0aW9ue2JhY2tncm91bmQtY29sb3I6I2U2ZTZlNjt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojMjYyNjI2O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MTBweH0ubWVudSB1bHtkaXNwbGF5Om5vbmV9Lm1lbnUgdWwuZHJvcGl0LXN1Ym1lbnV7YmFja2dyb3VuZC1jb2xvcjojRkZGO2JvcmRlci10b3A6MXB4IGRhc2hlZCAjMjYyNjI2O2NvbG9yOiMyNjI2MjY7Ym9yZGVyOjFweCBzb2xpZCAjMjYyNjI2fS5tZW51IHVsLmRyb3BpdC1zdWJtZW51IGxpe2Rpc3BsYXk6YmxvY2s7bGluZS1oZWlnaHQ6MjVweDtjb2xvcjojMjYyNjI2O3BhZGRpbmc6NXB4IDE4cHg7Ym9yZGVyLWJvdHRvbToxcHggZGFzaGVkICMyNjI2MjY7Y3Vyc29yOnBvaW50ZXJ9Lm1lbnUgdWwuZHJvcGl0LXN1Ym1lbnUgbGk6aG92ZXJ7YmFja2dyb3VuZDojQzAwO2NvbG9yOiNmZmY7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmFycm93LWRvd257d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItbGVmdDozcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjNweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItdG9wOjVweCBzb2xpZCAjQzAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2Zsb2F0OnJpZ2h0O21hcmdpbi10b3A6OHB4O21hcmdpbi1sZWZ0OjhweH0ubnVtZXJpY3tkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDo0MHB4O2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6MDtib3JkZXItYm90dG9tOjJweCBzb2xpZCBibGFjaztmb250LXNpemU6MTZweDtvdXRsaW5lOm5vbmU7dGV4dC1hbGlnbjpjZW50ZXJ9LmNvbnRyb2wtZ3JvdXB7ZGlzcGxheTppbmxpbmUtYmxvY2s7dGV4dC1hbGlnbjpsZWZ0O3ZlcnRpY2FsLWFsaWduOnRvcDtiYWNrZ3JvdW5kOiNmZmZ9LmNvbnRyb2x7Zm9udC1zaXplOjE4cHg7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLWJvdHRvbToxNXB4O21hcmdpbi1yaWdodDoyMHB4O3BhZGRpbmctbGVmdDozMHB4O2N1cnNvcjpwb2ludGVyfS5jb250cm9sIGlucHV0e3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6LTE7b3BhY2l0eTowfS5jb250cm9sX19pbmRpY2F0b3J7cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtsZWZ0OjA7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtiYWNrZ3JvdW5kOiNlNmU2ZTZ9LmNvbnRyb2wtLXJhZGlvIC5jb250cm9sX19pbmRpY2F0b3J7Ym9yZGVyLXJhZGl1czo1MCV9LmNvbnRyb2w6aG92ZXIgaW5wdXR+LmNvbnRyb2xfX2luZGljYXRvciwuY29udHJvbCBpbnB1dDpmb2N1c34uY29udHJvbF9faW5kaWNhdG9ye2JhY2tncm91bmQ6I2NjY30uY29udHJvbCBpbnB1dDpjaGVja2Vkfi5jb250cm9sX19pbmRpY2F0b3J7YmFja2dyb3VuZDojQzAwfS5jb250cm9sIGlucHV0OmRpc2FibGVkfi5jb250cm9sX19pbmRpY2F0b3J7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5Oi42O2JhY2tncm91bmQ6I2U2ZTZlNn0uY29udHJvbF9faW5kaWNhdG9yOmFmdGVye3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6bm9uZTtjb250ZW50OicnfS5jb250cm9sIGlucHV0OmNoZWNrZWR+LmNvbnRyb2xfX2luZGljYXRvcjphZnRlcntkaXNwbGF5OmJsb2NrfS5jb250cm9sLS1jaGVja2JveCAuY29udHJvbF9faW5kaWNhdG9yOmFmdGVye3RvcDo0cHg7bGVmdDo4cHg7d2lkdGg6M3B4O2hlaWdodDo4cHg7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7Ym9yZGVyOnNvbGlkICNmZmY7Ym9yZGVyLXdpZHRoOjAgMnB4IDJweCAwfS5jb250cm9sLS1jaGVja2JveCBpbnB1dDpkaXNhYmxlZH4uY29udHJvbF9faW5kaWNhdG9yOmFmdGVye2JvcmRlci1jb2xvcjojN2I3YjdifS5jb250cm9sLS1yYWRpbyAuY29udHJvbF9faW5kaWNhdG9yOmFmdGVye3RvcDo3cHg7bGVmdDo3cHg7d2lkdGg6NnB4O2hlaWdodDo2cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZDojZmZmfS5jb250cm9sLS1yYWRpbyBpbnB1dDpkaXNhYmxlZH4uY29udHJvbF9faW5kaWNhdG9yOmFmdGVye2JhY2tncm91bmQ6IzdiN2I3Yn1cIjtpZiAoc3R5bGUuc3R5bGVTaGVldCl7IHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzczsgfSBlbHNlIHsgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7IH0gaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7fSgpKSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9J1xcdDxsYWJlbCBjbGFzcz1cImNvbnRyb2wgY29udHJvbC0tY2hlY2tib3hcIj4nK1xuKChfX3Q9KCBsYWJlbCApKT09bnVsbD8nJzpfX3QpK1xuJ1xcblxcdFxcdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLXZhbHVlPVwiJytcbigoX190PSggbGFiZWwgKSk9PW51bGw/Jyc6X190KStcbidcIiAvPlxcblxcdFxcdDxkaXYgY2xhc3M9XCJjb250cm9sX19pbmRpY2F0b3JcIj48L2Rpdj5cXG5cXHQ8L2xhYmVsPlxcbic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9J1xcdDx1bCBpZD1cIicrXG4oKF9fdD0oIGlkICkpPT1udWxsPycnOl9fdCkrXG4nXCIgY2xhc3M9XCJtZW51XCI+XFxuXFx0ICAgIDxsaT5cXG5cXHQgICAgICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJzZWxlY3Rpb25cIj48c3BhbiBjbGFzcz1cInZhbHVlXCI+JytcbigoX190PSggaW50cm8gKSk9PW51bGw/Jyc6X190KStcbic8L3NwYW4+IDxkaXYgY2xhc3M9XCJhcnJvdy1kb3duXCI+PC9kaXY+PC9hPlxcblxcdCAgICAgICAgPHVsPjwvdWw+XFxuXFx0ICAgIDwvbGk+XFxuXFx0PC91bD4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iail7XG52YXIgX190LF9fcD0nJyxfX2o9QXJyYXkucHJvdG90eXBlLmpvaW4scHJpbnQ9ZnVuY3Rpb24oKXtfX3ArPV9fai5jYWxsKGFyZ3VtZW50cywnJyk7fTtcbndpdGgob2JqfHx7fSl7XG5fX3ArPSdcXHQ8bGFiZWwgY2xhc3M9XCJjb250cm9sIGNvbnRyb2wtLXJhZGlvXCI+JytcbigoX190PSggbGFiZWwgKSk9PW51bGw/Jyc6X190KStcbidcXG5cXHRcXHQ8aW5wdXQgdHlwZT1cInJhZGlvXCIgbmFtZT1cIicrXG4oKF9fdD0oIGdyb3VwICkpPT1udWxsPycnOl9fdCkrXG4nXCIgZGF0YS12YWx1ZT1cIicrXG4oKF9fdD0oIGxhYmVsICkpPT1udWxsPycnOl9fdCkrXG4nXCIgLz5cXG5cXHRcXHQ8ZGl2IGNsYXNzPVwiY29udHJvbF9faW5kaWNhdG9yXCI+PC9kaXY+XFxuXFx0PC9sYWJlbD5cXG4nO1xufVxucmV0dXJuIF9fcDtcbn07XG4iXX0=
