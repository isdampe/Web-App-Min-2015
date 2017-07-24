(function(window){

	const $ = require('jquery');
	const ga = require('./modules/google-analytics.js');

	$(document).ready(function(){
		console.log('Hello world');
	});
	ga('UA-XXXXXX-X');

})(window);
