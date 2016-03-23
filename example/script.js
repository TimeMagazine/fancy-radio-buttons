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
},{"./js/checkboxes.js":4,"./js/dropdown.js":5,"./js/numeric.js":6,"./js/radio.js":7,"./styles/timeUI.less":8}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/*
opts:
-items: the items in the dropdown
-defaults: which item to select on page load (optional)
*/

var template = require("../templates/checkbox.html");

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
})(jQuery);	
},{"../templates/checkbox.html":9}],5:[function(require,module,exports){
/*
opts:
-items: the items in the dropdown
-default: which item to select on page load (optional)
-intro: Non-selectedable default text, like "Choose a state"
*/

//require(__dirname + "/Dropit/dropit.css");
require("./Dropit/dropit.js");
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
					console.log(value + " is not a valid value for this dropdown.");
					return;
				}
				$("#" + opts.id + " .value").html(value);
			}
		}
	}
})(jQuery);	
},{"../templates/dropdown.html":10,"./Dropit/dropit.js":3}],6:[function(require,module,exports){
/*
opts:
-default: default number (optional)
-length: max number of digits. Defaults to two.
*/
;(function($) {

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
})(jQuery);
},{}],7:[function(require,module,exports){
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
},{"../templates/radio.html":11}],8:[function(require,module,exports){
(function() { var head = document.getElementsByTagName('head')[0]; var style = document.createElement('style'); style.type = 'text/css';var css = ".timeUI{font-family:\"franklin-gothic-urw\",Helvetica,Arial,sans-serif}.menu{width:auto !important;display:inline-block;font-weight:100;margin:0 2px !important}.menu a{text-decoration:none}.menu .selection{position:relative;background-color:#e6e6e6;text-align:center;color:#262626;padding:10px}.menu .selection span{padding-right:20px}.menu ul{display:none}.menu ul.dropit-submenu{background-color:#FFF;border-top:1px dashed #262626;color:#262626;border:1px solid #262626}.menu ul.dropit-submenu li{display:block;line-height:25px;color:#262626;padding:5px 18px;border-bottom:1px dashed #262626;cursor:pointer}.menu ul.dropit-submenu li:hover{background:#C00;color:#fff;text-decoration:none}.arrow-down{width:0;height:0;border-left:3px solid transparent;border-right:3px solid transparent;border-top:5px solid #C00;position:absolute;right:8px;top:43%}.numeric{display:inline-block;width:40px;border:none;border-radius:0;border-bottom:2px solid black;font-size:16px;outline:none;text-align:center}.control-group{display:inline-block;text-align:left;vertical-align:top;background:#fff}.control{font-size:18px;position:relative;display:inline-block;margin-bottom:15px;margin-right:20px;padding-left:30px;cursor:pointer}.control input{position:absolute;z-index:-1;opacity:0}.control__indicator{position:absolute;top:2px;left:0;width:20px;height:20px;background:#e6e6e6}.control--radio .control__indicator{border-radius:50%}.control:hover input~.control__indicator,.control input:focus~.control__indicator{background:#ccc}.control input:checked~.control__indicator{background:#C00}.control input:disabled~.control__indicator{pointer-events:none;opacity:.6;background:#e6e6e6}.control__indicator:after{position:absolute;display:none;content:''}.control input:checked~.control__indicator:after{display:block}.control--checkbox .control__indicator:after{top:4px;left:8px;width:3px;height:8px;transform:rotate(45deg);border:solid #fff;border-width:0 2px 2px 0}.control--checkbox input:disabled~.control__indicator:after{border-color:#7b7b7b}.control--radio .control__indicator:after{top:7px;left:7px;width:6px;height:6px;border-radius:50%;background:#fff}.control--radio input:disabled~.control__indicator:after{background:#7b7b7b}button.timeUI{background-color:#C00;padding:10px 12px;cursor:pointer;color:white;border:none;border-radius:5px;outline:none;display:block;margin:25px auto;font-size:16px}.dropit{list-style:none;padding:0;margin:0}.dropit .dropit-trigger{position:relative}.dropit .dropit-submenu{position:absolute;top:100%;left:0;z-index:1000;display:none;min-width:150px;list-style:none;padding:0;margin:0}.dropit .dropit-open .dropit-submenu{display:block}";if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style);}())
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImRlYnVnLmpzIiwiLi4vaW5kZXguanMiLCIuLi9qcy9Ecm9waXQvZHJvcGl0LmpzIiwiLi4vanMvY2hlY2tib3hlcy5qcyIsIi4uL2pzL2Ryb3Bkb3duLmpzIiwiLi4vanMvbnVtZXJpYy5qcyIsIi4uL2pzL3JhZGlvLmpzIiwiLi4vc3R5bGVzL3RpbWVVSS5sZXNzIiwiLi4vdGVtcGxhdGVzL2NoZWNrYm94Lmh0bWwiLCIuLi90ZW1wbGF0ZXMvZHJvcGRvd24uaHRtbCIsIi4uL3RlbXBsYXRlcy9yYWRpby5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHRpbWVVSSA9IHJlcXVpcmUoXCJ0aW1lLWlucHV0LWJ1dHRvbnNcIik7XG5cbi8vUmFkaW8gYnV0dG9uc1xudmFyIG15X2ZyaWVuZHMgPSB0aW1lVUkoXCJyYWRpb1wiLCBcIiNyYWRpb19jb250YWluZXJcIiwge1xuXHRpZDogXCJteV9nZW5kZXJcIixcblx0aXRlbXM6IFsgXCJ3b21hblwiLCBcIm1hblwiIF0sXG5cdGNhbGxiYWNrOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdGNvbnNvbGUubG9nKHZhbHVlKTtcblx0fVxufSk7XG5cbi8vUmFkaW8gYnV0dG9ucyB3aXRoIGRlZmF1bHQgc2VsZWN0ZWRcbnZhciBteV9mcmllbmRzX2RlZmF1bHQgPSB0aW1lVUkoXCJyYWRpb1wiLCBcIiNyYWRpb19jb250YWluZXJfZGVmYXVsdFwiLCB7XG5cdGlkOiBcIm15X2Zhdm9yaXRlX2NvZGVyXCIsXG5cdGl0ZW1zOiBbIFwiQ2hyaXNcIiwgXCJEYXZlXCIsIFwiUHJhdGhlZWtcIiBdLFxuXHRkZWZhdWx0OiBcIkRhdmVcIixcblx0Y2FsbGJhY2s6IGZ1bmN0aW9uKHZhbHVlcykge1xuXHRcdGNvbnNvbGUubG9nKHZhbHVlcyk7XG5cdH1cbn0pO1xuXG4vL2NoZWNrYm94ZXNcbnZhciBteV9sYW5ndWFnZXMgPSB0aW1lVUkoXCJjaGVja2JveGVzXCIsIFwiI2NoZWNrYm94ZXNfY29udGFpbmVyXCIsIHtcblx0aWQ6IFwibXlfbGFuZ3VhZ2VzXCIsXG5cdGl0ZW1zOiBbIFwiSmF2YXNjcmlwdFwiLCBcIk5vZGUuanNcIiwgXCJQeXRob25cIiwgXCJGb3J0cmFuXCIgXSxcblx0Y2FsbGJhY2s6IGZ1bmN0aW9uKHZhbHVlcykge1xuXHRcdGNvbnNvbGUubG9nKHZhbHVlcyk7XG5cdH1cbn0pO1xuXG4vL2NoZWNrYm94ZXMgd2l0aCBkZWZhdWx0XG52YXIgbXlfbGFuZ3VhZ2VzX2RlZmF1bHRzID0gdGltZVVJKFwiY2hlY2tib3hlc1wiLCBcIiNjaGVja2JveGVzX2NvbnRhaW5lcl9kZWZhdWx0c1wiLCB7XG5cdGlkOiBcIm15X2xhbmd1YWdlc19kZWZhdWx0XCIsXG5cdGl0ZW1zOiBbIFwiSmF2YXNjcmlwdFwiLCBcIk5vZGUuanNcIiwgXCJQeXRob25cIiwgXCJGb3J0cmFuXCIgXSxcblx0ZGVmYXVsdHM6IFtcIkphdmFzY3JpcHRcIiwgXCJOb2RlLmpzXCJdLFxuXHRjYWxsYmFjazogZnVuY3Rpb24odmFsdWVzKSB7XG5cdFx0Y29uc29sZS5sb2codmFsdWVzKTtcblx0fVxufSk7XG5cbi8vY2hlY2tib3hlcyB3aXRoIGRlZmF1bHRcbnZhciBteV9udW1lcmljID0gdGltZVVJKFwibnVtZXJpY1wiLCBcIiNudW1lcmljX2NvbnRhaW5lclwiLCB7XG5cdGlkOiBcIm51bWVyaWNcIixcblx0Y2FsbGJhY2s6IGZ1bmN0aW9uKHZhbHVlcykge1xuXHRcdGNvbnNvbGUubG9nKHZhbHVlcyk7XG5cdH1cbn0pO1xuXG4vLyBkcm9wZG93blxudmFyIG15X2Ryb3Bkb3duID0gdGltZVVJKFwiZHJvcGRvd25cIiwgXCIjZHJvcGRvd25fY29udGFpbmVyXCIsIHtcblx0aWQ6IFwibXlfZHJvcGRvd25cIixcblx0aW50cm86IFwieW91ciBzdGF0ZVwiLFxuXHRpdGVtczogWydBbGFiYW1hJywgJ0FsYXNrYScsICdBbWVyaWNhbiBTYW1vYScsICdBcml6b25hJywgJ0Fya2Fuc2FzJywgJ0NhbGlmb3JuaWEnLCAnQ29sb3JhZG8nLCAnQ29ubmVjdGljdXQnLCAnRGVsYXdhcmUnLCAnRGlzdHJpY3QgIENvbHVtYmlhJywgJ0ZlZGVyYXRlZCBTdGF0ZXMgIE1pY3JvbmVzaWEnLCAnRmxvcmlkYScsICdHZW9yZ2lhJywgJ0d1YW0nLCAnSGF3YWlpJywgJ0lkYWhvJywgJ0lsbGlub2lzJywgJ0luZGlhbmEnLCAnSW93YScsICdLYW5zYXMnLCAnS2VudHVja3knLCAnTG91aXNpYW5hJywgJ01haW5lJywgJ01hcnNoYWxsIElzbGFuZHMnLCAnTWFyeWxhbmQnLCAnTWFzc2FjaHVzZXR0cycsICdNaWNoaWdhbicsICdNaW5uZXNvdGEnLCAnTWlzc2lzc2lwcGknLCAnTWlzc291cmknLCAnTW9udGFuYScsICdOZWJyYXNrYScsICdOZXZhZGEnLCAnTmV3IEhhbXBzaGlyZScsICdOZXcgSmVyc2V5JywgJ05ldyBNZXhpY28nLCAnTmV3IFlvcmsnLCAnTm9ydGggQ2Fyb2xpbmEnLCAnTm9ydGggRGFrb3RhJywgJ05vcnRoZXJuIE1hcmlhbmEgSXNsYW5kcycsICdPaGlvJywgJ09rbGFob21hJywgJ09yZWdvbicsICdQYWxhdScsICdQZW5uc3lsdmFuaWEnLCAnUHVlcnRvIFJpY28nLCAnUmhvZGUgSXNsYW5kJywgJ1NvdXRoIENhcm9saW5hJywgJ1NvdXRoIERha290YScsICdUZW5uZXNzZWUnLCAnVGV4YXMnLCAnVXRhaCcsICdWZXJtb250JywgJ1ZpcmdpbiBJc2xhbmRzJywgJ1ZpcmdpbmlhJywgJ1dhc2hpbmd0b24nLCAnV2VzdCBWaXJnaW5pYScsICdXaXNjb25zaW4nLCAnV3lvbWluZyddLFxuXHRjYWxsYmFjazogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRjb25zb2xlLmxvZyh2YWx1ZSk7XG5cdH1cbn0pOyIsIi8qXG5vcHRzOlxuLWlkOiBpZCBvZiBpbnB1dCBlbGVtZW50IChyZXF1aXJlZClcbi1wYXJlbnQ6IHNlbGVjdG9yIHRvIHdoaWNoIHRvIGFwcGVuZCBlbGVtZW50XG4qL1xuXG5yZXF1aXJlKFwiLi9zdHlsZXMvdGltZVVJLmxlc3NcIik7XG5cbjsoZnVuY3Rpb24oJCkge1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHR5cGUsIHBhcmVudCwgb3B0cykge1xuXHRcdHZhciB0eXBlcyA9IHtcblx0XHRcdGRyb3Bkb3duOiByZXF1aXJlKFwiLi9qcy9kcm9wZG93bi5qc1wiKSxcblx0XHRcdHJhZGlvOiByZXF1aXJlKFwiLi9qcy9yYWRpby5qc1wiKSxcblx0XHRcdG51bWVyaWM6IHJlcXVpcmUoXCIuL2pzL251bWVyaWMuanNcIiksXG5cdFx0XHRjaGVja2JveGVzOiByZXF1aXJlKFwiLi9qcy9jaGVja2JveGVzLmpzXCIpXG5cdFx0fTtcblxuXHRcdGlmICghdHlwZXNbdHlwZV0pIHtcblx0XHRcdGNvbnNvbGUubG9nKFwidGltZVVJIGVycm9yOlwiLCB0eXBlLCBcImlzIG5vdCBhIHZhbGlkIHRpbWVVSSB0eXBlLiBPcHRpb25zIGFyZTpcIiwgT2JqZWN0LmtleXModHlwZXMpLmpvaW4oXCIsIFwiKSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCFvcHRzLmlkIHx8ICFwYXJlbnQpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwidGltZVVJIGVycm9yOiBZb3UgbXVzdCBnaXZlIHRpbWUgaW5wdXQgYnV0dG9ucyBvcHRpb25zIGFuIGBpZGAgYW5kIGEgYHBhcmVudGAgKHdoaWNoIHNob3VsZCBiZSBhIHZhbGlkIGpxdWVyeSBzZWxlY3RvcilcIilcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHlwZXNbdHlwZV0ocGFyZW50LCBvcHRzKTtcblxuXHR9XG59KShqUXVlcnkpOyIsIi8qXG4gKiBEcm9waXQgdjEuMS4wXG4gKiBodHRwOi8vZGV2N3N0dWRpb3MuY29tL2Ryb3BpdFxuICpcbiAqIENvcHlyaWdodCAyMDEyLCBEZXY3c3R1ZGlvc1xuICogRnJlZSB0byB1c2UgYW5kIGFidXNlIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gKi9cblxuOyhmdW5jdGlvbigkKSB7XG5cbiAgICAkLmZuLmRyb3BpdCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuXG4gICAgICAgIHZhciBtZXRob2RzID0ge1xuXG4gICAgICAgICAgICBpbml0IDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuZHJvcGl0LnNldHRpbmdzID0gJC5leHRlbmQoe30sIHRoaXMuZHJvcGl0LmRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGVsID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICBlbCA9IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgPSAkLmZuLmRyb3BpdC5zZXR0aW5ncztcblxuICAgICAgICAgICAgICAgICAgICAvLyBIaWRlIGluaXRpYWwgc3VibWVudXNcbiAgICAgICAgICAgICAgICAgICAgJGVsLmFkZENsYXNzKCdkcm9waXQnKVxuICAgICAgICAgICAgICAgICAgICAuZmluZCgnPicrIHNldHRpbmdzLnRyaWdnZXJQYXJlbnRFbCArJzpoYXMoJysgc2V0dGluZ3Muc3VibWVudUVsICsnKScpLmFkZENsYXNzKCdkcm9waXQtdHJpZ2dlcicpXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKHNldHRpbmdzLnN1Ym1lbnVFbCkuYWRkQ2xhc3MoJ2Ryb3BpdC1zdWJtZW51JykuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZW4gb24gY2xpY2tcbiAgICAgICAgICAgICAgICAgICAgJGVsLm9mZihzZXR0aW5ncy5hY3Rpb24pLm9uKHNldHRpbmdzLmFjdGlvbiwgc2V0dGluZ3MudHJpZ2dlclBhcmVudEVsICsnOmhhcygnKyBzZXR0aW5ncy5zdWJtZW51RWwgKycpID4gJysgc2V0dGluZ3MudHJpZ2dlckVsICsnJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsb3NlIGNsaWNrIG1lbnUncyBpZiBjbGlja2VkIGFnYWluXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5hY3Rpb24gPT0gJ2NsaWNrJyAmJiAkKHRoaXMpLnBhcmVudHMoc2V0dGluZ3MudHJpZ2dlclBhcmVudEVsKS5oYXNDbGFzcygnZHJvcGl0LW9wZW4nKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYmVmb3JlSGlkZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQodGhpcykucGFyZW50cyhzZXR0aW5ncy50cmlnZ2VyUGFyZW50RWwpLnJlbW92ZUNsYXNzKCdkcm9waXQtb3BlbicpLmZpbmQoc2V0dGluZ3Muc3VibWVudUVsKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJIaWRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBIaWRlIG9wZW4gbWVudXNcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmJlZm9yZUhpZGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kcm9waXQtb3BlbicpLnJlbW92ZUNsYXNzKCdkcm9waXQtb3BlbicpLmZpbmQoJy5kcm9waXQtc3VibWVudScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFmdGVySGlkZS5jYWxsKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPcGVuIHRoaXMgbWVudVxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYmVmb3JlU2hvdy5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5wYXJlbnRzKHNldHRpbmdzLnRyaWdnZXJQYXJlbnRFbCkuYWRkQ2xhc3MoJ2Ryb3BpdC1vcGVuJykuZmluZChzZXR0aW5ncy5zdWJtZW51RWwpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFmdGVyU2hvdy5jYWxsKHRoaXMpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIENsb3NlIGlmIG91dHNpZGUgY2xpY2tcbiAgICAgICAgICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmJlZm9yZUhpZGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5kcm9waXQtb3BlbicpLnJlbW92ZUNsYXNzKCdkcm9waXQtb3BlbicpLmZpbmQoJy5kcm9waXQtc3VibWVudScpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFmdGVySGlkZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJZiBob3ZlclxuICAgICAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5hY3Rpb24gPT0gJ21vdXNlZW50ZXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICRlbC5vbignbW91c2VsZWF2ZScsICcuZHJvcGl0LW9wZW4nLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmJlZm9yZUhpZGUuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkcm9waXQtb3BlbicpLmZpbmQoc2V0dGluZ3Muc3VibWVudUVsKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYWZ0ZXJIaWRlLmNhbGwodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzLmFmdGVyTG9hZC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG1ldGhvZHNbbWV0aG9kXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1ldGhvZHNbbWV0aG9kXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWV0aG9kID09PSAnb2JqZWN0JyB8fCAhbWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm4gbWV0aG9kcy5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkLmVycm9yKCAnTWV0aG9kIFwiJyArICBtZXRob2QgKyAnXCIgZG9lcyBub3QgZXhpc3QgaW4gZHJvcGl0IHBsdWdpbiEnKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgICQuZm4uZHJvcGl0LmRlZmF1bHRzID0ge1xuICAgICAgICBhY3Rpb246ICdjbGljaycsIC8vIFRoZSBvcGVuIGFjdGlvbiBmb3IgdGhlIHRyaWdnZXJcbiAgICAgICAgc3VibWVudUVsOiAndWwnLCAvLyBUaGUgc3VibWVudSBlbGVtZW50XG4gICAgICAgIHRyaWdnZXJFbDogJ2EnLCAvLyBUaGUgdHJpZ2dlciBlbGVtZW50XG4gICAgICAgIHRyaWdnZXJQYXJlbnRFbDogJ2xpJywgLy8gVGhlIHRyaWdnZXIgcGFyZW50IGVsZW1lbnRcbiAgICAgICAgYWZ0ZXJMb2FkOiBmdW5jdGlvbigpe30sIC8vIFRyaWdnZXJzIHdoZW4gcGx1Z2luIGhhcyBsb2FkZWRcbiAgICAgICAgYmVmb3JlU2hvdzogZnVuY3Rpb24oKXt9LCAvLyBUcmlnZ2VycyBiZWZvcmUgc3VibWVudSBpcyBzaG93blxuICAgICAgICBhZnRlclNob3c6IGZ1bmN0aW9uKCl7fSwgLy8gVHJpZ2dlcnMgYWZ0ZXIgc3VibWVudSBpcyBzaG93blxuICAgICAgICBiZWZvcmVIaWRlOiBmdW5jdGlvbigpe30sIC8vIFRyaWdnZXJzIGJlZm9yZSBzdWJtZW51IGlzIGhpZGRlblxuICAgICAgICBhZnRlckhpZGU6IGZ1bmN0aW9uKCl7fSAvLyBUcmlnZ2VycyBiZWZvcmUgc3VibWVudSBpcyBoaWRkZW5cbiAgICB9O1xuXG4gICAgJC5mbi5kcm9waXQuc2V0dGluZ3MgPSB7fTtcblxufSkoalF1ZXJ5KTtcbiIsIi8qXG5vcHRzOlxuLWl0ZW1zOiB0aGUgaXRlbXMgaW4gdGhlIGRyb3Bkb3duXG4tZGVmYXVsdHM6IHdoaWNoIGl0ZW0gdG8gc2VsZWN0IG9uIHBhZ2UgbG9hZCAob3B0aW9uYWwpXG4qL1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKFwiLi4vdGVtcGxhdGVzL2NoZWNrYm94Lmh0bWxcIik7XG5cbjsoZnVuY3Rpb24oJCkge1xuXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocGFyZW50LCBvcHRzKSB7XG5cdFx0aWYgKCFvcHRzLml0ZW1zKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiWW91IG11c3Qgc3VwcGx5IGFuIGBpdGVtc2AgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgdG8gZmlsbCBpbiB0aGUgcmFkaW8gYnV0dG9ucy5cIik7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0JChwYXJlbnQpLmFkZENsYXNzKFwidGltZVVJXCIpO1xuXG5cdFx0dmFyIGNvbnRhaW5lciA9ICQoXCI8ZGl2IC8+XCIsIHsgaWQ6IG9wdHMuaWQgfSkuYWRkQ2xhc3MoXCJjb250cm9sLWdyb3VwXCIpLmFwcGVuZFRvKHBhcmVudCk7XG5cblx0XHRvcHRzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuXHRcdFx0JCh0ZW1wbGF0ZSh7IGdyb3VwOiBvcHRzLmlkLCBsYWJlbDogaXRlbSB9KSkuYXBwZW5kVG8oY29udGFpbmVyKTtcblx0XHR9KTtcblxuXHRcdGlmIChvcHRzLmRlZmF1bHRzKSB7XG5cdFx0XHRvcHRzLmRlZmF1bHRzLmZvckVhY2goZnVuY3Rpb24oZGVmKSB7XG5cdFx0XHRcdCQocGFyZW50ICsgXCIgaW5wdXRbZGF0YS12YWx1ZT0nXCIgKyBkZWYgKyBcIiddXCIpLmF0dHIoXCJjaGVja2VkXCIsIFwiY2hlY2tlZFwiKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldF9zZWxlY3RlZCgpIHtcblx0XHRcdHZhciBzZWxlY3RlZCA9IFtdO1xuXHRcdFx0JChwYXJlbnQgKyBcIiBpbnB1dDpjaGVja2VkXCIpLmVhY2goZnVuY3Rpb24oaSwgdikge1xuXHRcdFx0XHRzZWxlY3RlZC5wdXNoKCQodikuZGF0YShcInZhbHVlXCIpKTtcblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIHNlbGVjdGVkO1x0XHRcblx0XHR9XG5cblx0XHQkKHBhcmVudCArIFwiIGlucHV0XCIpLmNoYW5nZShmdW5jdGlvbigpIHtcblx0XHRcdG9wdHMuY2FsbGJhY2sgJiYgb3B0cy5jYWxsYmFjayhnZXRfc2VsZWN0ZWQoKSk7XG5cdFx0fSk7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0dmFsdWU6IGdldF9zZWxlY3RlZCgpLFxuXHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZXMpIHtcblx0XHRcdFx0Ly8gdG8gZG9cblx0XHRcdH1cblx0XHR9XG5cdH1cbn0pKGpRdWVyeSk7XHQiLCIvKlxub3B0czpcbi1pdGVtczogdGhlIGl0ZW1zIGluIHRoZSBkcm9wZG93blxuLWRlZmF1bHQ6IHdoaWNoIGl0ZW0gdG8gc2VsZWN0IG9uIHBhZ2UgbG9hZCAob3B0aW9uYWwpXG4taW50cm86IE5vbi1zZWxlY3RlZGFibGUgZGVmYXVsdCB0ZXh0LCBsaWtlIFwiQ2hvb3NlIGEgc3RhdGVcIlxuKi9cblxuLy9yZXF1aXJlKF9fZGlybmFtZSArIFwiL0Ryb3BpdC9kcm9waXQuY3NzXCIpO1xucmVxdWlyZShcIi4vRHJvcGl0L2Ryb3BpdC5qc1wiKTtcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi90ZW1wbGF0ZXMvZHJvcGRvd24uaHRtbFwiKTtcblxuOyhmdW5jdGlvbigkKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXJlbnQsIG9wdHMpIHtcblx0XHRpZiAoIW9wdHMuaXRlbXMpIHtcblx0XHRcdGNvbnNvbGUubG9nKFwiWW91IG11c3Qgc3VwcGx5IGFuIGBpdGVtc2AgcHJvcGVydHkgdG8gdGhlIG9wdGlvbnMgdG8gZmlsbCBpbiB0aGUgZHJvcGRvd24uXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghb3B0cy5pbnRybykge1xuXHRcdFx0b3B0cy5kZWZhdWx0ID0gb3B0cy5kZWZhdWx0IHx8IG9wdHMuaXRlbXNbMF07XG5cdFx0XHRvcHRzLmludHJvID0gb3B0cy5kZWZhdWx0O1xuXHRcdH1cblxuXHRcdCQocGFyZW50KS5hZGRDbGFzcyhcInRpbWVVSVwiKTtcblxuXHRcdHZhciBtZW51ID0gJCh0ZW1wbGF0ZShvcHRzKSkuYXBwZW5kVG8ocGFyZW50KTtcblxuXHRcdG9wdHMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHR2YXIgbGkgPSAkKFwiPGxpIC8+XCIsIHtcblx0XHRcdFx0aHRtbDogaXRlbVxuXHRcdFx0fSkuYXBwZW5kVG8oXCIjXCIgKyBvcHRzLmlkICsgXCIgbGkgdWxcIik7XG5cdFx0fSk7XG5cblx0XHQkKCcubWVudScpLmRyb3BpdCgpO1x0XG5cblx0XHQvLyByZXBsYWNlIHZhbHVlIHdoZW4gc2VsZWN0aW9uIGNoYW5nZXNcblx0XHQkKFwiYm9keVwiKS5vbihcImNsaWNrXCIsIFwiI1wiICsgb3B0cy5pZCArIFwiIGxpIHVsIGxpXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0JChcIiNcIiArIG9wdHMuaWQgKyBcIiAudmFsdWVcIikuaHRtbCgkKHRoaXMpLnRleHQoKSk7XG5cdFx0XHRvcHRzLmNhbGxiYWNrICYmIG9wdHMuY2FsbGJhY2soJCh0aGlzKS50ZXh0KCkpO1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuICQoXCIjXCIgKyBvcHRzLmlkICsgXCIgLnZhbHVlXCIpLnRleHQoKTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0XHRcdGlmIChvcHRzLml0ZW1zLmluZGV4T2YodmFsdWUpID09IC0xKSB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2codmFsdWUgKyBcIiBpcyBub3QgYSB2YWxpZCB2YWx1ZSBmb3IgdGhpcyBkcm9wZG93bi5cIik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCQoXCIjXCIgKyBvcHRzLmlkICsgXCIgLnZhbHVlXCIpLmh0bWwodmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSkoalF1ZXJ5KTtcdCIsIi8qXG5vcHRzOlxuLWRlZmF1bHQ6IGRlZmF1bHQgbnVtYmVyIChvcHRpb25hbClcbi1sZW5ndGg6IG1heCBudW1iZXIgb2YgZGlnaXRzLiBEZWZhdWx0cyB0byB0d28uXG4qL1xuOyhmdW5jdGlvbigkKSB7XG5cblx0bW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihwYXJlbnQsIG9wdHMpIHtcblx0XHQkKHBhcmVudCkuYWRkQ2xhc3MoXCJ0aW1lVUlcIik7XG5cblx0XHQkKFwiPGlucHV0IC8+XCIsIHtcblx0XHRcdGlkOiBvcHRzLmlkLFxuXHRcdFx0bWF4bGVuZ3RoOiBvcHRzLmxlbmd0aCB8fCAyXG5cdFx0fSkuYWRkQ2xhc3MoXCJudW1lcmljXCIpLmFwcGVuZFRvKHBhcmVudCk7XG5cblx0XHRpZiAob3B0cy5kZWZhdWx0KSB7XG5cdFx0XHQkKFwiI1wiICsgb3B0cy5pZCkuYXR0cihcInZhbHVlXCIsIG9wdHMuZGVmYXVsdCk7XG5cdFx0fVxuXG5cdFx0Ly8gb25seSBhbGxvdyBkaWdpdHMgaW4gYWdlIGVudHJ5XG5cdFx0JChcIiNcIiArIG9wdHMuaWQpLm9uKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xuXHRcdCAgICB2YXIga2V5ID0gZS5rZXlDb2RlID8gZS5rZXlDb2RlIDogZS53aGljaDtcblxuXHRcdCAgICBpZiAoISggWzgsIDksIDEzLCAyNywgNDYsIDExMCwgMTkwXS5pbmRleE9mKGtleSkgIT09IC0xIHx8XG5cdFx0ICAgICAgICAgKGtleSA9PSA2NSAmJiAoIGUuY3RybEtleSB8fCBlLm1ldGFLZXkgICkgKSB8fCBcblx0XHQgICAgICAgICAoa2V5ID49IDM1ICYmIGtleSA8PSA0MCkgfHxcblx0XHQgICAgICAgICAoa2V5ID49IDQ4ICYmIGtleSA8PSA1NyAmJiAhKGUuc2hpZnRLZXkgfHwgZS5hbHRLZXkpKSB8fFxuXHRcdCAgICAgICAgIChrZXkgPj0gOTYgJiYga2V5IDw9IDEwNSlcblx0XHQgICAgKSlcblx0XHQgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0fSk7XG5cblx0XHQkKFwiI1wiICsgb3B0cy5pZCkub24oJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuXHRcdFx0b3B0cy5jYWxsYmFjayAmJiBvcHRzLmNhbGxiYWNrKCQoXCIjXCIgKyBvcHRzLmlkKS52YWwoKSk7XG5cdFx0fSk7XG5cdH1cdFxufSkoalF1ZXJ5KTsiLCIvKlxub3B0czpcbi1pdGVtczogdGhlIGl0ZW1zIGluIHRoZSBkcm9wZG93blxuLWRlZmF1bHQ6IHdoaWNoIGl0ZW0gdG8gc2VsZWN0IG9uIHBhZ2UgbG9hZCAob3B0aW9uYWwpXG4qL1xuXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKFwiLi4vdGVtcGxhdGVzL3JhZGlvLmh0bWxcIik7XG47KGZ1bmN0aW9uKCQpIHtcblxuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHBhcmVudCwgb3B0cykge1xuXHRcdGlmICghb3B0cy5pdGVtcykge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIllvdSBtdXN0IHN1cHBseSBhbiBgaXRlbXNgIHByb3BlcnR5IHRvIHRoZSBvcHRpb25zIHRvIGZpbGwgaW4gdGhlIHJhZGlvIGJ1dHRvbnMuXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdCQocGFyZW50KS5hZGRDbGFzcyhcInRpbWVVSVwiKTtcblx0XHR2YXIgY29udGFpbmVyID0gJChcIjxkaXYgLz5cIiwgeyBpZDogb3B0cy5pZCB9KS5hZGRDbGFzcyhcImNvbnRyb2wtZ3JvdXBcIikuYXBwZW5kVG8ocGFyZW50KTtcblxuXHRcdG9wdHMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0XHQkKHRlbXBsYXRlKHsgZ3JvdXA6IG9wdHMuaWQsIGxhYmVsOiBpdGVtIH0pKS5hcHBlbmRUbyhjb250YWluZXIpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKG9wdHMuZGVmYXVsdCkge1xuXHRcdFx0JChwYXJlbnQgKyBcIiBpbnB1dFtkYXRhLXZhbHVlPSdcIiArIG9wdHMuZGVmYXVsdCArIFwiJ11cIikuYXR0cihcImNoZWNrZWRcIiwgXCJjaGVja2VkXCIpO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGdldF9zZWxlY3RlZCgpIHtcblx0XHRcdHJldHVybiAkKHBhcmVudCArIFwiIGlucHV0OmNoZWNrZWRcIikuZGF0YShcInZhbHVlXCIpO1xuXHRcdH1cblxuXHRcdCQocGFyZW50ICsgXCIgaW5wdXRcIikuY2hhbmdlKGZ1bmN0aW9uKCkge1xuXHRcdFx0b3B0cy5jYWxsYmFjayAmJiBvcHRzLmNhbGxiYWNrKGdldF9zZWxlY3RlZCgpKTtcblx0XHR9KTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHR2YWx1ZTogZ2V0X3NlbGVjdGVkLFxuXHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdFx0XHQvLyB0byBkb1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufSkoalF1ZXJ5KTtcdCIsIihmdW5jdGlvbigpIHsgdmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdOyB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpOyBzdHlsZS50eXBlID0gJ3RleHQvY3NzJzt2YXIgY3NzID0gXCIudGltZVVJe2ZvbnQtZmFtaWx5OlxcXCJmcmFua2xpbi1nb3RoaWMtdXJ3XFxcIixIZWx2ZXRpY2EsQXJpYWwsc2Fucy1zZXJpZn0ubWVudXt3aWR0aDphdXRvICFpbXBvcnRhbnQ7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC13ZWlnaHQ6MTAwO21hcmdpbjowIDJweCAhaW1wb3J0YW50fS5tZW51IGF7dGV4dC1kZWNvcmF0aW9uOm5vbmV9Lm1lbnUgLnNlbGVjdGlvbntwb3NpdGlvbjpyZWxhdGl2ZTtiYWNrZ3JvdW5kLWNvbG9yOiNlNmU2ZTY7dGV4dC1hbGlnbjpjZW50ZXI7Y29sb3I6IzI2MjYyNjtwYWRkaW5nOjEwcHh9Lm1lbnUgLnNlbGVjdGlvbiBzcGFue3BhZGRpbmctcmlnaHQ6MjBweH0ubWVudSB1bHtkaXNwbGF5Om5vbmV9Lm1lbnUgdWwuZHJvcGl0LXN1Ym1lbnV7YmFja2dyb3VuZC1jb2xvcjojRkZGO2JvcmRlci10b3A6MXB4IGRhc2hlZCAjMjYyNjI2O2NvbG9yOiMyNjI2MjY7Ym9yZGVyOjFweCBzb2xpZCAjMjYyNjI2fS5tZW51IHVsLmRyb3BpdC1zdWJtZW51IGxpe2Rpc3BsYXk6YmxvY2s7bGluZS1oZWlnaHQ6MjVweDtjb2xvcjojMjYyNjI2O3BhZGRpbmc6NXB4IDE4cHg7Ym9yZGVyLWJvdHRvbToxcHggZGFzaGVkICMyNjI2MjY7Y3Vyc29yOnBvaW50ZXJ9Lm1lbnUgdWwuZHJvcGl0LXN1Ym1lbnUgbGk6aG92ZXJ7YmFja2dyb3VuZDojQzAwO2NvbG9yOiNmZmY7dGV4dC1kZWNvcmF0aW9uOm5vbmV9LmFycm93LWRvd257d2lkdGg6MDtoZWlnaHQ6MDtib3JkZXItbGVmdDozcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJpZ2h0OjNweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItdG9wOjVweCBzb2xpZCAjQzAwO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjhweDt0b3A6NDMlfS5udW1lcmlje2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjQwcHg7Ym9yZGVyOm5vbmU7Ym9yZGVyLXJhZGl1czowO2JvcmRlci1ib3R0b206MnB4IHNvbGlkIGJsYWNrO2ZvbnQtc2l6ZToxNnB4O291dGxpbmU6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcn0uY29udHJvbC1ncm91cHtkaXNwbGF5OmlubGluZS1ibG9jazt0ZXh0LWFsaWduOmxlZnQ7dmVydGljYWwtYWxpZ246dG9wO2JhY2tncm91bmQ6I2ZmZn0uY29udHJvbHtmb250LXNpemU6MThweDtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tYm90dG9tOjE1cHg7bWFyZ2luLXJpZ2h0OjIwcHg7cGFkZGluZy1sZWZ0OjMwcHg7Y3Vyc29yOnBvaW50ZXJ9LmNvbnRyb2wgaW5wdXR7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDotMTtvcGFjaXR5OjB9LmNvbnRyb2xfX2luZGljYXRvcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MnB4O2xlZnQ6MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2JhY2tncm91bmQ6I2U2ZTZlNn0uY29udHJvbC0tcmFkaW8gLmNvbnRyb2xfX2luZGljYXRvcntib3JkZXItcmFkaXVzOjUwJX0uY29udHJvbDpob3ZlciBpbnB1dH4uY29udHJvbF9faW5kaWNhdG9yLC5jb250cm9sIGlucHV0OmZvY3Vzfi5jb250cm9sX19pbmRpY2F0b3J7YmFja2dyb3VuZDojY2NjfS5jb250cm9sIGlucHV0OmNoZWNrZWR+LmNvbnRyb2xfX2luZGljYXRvcntiYWNrZ3JvdW5kOiNDMDB9LmNvbnRyb2wgaW5wdXQ6ZGlzYWJsZWR+LmNvbnRyb2xfX2luZGljYXRvcntwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6LjY7YmFja2dyb3VuZDojZTZlNmU2fS5jb250cm9sX19pbmRpY2F0b3I6YWZ0ZXJ7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpub25lO2NvbnRlbnQ6Jyd9LmNvbnRyb2wgaW5wdXQ6Y2hlY2tlZH4uY29udHJvbF9faW5kaWNhdG9yOmFmdGVye2Rpc3BsYXk6YmxvY2t9LmNvbnRyb2wtLWNoZWNrYm94IC5jb250cm9sX19pbmRpY2F0b3I6YWZ0ZXJ7dG9wOjRweDtsZWZ0OjhweDt3aWR0aDozcHg7aGVpZ2h0OjhweDt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTtib3JkZXI6c29saWQgI2ZmZjtib3JkZXItd2lkdGg6MCAycHggMnB4IDB9LmNvbnRyb2wtLWNoZWNrYm94IGlucHV0OmRpc2FibGVkfi5jb250cm9sX19pbmRpY2F0b3I6YWZ0ZXJ7Ym9yZGVyLWNvbG9yOiM3YjdiN2J9LmNvbnRyb2wtLXJhZGlvIC5jb250cm9sX19pbmRpY2F0b3I6YWZ0ZXJ7dG9wOjdweDtsZWZ0OjdweDt3aWR0aDo2cHg7aGVpZ2h0OjZweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kOiNmZmZ9LmNvbnRyb2wtLXJhZGlvIGlucHV0OmRpc2FibGVkfi5jb250cm9sX19pbmRpY2F0b3I6YWZ0ZXJ7YmFja2dyb3VuZDojN2I3YjdifWJ1dHRvbi50aW1lVUl7YmFja2dyb3VuZC1jb2xvcjojQzAwO3BhZGRpbmc6MTBweCAxMnB4O2N1cnNvcjpwb2ludGVyO2NvbG9yOndoaXRlO2JvcmRlcjpub25lO2JvcmRlci1yYWRpdXM6NXB4O291dGxpbmU6bm9uZTtkaXNwbGF5OmJsb2NrO21hcmdpbjoyNXB4IGF1dG87Zm9udC1zaXplOjE2cHh9LmRyb3BpdHtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZzowO21hcmdpbjowfS5kcm9waXQgLmRyb3BpdC10cmlnZ2Vye3Bvc2l0aW9uOnJlbGF0aXZlfS5kcm9waXQgLmRyb3BpdC1zdWJtZW51e3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxMDAlO2xlZnQ6MDt6LWluZGV4OjEwMDA7ZGlzcGxheTpub25lO21pbi13aWR0aDoxNTBweDtsaXN0LXN0eWxlOm5vbmU7cGFkZGluZzowO21hcmdpbjowfS5kcm9waXQgLmRyb3BpdC1vcGVuIC5kcm9waXQtc3VibWVudXtkaXNwbGF5OmJsb2NrfVwiO2lmIChzdHlsZS5zdHlsZVNoZWV0KXsgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzOyB9IGVsc2UgeyBzdHlsZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTsgfSBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTt9KCkpIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nXFx0PGxhYmVsIGNsYXNzPVwiY29udHJvbCBjb250cm9sLS1jaGVja2JveFwiPicrXG4oKF9fdD0oIGxhYmVsICkpPT1udWxsPycnOl9fdCkrXG4nXFxuXFx0XFx0PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtdmFsdWU9XCInK1xuKChfX3Q9KCBsYWJlbCApKT09bnVsbD8nJzpfX3QpK1xuJ1wiIC8+XFxuXFx0XFx0PGRpdiBjbGFzcz1cImNvbnRyb2xfX2luZGljYXRvclwiPjwvZGl2PlxcblxcdDwvbGFiZWw+XFxuJztcbn1cbnJldHVybiBfX3A7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmope1xudmFyIF9fdCxfX3A9JycsX19qPUFycmF5LnByb3RvdHlwZS5qb2luLHByaW50PWZ1bmN0aW9uKCl7X19wKz1fX2ouY2FsbChhcmd1bWVudHMsJycpO307XG53aXRoKG9ianx8e30pe1xuX19wKz0nXFx0PHVsIGlkPVwiJytcbigoX190PSggaWQgKSk9PW51bGw/Jyc6X190KStcbidcIiBjbGFzcz1cIm1lbnVcIj5cXG5cXHQgICAgPGxpPlxcblxcdCAgICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cInNlbGVjdGlvblwiPjxzcGFuIGNsYXNzPVwidmFsdWVcIj4nK1xuKChfX3Q9KCBpbnRybyApKT09bnVsbD8nJzpfX3QpK1xuJzwvc3Bhbj4gPGRpdiBjbGFzcz1cImFycm93LWRvd25cIj48L2Rpdj48L2E+XFxuXFx0ICAgICAgICA8dWw+PC91bD5cXG5cXHQgICAgPC9saT5cXG5cXHQ8L3VsPic7XG59XG5yZXR1cm4gX19wO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqKXtcbnZhciBfX3QsX19wPScnLF9faj1BcnJheS5wcm90b3R5cGUuam9pbixwcmludD1mdW5jdGlvbigpe19fcCs9X19qLmNhbGwoYXJndW1lbnRzLCcnKTt9O1xud2l0aChvYmp8fHt9KXtcbl9fcCs9J1xcdDxsYWJlbCBjbGFzcz1cImNvbnRyb2wgY29udHJvbC0tcmFkaW9cIj4nK1xuKChfX3Q9KCBsYWJlbCApKT09bnVsbD8nJzpfX3QpK1xuJ1xcblxcdFxcdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiJytcbigoX190PSggZ3JvdXAgKSk9PW51bGw/Jyc6X190KStcbidcIiBkYXRhLXZhbHVlPVwiJytcbigoX190PSggbGFiZWwgKSk9PW51bGw/Jyc6X190KStcbidcIiAvPlxcblxcdFxcdDxkaXYgY2xhc3M9XCJjb250cm9sX19pbmRpY2F0b3JcIj48L2Rpdj5cXG5cXHQ8L2xhYmVsPlxcbic7XG59XG5yZXR1cm4gX19wO1xufTtcbiJdfQ==
