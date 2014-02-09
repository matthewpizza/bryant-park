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

		var debug = app.util.debug,
			json = null,
			_count = 0, // Global _counter, everyone gets on this
			total = null,
			date = null,
			link = null,
			current_img = null,
			prev_img = null,
			prev_count = 0,
			next_img = null,
			next_count = 0,
			timer = null,
			_is_playing = false,
			modal_visible = false
		;

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		function init() {

			_init_slideshow();

		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _init_slideshow() {
			$('<div />', {
				class: 'images'
			}).appendTo( 'main' );
			$('<div />', {
				class: 'image current'
			}).appendTo( '.images' );
			$('<div />', {
				class: 'image prev'
			}).appendTo( '.images' );
			$('<div />', {
				class: 'image next'
			}).appendTo( '.images' );
			$('<div />', {
				class: 'date'
			}).appendTo( 'header' );

			$.getJSON('assets/json/images.json').done(function(data) {
				total = data.length - 1;

				_slideshow( data );
			});
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _slideshow( data ) {
			json = data;
			_load();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _load() {
			if ( _count !== 0 ) $('.restart.disabled').removeClass('disabled');

			date = app.util.get_date( new Date(json[_count].date * 1000) );
			link = json[_count].link;
			$('.date').html('<a href="' + link + '" target="_blank">' + date + '</a>');

			prev_count = _prev_count(_count);
			next_count = _next_count(_count);

			current_img = json[_count].file;
			prev_img = json[prev_count].file;
			next_img = json[next_count].file;

			$('.image.current')
				.css({ 'background-image':  'url(' + current_img + ')' })
			;

			$('.image.prev')
				.css({ 'background-image':  'url(' + prev_img + ')' })
			;

			$('.image.next')
				.css({ 'background-image':  'url(' + next_img + ')' })
			;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function is_playing() {
			return _is_playing;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function count() {
			return _count;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function restart() {
			_count = 0;
			_load();

			window.setTimeout(function(){
				$('.restart').addClass('disabled');
			}, 200);
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function random() {
			_count = Math.floor( Math.random() * ( 0 - total + 1 ) + total );

			_load();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function next() {
			_count = _next_count( _count );

			_load();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function prev() {
			_count = _prev_count( _count );

			_load();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _next_count( next ) {
			next++;

			// loop around to the beginning							
			if ( next > total ) next = 0;

			return next;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function _prev_count( prev ) {
			prev--;

			// loop around to the end
			if ( prev === -1 ) prev = total;

			return prev;
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function play() {
			_is_playing = true;

			next();

			clearInterval( timer );
			timer = setInterval( function() {
				next();
			}, 500 );

			$('.pause').show();
			$('.play').hide();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

		function pause() {
			_is_playing = false;

			clearInterval( timer );
			$('.play').show();
			$('.pause').hide();
		}

		/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
		
		/* return public-facing methods and/or vars */
		return {
			init : init,
			is_playing : is_playing,
			count : count,
			prev : prev,
			next : next,
			random : random,
			restart : restart,
			play : play,
			pause : pause
		};
		
	}($));
	
	return app; /* return augmented app object */
	
}( app || {}, jQuery )); /* import app if exists, or create new */

app.bootstrap.register( app.slideshow.init );