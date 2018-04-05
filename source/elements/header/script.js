(($) => {
	let initHeader = () => {
		$(window).scroll(function() {
			let _top = parseInt($(window).height() / 2)
				, _scroll = parseInt($(window).height() / 3);

			if ($(window).scrollTop() >= _scroll ) {
				$('#header').addClass('is-scroll');
				$('.select_city').removeClass('open');
			} else {
				$('#header').removeClass('is-scroll');
			}

			if ($(window).scrollTop() >= _top) {
				$('#header').addClass('is-fixed');
			} else {
				$('#header').removeClass('is-fixed');
			}
		});
	};

	initHeader();

	//init menu open
	let $body = $('body')
		, $menuButton = $('.toggle-menu-button')
		, menuShowClass = 'is-menu-show';

	$menuButton.on('click', function() {
		$body.toggleClass(menuShowClass);
	});


	// $(document).click( function(event){
	// 	if( $(event.target).closest(menuClass).length )
	// 		return;
	// 	$body.removeClass(menuShowClass);
	// });

})(jQuery);