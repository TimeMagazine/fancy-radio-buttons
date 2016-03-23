TIME Input Buttons
============

v.0.0.2

These are some standard UI buttons for TIME interactives. Right now, we've got:

+ Checkboxes
+ Radio buttons
+ Dropdowns
+ Numeric-only inputs

## Why reinvent the wheel when there are so many good options, like Bootstrap?

Good question. There are many great input libraries out there. Besides wanting to have our own style, the idea here is that the inputs are created entirely through code, so you never have to worry about writing markup or event handlers. Just give the function the parent container and the options you want, and it will built everything for you.

## Inspirations

This repo draws heavily from the MIT-licensed [Dropit](https://github.com/gilbitron/Dropit) and from this [tutorial](http://kyusuf.com/post/completely-css-custom-checkbox-radio-buttons-and-select-boxes) by Kenan Yusuf, used with [permission](https://twitter.com/kenan__yusuf/status/712669354777776129).

## Example

	npm install TimeMagazine/time-input-buttons

	require("time-input-buttons");

	//checkboxes with default
	// assumes you have a div with the id "checkboxes_container_defaults"
	var my_languages_defaults = timeUI("checkboxes", "#checkboxes_container_defaults", {
		id: "my_languages_default",
		items: [ "Javascript", "Node.js", "Python", "Fortran" ],
		defaults: ["Javascript", "Node.js"],
		callback: function(values) {
			console.log(values);
		}
	});

There are examples of every element type in the repo at [examples/index.html](examples/index.html).

## Usage

All new UI bundles take three arguments: `type`, `container` (as a valid selector), and `opts`. The `opts` object must have a string "id" property. Beyond that, the opts different by type. `opts` can also always (and always should) have a `callback` property that fires whenever the user makes a change to the inputs.

### Dropdowns

	// dropdown
	var my_dropdown = timeUI("dropdown", "#dropdown_container", {
		id: "my_dropdown",
		intro: "your state",
		items: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District  Columbia', 'Federated States  Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
		callback: function(value) {
			console.log(value);
		}
	});

**Options**
+ `items`: The list of items in the dropdown (required)
+ `intro`: The default text, which will not be selectable by the user. E.g. "My state." Optional, defaults to first item in `items`
+ `default`: The value that should be selected on load. If `intro` is provided`, that takes precedence over `default`

If you only need to interact with the dropdown through callbacks, there's no need to assign it to a variable. But it does return an object with a few of the usual methods. (Eventually, all of these elements will do the same.)

+ `value()`: Return the currently selected item
+ `set()`:   Sets the currently selected item. Throws an error if the value is in `items`.

### Radio buttons and check boxes

	//Radio buttons with default selected
	var my_friends_default = timeUI("radio", "#radio_container_default", {
		id: "my_favorite_coder",
		items: [ "Chris", "Dave", "Pratheek" ],
		default: "Dave",
		callback: function(values) {
			console.log(values);
		}
	});

**Options**
+ `items`: The list of items in the dropdown (required)
+ `default`: The default items to be selected. A string for radio groups, an array for checkboxes.

### Numeric

First, install the modules 

	//checkboxes with default
	var my_numeric = timeUI("numeric", "#numeric_container", {
		id: "numeric",
		callback: function(values) {
			console.log(values);
		}
	});

**Options**
+ `length`: The maximum number of numbers that can be entered. Defaults to 2.