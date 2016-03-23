# fancy-radio-buttons

Hand-built radio buttons and check boxes, fully customizable, largely inspired by [this demo](http://kyusuf.com/post/completely-css-custom-checkbox-radio-buttons-and-select-boxes).

## Usage

First, install the modules 

	git clone git+https://github.com/TimeMagazine/fancy-radio-buttons.git

And then in your Javascript:

	var radio = require("fancy-radio-buttons");

For radio buttons:

	radio("#my_gender_container", {
		id: "my_gender",
		type: "radio",
		items: ["Male", "Female"],
		callback: function(value) { 
			console.log(value);
		}
	});

And check boxes:

	radio("#music_container", {
		id: "music",
		type: "checkbox",
		items: ["Jazz", "Classical", "Rock", "Funk", "Country"],
		callback: function(values) { 
			// an array of just those boxes that are selected
			console.log(values);
		}
	});

As usual, the first argument in the selector for the parent container, which you have to make yourself, followed by options:

+ id: Required. The id of the parent element
+ type: `radio` or `checkbox`. Defaults to radio.
+ items: Required. The labels for the selectable buttons and checkmarks.
+ default: Which items should be pre-checked. Radio groups take a single value why check box groups take an array.
+ callback: Optional. A radio set returns a single value which a checkmarket set returns an array of all checked values.