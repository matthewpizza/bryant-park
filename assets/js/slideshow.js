/**
 *		js module:
 *			slideshow.js
 *
 *		desc:
 *			Loops through json
 *			Displays images
 *
 *		requires:
 *			jQuery
 */
var app = (function(app, $) {
	
	app.slideshow = (function($){

		var count = 0, // Global counter, everyone gets on this
			total = null,
			date = null,
			link = null,
			img = null,
			timer = null,
			is_playing = false,
			modal_visible = false,
			keys_info_visible = false,
			project_info_visible = false,
			debug = app.bootstrap.debug
		;

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function _init() {


			$.getJSON('assets/json/images.json').done(function(data) {

				total = data.length - 1;

				_load( count, data );

				_slideshow( data );

			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _slideshow( data ) {

			if ( $('html').hasClass('touch') ) {

				_init_touch( data );

			} else {

				_init_keyboard( data );
				_init_controls( data );
				_init_close_modal();

			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _get_date( date ) {
			var d = date,
				month = d.getMonth(),
				day = d.getDate(),
				year = d.getFullYear(),
				month_name = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
				formatted_date = month_name[month] + ' ' + day + ', ' + year;

			return formatted_date;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _load( count, data ) {
			if ( count !== 0 )
				$('.restart.disabled').removeClass('disabled');

			date = _get_date( new Date(data[count].date * 1000) );
			link = data[count].link;
			$('.date').html('<a href="' + link + '" target="_blank">' + date + '</a>');

			img = data[count].file;
			$('.image').css({ 'background-image':  'url(' + img + ')' });
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_keyboard( data ) {
			
			var keys = {};

			$(document).keydown(function(e){
				keys['key_' + e.which] = true;

				// left arrow
				if ( keys.key_37 ) {
					if ( modal_visible === false ) {
						_prev(data);
						$('.previous').addClass('active');
					}
				}

				// right arrow
				if ( keys.key_39 ) {
					if ( modal_visible === false ) {
						_next(data);
						$('.next').addClass('active');
					}
				}

				// gr
				if ( keys.key_71 && keys.key_82 ) {
					if ( modal_visible === false ) {
						_random(0, total, data);
						$('.random').addClass('active');
					}
				}

				// gi
				if ( keys.key_71 && keys.key_73 ) {
					if ( modal_visible === false ) {
						if ( count !== 0 ) {
							_restart( data );
							$('.restart').addClass('active');
						}
					}
				}

				// space
				if ( keys.key_32 ) {
					if ( modal_visible === false ) {
						if ( is_playing === false ) {
							_play( data );
						} else {
							_pause();
						}
					}
				}

				// shift ?
				if ( keys.key_16 && keys.key_191 ) {
					_keyboard_shortcuts_info();
				}
				// esc 
				if ( keys.key_27 ) {
					if ( keys_info_visible === true ) {
						_keyboard_shortcuts_info();
					}
				}

				if (
					keys.key_37 ||
					keys.key_39 ||
					( keys.key_71 && keys.key_82 ) ||
					( keys.key_71 && keys.key_73 )
				) {
					_pause();
					e.preventDefault();
				}
			}).keyup(function (e) {
				delete keys['key_' + e.which];

				$('a.active').removeClass('active');
			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_controls( data ) {

			$('.controls a').on('click', function(e) {

				var class_name = $(this).attr( 'class' );

				switch( class_name ) {
					case 'random':
						_random( 0, total, data );

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'restart':
						if ( count !== 0 ) {
							_restart( data );
						}

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'next':
						_next( data );

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'previous':
						_prev( data );

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'play':
						$(this).hide();
						$('.pause').show();

						_play( data );
					break;

					case 'pause':
						_pause();
					break;
				}

				e.preventDefault();
			});
			
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_touch( data ) {

			debug('Touch!');

			$('.controls a').on('tap', function(e) {

				var class_name = $(this).attr( 'class' );

				switch( class_name ) {
					case 'random':
						_random( 0, total, data );

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'restart':
						if ( count !== 0 ) {
							_restart( data );
						}

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'next':
						_next( data );

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'previous':
						_prev( data );

						if ( is_playing === true ) {
							_pause();
						}
					break;

					case 'play':
						$(this).hide();
						$('.pause').show();

						_play( data );
					break;

					case 'pause':
						_pause();
					break;
				}

				e.preventDefault();
			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_close_modal() {

			// close modals
			$('.icon-cross').click(function(){
				
				if ( keys_info_visible === true ) {
					_keyboard_shortcuts_info();
				}
				
				if ( project_info_visible === true ) {
					_project_info();
				}
				
			});

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _restart( data ) {
			count = 0;
			_load( count, data );

			window.setTimeout(function(){
				$('.restart').addClass('disabled');
			}, 200);
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _random( min, max, data ) {
			count = Math.floor( Math.random() * ( min - max + 1 ) + max);

			_load( count, data );
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _next( data ) {
			count++;

			// loop around to the beginning							
			if ( count > total )
				count = 0;

			_load( count, data );
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _prev( data ) {
			count--;

			// loop around to the end
			if ( count === -1 )
				count = total;

			_load( count, data );
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _play( data ) {
			is_playing = true;

			_next( data );

			clearInterval( timer );
			timer = setInterval( function() {
				_next( data );
			}, 500 );

			$('.pause').show();
			$('.play').hide();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _pause() {
			is_playing = false;

			clearInterval( timer );
			$('.play').show();
			$('.pause').hide();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _toggle_modal() {
			if ( modal_visible === false ) {
				// show modal
				$('.overlay').show();
				modal_visible = true;
			} else {
				// hide modal
				$('.overlay').hide();
				modal_visible = false;
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _keyboard_shortcuts_info() {
			if ( keys_info_visible === false ) {
				$('.shortcuts').show();
				_toggle_modal();
				keys_info_visible = true;
			} else {
				_toggle_modal();
				$('.shortcuts').hide();
				keys_info_visible = false;
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _project_info() {
			if ( project_info_visible === false ) {
				$('.overlay, .info').show();
				project_info_visible = true;
			} else {
				$('.overlay, .info').hide();
				project_info_visible = false;
			}
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : _init
		};
		
	}($));
	
	return app; /* return augmented app object */
	
}( app || {}, jQuery )); /* import app if exists, or create new */

app.bootstrap.register( app.slideshow.init );