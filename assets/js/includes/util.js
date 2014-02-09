/**
 *		js module:
 *			util.js
 *
 */
var app = (function(app, $) {
	
	app.util = (function($) {

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function init() {
			if ( is_touch_device() ) {
				$('html').addClass('touch');
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function debug( obj, showCaller ) {
			if ( ( typeof console == "object" ) && ( console.log ) ) {
				if (showCaller) {
					console.log( arguments.callee.caller.name + ':' );
				}
				console.log( obj );
			}
			return false;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function is_touch_device() {
			return 'ontouchstart' in window || // works on most browsers 
				'onmsgesturechange' in window; // works on ie10
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function get_date( date ) {
			var d = date,
				month = d.getMonth(),
				day = d.getDate(),
				year = d.getFullYear(),
				month_name = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
				formatted_date = month_name[month] + ' ' + day + ', ' + year;

			return formatted_date;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function whichTransitionEvent(){
			var t;
			var el = document.createElement('fakeelement');
			var transitions = {
				'transition':'transitionend',
				'OTransition':'oTransitionEnd',
				'MozTransition':'transitionend',
				'WebkitTransition':'webkitTransitionEnd'
			};

			for(t in transitions){
				if( el.style[t] !== undefined ){
					return transitions[t];
				}
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : init,
			debug : debug,
			is_touch_device : is_touch_device,
			get_date : get_date,
			whichTransitionEvent : whichTransitionEvent
		};
		
	}($));
	
	return app; /* return augmented app object */
	
}( app || {}, jQuery )); /* import app if exists, or create new */

app.bootstrap.register( app.util.init );