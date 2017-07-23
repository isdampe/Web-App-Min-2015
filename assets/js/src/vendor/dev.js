(function(){

	window.onkeyup = function(e){
		if ( e.which === 90 ) {

			if ( $('body').hasClass('devbg') ) {
				$('body').removeClass('devbg');
				$('body *').css("opacity", "1");
			} else {
				$('body').addClass('devbg');
				$('body *').css("opacity", "0.75");
			}

		}
	};

})();
