/**
 *		js module:
 *			bootstrap.js
 *
 *		desc:
 *			Controls the basics of initializing site js code.
 *			Various modules register their initialization needs with this
 *			module. Once the document is ready, this module is activated,
 *			initializing various site sub-modules.
 *
 *		requires:
 *			jQuery
 */
var app = (function( app ) {
	
	if ( typeof app.initialized == 'undefined' ) app.initialized = false;

	/* define new module */
	app.bootstrap = (function(){
		
		// vars
		var debug = null,
			_init_callbacks = []
		;
			
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function init() {
			if ( app.initialized ) return false; // the app has already been initialized

			if ( app.util.debug ) debug = app.util.debug;
			
			for (var i=0; i < _init_callbacks.length; i++) {
				_init_callbacks[i]();
			}

			app.initialized = true;
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function register( callback ) {
			
			_init_callbacks.push( callback );
			
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : init,
			register : register
		};
		
	}());
	
	return app; /* return augmented app object */
	
}( app || {} )); /* import app if exists, or create new */