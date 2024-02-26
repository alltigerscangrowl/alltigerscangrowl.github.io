// HTML5 audio fallback: SoundManager 2
var audio_support = !! document.createElement( 'audio' ).canPlayType;
if ( ! audio_support ) {
	soundManager.setup( {
		url: '/scripts/soundmanager2/swf/'
	} );
}

$( function() {
	
	var sound;
	
	$( '.photos img' ).hover(
		function() {
			var src = $( this ).attr( 'src' );
			var src_alternate = $( this ).attr( 'data-src-alternate' );
			$( this ).attr( 'src', src_alternate ).attr( 'data-src-alternate', src );
			if ( audio_support ) {
				// HTML5 audio
				$( this ).next( 'audio' ).get( 0 ).play();
			} else {
				// HTML5 audio fallback: SoundManager 2
				var urls = [];
				$( this ).next( 'audio' ).children( 'source' ).each( function() {
					urls.push( $( this ).attr( 'src' ) );
				} );
				sound = soundManager.createSound( {
					id: urls[0],
					url: urls
				} );
				sound.play();
			}
		},
		function() {
			var src = $( this ).attr( 'src' );
			var src_alternate = $( this ).attr( 'data-src-alternate' );
			$( this ).attr( 'src', src_alternate ).attr( 'data-src-alternate', src );
			if ( audio_support ) {
				// HTML5 audio
				$( this ).next( 'audio' ).get( 0 ).pause();
			} else {
				// HTML5 audio fallback: SoundManager 2
				sound.pause();
			}
		}
	);
	
} );