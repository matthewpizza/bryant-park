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
		var $ = null,
			debug = _debug,
			_init_callbacks = [],
			testing = false
		;
			
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init() {
			
			if ( app.initialized ) return false; // the app has already been initialized

			// store ref to jQuery
			$ = jQuery;

			_onload();

			testing = false;
			// debug( 'We are testing' );

			if (
				_is_touch_device() ||
				testing === true
			) {
				$.getScript( 'assets/js/jquery.tap.min.js' )
					.done(function( script, textStatus ) {
						$('html').addClass('touch');
						debug( textStatus );
					})
				;
			}
			
			for (var i=0; i < _init_callbacks.length; i++) {
				_init_callbacks[i]();
			}

			app.initialized = true;
		}
		
		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _register( callback ) {
			
			_init_callbacks.push( callback );
			
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _debug( obj, showCaller ) {
			if ( ( typeof console == "object" ) && ( console.log ) ) {
				if (showCaller) {
					console.log( arguments.callee.caller.name + ':' );
				}
				console.log( obj );
			}
			return false;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _is_touch_device() {
			return 'ontouchstart' in window || // works on most browsers 
					'onmsgesturechange' in window; // works on ie10
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _onload() {
			$('.no-js-message').remove();

			$('<div />', {
				class: 'date'
			}).appendTo( 'header' );
			$('<div />', {
				class: 'image'
			}).appendTo( 'main' );

			// load visual controls
			_load_controls();

			// load overlay html
			_preload_overlay();

			// load keyboard shortcuts
			if ( ! _is_touch_device() ) {
				_preload_shortcuts();
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _preload_overlay() {
			$('<div />', {
				class: 'overlay hide'
			}).appendTo( 'body' );

			$('<div />', {
				class: 'icon-cross'
			}).appendTo( '.overlay' );
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _preload_shortcuts() {
			$.ajax({
				url: 'assets/includes/shortcuts.html',
				cache: false
			}).done(function( html ) {
				$( '.overlay' ).append( html );
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _load_controls() {
			$.ajax({
				url: 'assets/includes/controls.html',
				cache: false
			}).done(function( html ) {
				$( html ).appendTo( 'main' ).show( 'slow' );
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : _init,
			register : _register,
			debug : _debug,
			is_touch_device : _is_touch_device,
		};
		
	}());
	
	return app; /* return augmented app object */
	
}( app || {} )); /* import app if exists, or create new */