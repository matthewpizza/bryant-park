/**
 *		js module:
 *			modal.js
 *
 *		desc:
 *			Modal
 *
 *		requires:
 *			jQuery
 */
var app = (function(app, $) {
	
	app.modal = (function($){

		var debug = app.util.debug,
			_modal_visible = false,
			keys_info_visible = false,
			project_info_visible = false
		;

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function init() {
			$('.no-js-message').remove();
			
			_init_overlay();
			_init_about();
			_modal_size();
			_init_resize();

			if ( ! app.util.is_touch_device() ) {
				_load_shortcuts();
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _load_shortcuts() {
			$.ajax({
				url: 'assets/includes/shortcuts.html',
				cache: false
			}).done(function( html ) {
				$( 'body' ).append( html );
				$('<div />', {
					class: 'icon-cross'
				}).appendTo( '.shortcuts' );
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_overlay() {
			$('<div />', {
				class: 'overlay hide'
			}).appendTo( 'body' );
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_about() {
			$('<div />', {
				class: 'icon-cross'
			}).appendTo( '.about' );
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_resize() {
			var resize_modal = _.throttle( _modal_size, 100 )
			;

			$(window).on('resize', resize_modal);
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _toggle_modal() {
			if ( _modal_visible === false ) {
				// show modal
				$('.overlay').show();
				_modal_visible = true;
			} else {
				// hide modal
				$('.overlay').hide();
				_modal_visible = false;
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _modal_size() {
			var window_height = $( window ).height(),
				modal_height = window_height - 80,
				top = 40
			;

			if ( app.util.is_touch_device() ) {
				modal_height = window_height;
				top = 0;
			}

			$('.about')
				.css( 'height', modal_height + 'px' )
				.css( 'top', top + 'px' )
			;
			
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function is_visible() {
			return _modal_visible;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function toggle() {
			if ( keys_info_visible === true ) keyboard_shortcuts_info();
			if ( project_info_visible === true ) project_info();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function keyboard_shortcuts_info() {
			if ( keys_info_visible === false ) {
				_toggle_modal();
				$('.shortcuts').show();
				keys_info_visible = true;
			} else {
				_toggle_modal();
				$('.shortcuts').hide();
				keys_info_visible = false;
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function project_info() {
			_toggle_modal();

			if ( project_info_visible === false ) {
				$('.about').show();
				project_info_visible = true;
			} else {
				$('.about').hide();
				project_info_visible = false;
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : init,
			is_visible : is_visible,
			toggle : toggle,
			keyboard : keyboard_shortcuts_info,
			info : project_info
		};
		
	}($));
	
	return app; /* return augmented app object */
	
}( app || {}, jQuery )); /* import app if exists, or create new */

app.bootstrap.register( app.modal.init );