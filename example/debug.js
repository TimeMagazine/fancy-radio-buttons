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
	intro: "my state",
	items: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District  Columbia', 'Federated States  Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],
	callback: function(value) {
		console.log(value);
	}
});