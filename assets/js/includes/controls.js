/**
 *		js module:
 *			controls.js
 *
 *		desc:
 *			Slideshow controls
 *
 *		requires:
 *			jQuery
 */
var app = (function(app, $) {
	
	app.controls = (function($){

		var debug = app.util.debug
		;

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function init() {

			_load_controls();
			_init_controls();
			
			if ( app.util.is_touch_device() ) {
				_init_touch();
			}
			else {
				_init_keyboard();
			}
			

		}


		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _load_controls() {
			$.ajax({
				url: 'assets/includes/controls.html',
				cache: false
			}).done(function( html ) {
				$( html )
					.appendTo( 'main' )
					.show( 'slow' )
				;
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_keyboard() {
			
			var keys = {};

			$(document).keydown(function(e){
				keys['key_' + e.which] = true;

				switch( true ) {
					// left arrow
					case keys.key_37:
						e.preventDefault();
						$('.controls .prev').addClass('active');

						_prev();
					break;

					// right arrow
					case keys.key_39:
						e.preventDefault();
						$('.controls .next').addClass('active');

						_next();
					break;

					// gr
					case keys.key_71 && keys.key_82:
						e.preventDefault();
						$('.controls .random').addClass('active');

						_random();
					break;

					// gi
					case keys.key_71 && keys.key_73:
						e.preventDefault();
						$('.controls .restart').addClass('active');

						_restart();
					break;

					// space
					case keys.key_32:
						e.preventDefault();

						_play_pause();
					break;

					// shift ?
					case keys.key_16 && keys.key_191:
						e.preventDefault();

						_keyboard_modal();
					break;

					// g i
					case keys.key_71 && keys.key_191:
						e.preventDefault();

						_info_modal();
					break;

					// esc 
					case keys.key_27:
						e.preventDefault();

						_modal_hide();
					break;
				}

			}).keyup(function (e) {
				delete keys['key_' + e.which];

				$('a.active').removeClass('active');
			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_controls() {

			$('body')
				.on('click', '.controls a', function(e) {
					e.preventDefault();

					var class_name = $(this).attr( 'class' );

					switch( class_name ) {
						case 'prev':
							_prev();
						break;

						case 'next':
							_next();
						break;

						case 'random':
							_random();
						break;

						case 'restart':
							_restart();
						break;

						case 'play':
							_play_pause();
						break;

						case 'pause':
							_play_pause();
						break;

						case 'info':
							_info_modal();
						break;
					}
				})
				.on('click', '.icon-cross, .overlay', function() {
					_modal_hide();
				})
			;
			
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_touch() {

			$('body')
				.on('tap', '.controls a', function(e) {

					var class_name = $(this).attr( 'class' );

					switch( class_name ) {
						case 'prev':
							_prev();
						break;

						case 'next':
							_next();
						break;

						case 'random':
							_random();
						break;

						case 'restart':
							_restart();
						break;

						case 'play':
							_play_pause();
						break;

						case 'pause':
							_play_pause();
						break;
					}

					e.preventDefault();
				})
				.on('tap', '.icon-cross, .overlay', function() {
					_modal_hide();
				})
			;

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _prev() {
			if ( app.modal.is_visible() === true ) return;

			if ( app.slideshow.is_playing() === true ) app.slideshow.pause();

			app.slideshow.prev();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _next() {
			if ( app.modal.is_visible() === true ) return;

			if ( app.slideshow.is_playing() === true ) app.slideshow.pause();

			app.slideshow.next();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _random() {
			if ( app.modal.is_visible() === true ) return;

			if ( app.slideshow.is_playing() === true ) app.slideshow.pause();

			app.slideshow.random();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _restart() {
			if ( app.modal.is_visible() === true ) return;

			if ( app.slideshow.is_playing() === true ) app.slideshow.pause();

			if ( app.slideshow.count() !== 0 ) {
				app.slideshow.restart();
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _play_pause() {
			if ( app.modal.is_visible() === true ) return;

			if ( app.slideshow.is_playing() === false ) {
				app.slideshow.play();
			}
			else {
				app.slideshow.pause();
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _keyboard_modal() {
			if ( app.slideshow.is_playing() === true ) app.slideshow.pause();

			app.modal.keyboard();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _info_modal() {
			if ( app.slideshow.is_playing() === true ) app.slideshow.pause();

			app.modal.info();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _modal_hide() {
			if ( app.modal.is_visible() === true ) app.modal.toggle();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : init
		};
		
	}($));
	
	return app; /* return augmented app object */
	
}( app || {}, jQuery )); /* import app if exists, or create new */

app.bootstrap.register( app.controls.init );