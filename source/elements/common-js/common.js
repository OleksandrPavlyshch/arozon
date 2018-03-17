(($) => {
	$('.clipboard_copy').tooltip({
		disabled: true,
		position: {
			my: 'center top+10',
			at: 'center bottom'
		},
		show: {
			effect: 'drop',
			direction: 'down'
		},
		hide: {
			effect: 'drop',
			direction: 'down'
		},
		close: function() {
			$(this).tooltip('disable');
		}
	});

	var clipboard = new ClipboardJS('.clipboard_copy');
	clipboard.on('success', function(e) {
			$('.clipboard_copy').tooltip('enable').tooltip('open');
		});

	$('.share-buttons').jsSocials({
		url: 'https://github.com/OleksandrPavlyshch/arozon',
		text: 'Arozon',
		shareIn: 'popup',
		showLabel: false,
		showCount: 'inside',
		shares: [
			{
				share: 'facebook',
				logo: 'img/facebook.svg'
			},
			{
				share: 'twitter',
				logo: 'img/twitter.svg'
			},
			{
				share: 'telegram',
				logo: 'img/telegram.svg'
			}
		]
	});

	$('[data-fancybox]').fancybox({
		protect: true
	});

})(jQuery);