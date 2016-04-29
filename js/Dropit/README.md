Fork of [http://dev7studios.com/dropitStupidly Simple jQuery Dropdowns](http://dev7studios.com/dropit) for easy use with Browserify.

## Usage

Making a new dropdown is easy. You just `require()` this repo and then pass a few options:

	git clone git+https://github.com/TimeMagazine/Dropit.git

And then in your Javascript:

	var dropit = require("Dropit");

	var gender_dropdown = dropit("#my_gender_dropdown", {
		id: "my_gender",
		intro: "your gender",
		items: [ "woman", "man" ],
		callback: function(value) {
			console.log(value);
		}
	});

The first argument is the id of the parent container, which you need to create ahead of time. The `id` in the options in the second argument will be the id of the dropdown itself. 

Of the various options you have, only `items` is required:

+ `items`: The list of items in the dropdown (required)
+ `intro`: The default text, which will not be selectable by the user. E.g. "My state." Optional, defaults to first item in `items`
+ `default`: The value that should be selected on load. If `intro` is provided`, that takes precedence over `default`
+ `callback`: The function that is called each time the value changes. Takes one argument, `value`

If you only need to interact with the dropdown through callbacks, there's no need to assign it to a variable. But it does return an object with a few of the usual methods:

+ `value()`: Return the currently selected item
+ `set()`:   Sets the currently selected item. Throws an error if the value is in `items`.